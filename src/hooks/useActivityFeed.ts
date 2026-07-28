import { useEffect, useState } from "react";
import type { Activity } from "../types/Activity";

const initialActivities: Activity[] = [
  {
    id: 1,
    title: "Deployment completed",
    description: "customer-api v2.14.0 deployed to production.",
    time: "2 minutes ago",
    type: "success",
  },
  {
    id: 2,
    title: "Maintenance started",
    description: "gpu-node-02 entered scheduled maintenance.",
    time: "8 minutes ago",
    type: "warning",
  },
  {
    id: 3,
    title: "High CPU detected",
    description: "gpu-node-04 exceeded 90% CPU utilization.",
    time: "11 minutes ago",
    type: "error",
  },
];

const randomEvents = [
  {
    title: "Deployment completed",
    description: "web-api deployed successfully.",
    type: "success",
  },
  {
    title: "Server restarted",
    description: "api-server-03 restarted.",
    type: "info",
  },
  {
    title: "High Memory Usage",
    description: "db-server-02 exceeded 85% memory.",
    type: "warning",
  },
  {
    title: "CPU Critical",
    description: "gpu-node-01 exceeded 95% CPU.",
    type: "error",
  },
];

export function useActivityFeed() {
  const [activities, setActivities] =
    useState<Activity[]>(initialActivities);

  useEffect(() => {
    const interval = setInterval(() => {
      const random =
        randomEvents[Math.floor(Math.random() * randomEvents.length)];

      setActivities((current) => [
        {
          id: Date.now(),
          title: random.title,
          description: random.description,
          time: "Just now",
          type: random.type as Activity["type"],
        },
        ...current,
      ].slice(0, 8));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return activities;
}