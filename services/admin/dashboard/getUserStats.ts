import { User } from "@/models/user/User";

export async function getUserStats() {
  const [
    total,
    active,
    pending,
    suspended,
  ] = await Promise.all([
    User.countDocuments(),

    User.countDocuments({
      status: "ACTIVE",
    }),

    User.countDocuments({
      status: "PENDING",
    }),

    User.countDocuments({
      status: "SUSPENDED",
    }),
  ]);

  return {
    total,
    active,
    pending,
    suspended,
  };
}