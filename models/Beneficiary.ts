import { Schema, model, models, Types } from "mongoose";

export interface IBeneficiary {
  _id: Types.ObjectId;
  userId: Types.ObjectId;

  nickname: string;

  accountName: string;
  accountNumber: string;

  bankName: string;
  bankCode: string;

  isInternal: boolean;
  isFavorite: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const BeneficiarySchema = new Schema<IBeneficiary>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    nickname: {
      type: String,
      trim: true,
      default: "",
    },

    accountName: {
      type: String,
      required: true,
      trim: true,
    },

    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },

    bankName: {
      type: String,
      required: true,
      trim: true,
    },

    bankCode: {
      type: String,
      required: true,
      trim: true,
    },

    isInternal: {
      type: Boolean,
      default: false,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

BeneficiarySchema.index({
  userId: 1,
  accountNumber: 1,
  bankCode: 1,
});

export const Beneficiary =
  models.Beneficiary ||
  model<IBeneficiary>(
    "Beneficiary",
    BeneficiarySchema
  );