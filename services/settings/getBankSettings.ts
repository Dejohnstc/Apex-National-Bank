import dbConnect from "@/lib/db/connect";

import BankSettings from "@/models/settings/BankSettings";

export async function getBankSettings() {
  await dbConnect();

  let settings =
    await BankSettings.findOne();

  if (!settings) {
    settings =
      await BankSettings.create({});
  }

  return settings;
}