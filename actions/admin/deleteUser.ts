"use server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db/connect";

import { User } from "@/models/user/User";

import { deleteUserCompletely } from "@/services/admin/deleteUserCompletely";

export async function deleteUserAction(
  userId: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  await dbConnect();

  /*
   * Verify the currently authenticated
   * user is an administrator.
   */
  const admin = await User.findById(
    session.user.id
  )
    .select("role")
    .lean();

  if (!admin) {
    return {
      success: false,
      message: "Administrator not found.",
    };
  }

  if (admin.role !== "ADMIN") {
    return {
      success: false,
      message:
        "You do not have permission to delete customers.",
    };
  }

  /*
   * Prevent an administrator from
   * accidentally deleting themselves.
   */
  if (userId === session.user.id) {
    return {
      success: false,
      message:
        "You cannot delete your own administrator account.",
    };
  }

  try {
    const result =
      await deleteUserCompletely({
        userId,
      });

    return result;
  } catch (error) {
    console.error(
      "Delete customer failed:",
      error
    );

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to delete customer.",
    };
  }
}