import { User } from "@/models/user/User";
import { LoginHistory } from "@/models/security/LoginHistory";
import { SecurityAlert } from "@/models/security/SecurityAlert";
import { TrustedDevice } from "@/models/security/TrustedDevice";

interface RecordSuccessfulLoginParams {
  userId: string;
  ip?: string | null;
  browser?: string | null;
  device?: string | null;
  location?: string | null;
  deviceId?: string | null;
}

export async function recordSuccessfulLogin({
  userId,
  ip,
  browser,
  device,
  location,
  deviceId,
}: RecordSuccessfulLoginParams) {
  await User.findByIdAndUpdate(userId, {
    lastLogin: new Date(),
    lastLoginIp: ip ?? null,
    lastLoginDevice: device ?? browser ?? null,
    failedLoginAttempts: 0,
    lockedUntil: null,
  });

  await LoginHistory.create({
    user: userId,
    ip,
    browser,
    device,
    location,
    success: true,
  });

  if (!deviceId) {
    return;
  }

  const existingDevice =
    await TrustedDevice.findOne({
      user: userId,
      deviceId,
    });

  if (existingDevice) {
    existingDevice.lastUsed = new Date();
    existingDevice.ip = ip ?? null;
    await existingDevice.save();
    return;
  }

  await TrustedDevice.create({
    user: userId,
    deviceId,
    browser,
    device,
    ip,
    lastUsed: new Date(),
  });

  await SecurityAlert.create({
    user: userId,
    type: "NEW_DEVICE",
    title: "New device detected",
    description:
      "A new device signed into your account.",
  });
}