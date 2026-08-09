import { Schema, model, models, Types } from "mongoose";

export interface IUserTransferLimits {
  user: Types.ObjectId;

  achMaxPerTransaction?: number;
  achDailyLimit?: number;
  achMonthlyLimit?: number;

  wireMaxPerTransaction?: number;
  wireDailyLimit?: number;
  wireMonthlyLimit?: number;

  zelleMaxPerTransaction?: number;
  zelleDailyLimit?: number;
  zelleMonthlyLimit?: number;

  createdAt: Date;
  updatedAt: Date;
}

const UserTransferLimitsSchema =
  new Schema<IUserTransferLimits>(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
        index: true,
      },

      achMaxPerTransaction: Number,
      achDailyLimit: Number,
      achMonthlyLimit: Number,

      wireMaxPerTransaction: Number,
      wireDailyLimit: Number,
      wireMonthlyLimit: Number,

      zelleMaxPerTransaction: Number,
      zelleDailyLimit: Number,
      zelleMonthlyLimit: Number,
    },
    {
      timestamps: true,
    }
  );

const UserTransferLimits =
  models.UserTransferLimits ||
  model<IUserTransferLimits>(
    "UserTransferLimits",
    UserTransferLimitsSchema
  );

export default UserTransferLimits;