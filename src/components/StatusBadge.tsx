import type { Server } from "../types/Server";

type StatusBadgeProps = {
  status: Server["status"];
};

const statusStyles: Record<Server["status"], string> = {
  Online: "bg-emerald-500/15 text-emerald-400",
  Offline: "bg-red-500/15 text-red-400",
  Maintenance: "bg-amber-500/15 text-amber-400",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}