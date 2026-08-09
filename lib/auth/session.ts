import { cookies } from "next/headers";
import { randomUUID } from "crypto";

import { connectDB } from "@/lib/db/mongodb";
import { Session } from "@/models/session";

const SESSION_COOKIE = "apex_session";
const SESSION_DURATION = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function createSession(userId: string) {
  await connectDB();

  const sessionId = randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  await Session.create({
    sessionId,
    userId,
    expiresAt,
  });

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return sessionId;
}

export async function getSession() {
  await connectDB();

  const cookieStore = await cookies();

  const sessionId =
    cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionId) {
    return null;
  }

  const session = await Session.findOne({
    sessionId,
  });

  if (!session) {
    return null;
  }

  return session;
}

export async function destroySession() {
  await connectDB();

  const cookieStore = await cookies();

  const sessionId =
    cookieStore.get(SESSION_COOKIE)?.value;

  if (sessionId) {
    await Session.deleteOne({ sessionId });
  }

  cookieStore.delete(SESSION_COOKIE);
}