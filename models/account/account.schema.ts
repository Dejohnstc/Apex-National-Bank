import { Schema, Types } from "mongoose";

import {
  ACCOUNT_TYPES,
  ACCOUNT_STATUS,
  ACCOUNT_CURRENCY,
} from "./account.constants";

export const AccountSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    accountNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    routingNumber: {
      type: String,
      required: true,
    },

    nickname: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ACCOUNT_TYPES,
      default: "CHECKING",
    },

    status: {
      type: String,
      enum: ACCOUNT_STATUS,
      default: "ACTIVE",
    },

    currency: {
      type: String,
      enum: ACCOUNT_CURRENCY,
      default: "USD",
    },

    availableBalance: {
      type: Number,
      default: 0,
    },

    currentBalance: {
      type: Number,
      default: 0,
    },

    interestRate: {
      type: Number,
      default: 0,
    },

    overdraftLimit: {
      type: Number,
      default: 0,
    },
lastActivityAt: {
  type: Date,
  default: Date.now,
},
    openedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);