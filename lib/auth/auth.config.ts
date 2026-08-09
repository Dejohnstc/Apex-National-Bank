import type { AuthOptions } from "next-auth";

import { credentialsProvider } from "./auth.providers";
import { authCallbacks } from "./auth.callbacks";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === "development",

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [credentialsProvider],

  callbacks: authCallbacks,
};