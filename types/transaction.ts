import type { Currency } from "./account";

export type TransactionType =
  | "DEPOSIT"
  | "WITHDRAWAL"
  | "TRANSFER"
  | "WIRE"
  | "ACH"
  | "PAYMENT"
  | "FEE"
  | "INTEREST";

export type TransactionDirection =
  | "CREDIT"
  | "DEBIT";

export type TransactionStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | "REJECTED"
  | "RETURNED";

export interface Transaction {
  _id: string;

  account: string;
  user: string;

  reference: string;

  type: TransactionType;
  direction: TransactionDirection;
  status: TransactionStatus;

  amount: number;

  balanceBefore: number;
  balanceAfter: number;

  merchant: string;
  description: string;
  category: string;
  location: string;

  counterpartyAccount?: string;
  counterpartyName: string;

  memo: string;

  currency: Currency;

  fee: number;

  postedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}