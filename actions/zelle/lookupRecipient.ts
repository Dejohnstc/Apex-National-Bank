"use server";

import { lookupRecipient } from "@/services/zelle/lookupRecipient";

export async function lookupRecipientAction(
  email: string
) {
  return lookupRecipient(email);
}