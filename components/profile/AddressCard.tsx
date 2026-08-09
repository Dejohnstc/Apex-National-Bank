"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  updateAddressSchema,
  type UpdateAddressInput,
} from "@/lib/validation/profile/updateAddress";

import { updateAddressAction } from "@/actions/profile/updateAddress";

interface AddressCardProps {
  profile: UpdateAddressInput;
}

export default function AddressCard({
  profile,
}: AddressCardProps) {
  const [isPending, startTransition] =
    useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateAddressInput>({
    resolver: zodResolver(
      updateAddressSchema
    ),
    defaultValues: profile,
  });

  function onSubmit(
    values: UpdateAddressInput
  ) {
    startTransition(async () => {
      const result =
        await updateAddressAction(values);

      if (!result.success) {
        toast.error(
          result.message ??
            "Unable to update address."
        );

        return;
      }

      toast.success(
        "Address updated successfully."
      );
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Address Information
        </CardTitle>

        <CardDescription>
          Update your residential
          address.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="address">
              Street Address
            </Label>

            <Input
              id="address"
              {...register("address")}
            />

            {errors.address && (
              <p className="text-sm text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">
                City
              </Label>

              <Input
                id="city"
                {...register("city")}
              />

              {errors.city && (
                <p className="text-sm text-destructive">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">
                State
              </Label>

              <Input
                id="state"
                {...register("state")}
              />

              {errors.state && (
                <p className="text-sm text-destructive">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="postalCode">
                ZIP / Postal Code
              </Label>

              <Input
                id="postalCode"
                {...register("postalCode")}
              />

              {errors.postalCode && (
                <p className="text-sm text-destructive">
                  {errors.postalCode.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">
                Country
              </Label>

              <Input
                id="country"
                {...register("country")}
              />

              {errors.country && (
                <p className="text-sm text-destructive">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
          >
            {isPending
              ? "Saving..."
              : "Save Address"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}