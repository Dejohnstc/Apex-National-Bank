import { connectDB } from "@/lib/db/mongodb";
import { ActiveSession } from "@/models/security/ActiveSession";

export async function getActiveSessions(
  userId: string
) {
  await connectDB();

  return ActiveSession.find({
    user: userId,
  })
    .sort({
      lastActive: -1,
    })
    .lean();
}