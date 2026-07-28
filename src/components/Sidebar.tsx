import {
    FaChartPie,
    FaCog,
    FaNetworkWired,
    FaRocket,
    FaServer,
  } from "react-icons/fa";
  import { NavLink } from "react-router-dom";
  
  const menuItems = [
    { label: "Dashboard", path: "/", icon: <FaChartPie /> },
    { label: "Servers", path: "/servers", icon: <FaServer /> },
    { label: "Network", path: "/network", icon: <FaNetworkWired /> },
    { label: "Deployments", path: "/deployments", icon: <FaRocket /> },
    { label: "Settings", path: "/settings", icon: <FaCog /> },
  ];
  
  export default function Sidebar() {
    return (
      <aside className="theme-surface theme-border hidden min-h-screen w-64 shrink-0 border-r p-6 lg:block">
        <div className="mb-10">
          <p className="theme-text-muted text-xs font-semibold uppercase tracking-[0.25em]">
            Operations
          </p>
  
          <h2 className="mt-2 text-2xl font-bold text-cyan-500 dark:text-cyan-400">
            CloudOps
          </h2>
        </div>
  
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-cyan-500 text-slate-950"
                    : "theme-text-secondary hover:bg-slate-200 hover:text-slate-950 dark:hover:bg-slate-800 dark:hover:text-white",
                ].join(" ")
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
  
        <div className="theme-border theme-surface-muted mt-10 rounded-xl border p-4">
          <p className="theme-text-primary text-sm font-semibold">
            System health
          </p>
  
          <div className="mt-3 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            All core services operational
          </div>
        </div>
      </aside>
    );
  }