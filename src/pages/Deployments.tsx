const deployments = [
    {
      id: "DEP-2048",
      service: "customer-api",
      environment: "Production",
      version: "v2.14.0",
      status: "Successful",
      started: "2026-07-27 14:30",
    },
    {
      id: "DEP-2047",
      service: "billing-worker",
      environment: "Production",
      version: "v4.8.2",
      status: "In Progress",
      started: "2026-07-27 14:12",
    },
    {
      id: "DEP-2046",
      service: "network-controller",
      environment: "Staging",
      version: "v1.9.5",
      status: "Failed",
      started: "2026-07-27 13:45",
    },
  ];
  
  const statusStyles: Record<string, string> = {
    Successful:
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    "In Progress":
      "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400",
    Failed:
      "bg-red-500/15 text-red-700 dark:text-red-400",
  };
  
  export default function Deployments() {
    return (
      <main className="theme-page flex-1 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="theme-text-primary text-3xl font-bold">
                Deployments
              </h1>
  
              <p className="theme-text-muted mt-2">
                Track releases across staging and production environments.
              </p>
            </div>
  
            <button
              type="button"
              className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Start deployment
            </button>
          </div>
  
          <div className="theme-surface theme-border overflow-hidden rounded-xl border shadow-lg">
            <div className="overflow-x-auto">
              <table className="theme-text-secondary w-full min-w-[760px] text-left text-sm">
                <thead className="theme-surface-muted theme-text-primary">
                  <tr>
                    <th className="px-6 py-4">Deployment</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Environment</th>
                    <th className="px-6 py-4">Version</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Started</th>
                  </tr>
                </thead>
  
                <tbody>
                  {deployments.map((deployment) => (
                    <tr
                      key={deployment.id}
                      className="theme-border border-t transition hover:bg-slate-100 dark:hover:bg-slate-800/70"
                    >
                      <td className="theme-text-primary px-6 py-4 font-medium">
                        {deployment.id}
                      </td>
  
                      <td className="px-6 py-4">
                        {deployment.service}
                      </td>
  
                      <td className="px-6 py-4">
                        {deployment.environment}
                      </td>
  
                      <td className="px-6 py-4 font-mono text-xs">
                        {deployment.version}
                      </td>
  
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[deployment.status]}`}
                        >
                          {deployment.status}
                        </span>
                      </td>
  
                      <td className="px-6 py-4">
                        {deployment.started}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    );
  }