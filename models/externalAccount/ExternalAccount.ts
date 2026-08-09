import mongoose, {
  Schema,
  Types,
  InferSchemaType,
  HydratedDocument,
  Model,
} from "mongoose";

const ExternalAccountSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    nickname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    accountHolderName: {
      type: String,
      required: true,
      trim: true,
    },

    bankName: {
      type: String,
      required: true,
      trim: true,
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
      select: false,
    },

    accountType: {
      type: String,
      enum: ["CHECKING", "SAVINGS"],
      default: "CHECKING",
    },

    isDefault: {
      type: Boolean,
      default: false,
      index: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ExternalAccountSchema.index({
  user: 1,
  nickname: 1,
});

export type ExternalAccount = InferSchemaType<
  typeof ExternalAccountSchema
>;

export type ExternalAccountDocument =
  HydratedDocument<ExternalAccount>;

const ExternalAccountModel: Model<ExternalAccount> =
  mongoose.models.ExternalAccount ||
  mongoose.model(
    "ExternalAccount",
    ExternalAccountSchema
  );

export default ExternalAccountModel;