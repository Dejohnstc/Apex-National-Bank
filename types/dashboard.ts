import { AccountType } from "./account";
import {
  TransactionDirection,
  TransactionStatus,
  TransactionType,
} from "./transaction";

export interface DashboardAccount {
  _id: string;
  accountNumber: string;
  type: AccountType;
  availableBalance: number;
  currentBalance: number;
}

export interface DashboardTransaction {
  _id: string;
  reference: string;
  description: string;
  amount: number;
  direction: TransactionDirection;
  type: TransactionType;
  status: TransactionStatus;
  createdAt: string;
}

export interface DashboardCustomer {
  firstName: string;
  lastName: string;
  customerId: string;
}

export interface DashboardData {
  customer: {
    firstName: string;
    lastName: string;
    customerId: string;
  };

  totalBalance: number;

  accounts: {
    _id: string;
    accountNumber: string;
    type:
  | "CHECKING"
  | "SAVINGS"
  | "INVESTMENT"
  | "CREDIT";
    availableBalance: number;
    currentBalance: number;
  }[];

  recentTransactions: {
    _id: string;
    reference: string;
    description: string;
    amount: number;
    direction: TransactionDirection;
    type: TransactionType;
    status: TransactionStatus;
    createdAt: string;
  }[];

  pendingWires: {
    id: string;
    recipientName: string;
    amount: number;
    status: string;
    createdAt: string;
  }[];

  pendingAchTransfers: {
    id: string;
    recipientName: string;
    amount: number;
    status: string;
    createdAt: string;
  }[];

  notifications: {
    id: string;
    title: string;
    message: string;
    type: string;
    actionUrl: string;
    createdAt: string;
  }[];
 exchangeRates: {
  base: string;
  timestamp: string;
  rates: {
    EUR: number | null;
    GBP: number | null;
    CAD: number | null;
    NGN: number | null;
    JPY: number | null;
  };
};
}