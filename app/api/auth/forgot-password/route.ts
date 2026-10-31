import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/models/user/User";
import { sendPasswordResetEmail } from "@/lib/mail/sendPasswordResetEmail";

export async function POST(request: NextRequest) {
  console.log("🚨🚨🚨 FORGOT PASSWORD ROUTE HIT 🚨🚨🚨");

  try {
    const { email } = await request.json();
    console.log("📧 Email received:", email);

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required." }, { status: 400 });
    }

    await connectDB();
    console.log("✅ DB Connected");

    const user = await User.findOne({ email: email.toLowerCase() });
    console.log("👤 User found:", !!user);

    if (!user) {
      console.log("❌ User not found, exiting.");
      return NextResponse.json({ success: true, message: "If an account exists, a password reset email has been sent." });
    }

    console.log(`🔍 User Status: ${user.status} | Email Status: ${user.emailStatus}`);

    // TEMPORARILY BYPASS THE STATUS CHECK TO FORCE THE EMAIL TO SEND
    // if (user.status !== "ACTIVE" || user.emailStatus !== "VERIFIED") {
    //   console.log("❌ User not active/verified, exiting silently.");
    //   return NextResponse.json({ success: true, message: "If an account exists, a password reset email has been sent." });
    // }

    console.log("🔑 Generating token...");
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    await User.findByIdAndUpdate(user._id, {
      $set: {
        passwordResetToken: resetTokenHash,
        passwordResetTokenExpires: new Date(Date.now() + 1000 * 60 * 60),
      },
    });
    console.log("💾 Token saved to DB");

    console.log("📨 Calling sendPasswordResetEmail()...");
    await sendPasswordResetEmail({
      email: user.email,
      firstName: user.firstName,
      token: resetToken,
    });
    console.log("✅ Email function finished");

    return NextResponse.json({ success: true, message: "If an account exists, a password reset email has been sent." });
  } catch (error) {
    console.error("💥 ROUTE ERROR:", error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Unable to process your request." }, { status: 500 });
  }
}