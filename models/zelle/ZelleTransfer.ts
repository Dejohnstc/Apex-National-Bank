import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export type ZelleStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED";

export interface IZelleTransfer
  extends Document {
  user: mongoose.Types.ObjectId;

  account: mongoose.Types.ObjectId;

  recipient: mongoose.Types.ObjectId;

  recipientAccount: mongoose.Types.ObjectId;

  recipientEmail: string;

  amount: number;

  memo?: string;

  reference: string;

  status: ZelleStatus;

  createdAt: Date;

  updatedAt: Date;
}

const ZelleTransferSchema =
  new Schema<IZelleTransfer>(
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
      },

      recipient: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      recipientAccount: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true,
      },

      recipientEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },

      amount: {
        type: Number,
        required: true,
        min: 1,
      },

      memo: {
        type: String,
        default: "",
        maxlength: 250,
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
          "PENDING",
          "COMPLETED",
          "FAILED",
          "CANCELLED",
        ],
        default: "COMPLETED",
      },
    },
    {
      timestamps: true,
    }
  );

ZelleTransferSchema.index({
  user: 1,
  createdAt: -1,
});

ZelleTransferSchema.index({
  recipient: 1,
  createdAt: -1,
});

const ZelleTransfer =
  (mongoose.models
    .ZelleTransfer as Model<IZelleTransfer>) ||
  mongoose.model<IZelleTransfer>(
    "ZelleTransfer",
    ZelleTransferSchema
  );

export default ZelleTransfer;