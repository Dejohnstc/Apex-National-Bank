"use client";

import Link from "next/link";
import { markAllNotificationsRead } from "@/actions/notification/markAllNotificationsRead";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Landmark,
  CreditCard,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { markNotificationRead } from "@/actions/notification/markNotificationRead";
interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  category: string;
  read: boolean;
  actionUrl: string;
  createdAt: string;
}

interface Props {
  loading: boolean;
  notifications: NotificationItem[];
  onClose: () => void;
  onRefresh?: () => void;
}

export default function NotificationDropdown({
  loading,
  notifications,
  onClose,
  onRefresh,
}: Props) {
    const router = useRouter();
    async function handleMarkAllRead() {
  await markAllNotificationsRead();

  onRefresh?.();

  onClose();
}
async function openNotification(
  notification: NotificationItem
) {
  await markNotificationRead(
    notification.id
  );

  onRefresh?.();

  onClose();

  if (notification.actionUrl) {
    router.push(notification.actionUrl);
  }
}
  return (
    <div className="absolute right-0 top-14 z-50 w-[430px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

      {/* Header */}

      <div className="border-b bg-white px-6 py-5">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Notifications
            </h2>

            <p className="text-sm text-slate-500">
              Recent account activity
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-sm font-medium text-emerald-600 hover:underline"
          >
            Close
          </button>

        </div>

      </div>

      {/* Body */}

      <div className="max-h-[420px] overflow-y-auto">

        {loading ? (

          <div className="flex h-60 items-center justify-center text-slate-500">

            Loading...

          </div>

        ) : notifications.length === 0 ? (

          <div className="flex h-60 flex-col items-center justify-center gap-4">

            <Bell className="h-10 w-10 text-slate-300" />

            <div className="text-center">

              <p className="font-semibold text-slate-700">
                No notifications
              </p>

              <p className="text-sm text-slate-500">
                You&apos;re all caught up.
              </p>

            </div>

          </div>

        ) : (

          notifications.map((notification) => {

            const Icon = getIcon(notification.category);

            return (

             <button
  key={notification.id}
  type="button"
  onClick={() =>
    openNotification(notification)
  }
  className={`flex w-full gap-4 border-b px-5 py-4 text-left transition hover:bg-slate-50 ${
    !notification.read
      ? "bg-emerald-50/50"
      : ""
  }`}
>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">

                  <Icon className="h-5 w-5 text-emerald-600" />

                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-start justify-between gap-2">

                    <h3 className="font-semibold text-slate-900">
                      {notification.title}
                    </h3>

                    {!notification.read && (
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    )}

                  </div>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {notification.message}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {formatTime(
                      notification.createdAt
                    )}
                  </p>

                </div>

              </button>

            );

          })

        )}

      </div>

      {/* Footer */}

      <div className="border-t bg-slate-50 px-6 py-4">

        <button
  onClick={handleMarkAllRead}
  className="w-full rounded-xl border border-slate-200 bg-white py-3 font-semibold transition hover:bg-slate-100"
>
  Mark all as read
</button>

      </div>

    </div>
  );
}

function getIcon(category: string) {
  switch (category) {
    case "WIRE":
      return Landmark;

    case "ACH":
      return Wallet;

    case "ZELLE":
      return CheckCircle2;

    case "CARD":
      return CreditCard;

    case "SECURITY":
      return Shield;

    default:
      return AlertTriangle;
  }
}

function formatTime(date: string) {
  const diff =
    Date.now() -
    new Date(date).getTime();

  const mins = Math.floor(
    diff / 60000
  );

  if (mins < 1) return "Just now";

  if (mins < 60)
    return `${mins} min ago`;

  const hrs = Math.floor(mins / 60);

  if (hrs < 24)
    return `${hrs} hr ago`;

  const days = Math.floor(hrs / 24);

  return `${days} day${
    days > 1 ? "s" : ""
  } ago`;
}