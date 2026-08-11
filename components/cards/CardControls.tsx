"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import type { CardDto } from "@/types/card";

import { freezeCardAction } from "@/actions/card/freezeCard";
import { unfreezeCardAction } from "@/actions/card/unfreezeCard";
import { toggleCardControlAction } from "@/actions/card/toggleCardControl";
import { updateCardLimitsAction } from "@/actions/card/updateCardLimits";
import { replaceCardAction } from "@/actions/card/replaceCard";

interface Props {
  card: CardDto;
}

type CardControl =
  | "atmEnabled"
  | "onlineEnabled"
  | "contactlessEnabled"
  | "internationalEnabled";

export default function CardControls({
  card,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const [limit, setLimit] = useState(
    card.dailyLimit.toString()
  );

  const [controls, setControls] =
    useState({
      atmEnabled: card.atmEnabled,
      onlineEnabled: card.onlineEnabled,
      contactlessEnabled:
        card.contactlessEnabled,
      internationalEnabled:
        card.internationalEnabled,
    });

  function updateControl(
    control: CardControl,
    value: boolean
  ) {
    const previousValue = controls[control];

    setControls((previous) => ({
      ...previous,
      [control]: value,
    }));

    startTransition(async () => {
      const result =
        await toggleCardControlAction(
          card.id,
          control,
          value
        );

      if (!result.success) {
        // Roll back the switch if the server update fails.
        setControls((previous) => ({
          ...previous,
          [control]: previousValue,
        }));

        toast.error(
          result.message ??
            "Unable to update control."
        );

        return;
      }

      toast.success(
        value
          ? "Control enabled."
          : "Control disabled."
      );

      router.refresh();

      window.dispatchEvent(
        new Event("refresh-notifications")
      );
    });
  }

  function updateLimit() {
    const numericLimit = Number(limit);

    if (
      !Number.isFinite(numericLimit) ||
      numericLimit <= 0
    ) {
      toast.error(
        "Enter a valid daily spending limit."
      );
      return;
    }

    startTransition(async () => {
      const result =
        await updateCardLimitsAction(
          card.id,
          numericLimit
        );

      if (!result.success) {
        toast.error(
          result.message ??
            "Unable to update limit."
        );
        return;
      }

      toast.success(
        "Daily limit updated."
      );

      router.refresh();

      window.dispatchEvent(
        new Event("refresh-notifications")
      );
    });
  }

  function freezeOrUnfreeze() {
    startTransition(async () => {
      const result =
        card.status === "ACTIVE"
          ? await freezeCardAction(
              card.id
            )
          : await unfreezeCardAction(
              card.id
            );

      if (!result.success) {
        toast.error(
          result.message ??
            "Operation failed."
        );
        return;
      }

      toast.success(
        card.status === "ACTIVE"
          ? "Card frozen."
          : "Card activated."
      );

      router.refresh();

      window.dispatchEvent(
        new Event("refresh-notifications")
      );
    });
  }

  function replaceCard() {
    const confirmed =
      window.confirm(
        "Are you sure you want to replace this card? Your current card details will no longer be valid."
      );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const result =
        await replaceCardAction(
          card.id
        );

      if (!result.success) {
        toast.error(
          result.message ??
            "Unable to replace card."
        );
        return;
      }

      toast.success(
        "Replacement card ordered."
      );

      router.refresh();

      window.dispatchEvent(
        new Event("refresh-notifications")
      );
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Card Controls
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ATM Withdrawals */}
        <div className="flex items-center justify-between">
          <Label>
            ATM Withdrawals
          </Label>

          <Switch
            checked={
              controls.atmEnabled
            }
            disabled={isPending}
            onCheckedChange={(value) =>
              updateControl(
                "atmEnabled",
                value
              )
            }
          />
        </div>

        {/* Online Purchases */}
        <div className="flex items-center justify-between">
          <Label>
            Online Purchases
          </Label>

          <Switch
            checked={
              controls.onlineEnabled
            }
            disabled={isPending}
            onCheckedChange={(value) =>
              updateControl(
                "onlineEnabled",
                value
              )
            }
          />
        </div>

        {/* Contactless */}
        <div className="flex items-center justify-between">
          <Label>
            Contactless
          </Label>

          <Switch
            checked={
              controls.contactlessEnabled
            }
            disabled={isPending}
            onCheckedChange={(value) =>
              updateControl(
                "contactlessEnabled",
                value
              )
            }
          />
        </div>

        {/* International */}
        <div className="flex items-center justify-between">
          <Label>
            International
          </Label>

          <Switch
            checked={
              controls.internationalEnabled
            }
            disabled={isPending}
            onCheckedChange={(value) =>
              updateControl(
                "internationalEnabled",
                value
              )
            }
          />
        </div>

        {/* Daily Spending Limit */}
        <div className="space-y-2">
          <Label>
            Daily Spending Limit
          </Label>

          <Input
            type="number"
            min="1"
            step="0.01"
            value={limit}
            disabled={isPending}
            onChange={(event) =>
              setLimit(
                event.target.value
              )
            }
          />

          <Button
            disabled={isPending}
            onClick={updateLimit}
            className="w-full"
          >
            {isPending
              ? "Updating..."
              : "Update Limit"}
          </Button>
        </div>

        {/* Freeze / Unfreeze */}
        <Button
          variant="secondary"
          disabled={isPending}
          onClick={freezeOrUnfreeze}
          className="w-full"
        >
          {card.status === "ACTIVE"
            ? "Freeze Card"
            : "Unfreeze Card"}
        </Button>

        {/* Replace Card */}
        <Button
          variant="destructive"
          disabled={isPending}
          onClick={replaceCard}
          className="w-full"
        >
          Replace Card
        </Button>
      </CardContent>
    </Card>
  );
}