import { connectDB } from "@/lib/db/mongodb";
import { comparePassword } from "@/lib/auth/password";
import { User } from "@/models/user/User";
import { createSession } from "@/lib/auth/session";
import type { LoginFormValues } from "@/lib/validation/auth";

export async function loginUser(
  data: LoginFormValues
) {
  await connectDB();

  const user = await User.findOne({
    email: data.email.toLowerCase(),
  }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const passwordMatches =
    await comparePassword(
      data.password,
      user.password
    );

 if (!passwordMatches) {
  throw new Error("Invalid email or password.");
}

await createSession(user._id.toString());

return {
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
};
}