import Link from "next/link";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  actionUrl: string;
  createdAt: string;
}

interface Props {
  notifications: NotificationItem[];
}

export default function NotificationsPreview({
  notifications,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b px-6 py-5">

        <div>

          <h2 className="text-lg font-bold text-slate-900">
            Notifications
          </h2>

          <p className="text-sm text-slate-500">
            Recent account updates
          </p>

        </div>

      </div>

      {notifications.length === 0 ? (

        <div className="flex flex-col items-center justify-center px-6 py-12">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">

            <svg
              className="h-7 w-7 text-emerald-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 22s8-4 8-10V7l-8-5-8 5v5c0 6 8 10 8 10z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

          </div>

          <h3 className="mt-4 text-lg font-semibold">

            You&apos;re All Caught Up

          </h3>

          <p className="mt-2 text-center text-sm text-slate-500">

            There are no new notifications for your accounts.

          </p>

        </div>

      ) : (

        <div>

          {notifications.map((notification) => (

            <Link
              key={notification.id}
              href={notification.actionUrl || "#"}
              className="block border-b px-6 py-5 transition hover:bg-slate-50 last:border-0"
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="font-semibold text-slate-900">

                    {notification.title}

                  </p>

                  <p className="mt-1 text-sm text-slate-500 line-clamp-2">

                    {notification.message}

                  </p>

                </div>

                <span
                  className={`mt-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    notification.type === "SUCCESS"
                      ? "bg-emerald-100 text-emerald-700"
                      : notification.type === "WARNING"
                      ? "bg-amber-100 text-amber-700"
                      : notification.type === "ERROR"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {notification.type}
                </span>

              </div>

            </Link>

          ))}

          <div className="border-t px-6 py-4">

            <Link
              href="/dashboard/notifications"
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              View All Notifications →
            </Link>

          </div>

        </div>

      )}

    </div>
  );
}