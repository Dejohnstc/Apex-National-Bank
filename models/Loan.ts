import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export type LoanType =
  | "PERSONAL"
  | "AUTO"
  | "MORTGAGE"
  | "BUSINESS";

export type LoanStatus =
  | "PENDING"
  | "ACTIVE"
  | "PAID"
  | "DEFAULTED"
  | "REJECTED";

export interface ILoan extends Document {
  userId: mongoose.Types.ObjectId;

  accountId: mongoose.Types.ObjectId;

  loanNumber: string;

  type: LoanType;

  principal: number;

  interestRate: number;

  termMonths: number;

  monthlyPayment: number;

  remainingBalance: number;

  startDate?: Date;

  maturityDate?: Date;

  status: LoanStatus;

  createdAt: Date;

  updatedAt: Date;
}

const LoanSchema = new Schema<ILoan>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },

    loanNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "PERSONAL",
        "AUTO",
        "MORTGAGE",
        "BUSINESS",
      ],
      default: "PERSONAL",
    },

    principal: {
      type: Number,
      required: true,
      min: 0,
    },

    interestRate: {
      type: Number,
      required: true,
      min: 0,
    },

    termMonths: {
      type: Number,
      required: true,
      min: 1,
    },

    monthlyPayment: {
      type: Number,
      required: true,
      min: 0,
    },

    remainingBalance: {
      type: Number,
      required: true,
      min: 0,
    },

    startDate: Date,

    maturityDate: Date,

    status: {
      type: String,
      enum: [
        "PENDING",
        "ACTIVE",
        "PAID",
        "DEFAULTED",
        "REJECTED",
      ],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

const Loan =
  (mongoose.models.Loan as Model<ILoan>) ||
  mongoose.model<ILoan>(
    "Loan",
    LoanSchema
  );

export default Loan;