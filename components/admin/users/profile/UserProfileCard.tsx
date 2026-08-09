import type { AdminUser } from "@/types/admin/user.types";

interface Props {
  user: AdminUser;
}

export function UserProfileCard({ user }: Props) {
  return (
    <div className="rounded-xl border bg-white">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          Customer Information
        </h2>
      </div>

      <div className="space-y-5 p-6">
        <ProfileRow
          label="Customer ID"
          value={user.customerId}
        />

        <ProfileRow
          label="Full Name"
          value={user.fullName}
        />

        <ProfileRow
          label="Username"
          value={`@${user.username}`}
        />

        <ProfileRow
          label="Email"
          value={user.email}
        />

        <ProfileRow
          label="Phone"
          value={user.phone}
        />

        <ProfileRow
          label="Role"
          value={user.role}
        />

        <ProfileRow
          label="Status"
          value={user.status}
        />

        <ProfileRow
          label="Account Type"
          value={user.accountType}
        />

        <ProfileRow
          label="Email Verification"
          value={user.emailStatus}
        />

        <ProfileRow
          label="Phone Verification"
          value={user.phoneStatus}
        />

        <ProfileRow
          label="Member Since"
          value={new Date(
            user.createdAt
          ).toLocaleDateString()}
        />
      </div>
    </div>
  );
}

interface RowProps {
  label: string;
  value: string;
}

function ProfileRow({
  label,
  value,
}: RowProps) {
  return (
    <div className="flex items-center justify-between border-b pb-3 last:border-none">
      <span className="text-sm font-medium text-gray-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-gray-900">
        {value}
      </span>
    </div>
  );
}