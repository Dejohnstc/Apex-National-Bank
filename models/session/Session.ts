import { model, models } from "mongoose";
import { SessionSchema } from "./session.schema";

export const Session =
  models.Session ||
  model("Session", SessionSchema);