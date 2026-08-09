import { connectDB } from "@/lib/db/mongodb";
import { LoginHistory } from "@/models/security/LoginHistory";

export async function getLoginHistory(
  userId: string
) {
  await connectDB();

  return LoginHistory.find({
    user: userId,
  })
    .sort({
      createdAt: -1,
    })
    .limit(20)
    .lean();
}