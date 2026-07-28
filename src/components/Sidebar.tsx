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
      <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-800 bg-slate-950 p-6 text-white lg:block">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Operations
          </p>
  
          <h2 className="mt-2 text-2xl font-bold text-cyan-400">
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
                    : "text-slate-400 hover:bg-slate-800 hover:text-white",
                ].join(" ")
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    );
  }