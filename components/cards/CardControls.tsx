"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function CardControls({
  card,
}: Props) {
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
    control:
      | "atmEnabled"
      | "onlineEnabled"
      | "contactlessEnabled"
      | "internationalEnabled",
    value: boolean
  ) {
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
        toast.error(
          "Unable to update control."
        );
        return;
      }

      toast.success("Updated");
      
      window.dispatchEvent(
  new Event("refresh-notifications")
);
    });
  }

  function updateLimit() {
    startTransition(async () => {
      const result =
        await updateCardLimitsAction(
          card.id,
          Number(limit)
        );

      if (!result.success) {
        toast.error(
          "Unable to update limit."
        );
        return;
      }

      toast.success(
        "Daily limit updated."
      );
    });
  }

  function freezeOrUnfreeze() {
    startTransition(async () => {
      const result =
        card.status === "ACTIVE"
          ? await freezeCardAction(card.id)
          : await unfreezeCardAction(
              card.id
            );

      if (!result.success) {
        toast.error(
          "Operation failed."
        );
        return;
      }

      toast.success(
        card.status === "ACTIVE"
          ? "Card frozen."
          : "Card activated."
      );
    });
  }

  function replaceCard() {
    startTransition(async () => {
      const result =
        await replaceCardAction(card.id);

      if (!result.success) {
        toast.error(
          "Unable to replace card."
        );
        return;
      }

      toast.success(
        "Replacement card ordered."
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

        <div className="space-y-2">
          <Label>
            Daily Spending Limit
          </Label>

          <Input
            type="number"
            value={limit}
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
            Update Limit
          </Button>
        </div>

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