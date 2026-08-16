"use client";

import {
  useRef,
  useState,
  useTransition,
} from "react";
import Image from "next/image";
import {
  Camera,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { updateAvatarAction } from "@/actions/profile/updateAvatar";

interface AvatarUploaderProps {
  profile: {
    avatar?: string | null;
  };
}

export default function AvatarUploader({
  profile,
}: AvatarUploaderProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [preview, setPreview] =
    useState<string>(
      profile.avatar ?? ""
    );

  const [isPending, startTransition] =
    useTransition();

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error(
        "Please select an image."
      );
      return;
    }

    const MAX_SIZE =
      5 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      toast.error(
        "Image must be smaller than 5 MB."
      );
      return;
    }

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    startTransition(async () => {
      try {
        const result =
          await updateAvatarAction(
            formData
          );

        if (!result.success) {
          toast.error(
            result.message ??
              "Upload failed."
          );
          return;
        }

        setPreview(
          result.avatar ?? ""
        );

        toast.success(
          "Profile photo updated."
        );

        // Allow selecting the same
        // image again later.
        if (inputRef.current) {
          inputRef.current.value =
            "";
        }
      } catch (error) {
        console.error(
          "Avatar upload failed:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to update profile photo."
        );
      }
    });
  }

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b bg-slate-50/70">
        <CardTitle className="text-xl font-bold text-slate-900">
          Profile Photo
        </CardTitle>

        <CardDescription>
          Personalize your banking profile
          with a recent photo.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center py-8">
        <div className="relative">
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-lg">
            {preview ? (
              <Image
                src={preview}
                alt="Profile Photo"
                fill
                sizes="160px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-slate-100">
                <Camera className="h-14 w-14 text-slate-400" />
              </div>
            )}
          </div>

          <button
            type="button"
            disabled={isPending}
            onClick={() =>
              inputRef.current?.click()
            }
            className="absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Camera className="h-5 w-5" />
            )}
          </button>
        </div>

        <h3 className="mt-5 text-lg font-semibold text-slate-900">
          Customer Profile
        </h3>

        <p className="mt-1 max-w-md text-center text-sm text-slate-500">
          Your profile photo is only visible
          within your secure Apex National Bank
          account.
        </p>

        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/jpeg,image/png,image/webp"
          disabled={isPending}
          onChange={(event) => {
            const file =
              event.target.files?.[0];

            if (!file) {
              return;
            }

            handleFile(file);
          }}
        />

        <div className="mt-6 flex gap-3">
          <Button
            type="button"
            disabled={isPending}
            onClick={() =>
              inputRef.current?.click()
            }
            className="min-w-[170px]"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Camera className="mr-2 h-4 w-4" />
                Change Photo
              </>
            )}
          </Button>
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-slate-400">
          Supported formats: JPG, PNG or WEBP.
          <br />
          Maximum upload size: 5 MB.
        </p>
      </CardContent>
    </Card>
  );
}