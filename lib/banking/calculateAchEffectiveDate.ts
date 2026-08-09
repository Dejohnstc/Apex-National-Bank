import { isAfterAchCutoff } from "./isAfterAchCutoff";
import { isBusinessDay } from "./isBusinessDay";


export async function calculateAchEffectiveDate(
  submittedAt = new Date()
) {
 const effectiveDate = new Date(submittedAt);

  const afterCutoff =
    await isAfterAchCutoff(submittedAt);

  if (afterCutoff) {
    effectiveDate.setDate(
      effectiveDate.getDate() + 1
    );
  }

  while (
    !(await isBusinessDay(effectiveDate))
  ) {
    effectiveDate.setDate(
      effectiveDate.getDate() + 1
    );
  }

  effectiveDate.setHours(
    9,
    0,
    0,
    0
  );

  return effectiveDate;
}