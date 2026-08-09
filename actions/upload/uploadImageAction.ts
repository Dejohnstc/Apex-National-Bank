"use server";

import { auth } from "@/lib/auth";

import { uploadImage } from "@/services/upload/uploadImage";

export async function uploadImageAction(
  formData: FormData
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const file =
    formData.get("file");

  if (!(file instanceof File)) {
    throw new Error(
      "No image selected."
    );
  }

  const folder =
    (formData.get("folder") as string) ??
    "apex-bank";

  return uploadImage(
    file,
    folder
  );
}