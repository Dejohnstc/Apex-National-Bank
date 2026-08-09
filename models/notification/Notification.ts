import { Schema, model, models, Types } from "mongoose";

const NotificationSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "SUCCESS",
        "INFO",
        "WARNING",
        "ERROR",
      ],
      default: "INFO",
    },

    category: {
      type: String,
      enum: [
        "WIRE",
        "ACH",
        "ZELLE",
        "ACCOUNT",
        "CARD",
        "LOAN",
        "SECURITY",
        "BILLPAY",
        "SYSTEM",
      ],
      default: "SYSTEM",
    },

    actionUrl: {
      type: String,
      default: "",
    },

    read: {
      type: Boolean,
      default: false,
    },

    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

NotificationSchema.index({
  user: 1,
  read: 1,
  createdAt: -1,
});

export default models.Notification ||
  model("Notification", NotificationSchema);