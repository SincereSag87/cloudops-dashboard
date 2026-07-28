import ActivityFeed from "../components/ActivityFeed";
import CPUChart from "../components/charts/CPUChart";
import DeploymentChart from "../components/charts/DeploymentChart";
import MemoryChart from "../components/charts/MemoryChart";
import DashboardCard from "../components/DashboardCard";
import ServerTable from "../components/ServerTable";
import { useDashboardMetrics } from "../hooks/useDashboardMetrics";
import { useServers } from "../hooks/useServers";

export default function Dashboard() {
  const { isLoading, error } = useServers();
  const liveMetrics = useDashboardMetrics();

  const operationalPercentage =
    liveMetrics.totalServers === 0
      ? 0
      : Math.round(
          (liveMetrics.online / liveMetrics.totalServers) * 100,
        );

  return (
    <main className="theme-page flex-1 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="Total Servers"
            value={isLoading ? 0 : liveMetrics.totalServers}
            description="Across all environments"
          />

          <DashboardCard
            title="Online"
            value={isLoading ? 0 : liveMetrics.online}
            description={`${operationalPercentage}% operational`}
          />

          <DashboardCard
            title="Maintenance"
            value={isLoading ? 0 : liveMetrics.maintenance}
            description="Scheduled maintenance"
          />

          <DashboardCard
            title="Offline"
            value={isLoading ? 0 : liveMetrics.offline}
            description="Requires attention"
          />
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-600 dark:text-red-300">
            Unable to load dashboard metrics.
          </div>
        )}

        <section className="mt-10">
          <h2 className="theme-text-primary mb-4 text-2xl font-bold">
            Server Inventory
          </h2>

          <ServerTable />
        </section>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <CPUChart />
          <MemoryChart />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
          <DeploymentChart />
          <ActivityFeed />
        </div>
      </div>
    </main>
  );
}