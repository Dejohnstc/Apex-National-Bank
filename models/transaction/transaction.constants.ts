export const TRANSACTION_TYPES = [
  "DEPOSIT",
  "WITHDRAWAL",
  "TRANSFER",
  "WIRE",
  "ACH",
  "CARD_PURCHASE",
  "ATM",
  "CHECK",
  "CHECK_DEPOSIT",
  "INTEREST",
  "FEE",
  "REFUND",
] as const;

export const TRANSACTION_DIRECTION = [
  "CREDIT",
  "DEBIT",
] as const;

export const TRANSACTION_STATUS = [
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "FAILED",
  "CANCELLED",
  "REJECTED",
  "RETURNED",
] as const;