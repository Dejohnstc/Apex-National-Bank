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
  changePasswordSchema,
  type ChangePasswordInput,
} from "@/lib/validation/security/changePassword";

import { changePasswordAction } from "@/actions/security/changePassword";

export default function PasswordCard() {
  const [isPending, startTransition] =
    useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(
      changePasswordSchema
    ),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(
    values: ChangePasswordInput
  ) {
    startTransition(async () => {
      const result =
        await changePasswordAction(values);

      if (!result.success) {
        toast.error(
          result.message ??
            "Unable to change password."
        );
        return;
      }

      toast.success(
        "Password updated successfully."
      );

      reset();
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Change Password
        </CardTitle>

        <CardDescription>
          Keep your account secure by
          using a strong password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="currentPassword">
              Current Password
            </Label>

            <Input
              id="currentPassword"
              type="password"
              {...register(
                "currentPassword"
              )}
            />

            {errors.currentPassword && (
              <p className="text-sm text-destructive">
                {
                  errors.currentPassword
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">
              New Password
            </Label>

            <Input
              id="newPassword"
              type="password"
              {...register(
                "newPassword"
              )}
            />

            {errors.newPassword && (
              <p className="text-sm text-destructive">
                {
                  errors.newPassword
                    .message
                }
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirm Password
            </Label>

            <Input
              id="confirmPassword"
              type="password"
              {...register(
                "confirmPassword"
              )}
            />

            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {
                  errors
                    .confirmPassword
                    .message
                }
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            {isPending
              ? "Updating..."
              : "Update Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}