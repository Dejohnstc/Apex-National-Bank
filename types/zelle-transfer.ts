export type ZelleStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED";

export interface CreateZelleTransferInput {
  accountId: string;

  recipientEmail: string;

  amount: number;

  memo?: string;
}

export interface RecipientLookup {
  id: string;

  fullName: string;

  email: string;

  accountId: string;

  accountNumber: string;

  accountType: string;
}