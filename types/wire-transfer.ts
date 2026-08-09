export interface WireTransferDto {
  id: string;

  userId: string;

  accountId: string;

  transactionId?: string;

  type: "DOMESTIC" | "INTERNATIONAL";

  status:
    | "PENDING"
    | "PROCESSING"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED";

  senderName: string;

  recipientName: string;

  bankName: string;

  accountNumber: string;

  routingNumber?: string;

  swiftCode?: string;

  country?: string;

  purpose?: string;

  amount: number;

  fee: number;

  reference: string;

  scheduledFor?: Date;

  completedAt?: Date;

  createdAt: Date;

  updatedAt: Date;
}