import { useEffect, useState } from "react";

export interface DashboardMetrics {
  totalServers: number;
  online: number;
  maintenance: number;
  offline: number;
}

const initialMetrics: DashboardMetrics = {
  totalServers: 248,
  online: 241,
  maintenance: 4,
  offline: 3,
};

export function useDashboardMetrics() {
  const [metrics, setMetrics] = useState(initialMetrics);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((current) => {
        const maintenance = Math.floor(Math.random() * 6);
        const offline = Math.floor(Math.random() * 4);
        const online =
          current.totalServers - maintenance - offline;

        return {
          totalServers: current.totalServers,
          online,
          maintenance,
          offline,
        };
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
}