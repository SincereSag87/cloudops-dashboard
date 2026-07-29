import { useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNotifications } from "../hooks/useNotifications";

const typeStyles = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
};

export default function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    markAllAsRead,
    markAsRead,
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={panelRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Open notifications"
        className="theme-surface theme-border theme-text-secondary relative flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm transition hover:border-cyan-500 hover:text-cyan-500"
      >
        <FaBell />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="theme-surface theme-border absolute right-0 z-50 mt-3 w-96 overflow-hidden rounded-xl border shadow-2xl">
          <div className="theme-border flex items-center justify-between border-b px-5 py-4">
            <div>
              <h2 className="theme-text-primary font-semibold">
                Notifications
              </h2>

              <p className="theme-text-muted text-xs">
                {unreadCount} unread
              </p>
            </div>

            <button
              type="button"
              onClick={markAllAsRead}
              className="text-sm font-medium text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
            >
              Mark all as read
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <article
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`theme-border cursor-pointer border-b px-5 py-4 transition last:border-b-0 hover:bg-slate-100 dark:hover:bg-slate-800/70 ${
                  notification.isRead ? "opacity-60" : ""
                }`}
              >
                <div className="flex gap-3">
                  <span
                    className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                      typeStyles[notification.type]
                    }`}
                  />

                  <div>
                    <h3 className="theme-text-primary text-sm font-semibold">
                      {notification.title}
                    </h3>

                    <p className="theme-text-secondary mt-1 text-sm">
                      {notification.message}
                    </p>

                    <p className="theme-text-muted mt-2 text-xs">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}