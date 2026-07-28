import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
  } from "react";
  
  type Theme = "light" | "dark" | "system";
  type ResolvedTheme = "light" | "dark";
  
  type ThemeContextValue = {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
  };
  
  const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
  
  const STORAGE_KEY = "cloudops-theme";
  
  function getSystemTheme(): ResolvedTheme {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  
  function getSavedTheme(): Theme {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
  
    if (
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "system"
    ) {
      return savedTheme;
    }
  
    return "dark";
  }
  
  export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getSavedTheme);
    const [systemTheme, setSystemTheme] =
      useState<ResolvedTheme>(getSystemTheme);
  
    const resolvedTheme: ResolvedTheme =
      theme === "system" ? systemTheme : theme;
  
    useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  
      function handleSystemThemeChange(event: MediaQueryListEvent) {
        setSystemTheme(event.matches ? "dark" : "light");
      }
  
      mediaQuery.addEventListener("change", handleSystemThemeChange);
  
      return () => {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      };
    }, []);
  
    useEffect(() => {
      localStorage.setItem(STORAGE_KEY, theme);
  
      const root = document.documentElement;
  
      root.classList.remove("light", "dark");
      root.classList.add(resolvedTheme);
      root.dataset.theme = resolvedTheme;
    }, [theme, resolvedTheme]);
  
    const value = useMemo(
      () => ({
        theme,
        resolvedTheme,
        setTheme,
      }),
      [theme, resolvedTheme],
    );
  
    return (
      <ThemeContext.Provider value={value}>
        {children}
      </ThemeContext.Provider>
    );
  }
  
  export function useTheme() {
    const context = useContext(ThemeContext);
  
    if (!context) {
      throw new Error("useTheme must be used inside a ThemeProvider.");
    }
  
    return context;
  }