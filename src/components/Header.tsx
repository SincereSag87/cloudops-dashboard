import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLogout() {
    logout();
    setIsMenuOpen(false);
    navigate("/login", { replace: true });
  }

  function handleSettings() {
    setIsMenuOpen(false);
    navigate("/settings");
  }

  const initials =
    user?.name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "U";

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-5">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Infrastructure Overview
        </h1>

        <p className="text-sm text-slate-400">
          Monitor servers, deployments, and system health.
        </p>
      </div>

      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-left transition hover:border-cyan-500"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-bold text-slate-950">
            {initials}
          </span>

          <span className="hidden sm:block">
            <span className="block text-sm font-semibold text-white">
              {user?.name ?? "CloudOps User"}
            </span>

            <span className="block text-xs text-slate-400">
              {user?.role ?? "Viewer"}
            </span>
          </span>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
            <div className="border-b border-slate-800 px-5 py-4">
              <p className="font-semibold text-white">
                {user?.name ?? "CloudOps User"}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {user?.email ?? "No email available"}
              </p>

              <span className="mt-3 inline-flex rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-400">
                {user?.role ?? "Viewer"}
              </span>
            </div>

            <div className="p-2">
              <button
                type="button"
                onClick={handleSettings}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Settings
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}