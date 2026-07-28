const regions = [
    {
      name: "US East",
      latency: "18 ms",
      throughput: "9.8 Gbps",
      packetLoss: "0.01%",
      status: "Healthy",
    },
    {
      name: "US Central",
      latency: "31 ms",
      throughput: "8.4 Gbps",
      packetLoss: "0.04%",
      status: "Healthy",
    },
    {
      name: "US West",
      latency: "72 ms",
      throughput: "6.9 Gbps",
      packetLoss: "0.26%",
      status: "Degraded",
    },
  ];
  
  export default function Network() {
    return (
      <main className="theme-page flex-1 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="theme-text-primary text-3xl font-bold">
            Network Operations
          </h1>
  
          <p className="theme-text-muted mt-2">
            Monitor regional connectivity, throughput, latency, and packet loss.
          </p>
  
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {regions.map((region) => (
              <article
                key={region.name}
                className="theme-surface theme-border rounded-xl border p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h2 className="theme-text-primary text-lg font-semibold">
                    {region.name}
                  </h2>
  
                  <span
                    className={
                      region.status === "Healthy"
                        ? "text-sm font-medium text-emerald-600 dark:text-emerald-400"
                        : "text-sm font-medium text-amber-600 dark:text-amber-400"
                    }
                  >
                    {region.status}
                  </span>
                </div>
  
                <dl className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="theme-text-muted">Latency</dt>
                    <dd className="theme-text-primary font-medium">
                      {region.latency}
                    </dd>
                  </div>
  
                  <div className="flex justify-between">
                    <dt className="theme-text-muted">Throughput</dt>
                    <dd className="theme-text-primary font-medium">
                      {region.throughput}
                    </dd>
                  </div>
  
                  <div className="flex justify-between">
                    <dt className="theme-text-muted">Packet loss</dt>
                    <dd className="theme-text-primary font-medium">
                      {region.packetLoss}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </main>
    );
  }