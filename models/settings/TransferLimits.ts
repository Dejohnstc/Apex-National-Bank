import { Schema, model, models } from "mongoose";

export interface ITransferLimits {
  type: "ACH" | "WIRE" | "ZELLE";

  maxPerTransaction: number;

  dailyLimit: number;

  monthlyLimit: number;

  createdAt: Date;
  updatedAt: Date;
}

const TransferLimitsSchema =
  new Schema<ITransferLimits>(
    {
      type: {
        type: String,
        enum: ["ACH", "WIRE", "ZELLE"],
        unique: true,
        required: true,
      },

      maxPerTransaction: {
        type: Number,
        required: true,
      },

      dailyLimit: {
        type: Number,
        required: true,
      },

      monthlyLimit: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const TransferLimits =
  models.TransferLimits ||
  model<ITransferLimits>(
    "TransferLimits",
    TransferLimitsSchema
  );

export default TransferLimits;