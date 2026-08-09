import { Schema } from "mongoose";

export const SessionSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

SessionSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);