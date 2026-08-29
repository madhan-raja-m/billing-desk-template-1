import { Check } from "lucide-react";
import { THEMES, useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemePicker() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
      {THEMES.map((t) => {
        const active = theme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={cn(
              "group overflow-hidden rounded-lg border bg-surface text-left shadow-plate transition-all hover:shadow-raise active:translate-y-px",
              active ? "border-primary ring-2 ring-ring" : "border-border",
            )}
          >
            <div className="flex h-14 items-end gap-1 p-2" style={{ background: t.swatch }}>
              <span className="h-2.5 w-8 rounded-full bg-white/70" />
              <span className="h-2.5 w-4 rounded-full bg-white/40" />
            </div>
            <div className="flex items-center justify-between gap-2 px-2.5 py-2">
              <span className="truncate text-[12.5px] font-medium">{t.name}</span>
              {active && <Check className="h-3.5 w-3.5 shrink-0 text-primary" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
