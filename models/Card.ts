import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export type CardStatus =
  | "ACTIVE"
  | "FROZEN"
  | "BLOCKED"
  | "EXPIRED";

export type CardNetwork =
  | "VISA"
  | "MASTERCARD";

export type CardType =
  | "DEBIT"
  | "CREDIT";

export interface ICard extends Document {
  userId: mongoose.Types.ObjectId;

  accountId: mongoose.Types.ObjectId;

  holderName: string;

  cardNumber: string;

  last4: string;

  expiryMonth: number;

  expiryYear: number;

  cvv: string;

  network: CardNetwork;

  type: CardType;

  status: CardStatus;

  dailyLimit: number;

  atmEnabled: boolean;

  onlineEnabled: boolean;

  contactlessEnabled: boolean;

  internationalEnabled: boolean;

  virtual: boolean;

  color: string;

  createdAt: Date;

  updatedAt: Date;
}

const CardSchema = new Schema<ICard>(
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
    },

    holderName: {
      type: String,
      required: true,
      trim: true,
    },

    cardNumber: {
      type: String,
      required: true,
      unique: true,
    },

    last4: {
      type: String,
      required: true,
    },

    expiryMonth: {
      type: Number,
      required: true,
    },

    expiryYear: {
      type: Number,
      required: true,
    },

    cvv: {
      type: String,
      required: true,
    },

    network: {
      type: String,
      enum: [
        "VISA",
        "MASTERCARD",
      ],
      default: "VISA",
    },

    type: {
      type: String,
      enum: [
        "DEBIT",
        "CREDIT",
      ],
      default: "DEBIT",
    },

    status: {
      type: String,
      enum: [
        "ACTIVE",
        "FROZEN",
        "BLOCKED",
        "EXPIRED",
      ],
      default: "ACTIVE",
    },

    dailyLimit: {
      type: Number,
      default: 5000,
    },

    atmEnabled: {
      type: Boolean,
      default: true,
    },

    onlineEnabled: {
      type: Boolean,
      default: true,
    },

    contactlessEnabled: {
      type: Boolean,
      default: true,
    },

    internationalEnabled: {
      type: Boolean,
      default: true,
    },

    virtual: {
      type: Boolean,
      default: false,
    },

    color: {
      type: String,
      default: "#0f172a",
    },
  },
  {
    timestamps: true,
  }
);

const Card =
  (mongoose.models.Card as Model<ICard>) ||
  mongoose.model<ICard>(
    "Card",
    CardSchema
  );

export default Card;