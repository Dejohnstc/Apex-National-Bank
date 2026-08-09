import { Schema, model, models, InferSchemaType } from "mongoose";

const CustomerSchema = new Schema(
  {
    customerId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "SUSPENDED", "LOCKED"],
      default: "PENDING",
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    phoneVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export type CustomerDocument = InferSchemaType<typeof CustomerSchema>;

export const Customer =
  models.Customer || model("Customer", CustomerSchema);