import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Papa from 'papaparse';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const waitlistId = params.id;
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const text = await file.text();
    
    return new Promise((resolve) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          try {
            // Count existing signups to determine starting position
            const signupsCount = await prisma.waitlistSignups.count({
              where: { waitlistId }
            });

            let nextPosition = signupsCount + 1;

            const validSignups = results.data
              .filter((row: any) => row.email)
              .map((row: any, index: number) => ({
                email: row.email.toLowerCase().trim(),
                name: row.name?.trim() || '',
                status: 'verified',
                referrals: 0,
                waitlistId,
                position: nextPosition + index, // Use index to ensure unique positions
                joinedAt: new Date()
              }));

            if (validSignups.length === 0) {
              resolve(NextResponse.json(
                { error: 'No valid signups found in CSV' },
                { status: 400 }
              ));
              return;
            }

            const batchSize = 100;
            const batches = [];
            
            for (let i = 0; i < validSignups.length; i += batchSize) {
              const batch = validSignups.slice(i, i + batchSize);
              batches.push(batch);
            }

            const createdSignups = await prisma.$transaction(async (tx) => {
              const allSignups = [];
              
              for (const batch of batches) {
                // Filter out existing entries
                const existingEmails = await tx.waitlistSignups.findMany({
                  where: {
                    waitlistId,
                    email: {
                      in: batch.map(signup => signup.email)
                    }
                  },
                  select: { email: true }
                });

                const existingEmailSet = new Set(existingEmails.map(e => e.email));
                const newSignups = batch.filter(signup => !existingEmailSet.has(signup.email));

                if (newSignups.length > 0) {
                  const created = await tx.waitlistSignups.createMany({
                    data: newSignups
                  });
                  allSignups.push(created);
                }
              }

              // Update analytics with only new signups count
              const totalNewSignups = allSignups.reduce((sum, batch) => sum + batch.count, 0);
              if (totalNewSignups > 0) {
                await tx.analytics.update({
                  where: { waitlistId },
                  data: {
                    signups: {
                      increment: totalNewSignups
                    },
                  },
                });
              }

              return {
                totalCreated: totalNewSignups,
                totalProcessed: validSignups.length,
                skipped: validSignups.length - totalNewSignups
              };
            });

            resolve(NextResponse.json({ 
              data: createdSignups,
              message: `Import completed successfully. Created ${createdSignups.totalCreated} new signups, skipped ${createdSignups.skipped} duplicates.`
            }));
          } catch (error) {
            resolve(NextResponse.json(
              { error: error instanceof Error ? error.message : 'Failed to import signups' },
              { status: 500 }
            ));
          }
        },
        error(error) {
          resolve(NextResponse.json(
            { error: 'Failed to parse CSV file' },
            { status: 400 }
          ));
        },
      });
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process import' },
      { status: 500 }
    );
  }
}