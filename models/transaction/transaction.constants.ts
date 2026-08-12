export const TRANSACTION_TYPES = [
  "DEPOSIT",
  "WITHDRAWAL",
  "TRANSFER",
  "WIRE",
  "ACH",
  "BILL_PAYMENT", // ADD THIS
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
  "REJECTED",
  "RETURNED",
] as const;