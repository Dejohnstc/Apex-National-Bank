import { Schema, model, models, Types } from "mongoose";
import { Model } from "mongoose";
import type { Document } from "mongoose";
import type {
  AMLMetadata,
  RiskMetadata,
} from "@/types/compliance.types";

export interface IAchTransferHistory {
  status:
    | "PENDING"
    | "PROCESSING"
    | "COMPLETED"
    | "RETURNED"
    | "REJECTED"
    | "CANCELLED";

  changedBy?: Types.ObjectId;

  actorType: "CUSTOMER" | "ADMIN" | "SYSTEM";

  note?: string;

  createdAt: Date;
}

export interface IAchNotificationStatus {
  submitted: boolean;
  processing: boolean;
  completed: boolean;
  returned: boolean;
  rejected: boolean;
  cancelled: boolean;
}

export interface IAchFee {
  amount: number;
  charged: boolean;
}

export interface IAchTransfer extends Document {
  requester: Types.ObjectId;
  requesterAccount: Types.ObjectId;

  recipientName: string;
  transactionId?: Types.ObjectId;

transactionReference?: string;
  recipientBank: string;

  routingNumber: string;
  accountNumber: string;
  accountType: "CHECKING" | "SAVINGS";

  amount: number;
  memo?: string;

  reference: string;

  direction: "OUTGOING" | "INCOMING";

  status:
    | "PENDING"
    | "PROCESSING"
    | "COMPLETED"
    | "RETURNED"
    | "REJECTED"
    | "CANCELLED";

  effectiveDate: Date;
  postedDate?: Date;

  createdAt: Date;
  updatedAt: Date;
  processingStartedAt?: Date;
completedAt?: Date;
returnedAt?: Date;
rejectedAt?: Date;
cancelledAt?: Date;

processingBy?: Types.ObjectId;
completedBy?: Types.ObjectId;
returnedBy?: Types.ObjectId;
rejectedBy?: Types.ObjectId;
cancelledBy?: Types.ObjectId;

returnReason?: string;
rejectionReason?: string;
cancellationReason?: string;

adminNotes?: string;

recipientVerified: boolean;

history: IAchTransferHistory[];

notifications: IAchNotificationStatus;

fee: IAchFee;

risk: RiskMetadata;

aml: AMLMetadata;
}

const AchTransferSchema = new Schema<IAchTransfer>(
  {
    requester: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    requesterAccount: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },

    recipientName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    recipientBank: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    routingNumber: {
      type: String,
      required: true,
      trim: true,
      minlength: 9,
      maxlength: 9,
    },

    accountNumber: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 17,
      select: false,
    },

    accountType: {
      type: String,
      enum: ["CHECKING", "SAVINGS"],
      required: true,
      uppercase: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },

    memo: {
      type: String,
      trim: true,
      maxlength: 250,
    },

    reference: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
transactionId: {
  type: Types.ObjectId,
  ref: "Transaction",
},

transactionReference: {
  type: String,
  index: true,
},
    direction: {
      type: String,
      enum: ["OUTGOING", "INCOMING"],
      default: "OUTGOING",
      uppercase: true,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "PROCESSING",
        "COMPLETED",
        "RETURNED",
        "REJECTED",
        "CANCELLED",
      ],
      default: "PENDING",
      index: true,
      uppercase: true,
    },

    effectiveDate: {
      type: Date,
      default: Date.now,
    },

    postedDate: {
      type: Date,
    },
    processingStartedAt: Date,

completedAt: Date,

returnedAt: Date,

rejectedAt: Date,

cancelledAt: Date,

processingBy: {
  type: Schema.Types.ObjectId,
  ref: "User",
},

completedBy: {
  type: Schema.Types.ObjectId,
  ref: "User",
},

returnedBy: {
  type: Schema.Types.ObjectId,
  ref: "User",
},

rejectedBy: {
  type: Schema.Types.ObjectId,
  ref: "User",
},

cancelledBy: {
  type: Schema.Types.ObjectId,
  ref: "User",
},

returnReason: {
  type: String,
  trim: true,
  maxlength: 300,
},

rejectionReason: {
  type: String,
  trim: true,
  maxlength: 300,
},

cancellationReason: {
  type: String,
  trim: true,
  maxlength: 300,
},

adminNotes: {
  type: String,
  trim: true,
  maxlength: 2000,
},

recipientVerified: {
  type: Boolean,
  default: false,
},

history: [
  {
    status: {
      type: String,
      enum: [
        "PENDING",
        "PROCESSING",
        "COMPLETED",
        "RETURNED",
        "REJECTED",
        "CANCELLED",
      ],
      required: true,
    },

    changedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    actorType: {
      type: String,
      enum: ["CUSTOMER", "ADMIN", "SYSTEM"],
      required: true,
    },

    note: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
],

notifications: {
  submitted: {
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

  returned: {
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

fee: {
  amount: {
    type: Number,
    default: 0,
    min: 0,
  },

  charged: {
    type: Boolean,
    default: false,
  },
},

risk: {
  score: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },

  flagged: {
    type: Boolean,
    default: false,
  },

  reason: {
    type: String,
    trim: true,
    maxlength: 500,
  },

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
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  reviewedAt: Date,
},
aml: {
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

  matchedRule: {
    type: String,
    trim: true,
    maxlength: 500,
  },

  reviewedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  reviewedAt: Date,
},
},
  
  
  {
    timestamps: true,
    optimisticConcurrency: true,
  }
);

AchTransferSchema.index({
  requester: 1,
  createdAt: -1,
});

AchTransferSchema.index({
  requesterAccount: 1,
  createdAt: -1,
});

AchTransferSchema.index({
  status: 1,
  createdAt: -1,
});

AchTransferSchema.index({
  reference: 1,
});

const AchTransfer: Model<IAchTransfer> =
  (models.AchTransfer as Model<IAchTransfer>) ||
  model<IAchTransfer>(
    "AchTransfer",
    AchTransferSchema
  );

export default AchTransfer;