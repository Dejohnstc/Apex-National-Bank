import Link from "next/link";

import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import { User } from "@/models/user/User";
import ZelleRequest from "@/models/ZelleRequest";

import CancelRequestButton from "@/components/zelle/CancelRequestButton";
type SentRequest = {
  _id: string;
  amount: number;
  status:
    | "pending"
    | "accepted"
    | "declined"
    | "cancelled"
    | "expired";
  reference: string;
  recipientEmail: string;
  createdAt: Date;
  recipient: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
};
export default async function SentRequestsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  await dbConnect();

  const user = await User.findById(session.user.id);

  if (!user) {
    return null;
  }

 const requests = (
  await ZelleRequest.find({
    requester: user._id,
  })
    .populate("recipient", "firstName lastName email")
    .sort({ createdAt: -1 })
    .lean()
) as SentRequest[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Sent Requests
        </h1>

        <p className="text-muted-foreground">
          Requests you have sent to other users.
        </p>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="text-left p-4">
                Recipient
              </th>

              <th className="text-left p-4">
                Amount
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Date
              </th>

              <th className="text-right p-4">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
           {requests.map((request) => (
              <tr
                key={String(request._id)}
                className="border-b"
              >
                <td className="p-4">
                  <div className="font-medium">
                    {request.recipient?.firstName}{" "}
                    {request.recipient?.lastName}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {request.recipientEmail}
                  </div>
                </td>

                <td className="p-4">
                  $
                  {Number(request.amount).toLocaleString()}
                </td>

                <td className="p-4 capitalize">
                  {request.status}
                </td>

                <td className="p-4">
                  {new Date(
                    request.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-4 text-right">
                 <div className="flex justify-end gap-3">
  <Link
    href={`/dashboard/zelle/request/${request.reference}`}
    className="text-blue-600 hover:underline"
  >
    View
  </Link>

  {request.status === "pending" && (
    <CancelRequestButton
      requestId={String(request._id)}
    />
  )}
</div>
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-10 text-center text-muted-foreground"
                >
                  No requests sent yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}