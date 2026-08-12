import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type HydratedDocument,
} from "mongoose";

const scheduledTransferSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    fromAccount: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },

    toAccount: {
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

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 250,
    },

    reference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    scheduledDate: {
      type: Date,
      required: true,
      index: true,
    },

    isRecurring: {
      type: Boolean,
      default: false,
      index: true,
    },

    recurringFrequency: {
      type: String,
      enum: [
        "NONE",
        "WEEKLY",
        "BIWEEKLY",
        "MONTHLY",
        "QUARTERLY",
        "YEARLY",
      ],
      default: "NONE",
    },

    nextRunAt: {
      type: Date,
      default: null,
      index: true,
    },

    lastRunAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "SCHEDULED",
        "PROCESSING",
        "COMPLETED",
        "FAILED",
        "CANCELLED",
      ],
      default: "SCHEDULED",
      index: true,
    },

    failureReason: {
      type: String,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

scheduledTransferSchema.index({
  user: 1,
  scheduledDate: 1,
});

scheduledTransferSchema.index({
  status: 1,
  nextRunAt: 1,
});

type ScheduledTransfer = InferSchemaType<
  typeof scheduledTransferSchema
>;

export type ScheduledTransferDocument =
  HydratedDocument<ScheduledTransfer>;

export default models.ScheduledTransfer ||
  model(
    "ScheduledTransfer",
    scheduledTransferSchema
  );