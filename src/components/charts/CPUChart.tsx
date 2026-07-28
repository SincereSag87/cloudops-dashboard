import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
  
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
    return (
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            CPU Utilization
          </h2>
  
          <p className="mt-1 text-sm text-slate-400">
            Average usage across active servers.
          </p>
        </div>
  
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cpuData}>
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