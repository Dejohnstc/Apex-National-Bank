import { Schema, model, models } from "mongoose";

const ActiveSessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    sessionToken: {
      type: String,
      required: true,
      unique: true,
    },

    device: {
      type: String,
      default: null,
    },

    browser: {
      type: String,
      default: null,
    },

    os: {
      type: String,
      default: null,
    },

    ip: {
      type: String,
      default: null,
    },

    location: {
      type: String,
      default: null,
    },

    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const ActiveSession =
  models.ActiveSession ??
  model(
    "ActiveSession",
    ActiveSessionSchema
  );