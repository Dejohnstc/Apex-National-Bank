import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type HydratedDocument,
} from "mongoose";

const checkDepositSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },

    frontImage: {
      type: String,
      required: true,
    },

    backImage: {
      type: String,
      required: true,
    },

    reference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    status: {
      type: String,
      enum: [
        "DRAFT",
        "SUBMITTED",
        "UNDER_REVIEW",
        "APPROVED",
        "FUNDS_AVAILABLE",
        "REJECTED",
      ],
      default: "SUBMITTED",
      index: true,
    },

    reviewNotes: {
      type: String,
      default: "",
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    approvedAt: Date,

    rejectedAt: Date,

    availableAt: Date,
  },
  {
    timestamps: true,
  }
);

checkDepositSchema.index({
  user: 1,
  createdAt: -1,
});

checkDepositSchema.index({
  account: 1,
  createdAt: -1,
});

checkDepositSchema.index({
  status: 1,
});

type CheckDeposit = InferSchemaType<
  typeof checkDepositSchema
>;

export type CheckDepositDocument =
  HydratedDocument<CheckDeposit>;

export default models.CheckDeposit ||
  model(
    "CheckDeposit",
    checkDepositSchema
  );