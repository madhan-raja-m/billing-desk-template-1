import { cn } from "@/lib/utils";
import { Search, ChevronLeft, ChevronRight, ChevronsUpDown, ArrowUp, ArrowDown, Inbox, Loader2, MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ---------------- PageHeader ---------------- */
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pb-3 sm:flex sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate text-[17px] font-semibold sm:text-xl">{title}</h1>
        {subtitle && <p className="mt-0.5 truncate text-[12.5px] text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}

/* ---------------- Card ---------------- */
export function Panel({
  title,
  action,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("plate overflow-hidden", className)}>
      {title && (
        <div className="flex items-center justify-between gap-3 border-b border-border px-3.5 py-2.5">
          <h2 className="truncate text-[13px] font-semibold">{title}</h2>
          {action}
        </div>
      )}
      <div className={cn("p-3.5", bodyClassName)}>{children}</div>
    </section>
  );
}

/* ---------------- StatusBadge ---------------- */
const tones: Record<string, string> = {
  Paid: "bg-success/10 text-success border-success/20",
  Converted: "bg-success/10 text-success border-success/20",
  Active: "bg-success/10 text-success border-success/20",
  Pending: "bg-warning/15 text-warning-foreground border-warning/30",
  Quoted: "bg-warning/15 text-warning-foreground border-warning/30",
  "Low stock": "bg-warning/15 text-warning-foreground border-warning/30",
  Invited: "bg-warning/15 text-warning-foreground border-warning/30",
  Overdue: "bg-destructive/10 text-destructive border-destructive/20",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  Lost: "bg-destructive/10 text-destructive border-destructive/20",
  New: "bg-primary/10 text-primary border-primary/20",
  Contacted: "bg-primary/10 text-primary border-primary/20",
  Inactive: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-[1px] text-[11px] font-medium whitespace-nowrap",
        tones[status] ?? "bg-muted text-muted-foreground border-border",
      )}
    >
      {status}
    </span>
  );
}

/* ---------------- SearchBar ---------------- */
export function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-8.5 w-full rounded-md border border-input bg-surface pr-2.5 pl-8 text-[13px] outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

/* ---------------- Select / Input primitives ---------------- */
export function Field({
  label,
  hint,
  error,
  required,
  children,
  className,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <label className="mb-1 flex items-center gap-1 text-[11.5px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-[11.5px] font-medium text-destructive">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-[11.5px] text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export const inputClass =
  "h-9 w-full rounded-md border border-input bg-surface px-2.5 text-[13px] outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground";

export const inputErrorClass =
  "border-destructive bg-destructive/5 focus:border-destructive focus:ring-destructive/25";

export const selectClass = cn(inputClass, "appearance-none pr-7 bg-surface");

/* ---------------- Buttons ---------------- */
export function Btn({
  variant = "default",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary" | "ghost" | "danger" | "soft";
  size?: "sm" | "md";
}) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        size === "sm" ? "h-7.5 px-2.5 text-[12px]" : "h-9 px-3 text-[13px]",
        variant === "default" && "border-border bg-surface text-foreground shadow-plate hover:bg-secondary active:translate-y-px",
        variant === "primary" &&
          "brand-gradient border-primary-deep/40 text-primary-foreground shadow-raise hover:brightness-108 active:translate-y-px",
        variant === "soft" && "border-primary/20 bg-primary-soft text-primary hover:bg-primary/12",
        variant === "ghost" && "border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground",
        variant === "danger" && "border-destructive/25 bg-destructive/8 text-destructive hover:bg-destructive/15",
        className,
      )}
    />
  );
}

/* ---------------- Table shell ---------------- */
export function TableWrap({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("plate overflow-hidden", className)}>
      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-[13px]">{children}</table>
      </div>
    </div>
  );
}

