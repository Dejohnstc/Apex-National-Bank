import { connectDB } from "@/lib/db/mongodb";

import { User } from "@/models/user/User";

/*
|--------------------------------------------------------------------------
| Replace this import with YOUR Cloudinary helper.
|--------------------------------------------------------------------------
|
| Example:
|
| import { uploadImage } from "@/lib/cloudinary";
|
*/
import { uploadImage } from "@/lib/uploadImage";

export async function updateAvatar(
  userId: string,
  file: File
) {
  await connectDB();

  const user =
    await User.findById(userId);

  if (!user) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  const avatar =
    await uploadImage(file);

  user.avatar = avatar.secure_url;

  await user.save();

  return {
    success: true,
    avatar: avatar.secure_url,
  };
}