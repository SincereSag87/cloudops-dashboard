import CPUChart from "../components/charts/CPUChart";
import DeploymentChart from "../components/charts/DeploymentChart";
import MemoryChart from "../components/charts/MemoryChart";
import DashboardCard from "../components/DashboardCard";
import ServerTable from "../components/ServerTable";

export default function Dashboard() {
  return (
    <main className="flex-1 bg-slate-900 p-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total Servers"
          value={248}
          description="Across all environments"
        />

        <DashboardCard
          title="Online"
          value={241}
          description="97% operational"
        />

        <DashboardCard
          title="Deployments"
          value={16}
          description="Completed this week"
        />

        <DashboardCard
          title="Active Alerts"
          value={5}
          description="Requires attention"
        />
      </div>
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