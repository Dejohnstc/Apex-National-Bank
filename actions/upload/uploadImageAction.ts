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

  const file = formData.get("file");

  if (!(file instanceof File)) {
    throw new Error(
      "No image selected."
    );
  }

  if (!file.type.startsWith("image/")) {
    throw new Error(
      "Only image files are allowed."
    );
  }

  const maxSize =
    10 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error(
      "Image must be 10MB or smaller."
    );
  }

  /*
   * Do not accept the folder from the client.
   *
   * Mobile check images always go into the
   * dedicated Cloudinary folder.
   */
  return uploadImage(
    file,
    "mobile-checks"
  );
}