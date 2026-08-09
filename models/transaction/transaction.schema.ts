import { Schema, Types } from "mongoose";

import {
  TRANSACTION_DIRECTION,
  TRANSACTION_STATUS,
  TRANSACTION_TYPES,
} from "./transaction.constants";

export const TransactionSchema = new Schema(
  {
    account: {
      type: Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },

    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    reference: {
  type: String,
  required: true,
  index: true,
},

    type: {
      type: String,
      enum: TRANSACTION_TYPES,
      required: true,
    },

    direction: {
      type: String,
      enum: TRANSACTION_DIRECTION,
      required: true,
    },

    status: {
      type: String,
      enum: TRANSACTION_STATUS,
      default: "COMPLETED",
    },

    amount: {
      type: Number,
      required: true,
    },

    balanceBefore: {
      type: Number,
      required: true,
    },

    balanceAfter: {
      type: Number,
      required: true,
    },

    merchant: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    postedAt: {
      type: Date,
      default: Date.now,
    },
   counterpartyAccount: {
  type: String,
  default: "",
},

counterpartyName: {
  type: String,
  default: "",
},

memo: {
  type: String,
  default: "",
},

currency: {
  type: String,
  enum: ["USD"],
  default: "USD",
},
fee: {
  type: Number,
  default: 0,
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
TransactionSchema.index({
  user: 1,
  postedAt: -1,
});

TransactionSchema.index({
  account: 1,
  postedAt: -1,
});

TransactionSchema.index({
  reference: 1,
});

TransactionSchema.index({
  user: 1,
  account: 1,
  postedAt: -1,
});
