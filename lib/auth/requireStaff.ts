import { auth } from "@/lib/auth";

const STAFF_ROLES = [
  "EMPLOYEE",
  "SUPPORT",
  "ADMIN",
  "SUPER_ADMIN",
] as const;

type StaffRole =
  (typeof STAFF_ROLES)[number];

export async function requireStaff() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const role = session.user.role;

  if (
    !role ||
    !STAFF_ROLES.includes(
      role as StaffRole
    )
  ) {
    throw new Error(
      "Staff authorization required."
    );
  }

  return session;
}