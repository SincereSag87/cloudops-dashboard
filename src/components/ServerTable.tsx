import { useMemo, useState } from "react";
import { useServers } from "../hooks/useServers";
import type { Server } from "../types/Server";
import SkeletonTable from "./SkeletonTable";
import StatusBadge from "./StatusBadge";

export default function ServerTable() {
  const { servers, isLoading, error, reload } = useServers();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"All" | Server["status"]>("All");

  const filteredServers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return servers.filter((server) => {
      const matchesSearch =
        server.hostname.toLowerCase().includes(normalizedSearch) ||
        server.location.toLowerCase().includes(normalizedSearch) ||
        server.ipAddress.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" || server.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [servers, searchTerm, statusFilter]);

  if (isLoading) {
    return <SkeletonTable />;
  }

  if (error) {
    return (
      <section className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-8 text-center">
        <p className="font-medium text-red-300">{error}</p>

        <button
          type="button"
          onClick={() => void reload()}
          className="mt-4 rounded-lg bg-red-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-red-300"
        >
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className="mt-8 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg">
      <div className="flex flex-col gap-4 border-b border-slate-800 p-5 md:flex-row md:items-center md:justify-between">
        <input
          type="search"
          placeholder="Search hostname, location, or IP..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-cyan-500 md:max-w-md"
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value as "All" | Server["status"],
            )
          }
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-200 outline-none focus:border-cyan-500"
        >
          <option value="All">All statuses</option>
          <option value="Online">Online</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Offline">Offline</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left text-sm text-slate-300">
          <thead className="bg-slate-800 text-slate-200">
            <tr>
              <th className="px-6 py-4">Hostname</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">IP Address</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">CPU</th>
              <th className="px-6 py-4">Memory</th>
            </tr>
          </thead>

          <tbody>
            {filteredServers.map((server) => (
              <tr
                key={server.id}
                className="border-t border-slate-800 transition hover:bg-slate-800/70"
              >
                <td className="px-6 py-4 font-medium text-white">
                  {server.hostname}
                </td>
                <td className="px-6 py-4">{server.location}</td>
                <td className="px-6 py-4 font-mono text-xs">
                  {server.ipAddress}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={server.status} />
                </td>
                <td className="px-6 py-4">{server.cpu}%</td>
                <td className="px-6 py-4">{server.memory}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredServers.length === 0 && (
        <p className="p-8 text-center text-slate-400">
          No servers match the selected filters.
        </p>
      )}
    </section>
  );
}