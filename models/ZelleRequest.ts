import { Schema, model, models } from "mongoose";

const ZelleRequestSchema = new Schema(
  {
    requester: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    requesterAccount: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    recipientAccount: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },

    recipientEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },

    memo: {
      type: String,
      default: "",
    },

    reference: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "declined",
        "expired",
        "cancelled",
      ],
      default: "pending",
    },

    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default models.ZelleRequest ||
  model("ZelleRequest", ZelleRequestSchema);