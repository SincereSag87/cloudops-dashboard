import ServerTable from "../components/ServerTable";

export default function Servers() {
  return (
    <main className="theme-page flex-1 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="theme-text-primary text-3xl font-bold">
            Servers
          </h1>

          <p className="theme-text-muted mt-2">
            Review infrastructure health, utilization, and availability.
          </p>
        </div>

        <ServerTable />
      </div>
    </main>
  );
}