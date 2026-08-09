import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface Profile {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  avatar?: string | null;
  customerId?: string | null;
  accountType?: string | null;
  createdAt?: Date | string | null;
}

interface ProfileHeaderProps {
  profile: Profile;
}

export default function ProfileHeader({
  profile,
}: ProfileHeaderProps) {
  const initials = `${profile.firstName?.[0] ?? ""}${
    profile.lastName?.[0] ?? ""
  }`.toUpperCase();

  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm">

      <div className="h-2 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700" />

      <CardContent className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex items-center gap-6">

          <Avatar className="h-24 w-24 border-4 border-white shadow-lg">

            {profile.avatar ? (

              <Image
                src={profile.avatar}
                alt="Profile"
                fill
                className="object-cover"
              />

            ) : (

              <AvatarFallback className="bg-emerald-600 text-3xl font-bold text-white">

                {initials || "U"}

              </AvatarFallback>

            )}

          </Avatar>

          <div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">

              {profile.firstName} {profile.lastName}

            </h1>

            <p className="mt-1 text-slate-500">

              {profile.email}

            </p>

            <div className="mt-4 flex flex-wrap gap-2">

              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">

                ✓ Verified Customer

              </Badge>

              <Badge variant="secondary">

                Customer ID: {profile.customerId ?? "N/A"}

              </Badge>

              <Badge variant="outline">

                {profile.accountType ?? "Checking"}

              </Badge>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="rounded-2xl border bg-slate-50 px-6 py-5 text-center lg:min-w-[220px]">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">

            Member Since

          </p>

          <p className="mt-2 text-xl font-bold text-slate-900">

            {profile.createdAt
              ? new Date(
                  profile.createdAt
                ).toLocaleDateString()
              : "N/A"}

          </p>

          <div className="mt-4 border-t pt-4">

            <p className="text-sm font-medium text-slate-500">

              Relationship

            </p>

            <p className="mt-1 font-semibold text-emerald-700">

              Premium Banking

            </p>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}