import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
  import { useTheme } from "../../context/ThemeContext";
  import { useLiveMetric } from "../../hooks/useLiveMetric";
  
  const memoryData = [
    { time: "8 AM", usage: 54 },
    { time: "9 AM", usage: 58 },
    { time: "10 AM", usage: 63 },
    { time: "11 AM", usage: 61 },
    { time: "12 PM", usage: 69 },
    { time: "1 PM", usage: 74 },
    { time: "2 PM", usage: 71 },
    { time: "3 PM", usage: 78 },
  ];
  
  export default function MemoryChart() {
    const { resolvedTheme } = useTheme();
  
    const liveMemoryData = useLiveMetric({
      initialData: memoryData,
      min: 45,
      max: 92,
      intervalMs: 6000,
    });
  
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
            Memory Utilization
          </h2>
  
          <p className="theme-text-muted mt-1 text-sm">
            Average memory usage across active servers.
          </p>
        </div>
  
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={liveMemoryData}>
              <defs>
                <linearGradient
                  id="memoryFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#a78bfa"
                    stopOpacity={0.7}
                  />
  
                  <stop
                    offset="95%"
                    stopColor="#a78bfa"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
  
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
                itemStyle={{ color: "#a78bfa" }}
                formatter={(value) => [
                  `${value}%`,
                  "Memory Usage",
                ]}
              />
  
              <Area
                type="monotone"
                dataKey="usage"
                stroke="#a78bfa"
                strokeWidth={3}
                fill="url(#memoryFill)"
                isAnimationActive
                animationDuration={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    );
  }