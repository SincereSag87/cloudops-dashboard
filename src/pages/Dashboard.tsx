import CPUChart from "../components/charts/CPUChart";
import DeploymentChart from "../components/charts/DeploymentChart";
import MemoryChart from "../components/charts/MemoryChart";
import DashboardCard from "../components/DashboardCard";
import ServerTable from "../components/ServerTable";
import { useServers } from "../hooks/useServers";

export default function Dashboard() {
  const { servers, isLoading, error } = useServers();

  const totalServers = servers.length;

  const onlineServers = servers.filter(
    (server) => server.status === "Online",
  ).length;

  const maintenanceServers = servers.filter(
    (server) => server.status === "Maintenance",
  ).length;

  const offlineServers = servers.filter(
    (server) => server.status === "Offline",
  ).length;

  const operationalPercentage =
    totalServers === 0
      ? 0
      : Math.round((onlineServers / totalServers) * 100);

  return (
    <main className="flex-1 bg-slate-900 p-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total Servers"
          value={isLoading ? 0 : totalServers}
          description="Across all environments"
        />

        <DashboardCard
          title="Online"
          value={isLoading ? 0 : onlineServers}
          description={`${operationalPercentage}% operational`}
        />

        <DashboardCard
          title="Maintenance"
          value={isLoading ? 0 : maintenanceServers}
          description="Scheduled maintenance"
        />

        <DashboardCard
          title="Offline"
          value={isLoading ? 0 : offlineServers}
          description="Requires attention"
        />
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          Unable to load dashboard metrics.
        </div>
      )}

      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Server Inventory
        </h2>

        <ServerTable />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <CPUChart />
        <MemoryChart />
      </div>

      <div className="mt-6">
        <DeploymentChart />
      </div>
    </main>
  );
}