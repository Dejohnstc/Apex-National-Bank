import crypto from "node:crypto";

import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/models/user/User";
import { sendVerificationEmail } from "@/lib/mail/sendVerificationEmail";

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
        {
          status: 400,
        }
      );
    }

    await connectDB();

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    // Always return the same response to avoid revealing
    // whether an email address exists.
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account exists, a verification email has been sent.",
      });
    }

    if (user.emailStatus === "VERIFIED") {
      return NextResponse.json({
        success: true,
        message: "Your email is already verified.",
      });
    }

   const verificationToken =
  crypto.randomBytes(32).toString("hex");

const verificationTokenHash = crypto
  .createHash("sha256")
  .update(verificationToken)
  .digest("hex");

user.verificationToken =
  verificationTokenHash;

    user.verificationTokenExpires =
      new Date(
        Date.now() +
          1000 * 60 * 60 * 24
      );

    await user.save();

    await sendVerificationEmail({
      email: user.email,
      firstName: user.firstName,
      verificationToken,
    });

    return NextResponse.json({
      success: true,
      message:
        "A new verification email has been sent.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to resend verification email.",
      },
      {
        status: 500,
      }
    );
  }
}