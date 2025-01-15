import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface WaitlistContent {
  header?: {
    title: string;
    subtitle: string;
    alignment: string;
    showSubtitle: boolean;
  };
  features?: Array<{
    id: string;
    title: string;
    description: string;
    icon?: string;
  }>;
}

interface WaitlistStyle {
  colors: {
    primary: string;
    text: string;
    background: string;
  };
  spacing: string;
  borderRadius: string;
  font: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const waitlist = await prisma.waitlist.findUnique({
      where: {
        id: params.id,
        OR: [
          { userId: session.user.id },
          { clientId: session.user.id }
        ]
      },
      select: {
        content: true,
        style: true,
        status: true
      }
    });

    if (!waitlist) {
      return NextResponse.json({ error: "Waitlist not found" }, { status: 404 });
    }

    // Initialize default content if not present
    const content = (waitlist.content || {}) as WaitlistContent;
    if (!content.header) {
      content.header = {
        title: "",
        subtitle: "",
        alignment: "left",
        showSubtitle: true
      };
    }

    // Initialize default style if not present
    const style = (waitlist.style || {
      colors: {
        primary: "#0F172A",
        text: "#111827",
        background: "#ffffff"
      },
      spacing: "default",
      borderRadius: "default",
      font: "font-sans"
    }) as WaitlistStyle;

    // Generate HTML preview
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Waitlist Preview</title>
          <style>
            body {
              margin: 0;
              font-family: ${style.font};
              color: ${style.colors.text};
              background-color: ${style.colors.background};
            }
            .container {
              max-width: 100%;
              margin: 0 auto;
            }
            .header {
              text-align: ${content.header.alignment};
              margin-bottom: 2rem;
            }
            .title {
              font-size: 2.5rem;
              font-weight: bold;
              margin-bottom: 1rem;
            }
            .subtitle {
              font-size: 1.25rem;
              opacity: 0.8;
            }
            .features {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 2rem;
              margin-top: 3rem;
            }
            .feature {
              padding: 1.5rem;
              border-radius: 0.5rem;
              background: ${style.colors.background};
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .feature-icon {
              font-size: 2rem;
              margin-bottom: 1rem;
              color: ${style.colors.primary};
            }
            .feature-title {
              font-size: 1.25rem;
              font-weight: 600;
              margin-bottom: 0.5rem;
            }
            .feature-description {
              font-size: 1rem;
              opacity: 0.8;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="title">${content.header.title || 'Welcome'}</h1>
              <p class="subtitle">${content.header.subtitle || 'Join our waitlist'}</p>
            </div>

            ${content.features ? `
              <div class="features">
                ${content.features.map(feature => `
                  <div class="feature">
                    ${feature.icon ? `<div class="feature-icon">${feature.icon}</div>` : ''}
                    <h3 class="feature-title">${feature.title}</h3>
                    <p class="feature-description">${feature.description}</p>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error) {
    console.error("Preview API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
