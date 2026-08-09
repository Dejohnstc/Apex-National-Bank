"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  updateProfileSchema,
  type UpdateProfileInput,
} from "@/lib/validation/profile/updateProfile";

import { updateProfileAction } from "@/actions/profile/updateProfile";

interface PersonalInformationCardProps {
  profile: UpdateProfileInput;
}

export default function PersonalInformationCard({
  profile,
}: PersonalInformationCardProps) {
  const [isPending, startTransition] =
    useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(
      updateProfileSchema
    ),
    defaultValues: profile,
  });

  function onSubmit(
    values: UpdateProfileInput
  ) {
    startTransition(async () => {
      const result =
        await updateProfileAction(values);

      if (!result.success) {
        toast.error(
          result.message ??
            "Unable to update profile."
        );
        return;
      }

      toast.success(
        "Profile updated successfully."
      );
    });
  }

  return (
   <Card className="border-slate-200 shadow-sm">

  <CardHeader className="border-b bg-slate-50/70">

    <CardTitle className="text-xl font-bold text-slate-900">
      Personal Information
    </CardTitle>

    <CardDescription>
      Keep your personal information up to date. Verified information helps
      protect your account and ensures uninterrupted banking services.
    </CardDescription>

  </CardHeader>

  <CardContent className="pt-6">

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >

      {/* Name */}

      <div className="grid gap-5 md:grid-cols-2">

        <div className="space-y-2">

          <Label htmlFor="firstName">
            First Name
          </Label>

          <Input
            id="firstName"
            className="h-11"
            {...register("firstName")}
          />

          {errors.firstName && (
            <p className="text-sm text-destructive">
              {errors.firstName.message}
            </p>
          )}

        </div>

        <div className="space-y-2">

          <Label htmlFor="lastName">
            Last Name
          </Label>

          <Input
            id="lastName"
            className="h-11"
            {...register("lastName")}
          />

          {errors.lastName && (
            <p className="text-sm text-destructive">
              {errors.lastName.message}
            </p>
          )}

        </div>

      </div>

      {/* Contact */}

      <div className="grid gap-5 md:grid-cols-2">

        <div className="space-y-2">

          <Label htmlFor="email">
            Email Address
          </Label>

          <Input
            id="email"
            disabled
            className="h-11 bg-slate-100 text-slate-500"
            {...register("email")}
          />

          <p className="text-xs text-slate-500">
            Verified email address cannot be changed.
          </p>

        </div>

        <div className="space-y-2">

          <Label htmlFor="phone">
            Phone Number
          </Label>

          <Input
            id="phone"
            className="h-11"
            {...register("phone")}
          />

          {errors.phone && (
            <p className="text-sm text-destructive">
              {errors.phone.message}
            </p>
          )}

        </div>

      </div>

      {/* Personal */}

      <div className="grid gap-5 md:grid-cols-2">

        <div className="space-y-2">

          <Label htmlFor="dateOfBirth">
            Date of Birth
          </Label>

          <Input
            id="dateOfBirth"
            type="date"
            className="h-11"
            {...register("dateOfBirth")}
          />

          {errors.dateOfBirth && (
            <p className="text-sm text-destructive">
              {errors.dateOfBirth.message}
            </p>
          )}

        </div>

        <div className="space-y-2">

          <Label htmlFor="occupation">
            Occupation
          </Label>

          <Input
            id="occupation"
            className="h-11"
            {...register("occupation")}
          />

          {errors.occupation && (
            <p className="text-sm text-destructive">
              {errors.occupation.message}
            </p>
          )}

        </div>

      </div>

      {/* Marital */}

      <div className="space-y-2">

        <Label htmlFor="maritalStatus">
          Marital Status
        </Label>

        <Input
          id="maritalStatus"
          className="h-11"
          {...register("maritalStatus")}
        />

        {errors.maritalStatus && (
          <p className="text-sm text-destructive">
            {errors.maritalStatus.message}
          </p>
        )}

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between rounded-xl border bg-slate-50 px-4 py-3">

        <p className="text-sm text-slate-500">
          Changes are securely saved to your Apex National Bank profile.
        </p>

        <Button
          type="submit"
          disabled={isPending}
          className="min-w-[150px]"
        >
          {isPending
            ? "Saving..."
            : "Save Changes"}
        </Button>

      </div>

    </form>

  </CardContent>

</Card>
  );
}