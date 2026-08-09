import { model, models } from "mongoose";
import { UserSchema } from "./user.schema";

export const User =
  models.User || model("User", UserSchema);