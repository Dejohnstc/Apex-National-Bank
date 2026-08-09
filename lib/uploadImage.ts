import type { UploadApiResponse } from "cloudinary";
import cloudinary from "@/lib/cloudinary";

export async function uploadImage(
  file: File,
  folder = "apex-bank"
) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<UploadApiResponse>(
    (resolve, reject) => {
      const stream =
        cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            if (!result) {
              reject(
                new Error(
                  "Cloudinary upload failed."
                )
              );
              return;
            }

            resolve(result);
          }
        );

      stream.end(buffer);
    }
  );
}