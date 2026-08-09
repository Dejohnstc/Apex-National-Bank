import { Schema, model, models } from "mongoose";

const TrustedDeviceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    deviceId: {
      type: String,
      required: true,
    },

    browser: {
      type: String,
      default: null,
    },

    device: {
      type: String,
      default: null,
    },

    ip: {
      type: String,
      default: null,
    },

    lastUsed: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

TrustedDeviceSchema.index(
  {
    user: 1,
    deviceId: 1,
  },
  {
    unique: true,
  }
);

export const TrustedDevice =
  models.TrustedDevice ||
  model("TrustedDevice", TrustedDeviceSchema);