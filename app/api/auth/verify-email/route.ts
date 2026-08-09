import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/models/user/User";

export async function GET(
  request: NextRequest
) {
  try {
    const token =
      request.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL(
          "/verify-email?error=missing-token",
          request.url
        )
      );
    }

    await connectDB();

   const tokenHash = crypto
  .createHash("sha256")
  .update(token)
  .digest("hex");

const user = await User.findOne({
  verificationToken: tokenHash,
});

    if (!user) {
      return NextResponse.redirect(
        new URL(
          "/verify-email?error=invalid-token",
          request.url
        )
      );
    }

    if (
      !user.verificationTokenExpires ||
      user.verificationTokenExpires <
        new Date()
    ) {
      return NextResponse.redirect(
        new URL(
          "/verify-email?error=expired-token",
          request.url
        )
      );
    }

    user.status = "ACTIVE";
    user.emailStatus = "VERIFIED";

    user.verificationToken = undefined;
    user.verificationTokenExpires =
      undefined;

    await user.save();

    return NextResponse.redirect(
      new URL(
        "/verify-success",
        request.url
      )
    );
  } catch (error) {
    console.error(
      "Email verification failed:",
      error
    );

    return NextResponse.redirect(
      new URL(
        "/verify-email?error=server-error",
        request.url
      )
    );
  }
}