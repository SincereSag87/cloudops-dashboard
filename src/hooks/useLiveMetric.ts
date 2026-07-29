import { useEffect, useState } from "react";

export type MetricPoint = {
  time: string;
  usage: number;
};

type UseLiveMetricOptions = {
  initialData: MetricPoint[];
  min: number;
  max: number;
  intervalMs?: number;
};

function formatCurrentTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

export function useLiveMetric({
  initialData,
  min,
  max,
  intervalMs = 5000,
}: UseLiveMetricOptions) {
  const [data, setData] = useState<MetricPoint[]>(initialData);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const usage =
        Math.floor(Math.random() * (max - min + 1)) + min;

      setData((currentData) => [
        ...currentData.slice(1),
        {
          time: formatCurrentTime(),
          usage,
        },
      ]);
    }, intervalMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [intervalMs, max, min]);

  return data;
}