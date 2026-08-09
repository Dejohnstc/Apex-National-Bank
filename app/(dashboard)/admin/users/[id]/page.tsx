import { notFound } from "next/navigation";

import { AdminDashboardHeader } from "@/components/admin/dashboard/AdminDashboardHeader";

import { getUser } from "@/services/admin/users/getUser";

import { UserProfileCard } from "@/components/admin/users/profile/UserProfileCard";
import { UserSecurityCard } from "@/components/admin/users/profile/UserSecurityCard";
import { UserQuickActions } from "@/components/admin/users/profile/UserQuickActions";
import { UserOverviewCards } from "@/components/admin/users/profile/UserOverviewCards";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserProfilePage({
  params,
}: Props) {
  const { id } = await params;

  const result = await getUser(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const user = result.data;

  return (
    <>
      <AdminDashboardHeader
        title={user.fullName}
        description="Customer Profile"
      />

      <div className="space-y-6">
        <UserOverviewCards user={user} />

        <div className="grid gap-6 lg:grid-cols-3">
          <UserProfileCard user={user} />

          <UserSecurityCard user={user} />

          <UserQuickActions user={user} />
        </div>
      </div>
    </>
  );
}