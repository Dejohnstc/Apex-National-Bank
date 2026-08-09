import cloudinary from "@/lib/cloudinary";

export async function uploadImage(
  file: File,
  folder = "apex-bank"
) {
  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  return new Promise<{
    secure_url: string;
    public_id: string;
  }>((resolve, reject) => {
    const stream =
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) {
            reject(
              error ??
                new Error(
                  "Image upload failed."
                )
            );

            return;
          }

          resolve({
            secure_url:
              result.secure_url,
            public_id:
              result.public_id,
          });
        }
      );

    stream.end(buffer);
  });
}