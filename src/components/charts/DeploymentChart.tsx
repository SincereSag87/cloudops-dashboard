import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

type DeploymentPoint = {
  time: string;
  successful: number;
  failed: number;
};

const deploymentData: DeploymentPoint[] = [
  { time: "8:00", successful: 12, failed: 1 },
  { time: "9:00", successful: 16, failed: 2 },
  { time: "10:00", successful: 14, failed: 1 },
  { time: "11:00", successful: 19, failed: 3 },
  { time: "12:00", successful: 22, failed: 2 },
  { time: "1:00", successful: 8, failed: 0 },
  { time: "2:00", successful: 6, failed: 1 },
];

function formatCurrentTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

export default function DeploymentChart() {
  const { resolvedTheme } = useTheme();
  const [liveDeploymentData, setLiveDeploymentData] =
    useState<DeploymentPoint[]>(deploymentData);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const successful = Math.floor(Math.random() * 18) + 5;
      const failed = Math.floor(Math.random() * 4);

      setLiveDeploymentData((currentData) => [
        ...currentData.slice(1),
        {
          time: formatCurrentTime(),
          successful,
          failed,
        },
      ]);
    }, 7000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const isDark = resolvedTheme === "dark";

  const gridColor = isDark ? "#1e293b" : "#e2e8f0";
  const axisColor = "#64748b";
  const tooltipBackground = isDark ? "#0f172a" : "#ffffff";
  const tooltipBorder = isDark ? "#334155" : "#cbd5e1";
  const tooltipText = isDark ? "#e2e8f0" : "#0f172a";

  return (
    <section className="theme-surface theme-border rounded-xl border p-6">
      <div className="mb-6">
        <h2 className="theme-text-primary text-lg font-semibold">
          Deployment Activity
        </h2>

        <p className="theme-text-muted mt-1 text-sm">
          Live successful and failed deployment activity.
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={liveDeploymentData}>
            <CartesianGrid
              stroke={gridColor}
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="time"
              stroke={axisColor}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke={axisColor}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBackground,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: "8px",
                color: tooltipText,
              }}
              labelStyle={{ color: tooltipText }}
            />

            <Legend
              wrapperStyle={{
                color: tooltipText,
                paddingTop: "12px",
              }}
            />

            <Bar
              dataKey="successful"
              name="Successful"
              fill="#22d3ee"
              radius={[6, 6, 0, 0]}
              isAnimationActive
              animationDuration={500}
            />

            <Bar
              dataKey="failed"
              name="Failed"
              fill="#ef4444"
              radius={[6, 6, 0, 0]}
              isAnimationActive
              animationDuration={500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}