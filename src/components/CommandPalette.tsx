import {
    useEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  import { FaSearch } from "react-icons/fa";
  import { useNavigate } from "react-router-dom";
  import { usePermissions } from "../hooks/usePermissions";
  import type { Command } from "../types/Command";
  import type { Permission } from "../types/Role";
  
  type PermissionCommand = Command & {
    permission: Permission;
  };
  
  const commands: PermissionCommand[] = [
    {
      id: "dashboard",
      label: "Open Dashboard",
      description: "View infrastructure metrics and activity.",
      category: "Navigation",
      path: "/",
      permission: "view-dashboard",
      keywords: ["home", "metrics", "overview"],
    },
    {
      id: "servers",
      label: "Open Servers",
      description: "View server inventory and status.",
      category: "Navigation",
      path: "/servers",
      permission: "view-servers",
      keywords: ["server", "inventory", "gpu", "nodes"],
    },
    {
      id: "network",
      label: "Open Network",
      description: "View regional network health.",
      category: "Navigation",
      path: "/network",
      permission: "view-network",
      keywords: ["network", "latency", "throughput", "regions"],
    },
    {
      id: "deployments",
      label: "Open Deployments",
      description: "Review release and deployment activity.",
      category: "Navigation",
      path: "/deployments",
      permission: "view-deployments",
      keywords: ["deploy", "release", "staging", "production"],
    },
    {
      id: "settings",
      label: "Open Settings",
      description: "Manage application preferences.",
      category: "Navigation",
      path: "/settings",
      permission: "view-settings",
      keywords: ["preferences", "notifications", "environment"],
    },
  ];
  
  export default function CommandPalette() {
    const navigate = useNavigate();
    const { can } = usePermissions();
    const inputRef = useRef<HTMLInputElement>(null);
  
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
  
    const filteredCommands = useMemo(() => {
      const normalizedQuery = query.trim().toLowerCase();
  
      return commands.filter((command) => {
        if (!can(command.permission)) {
          return false;
        }
  
        if (!normalizedQuery) {
          return true;
        }
  
        const searchableText = [
          command.label,
          command.description,
          command.category,
          ...command.keywords,
        ]
          .join(" ")
          .toLowerCase();
  
        return searchableText.includes(normalizedQuery);
      });
    }, [can, query]);
  
    function runCommand(command: PermissionCommand) {
      if (!can(command.permission)) {
        return;
      }
  
      if (command.path) {
        navigate(command.path);
      }
  
      setIsOpen(false);
    }
  
    useEffect(() => {
      function handleKeyboardShortcut(event: KeyboardEvent) {
        if (
          (event.ctrlKey || event.metaKey) &&
          event.key.toLowerCase() === "k"
        ) {
          event.preventDefault();
          setIsOpen((current) => !current);
          return;
        }
  
        if (!isOpen) {
          return;
        }
  
        if (event.key === "Escape") {
          event.preventDefault();
          setIsOpen(false);
          return;
        }
  
        if (event.key === "ArrowDown") {
          event.preventDefault();
  
          setSelectedIndex((current) =>
            filteredCommands.length === 0
              ? 0
              : (current + 1) % filteredCommands.length,
          );
  
          return;
        }
  
        if (event.key === "ArrowUp") {
          event.preventDefault();
  
          setSelectedIndex((current) =>
            filteredCommands.length === 0
              ? 0
              : (current - 1 + filteredCommands.length) %
                filteredCommands.length,
          );
  
          return;
        }
  
        if (event.key === "Enter") {
          event.preventDefault();
  
          const selectedCommand = filteredCommands[selectedIndex];
  
          if (selectedCommand) {
            runCommand(selectedCommand);
          }
        }
      }
  
      window.addEventListener("keydown", handleKeyboardShortcut);
  
      return () => {
        window.removeEventListener("keydown", handleKeyboardShortcut);
      };
    }, [filteredCommands, isOpen, selectedIndex]);
  
    useEffect(() => {
      if (isOpen) {
        window.setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      } else {
        setQuery("");
        setSelectedIndex(0);
      }
    }, [isOpen]);
  
    useEffect(() => {
      setSelectedIndex(0);
    }, [query]);
  
    useEffect(() => {
      if (selectedIndex >= filteredCommands.length) {
        setSelectedIndex(0);
      }
    }, [filteredCommands.length, selectedIndex]);
  
    if (!isOpen) {
      return (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open command palette"
          title="Search commands"
          className="theme-surface theme-border theme-text-secondary fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border px-4 py-3 shadow-lg transition hover:border-cyan-500 hover:text-cyan-500"
        >
          <FaSearch />
  
          <span className="hidden sm:inline">
            Search
          </span>
  
          <kbd className="theme-surface-muted rounded px-2 py-1 text-xs">
            Ctrl K
          </kbd>
        </button>
      );
    }
  
    return (
      <div
        className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/60 px-4 pt-24 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      >
        <section
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="theme-surface theme-border w-full max-w-2xl overflow-hidden rounded-2xl border shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="theme-border border-b p-4">
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search pages and commands..."
              className="theme-surface-muted theme-border theme-text-primary w-full rounded-xl border px-4 py-3 outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
            />
          </div>
  
          <div className="max-h-[420px] overflow-y-auto p-2">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((command, index) => {
                const isSelected = index === selectedIndex;
  
                return (
                  <button
                    key={command.id}
                    type="button"
                    onClick={() => runCommand(command)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={[
                      "theme-text-secondary w-full rounded-xl px-4 py-3 text-left transition",
                      isSelected
                        ? "bg-cyan-500/15 ring-1 ring-cyan-500"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="theme-text-primary text-sm font-semibold">
                          {command.label}
                        </p>
  
                        <p className="theme-text-muted mt-1 text-sm">
                          {command.description}
                        </p>
                      </div>
  
                      <span className="theme-text-muted theme-border rounded-md border px-2 py-1 text-xs">
                        {command.category}
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              <p className="theme-text-muted p-8 text-center">
                No permitted commands found.
              </p>
            )}
          </div>
  
          <footer className="theme-border theme-text-muted flex flex-wrap items-center justify-between gap-2 border-t px-4 py-3 text-xs">
            <span>↑ ↓ Navigate</span>
            <span>Enter Select</span>
            <span>Esc Close</span>
          </footer>
        </section>
      </div>
    );
  }