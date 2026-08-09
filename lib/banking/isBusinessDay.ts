import { getBankSettings } from "@/services/settings/getBankSettings";

export async function isBusinessDay(
  date: Date
) {
  const settings =
    await getBankSettings();

  const day = date.getDay();

  if (
    !settings.processingDays.includes(day)
  ) {
    return false;
  }

  const midnight = new Date(date);

  midnight.setHours(0, 0, 0, 0);

  const holiday =
    settings.holidays.find((h: Date) => {
      const d = new Date(h);

      d.setHours(0, 0, 0, 0);

      return (
        d.getTime() ===
        midnight.getTime()
      );
    });

  return !holiday;
}