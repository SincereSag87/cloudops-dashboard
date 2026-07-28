import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
  
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
    return (
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            Memory Utilization
          </h2>
  
          <p className="mt-1 text-sm text-slate-400">
            Average memory usage across active servers.
          </p>
        </div>
  
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={memoryData}>
              <defs>
                <linearGradient id="memoryFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.05} />
                </linearGradient>
              </defs>
  
              <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" />
  
              <XAxis
                dataKey="time"
                stroke="#64748b"
                tickLine={false}
                axisLine={false}
              />
  
              <YAxis
                stroke="#64748b"
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
  
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#e2e8f0" }}
                itemStyle={{ color: "#a78bfa" }}
                formatter={(value) => [`${value}%`, "Memory Usage"]}
              />
  
              <Area
                type="monotone"
                dataKey="usage"
                stroke="#a78bfa"
                strokeWidth={3}
                fill="url(#memoryFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    );
  }