"use client";

import { useEffect, useState } from "react";

import { Bell } from "lucide-react";

import { getNotificationData } from "@/actions/notification/getNotifications";

import NotificationDropdown from "./NotificationDropdown";

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

export default function NotificationBell() {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [notifications, setNotifications] =
    useState<NotificationItem[]>([]);

  const [unreadCount, setUnreadCount] =
    useState(0);

  async function loadNotifications() {
    setLoading(true);

    try {
      const data =
        await getNotificationData();

      setNotifications(
        data.notifications
      );

      setUnreadCount(
        data.unreadCount
      );
    } catch (error) {
      console.error(
        "Failed to load notifications",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    function refreshNotifications() {
      void loadNotifications();
    }

    window.addEventListener(
      "refresh-notifications",
      refreshNotifications
    );

    return () => {
      window.removeEventListener(
        "refresh-notifications",
        refreshNotifications
      );
    };
  }, []);

  return (
    <div className="relative">

      <button
        type="button"
        onClick={async () => {
          if (!open) {
            await loadNotifications();
          }

          setOpen((prev) => !prev);
        }}
        className="relative rounded-xl border border-slate-200 bg-white p-2.5 transition hover:bg-slate-50 hover:shadow-md"
      >
        <Bell className="h-5 w-5" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
            {unreadCount > 99
              ? "99+"
              : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationDropdown
          loading={loading}
          notifications={notifications}
          onClose={() =>
            setOpen(false)
          }
          onRefresh={loadNotifications}
        />
      )}

    </div>
  );
}