"use server";

import { processDueScheduledTransfers } from "@/services/transfer/processDueScheduledTransfer";

export async function processDueScheduledTransfersAction() {
  return processDueScheduledTransfers();
}