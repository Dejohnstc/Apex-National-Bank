import { connectDB } from "@/lib/db/mongodb";

import { ActiveSession } from "@/models/security/ActiveSession";
import { SecurityAlert } from "@/models/security/SecurityAlert";

export async function revokeSession(
  userId: string,
  sessionId: string
) {
  await connectDB();

  const session =
    await ActiveSession.findOne({
      _id: sessionId,
      user: userId,
    });

  if (!session) {
    return {
      success: false,
      message: "Session not found.",
    };
  }

  await ActiveSession.deleteOne({
    _id: session._id,
  });

  await SecurityAlert.create({
    user: userId,
    type: "SESSION_REVOKED",
    title: "Session Ended",
    description:
      "An active session was signed out.",
  });

  return {
    success: true,
  };
}