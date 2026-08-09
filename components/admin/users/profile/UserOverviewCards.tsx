import type { AdminUser } from "@/types/admin/user.types";

interface Props {
  user: AdminUser;
}

export function UserOverviewCards({
  user,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card
        title="Status"
        value={user.status}
      />

      <Card
        title="Role"
        value={user.role}
      />

      <Card
        title="2FA"
        value={
          user.twoFactorEnabled
            ? "Enabled"
            : "Disabled"
        }
      />

      <Card
        title="Account"
        value={user.accountType}
      />
    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="text-sm text-gray-500">
        {title}
      </div>

      <div className="mt-2 text-xl font-semibold">
        {value}
      </div>
    </div>
  );
}