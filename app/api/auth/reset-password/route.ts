import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { hashPassword } from "@/lib/auth/password";
import { User } from "@/models/user/User";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: "Token and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    await connectDB();

    const user = await User.findOne({
      passwordResetToken: tokenHash,
    }).select("+password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "This password reset link is invalid." },
        { status: 400 }
      );
    }

    if (
      !user.passwordResetTokenExpires ||
      user.passwordResetTokenExpires < new Date()
    ) {
      return NextResponse.json(
        { success: false, message: "This password reset link has expired." },
        { status: 400 }
      );
    }

    // Hash the new password
    const newPasswordHash = await hashPassword(password);

    // FIX: Use findByIdAndUpdate so the DB is guaranteed to update
    await User.findByIdAndUpdate(user._id, {
      $set: {
        password: newPasswordHash,
        passwordResetToken: null,
        passwordResetTokenExpires: null,
        lastPasswordChanged: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your password has been updated successfully.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to reset your password.",
      },
      { status: 500 }
    );
  }
}