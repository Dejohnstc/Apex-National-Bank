import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

import type {
  USER_ROLES,
  ACCOUNT_TYPES,
} from "@/models/user/user.constants";

type UserRole = (typeof USER_ROLES)[number];
type AccountType = (typeof ACCOUNT_TYPES)[number];

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      firstName: string;
      lastName: string;
      customerId: string;
      role: UserRole;
      accountType: AccountType;
    };
  }

  interface User extends DefaultUser {
    id: string;
    firstName: string;
    lastName: string;
    customerId: string;
    role: UserRole;
    accountType: AccountType;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    firstName: string;
    lastName: string;
    customerId: string;
    role: UserRole;
    accountType: AccountType;
  }
}