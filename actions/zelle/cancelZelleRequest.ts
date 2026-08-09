"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth/auth";
import dbConnect from "@/lib/db/connect";

import ZelleRequest from "@/models/ZelleRequest";

interface Input {
  requestId: string;
}

export async function cancelZelleRequestAction({
  requestId,
}: Input) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  await dbConnect();

  const request = await ZelleRequest.findById(
    requestId
  );

  if (!request) {
    return {
      success: false,
      message: "Request not found.",
    };
  }

  if (
    String(request.requester) !==
    String(session.user.id)
  ) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  if (request.status !== "pending") {
    return {
      success: false,
      message:
        "Only pending requests can be cancelled.",
    };
  }

  request.status = "cancelled";

  await request.save();

  revalidatePath("/dashboard/zelle");
  revalidatePath("/dashboard/zelle/sent");
  revalidatePath("/dashboard/zelle/requests");

  return {
    success: true,
    message: "Request cancelled successfully.",
  };
}