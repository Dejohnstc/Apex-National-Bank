import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { AdminDashboardShell } from "@/components/admin/layout/AdminDashboardShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <AdminDashboardShell>
      {children}
    </AdminDashboardShell>
  );
}