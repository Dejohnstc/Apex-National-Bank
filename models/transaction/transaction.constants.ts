export const TRANSACTION_TYPES = [
  "DEPOSIT",
  "CHECK_DEPOSIT",
  "WITHDRAWAL",
  "TRANSFER",
  "WIRE",
  "ACH",
  "CARD_PURCHASE",
  "ATM",
  "CHECK",
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
] as const;