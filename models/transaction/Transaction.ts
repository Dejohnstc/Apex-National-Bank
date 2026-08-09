
import { TransactionSchema } from "./transaction.schema";
import { model, models, Model } from "mongoose";


import type { ITransaction } from "./transaction.types";

export const Transaction: Model<ITransaction> =
  (models.Transaction as Model<ITransaction>) ||
  model<ITransaction>("Transaction", TransactionSchema);

