"use server";

import { revalidatePath } from "next/cache";

import {
  freezeCard,
  unfreezeCard,
  cancelCard,
  replaceCard,
} from "@/services/admin/cards";

export async function freezeCardAction(id: string) {
  await freezeCard(id);

  revalidatePath("/admin/cards");
  revalidatePath(`/admin/cards/${id}`);
}

export async function unfreezeCardAction(id: string) {
  await unfreezeCard(id);

  revalidatePath("/admin/cards");
  revalidatePath(`/admin/cards/${id}`);
}

export async function cancelCardAction(id: string) {
  await cancelCard(id);

  revalidatePath("/admin/cards");
  revalidatePath(`/admin/cards/${id}`);
}

export async function replaceCardAction(id: string) {
  await replaceCard(id);

  revalidatePath("/admin/cards");
  revalidatePath(`/admin/cards/${id}`);
}