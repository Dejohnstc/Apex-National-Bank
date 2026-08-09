import { Schema, model, models } from "mongoose";

const LoginHistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    ip: {
      type: String,
      default: null,
    },

    browser: {
      type: String,
      default: null,
    },

    device: {
      type: String,
      default: null,
    },

    os: {
      type: String,
      default: null,
    },

    location: {
      type: String,
      default: null,
    },

    success: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const LoginHistory =
  models.LoginHistory ||
  model("LoginHistory", LoginHistorySchema);