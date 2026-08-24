import { connectDB } from "@/lib/db/mongodb";

import { User } from "@/models/user/User";

export async function getProfile(
  userId: string
) {
  await connectDB();

  const profile =
    await User.findById(userId)
      .select(
        [
          "firstName",
          "lastName",
          "email",
          "phone",
          "dateOfBirth",
          "occupation",
          "maritalStatus",
          "address",
          "city",
          "state",
          "postalCode",
          "country",
          "avatar",
          "createdAt",
        ].join(" ")
      )
      .lean();

  if (!profile) {
    return null;
  }

  return {
    id:
      profile._id.toString(),

    firstName:
      profile.firstName,

    lastName:
      profile.lastName,

    email:
      profile.email,

    phone:
      profile.phone,

    occupation:
      profile.occupation,

    maritalStatus:
      profile.maritalStatus,

    address:
      profile.address,

    city:
      profile.city,

    state:
      profile.state,

    postalCode:
      profile.postalCode,

    country:
      profile.country,

    avatar:
      profile.avatar ?? null,

    dateOfBirth:
      profile.dateOfBirth
        ? profile.dateOfBirth.toISOString()
        : null,

    createdAt:
      profile.createdAt
        ? profile.createdAt.toISOString()
        : null,
  };
}