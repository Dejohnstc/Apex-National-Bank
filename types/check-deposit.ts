export interface CheckDeposit {
  _id: string;

  user: string;

  account: string;

  amount: number;

  frontImage: string;

  backImage: string;

  reference: string;

  status:
    | "DRAFT"
    | "SUBMITTED"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "FUNDS_AVAILABLE"
    | "REJECTED";

  reviewNotes: string;

  submittedAt: string;

  approvedAt: string | null;

  rejectedAt: string | null;

  availableAt: string | null;

  createdAt: string;

  updatedAt: string;
}