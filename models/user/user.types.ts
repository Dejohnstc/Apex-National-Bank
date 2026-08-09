import {
  ACCOUNT_TYPES,
  EMAIL_STATUS,
  PHONE_STATUS,
  USER_ROLES,
  USER_STATUS,
} from "./user.constants";

export type UserRole = (typeof USER_ROLES)[number];

export type UserStatus = (typeof USER_STATUS)[number];

export type EmailStatus = (typeof EMAIL_STATUS)[number];

export type PhoneStatus = (typeof PHONE_STATUS)[number];

export type AccountType = (typeof ACCOUNT_TYPES)[number];