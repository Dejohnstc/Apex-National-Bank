import { connectDB } from "@/lib/db/mongodb";
import { getSession } from "./session";
import { User } from "@/models/user/User";

export async function getCurrentUser() {
  await connectDB();

  const session = await getSession();

  if (!session) {
    return null;
  }

  return User.findById(session.userId);
}