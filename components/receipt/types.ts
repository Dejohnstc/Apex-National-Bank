import { ReactNode } from "react";

export type ReceiptStatus =
  | "PENDING"
  | "APPROVED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "RETURNED"
  | "REJECTED"
  | "CANCELLED";

export interface ReceiptTimelineItem {
  title: string;
  completed: boolean;
  date?: string;
  description?: string;
}

export interface ReceiptParty {
  name: string;
  bank?: string;
  accountNumber: string;
  routingNumber?: string;
  swiftCode?: string;
  country?: string;
}

export interface ReceiptSummary {
  amount: number;
  fee: number;
  total: number;

  currency: string;

  reference: string;

  traceNumber?: string | null;

  confirmationNumber?: string;

  transactionReference?: string;

  submittedAt?: string;

  effectiveDate?: string;

  completedAt?: string;

  purpose?: string;

  type: string;
}

export interface ReceiptCompliance {
  riskStatus?: string;
  amlStatus?: string;
  reviewedBy?: string;
  reviewDate?: string;
}

export interface ReceiptProps {
  title: string;
  subtitle?: string;

  status: ReceiptStatus;

  summary: ReceiptSummary;

  sender: ReceiptParty;

  recipient: ReceiptParty;

  timeline: ReceiptTimelineItem[];

  compliance?: ReceiptCompliance;

  qrCode?: ReactNode;

  actions?: ReactNode;

  children?: ReactNode;
}