export function Th({
  children,
  sortKey,
  sort,
  onSort,
  className,
}: {
  children: ReactNode;
  sortKey?: string;
  sort?: { key: string; dir: "asc" | "desc" };
  onSort?: (k: string) => void;
  className?: string;
}) {
  const active = sortKey && sort?.key === sortKey;
  return (
    <th
      className={cn(
        "border-b border-border bg-surface-muted px-3 py-2 text-left text-[11.5px] tracking-wide text-muted-foreground uppercase",
        sortKey && "cursor-pointer select-none hover:text-foreground",
        className,
      )}
      onClick={sortKey && onSort ? () => onSort(sortKey) : undefined}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {sortKey &&
          (active ? (
            sort?.dir === "asc" ? (
              <ArrowUp className="h-3 w-3 text-primary" />
            ) : (
              <ArrowDown className="h-3 w-3 text-primary" />
            )
          ) : (
            <ChevronsUpDown className="h-3 w-3 opacity-35" />
          ))}
      </span>
    </th>
  );
}

export function Td({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn("border-b border-border px-3 py-2 align-middle", className)}>{children}</td>;
}

export function Tr({ children, className }: { children: ReactNode; className?: string }) {
  return <tr className={cn("transition-colors hover:bg-primary-soft/60", className)}>{children}</tr>;
}

/* ---------------- Pagination ---------------- */
export function Pager({
  page,
  pages,
  total,
  onPage,
}: {
  page: number;
  pages: number;
  total: number;
  onPage: (p: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-surface-muted px-3 py-2 text-[12px] text-muted-foreground">
      <span className="tnum">
        {total === 0 ? "No records" : `Showing page ${page} of ${pages} · ${total} records`}
      </span>
      <div className="flex items-center gap-1">
        <Btn size="sm" disabled={page <= 1} onClick={() => onPage(page - 1)} aria-label="Previous page">
          <ChevronLeft className="h-3.5 w-3.5" /> Prev
        </Btn>
        {Array.from({ length: Math.min(pages, 5) }, (_, i) => i + 1).map((p) => (
          <Btn
            key={p}
            size="sm"
            variant={p === page ? "primary" : "default"}
            className="w-7.5 px-0 tnum"
            onClick={() => onPage(p)}
          >
            {p}
          </Btn>
        ))}
        <Btn size="sm" disabled={page >= pages} onClick={() => onPage(page + 1)} aria-label="Next page">
          Next <ChevronRight className="h-3.5 w-3.5" />
        </Btn>
      </div>
    </div>
  );
}

/* ---------------- States ---------------- */
export function EmptyState({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 py-14 text-center">
      <div className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface-muted">
        <Inbox className="h-4.5 w-4.5 text-muted-foreground" />
      </div>
      <p className="text-[13.5px] font-semibold">{title}</p>
      {hint && <p className="max-w-xs text-[12.5px] text-muted-foreground">{hint}</p>}
      {action}
    </div>
  );
}

export function LoadingState({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2 p-3.5">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-8 animate-pulse rounded-md bg-muted" />
      ))}
    </div>
  );
}

export function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
      <Loader2 className="h-3.5 w-3.5 animate-spin" /> {label}
    </span>
  );
}

/* ---------------- ActionMenu ---------------- */
export function ActionMenu({
  items,
}: {
  items: { label: string; icon?: React.ElementType; danger?: boolean; onSelect?: () => void }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Row actions"
          className="grid h-7 w-7 place-items-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {items.map((it) => (
          <DropdownMenuItem
            key={it.label}
            onSelect={it.onSelect}
            className={cn("gap-2 text-[13px]", it.danger && "text-destructive focus:text-destructive")}
          >
            {it.icon && <it.icon className="h-3.5 w-3.5" />}
            {it.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ---------------- Filter bar ---------------- */
export function FilterBar({ children }: { children: ReactNode }) {
  return (
    <div className="plate mb-3 flex flex-wrap items-center gap-2 p-2.5">{children}</div>
  );
}

/* ---------------- sorting helper ---------------- */
export function useSorted<T>(rows: T[], sort: { key: string; dir: "asc" | "desc" } | null) {
  if (!sort) return rows;
  const key = sort.key as keyof T;
  return [...rows].sort((a, b) => {
    const av = a[key] as unknown;
    const bv = b[key] as unknown;
    if (typeof av === "number" && typeof bv === "number") return sort.dir === "asc" ? av - bv : bv - av;
    return sort.dir === "asc"
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av));
  });
}
