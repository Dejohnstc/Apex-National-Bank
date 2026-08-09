import { Schema, model, models } from "mongoose";

export interface IBankSettings {
  achCutoffHour: number;
  achCutoffMinute: number;

  timezone: string;

  processingDays: number[];

  holidays: Date[];

  createdAt: Date;
  updatedAt: Date;
}

const BankSettingsSchema = new Schema<IBankSettings>(
  {
    achCutoffHour: {
      type: Number,
      default: 17,
      min: 0,
      max: 23,
    },

    achCutoffMinute: {
      type: Number,
      default: 0,
      min: 0,
      max: 59,
    },

    timezone: {
      type: String,
      default: "America/New_York",
    },

    processingDays: {
      type: [Number],
      default: [1, 2, 3, 4, 5], // Monday-Friday
    },

    holidays: {
      type: [Date],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const BankSettings =
  models.BankSettings ||
  model<IBankSettings>(
    "BankSettings",
    BankSettingsSchema
  );

export default BankSettings;