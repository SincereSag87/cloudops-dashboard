import { FaDesktop, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const options = [
    {
      value: "light" as const,
      label: "Light",
      icon: <FaSun />,
    },
    {
      value: "dark" as const,
      label: "Dark",
      icon: <FaMoon />,
    },
    {
      value: "system" as const,
      label: "System",
      icon: <FaDesktop />,
    },
  ];

  return (
    <div className="theme-surface theme-border flex items-center rounded-xl border p-1 shadow-sm">
      {options.map((option) => {
        const isActive = theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            aria-label={`Use ${option.label.toLowerCase()} theme`}
            title={option.label}
            className={[
              "flex h-9 w-9 items-center justify-center rounded-lg text-sm transition",
              isActive
                ? "bg-cyan-500 text-slate-950"
                : "theme-text-secondary hover:bg-slate-200 hover:text-slate-950 dark:hover:bg-slate-800 dark:hover:text-white",
            ].join(" ")}
          >
            {option.icon}
          </button>
        );
      })}
    </div>
  );
}