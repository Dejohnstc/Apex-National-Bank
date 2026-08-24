import { connectDB } from "@/lib/db/mongodb";

import { User } from "@/models/user/User";

export async function getSecuritySettings(
  userId: string
) {
  await connectDB();

  const user = await User.findById(userId)
    .select(
      [
        "twoFactorEnabled",
        "lastLogin",
        "lastLoginIp",
        "lastLoginDevice",
        "lastLoginLocation",
        "lastLoginBrowser",
        "lastPasswordChanged",
        "passwordExpiresAt",
      ].join(" ")
    )
    .lean();

  if (!user) {
    return null;
  }

  return {
    twoFactorEnabled:
      user.twoFactorEnabled ?? false,

    lastLogin: user.lastLogin
      ? user.lastLogin.toISOString()
      : null,

    lastLoginIp:
      user.lastLoginIp ?? null,

    lastLoginDevice:
      user.lastLoginDevice ?? null,

    lastLoginLocation:
      user.lastLoginLocation ?? null,

    lastLoginBrowser:
      user.lastLoginBrowser ?? null,

    lastPasswordChanged:
      user.lastPasswordChanged
        ? user.lastPasswordChanged.toISOString()
        : null,

    passwordExpiresAt:
      user.passwordExpiresAt
        ? user.passwordExpiresAt.toISOString()
        : null,
  };
}