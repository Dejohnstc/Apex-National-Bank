import { User } from "@/models/user/User";
import { LoginHistory } from "@/models/security/LoginHistory";
import { SecurityAlert } from "@/models/security/SecurityAlert";

interface RecordFailedLoginParams {
  userId: string;
  ip?: string | null;
  browser?: string | null;
  device?: string | null;
  location?: string | null;
}

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 30;

export async function recordFailedLogin({
  userId,
  ip,
  browser,
  device,
  location,
}: RecordFailedLoginParams) {
  const user = await User.findById(userId);

  if (!user) {
    return;
  }

  user.failedLoginAttempts += 1;

  if (
    user.failedLoginAttempts >= MAX_ATTEMPTS
  ) {
    user.lockedUntil = new Date(
      Date.now() +
        LOCK_MINUTES * 60 * 1000
    );

    await SecurityAlert.create({
      user: userId,
      type: "ACCOUNT_LOCKED",
      title: "Account temporarily locked",
      description:
        "Too many failed login attempts.",
    });
  }

  await user.save();

  await LoginHistory.create({
    user: userId,
    ip,
    browser,
    device,
    location,
    success: false,
  });
}