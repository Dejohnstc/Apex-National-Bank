import type { Types } from "mongoose";

export type RiskReviewStatus =
  | "PENDING"
  | "UNDER_REVIEW"
  | "CLEARED"
  | "ESCALATED";

export type AmlStatus =
  | "CLEAR"
  | "PENDING"
  | "FLAGGED"
  | "REPORTED";

export interface RiskMetadata {
  score: number;
  flagged: boolean;
  reason?: string;

  reviewStatus: RiskReviewStatus;

  reviewedBy?: Types.ObjectId;

  reviewedAt?: Date;
}

export interface AMLMetadata {
  status: AmlStatus;

  matchedRule?: string;

  reviewedBy?: Types.ObjectId;

  reviewedAt?: Date;
}