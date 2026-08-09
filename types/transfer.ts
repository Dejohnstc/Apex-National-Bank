export interface InternalTransferInput {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description?: string;
}