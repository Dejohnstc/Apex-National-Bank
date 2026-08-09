import { Document, Types } from "mongoose";

export interface ITransaction extends Document {
  account: Types.ObjectId;
  user: Types.ObjectId;

  reference: string;

  type: string;
  direction: string;
  status: string;

  amount: number;

  balanceBefore: number;
  balanceAfter: number;

  merchant: string;
  description: string;
  category: string;
  location: string;

  postedAt: Date;

  counterpartyAccount: string;
  counterpartyName: string;

  memo: string;

  currency: "USD";

  fee: number;

  metadata: Record<string, unknown>;

  createdAt: Date;
  updatedAt: Date;
}