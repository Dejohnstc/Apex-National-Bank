import type { AuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

import { credentialsProvider } from "./auth.providers";
import { authCallbacks } from "./auth.callbacks";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  debug:
    process.env.NODE_ENV === "development",

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    credentialsProvider,

    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID ?? "",

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: authCallbacks,
};