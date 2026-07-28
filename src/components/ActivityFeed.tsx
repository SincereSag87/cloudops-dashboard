import {
    FaCheckCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaTimesCircle,
  } from "react-icons/fa";
  import { useActivityFeed } from "../hooks/useActivityFeed";
  import type { ActivityType } from "../types/Activity";
  
  const activityStyles: Record<
    ActivityType,
    {
      icon: React.ReactNode;
      iconClassName: string;
    }
  > = {
    success: {
      icon: <FaCheckCircle />,
      iconClassName: "text-emerald-500",
    },
    warning: {
      icon: <FaExclamationTriangle />,
      iconClassName: "text-amber-500",
    },
    error: {
      icon: <FaTimesCircle />,
      iconClassName: "text-red-500",
    },
    info: {
      icon: <FaInfoCircle />,
      iconClassName: "text-cyan-500",
    },
  };
  
  export default function ActivityFeed() {
    const activities = useActivityFeed();
  
    return (
      <section className="theme-surface theme-border rounded-xl border p-6">
        <div>
          <h2 className="theme-text-primary text-lg font-semibold">
            Latest Activity
          </h2>
  
          <p className="theme-text-muted mt-1 text-sm">
            Recent infrastructure and deployment events.
          </p>
        </div>
  
        <div className="mt-6 max-h-[420px] space-y-5 overflow-y-auto pr-2">
          {activities.map((activity) => {
            const style = activityStyles[activity.type];
  
            return (
              <article
                key={activity.id}
                className="theme-border flex gap-4 border-b pb-5 last:border-b-0 last:pb-0"
              >
                <span
                  className={`mt-1 text-lg ${style.iconClassName}`}
                  aria-hidden="true"
                >
                  {style.icon}
                </span>
  
                <div className="min-w-0">
                  <h3 className="theme-text-primary text-sm font-semibold">
                    {activity.title}
                  </h3>
  
                  <p className="theme-text-secondary mt-1 text-sm">
                    {activity.description}
                  </p>
  
                  <p className="theme-text-muted mt-2 text-xs">
                    {activity.time}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  }