export type TransactionType =
  | "DEPOSIT"
  | "WITHDRAWAL"
  | "TRANSFER"
  | "ACH"
  | "WIRE"
  | "ZELLE"
  | "CARD_PAYMENT"
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
  | "REVERSED"
  | "CANCELLED";

export interface AdminTransaction {
  id: string;

  reference: string;

  userId: string;

  customerName: string;

  accountId: string;

  accountNumber: string;

  type: TransactionType;

  direction: TransactionDirection;

  status: TransactionStatus;

  amount: number;

  fee: number;

  currency: string;

  balanceBefore: number;

  balanceAfter: number;

  merchant?: string;

  description?: string;

  category?: string;

  counterpartyName?: string;

  counterpartyAccount?: string;

  location?: string;

  memo?: string;

  postedAt: string;

  createdAt: string;
}

export interface TransactionSummary {
  totalTransactions: number;

  totalCredits: number;

  totalDebits: number;

  totalVolume: number;
}

export interface GetTransactionsParams {
  page?: number;

  limit?: number;

  search?: string;

  status?: TransactionStatus;

  type?: TransactionType;

  direction?: TransactionDirection;

  sort?:
    | "newest"
    | "oldest"
    | "highest"
    | "lowest";
}

export interface Pagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface GetTransactionsResponse {
  success: boolean;

  summary: TransactionSummary;

  data: AdminTransaction[];

  pagination: Pagination;
}