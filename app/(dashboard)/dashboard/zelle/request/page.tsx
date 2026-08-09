import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";
import AcceptRequestButton from "@/components/zelle/AcceptRequestButton";
import DeclineRequestButton from "@/components/zelle/DeclineRequestButton";
import { User } from "@/models/user/User";
import ZelleRequest from "@/models/ZelleRequest";

export default async function IncomingRequestsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await dbConnect();

  const user = await User.findById(session.user.id);

  if (!user) {
    redirect("/login");
  }

  const requests = await ZelleRequest.find({
    recipient: user._id,
    status: "pending",
  })
    .populate(
      "requester",
      "firstName lastName email"
    )
    .sort({
      createdAt: -1,
    })
    .lean();

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Incoming Requests
        </h1>

        <p className="text-muted-foreground">
          Review and respond to payment requests.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          <p className="text-muted-foreground">
            You don&apos;t have any pending requests.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => {
            const requester =
              request.requester as unknown as {
                firstName: string;
                lastName: string;
                email: string;
              };

            return (
              <div
                key={String(request._id)}
                className="rounded-xl border bg-white p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {requester.firstName}{" "}
                      {requester.lastName}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {requester.email}
                    </p>

                    <p className="mt-4 text-2xl font-bold">
                      $
                      {Number(
                        request.amount
                      ).toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}
                    </p>

                    {request.memo && (
                      <p className="mt-2">
                        {request.memo}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <AcceptRequestButton
  requestId={String(request._id)}
/>

<DeclineRequestButton
  requestId={String(request._id)}
/>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}