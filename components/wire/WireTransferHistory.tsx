import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WireTransferHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Recent Wire Transfers
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">
            No wire transfers yet.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}