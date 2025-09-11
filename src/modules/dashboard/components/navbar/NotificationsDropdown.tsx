import { Bell } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Notification {
  id: number;
  text: string;
  time: string;
}

const sampleNotifications: Notification[] = [
  { id: 1, text: "New order received (#1234)", time: "2m ago" },
  { id: 2, text: "Inventory low on Product X", time: "1h ago" },
  { id: 3, text: "Payment received from John Doe", time: "3h ago" },
];

export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications] = useState<Notification[]>(sampleNotifications);

  return (
    <div className="relative">
      {/* Bell button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded hover:bg-gray-100 relative"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] sm:text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg max-h-80 overflow-y-auto z-30">
          <div className="p-3 border-b font-semibold">Notifications</div>
          <ul className="divide-y">
            {notifications.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-500 text-center">
                No notifications
              </li>
            ) : (
              notifications.map((n) => (
                <li key={n.id} className="px-4 py-2 hover:bg-gray-50">
                  <p className="text-sm text-gray-800">{n.text}</p>
                  <span className="text-xs text-gray-500">{n.time}</span>
                </li>
              ))
            )}
          </ul>
          <Link to={"/notifications"}>
            <button
              onClick={() => setOpen(false)}
              className="block w-full text-center text-purple-600 py-2 hover:bg-gray-50"
            >
              View All
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
