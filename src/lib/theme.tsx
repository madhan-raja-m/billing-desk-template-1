import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const THEMES = [
  { id: "royal-blue", name: "Royal Blue", swatch: "oklch(0.5 0.17 262)" },
  { id: "navy", name: "Professional Navy", swatch: "oklch(0.34 0.1 255)" },
  { id: "emerald", name: "Emerald", swatch: "oklch(0.48 0.12 158)" },
  { id: "burgundy", name: "Burgundy", swatch: "oklch(0.42 0.13 12)" },
  { id: "purple", name: "Purple", swatch: "oklch(0.46 0.15 300)" },
  { id: "teal", name: "Teal", swatch: "oklch(0.46 0.11 195)" },
  { id: "indigo", name: "Indigo", swatch: "oklch(0.45 0.15 275)" },
  { id: "slate", name: "Slate", swatch: "oklch(0.42 0.04 250)" },
  { id: "orange", name: "Orange", swatch: "oklch(0.52 0.14 48)" },
  { id: "charcoal", name: "Charcoal", swatch: "oklch(0.3 0.015 265)" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

const ThemeCtx = createContext<{ theme: ThemeId; setTheme: (t: ThemeId) => void }>({
  theme: "navy",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>("navy");

  useEffect(() => {
    const saved = localStorage.getItem("bd-theme") as ThemeId | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("bd-theme", theme);
  }, [theme]);

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
