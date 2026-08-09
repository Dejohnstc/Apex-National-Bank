export interface BillPayment {
  _id: string;
  user: string;
  account: string;

  biller: string;
  category: string;
  accountNumber: string;

  amount: number;
  fee: number;

  memo: string;

  status:
    | "PENDING"
    | "PROCESSING"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED"
    | "SCHEDULED";

  paymentDate: string | null;
  scheduledDate: string | null;

  reference: string;
  confirmationNumber: string;

  isRecurring: boolean;

  recurringFrequency:
    | "NONE"
    | "WEEKLY"
    | "MONTHLY"
    | "QUARTERLY"
    | "YEARLY";

  createdAt: string;
  updatedAt: string;
}