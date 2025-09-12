import React, { useState } from "react";

interface Notification {
  id: number;
  text: string;
  time: string;
  read: boolean;
}

const sampleNotifications: Notification[] = [
  { id: 1, text: "New order received (#1234)", time: "2m ago", read: false },
  { id: 2, text: "Inventory low on Product X", time: "1h ago", read: true },
  {
    id: 3,
    text: "Payment received from John Doe",
    time: "3h ago",
    read: false,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(sampleNotifications);
  const [tab, setTab] = useState<"all" | "unread">("all");

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        read: true,
      }))
    );
  };

  const unreadNotifications = notifications.filter((n) => !n.read);
  const displayedNotifications =
    tab === "all" ? notifications : unreadNotifications;

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {/* Empty State */}
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <img
            src="/empty-notifications.png" // Replace with your image
            alt="No notifications"
            className="w-40 h-40 mb-4"
          />
          <p className="text-gray-500">You don’t have any notifications yet</p>
        </div>
      ) : (
        <>
          {/* Tabs + Button */}
          <div className="flex justify-between items-center mb-4">
            {/* Tabs */}
            <div className="flex space-x-2 border-b">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  tab === "all"
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
                onClick={() => setTab("all")}
              >
                All
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  tab === "unread"
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-gray-600 hover:text-purple-600"
                }`}
                onClick={() => setTab("unread")}
              >
                Unread
              </button>
            </div>

            {/* Mark all as read */}
            <button
              onClick={markAllAsRead}
              disabled={unreadNotifications.length === 0}
              className={`px-3 py-2 rounded-lg border text-base ${
                unreadNotifications.length === 0
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-white border-gray-300 bg-purple-600 hover:bg-purple-700"
              }`}
            >
              Mark all as read
            </button>
          </div>

          {/* Notification list */}
          <NotificationList notifications={displayedNotifications} />
        </>
      )}
    </div>
  );
}

/* --- Subcomponent for rendering list --- */
const NotificationList: React.FC<{ notifications: Notification[] }> = ({
  notifications,
}) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No{" "}
        {notifications.length === 0 ? "notifications" : "unread notifications"}.
      </div>
    );
  }

  return (
    <ul className="divide-y rounded-md border">
      {notifications.map((n) => (
        <li
          key={n.id}
          className={`p-4 ${
            n.read ? "bg-white" : "bg-purple-50"
          } hover:bg-gray-50`}
        >
          <p className="text-sm text-gray-800">{n.text}</p>
          <span className="text-xs text-gray-500">{n.time}</span>
        </li>
      ))}
    </ul>
  );
};
