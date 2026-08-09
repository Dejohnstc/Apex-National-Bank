export type TransferType =
  | "INTERNAL"
  | "ACH"
  | "WIRE"
  | "ZELLE";

export type TransferStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "REJECTED"
  | "CANCELLED";

export interface AdminTransfer {
  id: string;

  reference: string;

  userId: string;

  customerName: string;

  fromAccountId: string;

  fromAccountNumber: string;

  toAccountNumber: string;

  recipientName: string;

  type: TransferType;

  status: TransferStatus;

  amount: number;

  fee: number;

  currency: string;

  memo?: string;

  createdAt: string;

  processedAt?: string;
}

export interface TransferSummary {
  totalTransfers: number;

  totalVolume: number;

  pendingTransfers: number;

  completedTransfers: number;
}

export interface TransferPagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface GetTransfersParams {
  page?: number;

  limit?: number;

  search?: string;

  status?: TransferStatus;

  type?: TransferType;

  sort?:
    | "newest"
    | "oldest"
    | "highest"
    | "lowest";
}

export interface GetTransfersResponse {
  data: AdminTransfer[];

  summary: TransferSummary;

  pagination: TransferPagination;
}