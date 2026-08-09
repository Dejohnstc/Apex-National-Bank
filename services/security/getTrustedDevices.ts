import { TrustedDevice } from "@/models/security/TrustedDevice";

export async function getTrustedDevices(
  userId: string
) {
  return TrustedDevice.find({
    user: userId,
  })
    .sort({
      lastUsed: -1,
    })
    .lean();
}