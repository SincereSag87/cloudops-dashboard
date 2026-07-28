import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
  import { useTheme } from "../../context/ThemeContext";
  
  const cpuData = [
    { time: "8 AM", usage: 38 },
    { time: "9 AM", usage: 45 },
    { time: "10 AM", usage: 52 },
    { time: "11 AM", usage: 48 },
    { time: "12 PM", usage: 61 },
    { time: "1 PM", usage: 67 },
    { time: "2 PM", usage: 59 },
    { time: "3 PM", usage: 72 },
  ];
  
  export default function CPUChart() {
    const { resolvedTheme } = useTheme();
  
    const isDark = resolvedTheme === "dark";
  
    const gridColor = isDark ? "#1e293b" : "#e2e8f0";
    const axisColor = isDark ? "#64748b" : "#64748b";
    const tooltipBackground = isDark ? "#0f172a" : "#ffffff";
    const tooltipBorder = isDark ? "#334155" : "#cbd5e1";
    const tooltipText = isDark ? "#e2e8f0" : "#0f172a";
  
    return (
      <section className="theme-surface theme-border rounded-xl border p-6">
        <div className="mb-6">
          <h2 className="theme-text-primary text-lg font-semibold">
            CPU Utilization
          </h2>
  
          <p className="theme-text-muted mt-1 text-sm">
            Average usage across active servers.
          </p>
        </div>
  
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cpuData}>
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
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
  
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBackground,
                  border: `1px solid ${tooltipBorder}`,
                  borderRadius: "8px",
                  color: tooltipText,
                }}
                labelStyle={{ color: tooltipText }}
                itemStyle={{ color: "#22d3ee" }}
                formatter={(value) => [`${value}%`, "CPU Usage"]}
              />
  
              <Line
                type="monotone"
                dataKey="usage"
                stroke="#22d3ee"
                strokeWidth={3}
                dot={{ fill: "#22d3ee", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    );
  }