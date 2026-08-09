import { connectDB } from "@/lib/db/mongodb";
import { SecurityAlert } from "@/models/security/SecurityAlert";

export async function getSecurityAlerts(
  userId: string
) {
  await connectDB();

  return SecurityAlert.find({
    user: userId,
  })
    .sort({
      createdAt: -1,
    })
    .limit(20)
    .lean();
}