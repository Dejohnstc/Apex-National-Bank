import { connectDB } from "@/lib/db/mongodb";

import { User } from "@/models/user/User";
import { LoginHistory } from "@/models/security/LoginHistory";
import { ActiveSession } from "@/models/security/ActiveSession";
import { TrustedDevice } from "@/models/security/TrustedDevice";
import { SecurityAlert } from "@/models/security/SecurityAlert";

interface RecordLoginInput {
  userId: string;
  success: boolean;
  ip?: string | null;
  browser?: string | null;
  device?: string | null;
  os?: string | null;
  location?: string | null;
  sessionToken?: string | null;
}

export async function recordLogin({
  userId,
  success,
  ip = null,
  browser = null,
  device = null,
  os = null,
  location = null,
  sessionToken = null,
}: RecordLoginInput) {
  await connectDB();

  await LoginHistory.create({
    user: userId,
    ip,
    browser,
    device,
    os,
    location,
    success,
  });

  if (!success) {
    await SecurityAlert.create({
      user: userId,
      type: "FAILED_LOGIN",
      title: "Failed Sign-In Attempt",
      description:
        "There was a failed sign-in attempt on your account.",
    });

    return;
  }

  await User.findByIdAndUpdate(userId, {
    lastLogin: new Date(),
    lastLoginIp: ip,
    lastLoginDevice: device,
  });

  if (sessionToken) {
    await ActiveSession.findOneAndUpdate(
      {
        sessionToken,
      },
      {
        user: userId,
        sessionToken,
        browser,
        device,
        os,
        ip,
        location,
        lastActive: new Date(),
      },
      {
        upsert: true,
        new: true,
      }
    );
  }

  const existingDevice =
    await TrustedDevice.findOne({
      user: userId,
      device,
      browser,
      ip,
    });

  if (!existingDevice) {
    await TrustedDevice.create({
      user: userId,
      browser,
      device,
      os,
      ip,
      location,
      lastUsed: new Date(),
    });

    await SecurityAlert.create({
      user: userId,
      type: "NEW_DEVICE",
      title: "New Device Sign-In",
      description:
        "Your account was accessed from a new device.",
    });
  } else {
    existingDevice.lastUsed = new Date();
    await existingDevice.save();
  }
}