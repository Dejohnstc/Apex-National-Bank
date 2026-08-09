export type LoanType =
  | "PERSONAL"
  | "AUTO"
  | "MORTGAGE"
  | "BUSINESS";

export type LoanStatus =
  | "PENDING"
  | "ACTIVE"
  | "PAID"
  | "DEFAULTED"
  | "REJECTED";

export interface AdminLoan {
  id: string;

  userId: string;

  accountId: string;

  loanNumber: string;

  type: LoanType;

  principal: number;

  interestRate: number;

  termMonths: number;

  monthlyPayment: number;

  remainingBalance: number;

  startDate?: Date;

  maturityDate?: Date;

  status: LoanStatus;

  createdAt: Date;

  updatedAt: Date;
}

export interface LoanSummary {
  totalLoans: number;

  activeLoans: number;

  pendingLoans: number;

  paidLoans: number;

  defaultedLoans: number;
}

export interface Pagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface GetLoansParams {
  page?: number;

  search?: string;

  type?: LoanType;

  status?: LoanStatus;

  sort?: string;
}

export interface GetLoansResponse {
  data: AdminLoan[];

  summary: LoanSummary;

  pagination: Pagination;
}