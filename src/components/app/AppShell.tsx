import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronDown,
  LayoutGrid,
  FilePlus2,
  Users,
  Package,
  MessageSquareText,
  ReceiptText,
  BarChart3,
  Settings,
  Printer,
  Palette,
  LogOut,
  UserRound,
  Menu,
  X,
  Search,
  Plus,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { currentUser, business } from "@/data/mock";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const NAV = [
  { to: "/", label: "Home", icon: LayoutGrid },
  { to: "/create-invoice", label: "Create Invoice", icon: FilePlus2 },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/products", label: "Products", icon: Package },
  { to: "/enquiries", label: "Enquiries", icon: MessageSquareText },
  { to: "/invoices", label: "Invoice History", icon: ReceiptText },
  { to: "/reports", label: "Reports", icon: BarChart3 },
] as const;

export const MORE = [
  { to: "/setup", label: "Setup", icon: Settings },
  { to: "/themes", label: "Themes", icon: Palette },
  { to: "/print-preview", label: "Print Preview", icon: Printer },
] as const;

function useActive() {
  return useRouterState({ select: (s) => s.location.pathname });
}

function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full border border-border bg-surface py-1 pr-2 pl-1 shadow-plate transition-colors hover:bg-secondary">
          <span className="brand-gradient grid h-6.5 w-6.5 place-items-center rounded-full text-[11px] font-semibold text-primary-foreground">
            {currentUser.initials}
          </span>
          <span className="hidden text-[12.5px] font-medium sm:block">{currentUser.name.split(" ")[0]}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="py-2">
          <p className="text-[13px] font-semibold">{currentUser.name}</p>
          <p className="text-[11.5px] font-normal text-muted-foreground">{currentUser.email}</p>
          <p className="mt-1 inline-block rounded border border-border bg-muted px-1.5 py-px text-[10.5px] font-medium text-muted-foreground">
            {currentUser.role}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="gap-2 text-[13px]">
          <Link to="/profile">
            <UserRound className="h-3.5 w-3.5" /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="gap-2 text-[13px]">
          <Link to="/setup">
            <Settings className="h-3.5 w-3.5" /> Setup
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-[13px] text-destructive focus:text-destructive">
          <LogOut className="h-3.5 w-3.5" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2">
      <span className="brand-gradient grid h-7.5 w-7.5 shrink-0 place-items-center rounded-md text-primary-foreground shadow-raise">
        <ReceiptText className="h-4 w-4" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-[14px] font-semibold">Billing Desk</span>
        <span className="hidden truncate text-[10.5px] text-muted-foreground lg:block">
          {business.legalName}
        </span>
      </span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const path = useActive();
  const [open, setOpen] = useState(false);
  const moreActive = MORE.some((m) => path.startsWith(m.to));

  return (
    <div className="min-h-screen bg-background">
      <header className="no-print sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto flex h-13 max-w-[1400px] items-center gap-3 px-3 sm:px-4">
          <button
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border text-muted-foreground xl:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          <Brand />

          <nav className="mx-2 hidden min-w-0 flex-1 items-center gap-0.5 xl:flex">
            {NAV.map((item) => {
              const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-md px-2.5 py-1.5 text-[12.5px] font-medium whitespace-nowrap transition-colors",
                    active
                      ? "bg-primary-soft text-primary shadow-[inset_0_0_0_1px_var(--color-primary)]/10"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[12.5px] font-medium transition-colors",
                    moreActive
                      ? "bg-primary-soft text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  More <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {MORE.map((m) => (
                  <DropdownMenuItem key={m.to} asChild className="gap-2 text-[13px]">
                    <Link to={m.to}>
                      <m.icon className="h-3.5 w-3.5" /> {m.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <button
              className="hidden h-8 w-8 place-items-center rounded-md border border-border text-muted-foreground hover:bg-secondary sm:grid"
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
            <Link
              to="/create-invoice"
              className="brand-gradient hidden h-8 items-center gap-1.5 rounded-md px-2.5 text-[12.5px] font-medium text-primary-foreground shadow-raise transition-all hover:brightness-108 active:translate-y-px sm:inline-flex"
            >
              <Plus className="h-3.5 w-3.5" /> New Invoice
            </Link>
            <ProfileMenu />
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      {open && (
        <div className="no-print fixed inset-0 z-50 xl:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-[268px] flex-col border-r border-border bg-surface shadow-pop">
            <div className="flex h-13 items-center justify-between border-b border-border px-3">
              <Brand />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-muted-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="scrollbar-thin flex-1 overflow-y-auto p-2">
              {[...NAV, ...MORE].map((item) => {
                const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "mb-0.5 flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13.5px] font-medium",
                      active ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-secondary",
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="border-t border-border p-2">
              <Link
                to="/create-invoice"
                onClick={() => setOpen(false)}
                className="brand-gradient flex h-9 items-center justify-center gap-1.5 rounded-md text-[13px] font-medium text-primary-foreground"
              >
                <Plus className="h-4 w-4" /> Create Invoice
              </Link>
            </div>
          </aside>
        </div>
      )}

      <main className="mx-auto max-w-[1400px] px-3 py-3.5 pb-20 sm:px-4 xl:pb-6">{children}</main>

      {/* mobile bottom bar */}
      <nav className="no-print fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-surface/95 backdrop-blur xl:hidden">
        {[NAV[0], NAV[2], NAV[1], NAV[5], NAV[6]].map((item, i) => {
          const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
          const primary = i === 2;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center gap-0.5 py-1.5 text-[10px] font-medium",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "grid h-7 w-9 place-items-center rounded-md",
                  primary
                    ? "brand-gradient text-primary-foreground shadow-raise"
                    : active
                      ? "bg-primary-soft"
                      : "",
                )}
              >
                <item.icon className="h-4 w-4" />
              </span>
              {item.label.replace("Invoice History", "History").replace("Create Invoice", "Bill")}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
