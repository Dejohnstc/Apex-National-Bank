import type { AuthOptions } from "next-auth";

export const authCallbacks: AuthOptions["callbacks"] = {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.firstName = user.firstName;
      token.lastName = user.lastName;
      token.customerId = user.customerId;
      token.role = user.role;
      token.accountType = user.accountType;
      token.email = user.email;
      token.name = user.name;
    }

    return token;
  },

  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.customerId = token.customerId;
      session.user.role = token.role;
      session.user.accountType = token.accountType;
      session.user.email = token.email!;
      session.user.name = token.name!;
    }

    return session;
  },
};