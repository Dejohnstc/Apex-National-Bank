import {
  Schema,
  model,
  models,
  Types,
  Model,
} from "mongoose";
import type {
  AMLMetadata,
  RiskMetadata,
} from "@/types/compliance.types";
  import type { Document } from "mongoose";

export type WireTransferStatus =
  | "PENDING"
  | "APPROVED"
  | "PROCESSING"
  | "COMPLETED"
  | "REJECTED"
  | "FAILED"
  | "RETURNED"
  | "CANCELLED";

export type WireTransferType =
  | "DOMESTIC"
  | "INTERNATIONAL";



export interface IWireTransfer extends Document {
  userId: Types.ObjectId;
  accountId: Types.ObjectId;

  transactionId?: Types.ObjectId;

  transactionReference?: string;

  type: WireTransferType;

  status: WireTransferStatus;

  senderName: string;
  recipientName: string;

  bankName: string;

  accountNumber: string;

  routingNumber?: string;

  swiftCode?: string;

  country?: string;

  purpose?: string;

  amount: number;

  fee: number;

  reference: string;

  scheduledFor?: Date;
traceNumber?: string;
  effectiveDate?: Date;

  processingStartedAt?: Date;

 completedAt?: Date;

rejectedAt?: Date;

cancelledAt?: Date;
returnedAt?: Date;
  processingBy?: Types.ObjectId;

  completedBy?: Types.ObjectId;

  rejectedBy?: Types.ObjectId;

  cancelledBy?: Types.ObjectId;
returnedBy?: Types.ObjectId;
  rejectionReason?: string;
returnReason?: string;
  cancellationReason?: string;

  adminNotes?: string;

  history: unknown[];

  notifications: {
    submitted: boolean;
    approved: boolean;
    processing: boolean;
    completed: boolean;
    rejected: boolean;
    cancelled: boolean;
  };

  risk: RiskMetadata;

  aml: AMLMetadata;

  createdAt: Date;

  updatedAt: Date;
  
}

const WireTransferSchema =
  new Schema<IWireTransfer>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    accountId: {
      type: Types.ObjectId,
      ref: "Account",
      required: true,
    },

    transactionId: {
      type: Types.ObjectId,
      ref: "Transaction",
    },

    /**
     * Transaction reference for easier lookups.
     */
    transactionReference: {
      type: String,
      index: true,
    },

    type: {
      type: String,
      enum: ["DOMESTIC", "INTERNATIONAL"],
      required: true,
    },

    status: {
  type: String,
  enum: [
    "PENDING",
    "APPROVED",
    "PROCESSING",
    "COMPLETED",
    "REJECTED",
    "FAILED",
    "RETURNED",
    "CANCELLED",
  ],
  default: "PENDING",
},

    senderName: {
      type: String,
      required: true,
    },

    recipientName: {
      type: String,
      required: true,
    },
traceNumber: {
  type: String,
  unique: true,
  sparse: true,
  index: true,
},
    bankName: {
      type: String,
      required: true,
    },

    accountNumber: {
      type: String,
      required: true,
    },

    routingNumber: String,

    swiftCode: String,

    country: String,

    purpose: String,

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    fee: {
      type: Number,
      default: 0,
    },

    reference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    scheduledFor: Date,

    effectiveDate: Date,

    processingStartedAt: Date,

    completedAt: Date,

    rejectedAt: Date,
returnedAt: Date,
    cancelledAt: Date,

    processingBy: {
      type: Types.ObjectId,
      ref: "User",
    },

    completedBy: {
      type: Types.ObjectId,
      ref: "User",
    },

    rejectedBy: {
      type: Types.ObjectId,
      ref: "User",
    },

    cancelledBy: {
      type: Types.ObjectId,
      ref: "User",
    },
returnedBy: {
  type: Types.ObjectId,
  ref: "User",
},
    rejectionReason: String,

    cancellationReason: String,
returnReason: String,
    adminNotes: String,
    

    history: {
      type: [
        {
          status: {
            type: String,
          },

          changedBy: {
            type: Types.ObjectId,
            ref: "User",
          },

          actorType: {
            type: String,
            enum: [
              "CUSTOMER",
              "ADMIN",
              "SYSTEM",
            ],
          },

          note: String,

          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },

    notifications: {
      type: {
        submitted: {
          type: Boolean,
          default: false,
        },

        approved: {
          type: Boolean,
          default: false,
        },

        processing: {
          type: Boolean,
          default: false,
        },

        completed: {
          type: Boolean,
          default: false,
        },

        rejected: {
          type: Boolean,
          default: false,
        },

        cancelled: {
          type: Boolean,
          default: false,
        },
      },
      default: {},
    },

   risk: {
  type: {
    score: {
      type: Number,
      default: 0,
    },

    flagged: {
      type: Boolean,
      default: false,
    },

    reason: String,

    reviewStatus: {
      type: String,
      enum: [
        "PENDING",
        "UNDER_REVIEW",
        "CLEARED",
        "ESCALATED",
      ],
      default: "CLEARED",
    },

    reviewedBy: {
      type: Types.ObjectId,
      ref: "User",
    },

    reviewedAt: Date,
  },
  default: {},
},

aml: {
  type: {
    status: {
      type: String,
      enum: [
        "CLEAR",
        "PENDING",
        "FLAGGED",
        "REPORTED",
      ],
      default: "CLEAR",
    },

    matchedRule: String,

    reviewedBy: {
      type: Types.ObjectId,
      ref: "User",
    },

    reviewedAt: Date,
  },
  default: {},
},
  },
  {
    timestamps: true,
  }
);
const WireTransfer =
  (models.WireTransfer as Model<IWireTransfer>) ||
  model<IWireTransfer>(
    "WireTransfer",
    WireTransferSchema
  );

export default WireTransfer;