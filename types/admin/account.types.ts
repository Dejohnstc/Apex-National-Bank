export type AccountStatus =
  | "ACTIVE"
  | "FROZEN"
  | "CLOSED";

export type AccountType =
  | "CHECKING"
  | "SAVINGS"
  | "BUSINESS";

export interface AdminAccount {
  id: string;

  userId: string;

  customerName: string;

  accountNumber: string;

  routingNumber: string;

  nickname: string;

  type: AccountType;

  status: AccountStatus;

  currency: string;

  availableBalance: number;

  currentBalance: number;

  interestRate: number;

  overdraftLimit: number;

  openedAt: string;

  lastActivityAt: string;

  createdAt: string;
}

export interface GetAccountsParams {
  page?: number;

  limit?: number;

  search?: string;

  status?: AccountStatus;

  type?: AccountType;

  sort?:
    | "newest"
    | "oldest"
    | "balance";
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetAccountsResponse {
  success: boolean;

  data: AdminAccount[];

  pagination: Pagination;
}