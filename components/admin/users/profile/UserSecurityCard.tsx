import type { AdminUser } from "@/types/admin/user.types";

interface Props {
  user: AdminUser;
}

export function UserSecurityCard({
  user,
}: Props) {
  return (
    <div className="rounded-xl border bg-white">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          Security
        </h2>
      </div>

      <div className="space-y-5 p-6">
        <SecurityItem
          label="Two-Factor Authentication"
          value={
            user.twoFactorEnabled
              ? "Enabled"
              : "Disabled"
          }
        />

        <SecurityItem
          label="Failed Login Attempts"
          value={String(
            user.failedLoginAttempts
          )}
        />

        <SecurityItem
          label="Last Login"
          value={
            user.lastLogin
              ? new Date(
                  user.lastLogin
                ).toLocaleString()
              : "Never"
          }
        />
      </div>
    </div>
  );
}

interface SecurityItemProps {
  label: string;
  value: string;
}

function SecurityItem({
  label,
  value,
}: SecurityItemProps) {
  return (
    <div className="flex items-center justify-between border-b pb-3 last:border-none">
      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span className="font-medium">
        {value}
      </span>
    </div>
  );
}