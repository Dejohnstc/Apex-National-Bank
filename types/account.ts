export type AccountType =
  | "CHECKING"
  | "SAVINGS"
  | "INVESTMENT"
  | "CREDIT";

export type AccountStatus =
  | "ACTIVE"
  | "PENDING"
  | "FROZEN"
  | "CLOSED";

export type Currency = "USD";

export interface Account {
  _id: string;

  user: string;

  accountNumber: string;
  routingNumber: string;

  nickname: string;

  type: AccountType;
  status: AccountStatus;
  currency: Currency;

  availableBalance: number;
  currentBalance: number;

  interestRate: number;
  overdraftLimit: number;

  openedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}