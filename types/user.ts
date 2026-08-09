import {
  AccountStatus,
  AccountType,
} from "./account";

export type UserRole =
  | "CUSTOMER"
  | "ADMIN"
  | "SUPPORT"
  | "MANAGER";

export type UserStatus =
  | "ACTIVE"
  | "PENDING"
  | "SUSPENDED"
  | "LOCKED";

export type VerificationStatus =
  | "UNVERIFIED"
  | "VERIFIED";

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface UserIdentity {
  id: string;
  customerId: string;
  username: string;
  email: string;
}

export interface UserSecurity {
  role: UserRole;

  status: UserStatus;

  emailStatus: VerificationStatus;

  phoneStatus: VerificationStatus;

  lastLogin?: Date;

  emailVerifiedAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}

export interface UserAccountSettings {
  accountType: AccountType;

  accountStatus: AccountStatus;
}

export interface User
  extends UserIdentity,
    UserProfile,
    UserSecurity,
    UserAccountSettings {}