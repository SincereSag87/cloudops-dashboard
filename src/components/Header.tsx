import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationCenter from "./NotificationCenter";
import ThemeSwitcher from "./ThemeSwitcher";

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
    <header className="theme-surface theme-border flex items-center justify-between border-b px-8 py-5">
      <div>
        <h1 className="theme-text-primary text-2xl font-bold">
          Infrastructure Overview
        </h1>

        <p className="theme-text-muted text-sm">
          Monitor servers, deployments, and system health.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <NotificationCenter />

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="theme-surface theme-border flex items-center gap-3 rounded-xl border px-3 py-2 text-left transition hover:border-cyan-500"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-bold text-slate-950">
              {initials}
            </span>

            <span className="hidden sm:block">
              <span className="theme-text-primary block text-sm font-semibold">
                {user?.name ?? "CloudOps User"}
              </span>

              <span className="theme-text-muted block text-xs">
                {user?.role ?? "Viewer"}
              </span>
            </span>
          </button>

          {isMenuOpen && (
            <div className="theme-surface theme-border absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-xl border shadow-2xl">
              <div className="theme-border border-b px-5 py-4">
                <p className="theme-text-primary font-semibold">
                  {user?.name ?? "CloudOps User"}
                </p>

                <p className="theme-text-muted mt-1 text-sm">
                  {user?.email ?? "No email available"}
                </p>

                <span className="mt-3 inline-flex rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-500">
                  {user?.role ?? "Viewer"}
                </span>
              </div>

              <div className="p-2">
                <button
                  type="button"
                  onClick={handleSettings}
                  className="theme-text-secondary w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  Settings
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-red-500 transition hover:bg-red-500/10"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}