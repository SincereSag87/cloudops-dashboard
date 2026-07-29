import { useEffect, useMemo, useState } from "react";
import type { Notification } from "../types/Notification";

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Server offline",
    message: "gpu-node-03 is currently unavailable.",
    time: "2 minutes ago",
    type: "error",
    isRead: false,
  },
  {
    id: 2,
    title: "Deployment delayed",
    message: "DEP-2047 is taking longer than expected.",
    time: "15 minutes ago",
    type: "warning",
    isRead: false,
  },
  {
    id: 3,
    title: "Deployment completed",
    message: "customer-api v2.14.0 deployed successfully.",
    time: "1 hour ago",
    type: "success",
    isRead: false,
  },
];

const notificationEvents = [
  {
    title: "Health check passed",
    message: "All regional network checks completed successfully.",
    type: "success" as const,
  },
  {
    title: "High memory usage",
    message: "gpu-node-04 exceeded 85% memory utilization.",
    type: "warning" as const,
  },
  {
    title: "Deployment failed",
    message: "network-controller deployment failed in staging.",
    type: "error" as const,
  },
  {
    title: "Maintenance completed",
    message: "gpu-node-02 returned to service.",
    type: "success" as const,
  },
];

export function useNotifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      const event =
        notificationEvents[
          Math.floor(Math.random() * notificationEvents.length)
        ];

      setNotifications((currentNotifications) =>
        [
          {
            id: Date.now(),
            title: event.title,
            message: event.message,
            time: "Just now",
            type: event.type,
            isRead: false,
          },
          ...currentNotifications,
        ].slice(0, 10),
      );
    }, 20000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  function markAllAsRead() {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    );
  }

  function markAsRead(id: number) {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  }

  return {
    notifications,
    unreadCount,
    markAllAsRead,
    markAsRead,
  };
}