import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

import { getProfile } from "@/services/profile/getProfile";

import ProfileHeader from "@/components/profile/ProfileHeader";
import PersonalInformationCard from "@/components/profile/PersonalInformationCard";
import AddressCard from "@/components/profile/AddressCard";
import AvatarUploader from "@/components/profile/AvatarUploader";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const profile =
    await getProfile(session.user.id);

  if (!profile) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">

      {/* Profile Header */}
      <ProfileHeader
        profile={profile}
      />

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="space-y-6 xl:col-span-2">

          {/* Profile Picture */}
          <AvatarUploader
            profile={profile}
          />

          {/* Personal Information */}
          <PersonalInformationCard
            profile={profile}
          />

          {/* Address */}
          <AddressCard
            profile={profile}
          />

        </div>

      </div>

    </div>
  );
}