import { connectDB } from "@/lib/db/mongodb";

import { User } from "@/models/user/User";

import { uploadImage } from "@/lib/uploadImage";

export async function updateAvatar(
  userId: string,
  file: File
) {
  await connectDB();

  const user = await User.findById(
    userId
  ).select("_id");

  if (!user) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  const avatar =
    await uploadImage(file);

  const updatedUser =
    await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          avatar: avatar.secure_url,
        },
      },
      {
        returnDocument: "after",
      }
    );

  if (!updatedUser) {
    return {
      success: false,
      message: "Unable to update avatar.",
    };
  }

  return {
    success: true,
    avatar: avatar.secure_url,
  };
}