// app/dashboard/layout.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/auth/login");
  }

  if (!session) {
    redirect("/auth/login");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
