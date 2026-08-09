import { model, models } from "mongoose";

import { AccountSchema } from "./account.schema";

export const Account =
  models.Account ||
  model(
    "Account",
    AccountSchema
  );