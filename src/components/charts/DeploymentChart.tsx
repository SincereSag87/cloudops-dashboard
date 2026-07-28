import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
  
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
    return (
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            Deployment Activity
          </h2>
  
          <p className="mt-1 text-sm text-slate-400">
            Successful and failed deployments during the last seven days.
          </p>
        </div>
  
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deploymentData}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" />
  
              <XAxis
                dataKey="day"
                stroke="#64748b"
                tickLine={false}
                axisLine={false}
              />
  
              <YAxis
                stroke="#64748b"
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
  
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#e2e8f0" }}
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