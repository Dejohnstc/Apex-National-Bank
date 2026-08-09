import AchTransfer from "@/models/ach/AchTransfer";
import { Transaction } from "@/models/transaction/Transaction";
import WireTransfer from "@/models/wire/WireTransfer";
import ZelleTransfer from "@/models/zelle/ZelleTransfer";

import type { TransferType } from "./types";

export function getTransferModel(
  type: TransferType
) {
  switch (type) {
    case "ACH":
      return AchTransfer;

    case "WIRE":
      return WireTransfer;

    case "ZELLE":
      return ZelleTransfer;

    case "INTERNAL":
      return Transaction;

    default:
      throw new Error(
        `Unsupported transfer type: ${type}`
      );
  }
}