interface Props {
  role: string;
}

const colors: Record<string, string> = {
  ADMIN: "bg-red-100 text-red-700",
  SUPER_ADMIN: "bg-purple-100 text-purple-700",
  MANAGER: "bg-blue-100 text-blue-700",
  CUSTOMER: "bg-green-100 text-green-700",
};

export function UserRoleBadge({ role }: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[role] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {role.replaceAll("_", " ")}
    </span>
  );
}