"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import {
  Eye,
  Pencil,
  Ban,
  Trash2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import type { AdminUser } from "@/types/admin/user.types";

import { deleteUserAction } from "@/actions/admin/deleteUser";

interface Props {
  user: AdminUser;
}

export function UserRowActions({
  user,
}: Props) {
  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [
    pending,
    startTransition,
  ] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        const result =
          await deleteUserAction(user.id);

        if (!result.success) {
          toast.error(
            result.message ||
              "Unable to delete customer."
          );

          return;
        }

        toast.success(
          "Customer deleted successfully."
        );

        setDeleteOpen(false);

        /*
         * Refresh the current route so the
         * deleted customer disappears from
         * the table.
         */
        window.location.reload();
      } catch (error) {
        console.error(
          "Customer deletion failed:",
          error
        );

        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to delete customer."
        );
      }
    });
  }

  return (
    <>
      <div className="flex justify-end gap-2">

        {/* View */}
        <Link
          href={`/admin/users/${user.id}`}
          className="rounded-md border p-2 hover:bg-gray-100"
          title="View User"
        >
          <Eye className="h-4 w-4" />
        </Link>

        {/* Edit */}
        <button
          type="button"
          className="rounded-md border p-2 hover:bg-gray-100"
          title="Edit User"
        >
          <Pencil className="h-4 w-4" />
        </button>

        {/* Suspend */}
        <button
          type="button"
          className="rounded-md border p-2 hover:bg-gray-100"
          title="Suspend User"
        >
          <Ban className="h-4 w-4" />
        </button>

        {/* Delete */}
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            setDeleteOpen(true)
          }
          className="rounded-md border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          title="Delete User"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </button>

      </div>

      {/* Delete Confirmation */}
      {deleteOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

            <div className="border-b p-6">

              <div className="flex items-center gap-3">

                <div className="rounded-full bg-red-100 p-3 text-red-600">
                  <Trash2 className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Delete Customer
                  </h2>

                  <p className="text-sm text-slate-500">
                    This action cannot be undone.
                  </p>
                </div>

              </div>

            </div>

            <div className="space-y-4 p-6">

              <p className="text-sm leading-6 text-slate-600">
                You are about to permanently delete:
              </p>

              <div className="rounded-xl border bg-slate-50 p-4">

                <p className="font-semibold text-slate-900">
                  {user.fullName}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {user.email}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Customer ID: {user.customerId}
                </p>

              </div>

              <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                <p className="text-sm font-semibold text-red-800">
                  Permanent deletion
                </p>

                <p className="mt-1 text-sm leading-5 text-red-700">
                  The customer&apos;s associated records
                  covered by the deletion service will
                  also be removed.
                </p>

              </div>

            </div>

            <div className="flex justify-end gap-3 border-t bg-slate-50 p-5">

              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  setDeleteOpen(false)
                }
                className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={pending}
                onClick={handleDelete}
                className="inline-flex min-w-[150px] items-center justify-center rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Customer
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}