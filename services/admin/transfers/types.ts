export type TransferType =
  | "ALL"
  | "ACH"
  | "WIRE"
  | "ZELLE"
  | "INTERNAL";

export type TransferStatus =
  | "PENDING"
  | "APPROVED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "RETURNED"
  | "REJECTED"
  | "CANCELLED";

export type TransferSortField =
  | "createdAt"
  | "updatedAt"
  | "amount"
  | "status";

export type SortOrder = "asc" | "desc";

export interface TransferQuery {
  page?: number;
  limit?: number;

  type: TransferType;

  status?: TransferStatus;

  search?: string;
  reference?: string;

  userId?: string;
  accountId?: string;

  minAmount?: number;
  maxAmount?: number;

  from?: Date;
  to?: Date;

  sortBy?: TransferSortField;
  sortOrder?: SortOrder;

  exportCsv?: boolean;
}

export interface UpdateTransferStatusInput {
  id: string;

  type: TransferType;

  status: TransferStatus;

  adminId?: string;

  note?: string;
}

export interface AddTransferNoteInput {
  id: string;

  type: TransferType;

  adminId: string;

  note: string;
}

export interface PaginationResult {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TransferSummary {
  totalTransfers: number;
  pendingTransfers: number;
  processingTransfers: number;
  completedTransfers: number;
  failedTransfers: number;
  cancelledTransfers: number;
  totalVolume: number;
}

export interface TransferResult<T = unknown> {
  success: boolean;

  data?: T;

  pagination?: PaginationResult;

  summary?: TransferSummary;

  message?: string;
}

export interface AdminTransfer {
  /**
   * Primary identifier used by the UI.
   */
  id: string;

  /**
   * Database identifier (kept for compatibility).
   */
  _id?: string;

  reference: string;

  customerName: string;

  recipientName: string;

  type: TransferType;

  /**
   * Different transfer models have different status enums,
   * so the admin UI consumes a normalized string.
   */
  status: string;

  amount: number;

  currency: string;

  createdAt: Date | string;

  updatedAt: Date | string;

  fee?: number;

  memo?: string;

  accountId?: string;

  userId?: string;
}