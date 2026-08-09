import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type HydratedDocument,
} from "mongoose";

const billPaymentSchema = new Schema(
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

    biller: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Electric",
        "Water",
        "Internet",
        "Phone",
        "Insurance",
        "Mortgage",
        "Credit Card",
        "Streaming",
        "Healthcare",
        "Education",
        "Other",
      ],
    },

    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },

    fee: {
      type: Number,
      default: 0,
      min: 0,
    },

    memo: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "PROCESSING",
        "COMPLETED",
        "FAILED",
        "CANCELLED",
        "SCHEDULED",
      ],
      default: "PENDING",
      index: true,
    },

    paymentDate: Date,

    scheduledDate: Date,

    reference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    confirmationNumber: {
      type: String,
      default: "",
    },

    isRecurring: {
      type: Boolean,
      default: false,
    },

    recurringFrequency: {
      type: String,
      enum: [
        "NONE",
        "WEEKLY",
        "MONTHLY",
        "QUARTERLY",
        "YEARLY",
      ],
      default: "NONE",
    },
  },
  {
    timestamps: true,
  }
);

billPaymentSchema.index({
  user: 1,
  createdAt: -1,
});

billPaymentSchema.index({
  account: 1,
  createdAt: -1,
});

type BillPayment = InferSchemaType<
  typeof billPaymentSchema
>;

export type BillPaymentDocument =
  HydratedDocument<BillPayment>;

export default models.BillPayment ||
  model(
    "BillPayment",
    billPaymentSchema
  );