import dbConnect from "@/lib/db/connect";
import { User } from "@/models/user/User";

import type { AdminUser } from "@/types/admin/user.types";

interface GetUserResponse {
  success: boolean;
  data: AdminUser | null;
}

export async function getUser(
  id: string
): Promise<GetUserResponse> {
  await dbConnect();

  const user = await User.findById(id).lean();

  if (!user) {
    return {
      success: false,
      data: null,
    };
  }

  const data: AdminUser = {
    id: user._id.toString(),

    customerId: user.customerId ?? "",

    username: user.username ?? "",

    firstName: user.firstName,

    lastName: user.lastName,

    fullName: `${user.firstName} ${user.lastName}`,

    email: user.email,

    phone: user.phone,

    role: user.role,

    status: user.status,

    accountType: user.accountType,

    emailStatus: user.emailStatus,

    phoneStatus: user.phoneStatus,

    twoFactorEnabled: user.twoFactorEnabled,

    failedLoginAttempts: user.failedLoginAttempts,

    lastLogin: user.lastLogin
      ? user.lastLogin.toISOString()
      : null,

    createdAt: user.createdAt.toISOString(),
  };

  return {
    success: true,
    data,
  };
}