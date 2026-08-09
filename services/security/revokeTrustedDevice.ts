import { connectDB } from "@/lib/db/mongodb";

import { TrustedDevice } from "@/models/security/TrustedDevice";
import { SecurityAlert } from "@/models/security/SecurityAlert";

export async function revokeTrustedDevice(
  userId: string,
  deviceId: string
) {
  await connectDB();

  const device =
    await TrustedDevice.findOne({
      _id: deviceId,
      user: userId,
    });

  if (!device) {
    return {
      success: false,
      message: "Trusted device not found.",
    };
  }

  await TrustedDevice.deleteOne({
    _id: device._id,
  });

  await SecurityAlert.create({
    user: userId,
    type: "DEVICE_REMOVED",
    title: "Trusted Device Removed",
    description: `Trusted device "${device.device ?? "Unknown Device"}" was removed from your account.`,
  });

  return {
    success: true,
  };
}