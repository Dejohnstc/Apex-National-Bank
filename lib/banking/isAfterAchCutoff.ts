import { getBankSettings } from "@/services/settings/getBankSettings";

export async function isAfterAchCutoff(
  now = new Date()
) {
  const settings =
    await getBankSettings();

  const cutoff = new Date(now);

  cutoff.setHours(
    settings.achCutoffHour,
    settings.achCutoffMinute,
    0,
    0
  );

  return now > cutoff;
}