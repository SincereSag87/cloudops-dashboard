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

const deploymentData = [
  { day: "Mon", successful: 12, failed: 1 },
  { day: "Tue", successful: 16, failed: 2 },
  { day: "Wed", successful: 14, failed: 1 },
  { day: "Thu", successful: 19, failed: 3 },
  { day: "Fri", successful: 22, failed: 2 },
  { day: "Sat", successful: 8, failed: 0 },
  { day: "Sun", successful: 6, failed: 1 },
];

export default function DeploymentChart() {
  const { resolvedTheme } = useTheme();

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
          Successful and failed deployments during the last seven days.
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={deploymentData}>
            <CartesianGrid
              stroke={gridColor}
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="day"
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
            />

            <Bar
              dataKey="failed"
              name="Failed"
              fill="#ef4444"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}