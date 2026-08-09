export const USER_ROLES = [
  "CUSTOMER",
  "EMPLOYEE",
  "SUPPORT",
  "ADMIN",
  "SUPER_ADMIN",
  "AUDITOR",
] as const;

export const USER_STATUS = [
  "PENDING",
  "ACTIVE",
  "SUSPENDED",
  "LOCKED",
  "CLOSED",
] as const;

export const EMAIL_STATUS = [
  "PENDING",
  "VERIFIED",
  "EXPIRED",
] as const;

export const PHONE_STATUS = [
  "PENDING",
  "VERIFIED",
] as const;

export const ACCOUNT_TYPES = [
  "INDIVIDUAL",
  "JOINT",
  "BUSINESS",
] as const;