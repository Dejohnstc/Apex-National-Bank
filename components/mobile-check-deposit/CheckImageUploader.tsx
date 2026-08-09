"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { uploadImageAction } from "@/actions/upload/uploadImageAction";

interface Props {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export default function CheckImageUploader({
  label,
  value,
  onChange,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [preview, setPreview] =
    useState(value);

  const [isPending, startTransition] =
    useTransition();

  async function handleFile(
    file: File
  ) {
    if (!file.type.startsWith("image/")) {
      toast.error(
        "Please choose an image."
      );
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();

formData.append(
  "file",
  file
);

formData.append(
  "folder",
  "mobile-checks"
);

const image =
  await uploadImageAction(
    formData
  );

        setPreview(image.secure_url);

        onChange(image.secure_url);

        toast.success(
          "Image uploaded."
        );
      } catch {
        toast.error(
          "Upload failed."
        );
      }
    });
  }

  return (
    <div className="space-y-3">
      <p className="font-medium">
        {label}
      </p>

      <div className="relative h-56 overflow-hidden rounded-lg border">
        {preview ? (
          <Image
            src={preview}
            alt={label}
            fill
            className="object-contain"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
            No Image
          </div>
        )}
      </div>

      <input
        hidden
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file =
            e.target.files?.[0];

          if (file) {
            handleFile(file);
          }
        }}
      />

      <Button
        type="button"
        disabled={isPending}
        onClick={() =>
          inputRef.current?.click()
        }
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Camera className="mr-2 h-4 w-4" />
            Upload
          </>
        )}
      </Button>
    </div>
  );
}