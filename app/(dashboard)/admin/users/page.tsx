import { getUsers } from "@/services/admin/users/getUsers";

import { AdminDashboardHeader } from "@/components/admin/dashboard/AdminDashboardHeader";
import { UserToolbar } from "@/components/admin/users/UserToolbar";
import { UserTable } from "@/components/admin/users/UserTable";
import { UserPagination } from "@/components/admin/users/UserPagination";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    role?: string;
    accountType?: string;
    sort?: "newest" | "oldest" | "lastLogin";
  }>;
}

export default async function AdminUsersPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");

  const { data, pagination } = await getUsers({
    page,
    search: params.search,
    status: params.status,
    role: params.role,
    accountType: params.accountType,
    sort: params.sort,
  });

  return (
    <>
    

      <div className="space-y-6">
        <UserToolbar />

        <UserTable users={data} />

        <UserPagination pagination={pagination} />
      </div>
    </>
  );
}