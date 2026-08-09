import { getAchTransfers } from "@/services/ach/getAchTransfers";
import AchHistoryTable from "@/components/ach/AchHistoryTable";

export default async function AchHistoryPage() {
  const transfers = await getAchTransfers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          ACH Transfer History
        </h1>

        <p className="text-muted-foreground">
          View all of your ACH transfer activity.
        </p>
      </div>

      <AchHistoryTable transfers={transfers} />
    </div>
  );
}