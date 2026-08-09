import CredentialsProvider from "next-auth/providers/credentials";

import { connectDB } from "@/lib/db/mongodb";
import { comparePassword } from "@/lib/auth/password";
import { User } from "@/models/user/User";

export const credentialsProvider = CredentialsProvider({
  name: "Credentials",

  credentials: {
    email: {
      label: "Email",
      type: "email",
    },
    password: {
      label: "Password",
      type: "password",
    },
  },

  async authorize(credentials) {
    if (!credentials?.email || !credentials.password) {
      throw new Error("Email and password are required.");
    }

    await connectDB();

    const user = await User.findOne({
      email: credentials.email.trim().toLowerCase(),
    }).select("+password");

    if (!user) {
      return null;
    }

    // Email must be verified
    if (user.emailStatus !== "VERIFIED") {
      throw new Error(
        "Please verify your email address before signing in."
      );
    }

    // Block accounts that should never be able to sign in
    if (user.status === "LOCKED") {
      throw new Error(
        "Your account has been locked. Please contact support."
      );
    }

    if (user.status === "SUSPENDED") {
      throw new Error(
        "Your account has been suspended. Please contact support."
      );
    }

    if (user.status === "CLOSED") {
      throw new Error(
        "This account has been closed."
      );
    }

    const validPassword = await comparePassword(
      credentials.password,
      user.password
    );

    if (!validPassword) {
      return null;
    }

    await User.findByIdAndUpdate(user._id, {
      lastLogin: new Date(),
    });

    return {
      id: user._id.toString(),
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      customerId: user.customerId,
      accountType: user.accountType,
    };
  },
});