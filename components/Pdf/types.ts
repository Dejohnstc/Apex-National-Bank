export interface WireReceipt {
  bank: {
    name: string;
    receiptType: string;
    generatedAt: Date;
  };

  summary: {
    amount: number;
    fee: number;
    total: number;

    currency: string;

    reference: string;

    confirmationNumber?: string;

    transactionReference?: string;

    traceNumber?: string | null;

    // ✅ Changed from Date to string
    submittedAt?: string;

    // ✅ Changed from Date to string
    effectiveDate?: string;

    // ✅ Changed from Date to string
    completedAt?: string;

    type: string;

    purpose?: string;
  };

  sender: {
    name: string;

    bank: string;

    accountNumber: string;

    routingNumber?: string;

    swiftCode?: string;

    country?: string;
  };

  recipient: {
    name: string;

    bank: string;

    accountNumber: string;

    routingNumber?: string;

    swiftCode?: string;

    country?: string;
  };

  timeline: {
    title: string;
    completed: boolean;
    date?: string;
    description?: string;
  }[];

  compliance: {
    riskStatus: string;

    amlStatus: string;

    // ✅ Convert ObjectId to string
    reviewedBy?: string;

    // ✅ Changed from Date to string
    reviewDate?: string;
  };

  verification: {
    reference: string;

    confirmation?: string;

    verified: boolean;
  };

  customer: {
    firstName?: string;

    lastName?: string;

    email?: string;
  };

 raw: unknown;
}