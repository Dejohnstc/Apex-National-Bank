import crypto from "node:crypto";

import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/models/user/User";

import { sendPasswordResetEmail } from "@/lib/mail/sendPasswordResetEmail";

export async function POST(
  request: NextRequest
) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    // Always return the same response to prevent
    // email enumeration.
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account exists, a password reset email has been sent.",
      });
    }

    // Only verified, active users may reset passwords.
    if (
      user.status !== "ACTIVE" ||
      user.emailStatus !== "VERIFIED"
    ) {
      return NextResponse.json({
        success: true,
        message:
          "If an account exists, a password reset email has been sent.",
      });
    }

    const resetToken =
      crypto.randomBytes(32).toString("hex");

    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.passwordResetToken = resetTokenHash;

    user.passwordResetTokenExpires =
      new Date(
        Date.now() +
          1000 * 60 * 60 // 1 hour
      );

    await user.save();

    await sendPasswordResetEmail({
      email: user.email,
      firstName: user.firstName,
      token: resetToken,
    });

    return NextResponse.json({
      success: true,
      message:
        "If an account exists, a password reset email has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to process your request.",
      },
      {
        status: 500,
      }
    );
  }
}