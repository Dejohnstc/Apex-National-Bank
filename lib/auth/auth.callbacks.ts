import type { AuthOptions } from "next-auth";

import dbConnect from "@/lib/db/connect";
import { User } from "@/models/user/User";

export const authCallbacks: AuthOptions["callbacks"] = {
  async jwt({ token, user }) {
    /*
     * Credentials login already gives us
     * the application's User ID.
     *
     * Google login gives us the OAuth user,
     * so resolve that user against our User
     * collection using the verified email.
     */
    if (user) {
      await dbConnect();

      const email =
        user.email?.toLowerCase();

      if (!email) {
        return token;
      }

      const dbUser =
        await User.findOne({
          email,
        }).lean();

      if (dbUser) {
        token.id =
          dbUser._id.toString();

        token.firstName =
          dbUser.firstName;

        token.lastName =
          dbUser.lastName;

        token.customerId =
          dbUser.customerId;

        token.role =
          dbUser.role;

        token.accountType =
          dbUser.accountType;

        token.email =
          dbUser.email;

        token.name =
          `${dbUser.firstName} ${dbUser.lastName}`;
      } else {
        /*
         * Google user does not have a matching
         * banking User record yet.
         *
         * Do not create one automatically.
         */
        token.email = email;

        token.name =
          user.name ?? "";
      }
    }

    return token;
  },

  async session({
    session,
    token,
  }) {
    if (session.user) {
      session.user.id =
        token.id as string;

      session.user.firstName =
        token.firstName as string;

      session.user.lastName =
        token.lastName as string;

      session.user.customerId =
        token.customerId as string;

      session.user.role =
        token.role as
          | "CUSTOMER"
          | "EMPLOYEE"
          | "SUPPORT"
          | "ADMIN"
          | "SUPER_ADMIN"
          | "AUDITOR";

      session.user.accountType =
        token.accountType as
          | "INDIVIDUAL"
          | "JOINT"
          | "BUSINESS";

      session.user.email =
        token.email as string;

      session.user.name =
        token.name as string;
    }

    return session;
  },
};