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
      <main className="flex-1 bg-slate-950 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-white">
            Network Operations
          </h1>
  
          <p className="mt-2 text-slate-400">
            Monitor regional connectivity, throughput, latency, and packet loss.
          </p>
  
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {regions.map((region) => (
              <article
                key={region.name}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">
                    {region.name}
                  </h2>
  
                  <span
                    className={
                      region.status === "Healthy"
                        ? "text-sm font-medium text-emerald-400"
                        : "text-sm font-medium text-amber-400"
                    }
                  >
                    {region.status}
                  </span>
                </div>
  
                <dl className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Latency</dt>
                    <dd className="font-medium text-slate-200">
                      {region.latency}
                    </dd>
                  </div>
  
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Throughput</dt>
                    <dd className="font-medium text-slate-200">
                      {region.throughput}
                    </dd>
                  </div>
  
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Packet loss</dt>
                    <dd className="font-medium text-slate-200">
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