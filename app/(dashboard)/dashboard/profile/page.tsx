import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

import { getProfile } from "@/services/profile/getProfile";

import ProfileHeader from "@/components/profile/ProfileHeader";
import PersonalInformationCard from "@/components/profile/PersonalInformationCard";
import AddressCard from "@/components/profile/AddressCard";
import PreferencesCard from "@/components/profile/PreferenceCard";
import IdentityCard from "@/components/profile/IdentityCard";
import AvatarUploader from "@/components/profile/AvatarUploader";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const profile = await getProfile(session.user.id);

  if (!profile) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <ProfileHeader profile={profile} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <AvatarUploader profile={profile} />
          <PersonalInformationCard profile={profile} />
          
          <AddressCard profile={profile} />

          <PreferencesCard profile={profile} />
        </div>

        <div className="space-y-6">
          

          <IdentityCard profile={profile} />
        </div>
      </div>
    </div>
  );
}