export interface Statement {
  _id: string;

  account: string;

  user: string;

  reference: string;

  type: string;

  direction: "IN" | "OUT";

  status: string;

  amount: number;

  balanceBefore: number;

  balanceAfter: number;

  merchant: string;

  description: string;

  category: string;

  location: string;

  postedAt: string;

  counterpartyAccount: string;

  counterpartyName: string;

  memo: string;

  currency: "USD";

  fee: number;

  createdAt: string;

  updatedAt: string;
}