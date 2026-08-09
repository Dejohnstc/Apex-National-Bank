import dbConnect from "@/lib/db/connect";

import { User } from "@/models/user/User";
import { Account } from "@/models/account/Account";
import ZelleTransfer from "@/models/zelle/ZelleTransfer";

import {
  CreateZelleTransferInput,
} from "@/types/zelle-transfer";

import { debitAccount } from "@/services/payments/debitAccount";
import { creditAccount } from "@/services/payments/creditAccount";
import { createTransaction } from "@/services/payments/createTransaction";
import { generateReference } from "@/services/payments/generateReference";

interface Result {
  success: boolean;
  message: string;
  reference?: string;
}

export async function createZelleTransfer(
  userId: string,
  input: CreateZelleTransferInput
): Promise<Result> {
  await dbConnect();

  const {
    accountId,
    recipientEmail,
    amount,
    memo,
  } = input;

  if (amount <= 0) {
    return {
      success: false,
      message: "Invalid transfer amount.",
    };
  }

  const sender = await User.findById(userId);

  if (!sender) {
    return {
      success: false,
      message: "Sender not found.",
    };
  }

  const senderAccount = await Account.findOne({
    _id: accountId,
    user: sender._id,
    status: "ACTIVE",
  });

  if (!senderAccount) {
    return {
      success: false,
      message: "Invalid sender account.",
    };
  }

  const recipient = await User.findOne({
    email: recipientEmail.trim().toLowerCase(),
  });

  if (!recipient) {
    return {
      success: false,
      message: "Recipient not found.",
    };
  }

  if (
    recipient._id.toString() ===
    sender._id.toString()
  ) {
    return {
      success: false,
      message:
        "You cannot send money to yourself.",
    };
  }

  const recipientAccount =
    await Account.findOne({
      user: recipient._id,
      status: "ACTIVE",
    });

  if (!recipientAccount) {
    return {
      success: false,
      message:
        "Recipient has no active account.",
    };
  }

  if (
    senderAccount.availableBalance <
    amount
  ) {
    return {
      success: false,
      message: "Insufficient funds.",
    };
  }

  const reference =
    generateReference("ZEL");

 const debit = await debitAccount(
  String(senderAccount._id),
  amount
);

const credit = await creditAccount(
  String(recipientAccount._id),
  amount
);

  await createTransaction({
  account: String(senderAccount._id),

  user: String(sender._id),

  reference,

  type: "TRANSFER",

  direction: "DEBIT",

  amount,

  fee: 0,

  balanceBefore: debit.balanceBefore,

  balanceAfter: debit.balanceAfter,

  merchant: "Zelle",

  description: `Sent to ${recipient.email}`,

  category: "TRANSFER",

  counterpartyAccount:
    recipientAccount.accountNumber,

  counterpartyName:
    `${recipient.firstName} ${recipient.lastName}`,

  memo,
});

  await createTransaction({
  account: String(recipientAccount._id),

  user: String(recipient._id),

  reference,

  type: "TRANSFER",

  direction: "CREDIT",

  amount,

  fee: 0,

  balanceBefore: credit.balanceBefore,

  balanceAfter: credit.balanceAfter,

  merchant: "Zelle",

  description: `Received from ${sender.email}`,

  category: "TRANSFER",

  counterpartyAccount:
    senderAccount.accountNumber,

  counterpartyName:
    `${sender.firstName} ${sender.lastName}`,

  memo,
});

 await ZelleTransfer.create({
  user: sender._id,

  account: senderAccount._id,

  recipient: recipient._id,

  recipientAccount: recipientAccount._id,

  recipientEmail: recipient.email.toLowerCase(),

  amount,

  memo,

  reference,

  status: "COMPLETED",
});

return {
  success: true,
  message: "Money sent successfully.",
  reference,
};
}