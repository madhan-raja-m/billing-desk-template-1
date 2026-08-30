import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  ReceiptText,
  Printer,
  Palette,
  LayoutGrid,
  Users as UsersIcon,
  ShieldCheck,
  History,
  DatabaseBackup,
  Check,
  Plus,
} from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { Btn, Field, Panel, PageHeader, StatusBadge, TableWrap, Td, Th, Tr, inputClass } from "@/components/app/kit";
import { ThemePicker } from "@/components/app/ThemePicker";
import { cn } from "@/lib/utils";
import { activityLog, business, users } from "@/data/mock";

export const Route = createFileRoute("/setup")({
  head: () => ({
    meta: [
      { title: "Setup — Billing Desk" },
      { name: "description", content: "Configure business details, invoice numbering, print formats, themes, users, permissions and backups." },
      { property: "og:title", content: "Setup — Billing Desk" },
      { property: "og:description", content: "All Billing Desk settings in one two-column configuration workspace." },
    ],
  }),
  component: SetupPage,
});

const SECTIONS = [
  { id: "business", label: "Business", icon: Building2 },
  { id: "invoice", label: "Invoice", icon: ReceiptText },
  { id: "printing", label: "Printing", icon: Printer },
  { id: "themes", label: "Themes", icon: Palette },
  { id: "modules", label: "Modules & Tabs", icon: LayoutGrid },
  { id: "users", label: "Users", icon: UsersIcon },
  { id: "permissions", label: "Permissions", icon: ShieldCheck },
  { id: "activity", label: "Activity Log", icon: History },
  { id: "backup", label: "Backup", icon: DatabaseBackup },
] as const;

function Toggle({ label, desc, on = true }: { label: string; desc?: string; on?: boolean }) {
  const [v, setV] = useState(on);
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 border-b border-border py-2.5 last:border-0">
      <span className="min-w-0">
        <span className="block text-[13px] font-medium">{label}</span>
        {desc && <span className="block text-[11.5px] text-muted-foreground">{desc}</span>}
      </span>
      <span
        onClick={() => setV(!v)}
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full transition-colors",
          v ? "bg-primary" : "bg-border-strong",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-surface shadow transition-all",
            v ? "left-4.5" : "left-0.5",
          )}
        />
      </span>
    </label>
  );
}

function SetupPage() {
  const [active, setActive] = useState<string>("business");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  return (
    <AppShell>
      <PageHeader
        title="Setup"
        subtitle="Business configuration, users and preferences"
        actions={
          <Btn variant="primary" size="sm" onClick={() => setSavedAt(new Date().toLocaleTimeString("en-IN"))}>
            <Check className="h-3.5 w-3.5" /> Save changes
          </Btn>
        }
      />

      {savedAt && (
        <div className="mb-2.5 rounded-md border border-success/25 bg-success/8 px-3 py-2 text-[12.5px] text-success">
          Settings saved at {savedAt} (prototype only).
        </div>
      )}

      <div className="grid gap-2.5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="plate h-fit p-1 lg:sticky lg:top-16">
          <div className="scrollbar-thin space-y-0.5">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[12.5px] whitespace-nowrap transition-colors",
                  active === s.id
                    ? "bg-primary-soft font-medium text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <s.icon className="h-3.5 w-3.5" /> {s.label}
              </button>
            ))}
          </div>
        </aside>

        <section className="min-w-0 space-y-2.5">
          {active === "business" && (
            <Panel title="Business details">
              <div className="grid gap-2.5 sm:grid-cols-2">
                <Field label="Legal name"><input className={inputClass} defaultValue={business.legalName} /></Field>
                <Field label="Trade name"><input className={inputClass} defaultValue="Meridian Electricals" /></Field>
                <Field label="GSTIN"><input className={cn(inputClass, "tnum")} defaultValue={business.gstin} /></Field>
                <Field label="State"><input className={inputClass} defaultValue={business.state} /></Field>
                <Field label="Phone"><input className={cn(inputClass, "tnum")} defaultValue={business.phone} /></Field>
                <Field label="Email"><input className={inputClass} defaultValue={business.email} /></Field>
                <Field label="Registered address" className="sm:col-span-2">
                  <textarea className={cn(inputClass, "h-16 py-2")} defaultValue={business.address} />
                </Field>
              </div>
            </Panel>
          )}

          {active === "invoice" && (
            <Panel title="Invoice preferences">
              <div className="grid gap-2.5 sm:grid-cols-2">
                <Field label="Invoice prefix"><input className={inputClass} defaultValue="INV-2026-" /></Field>
                <Field label="Next number"><input className={cn(inputClass, "tnum")} defaultValue="0413" /></Field>
                <Field label="Default GST rate"><select className={inputClass} defaultValue="18%"><option>0%</option><option>5%</option><option>12%</option><option>18%</option><option>28%</option></select></Field>
                <Field label="Default payment method"><select className={inputClass} defaultValue="UPI"><option>Cash</option><option>UPI</option><option>Card</option><option>Bank Transfer</option><option>Credit</option></select></Field>
                <Field label="Terms & conditions" className="sm:col-span-2">
                  <textarea className={cn(inputClass, "h-16 py-2")} defaultValue="Goods once sold will not be taken back. Warranty as per manufacturer terms." />
                </Field>
              </div>
              <div className="mt-2">
                <Toggle label="Round off grand total" desc="Round the final payable to the nearest rupee" />
                <Toggle label="Show HSN/SAC column" />
                <Toggle label="Allow negative stock billing" on={false} />
              </div>
            </Panel>
          )}

          {active === "printing" && (
            <Panel title="Print formats">
              <div className="grid gap-2.5 sm:grid-cols-2">
                <Field label="Default format"><select className={inputClass}><option>A4 Formal Invoice</option><option>A5 Invoice</option><option>80mm Thermal</option><option>58mm Thermal</option></select></Field>
                <Field label="Copies"><input type="number" className={cn(inputClass, "tnum")} defaultValue={2} /></Field>
              </div>
              <div className="mt-2">
                <Toggle label="Print business logo" />
                <Toggle label="Print bank details on A4" />
                <Toggle label="Auto-open print dialog after billing" on={false} />
              </div>
            </Panel>
          )}

          {active === "themes" && (
            <Panel title="Application theme">
              <ThemePicker />
            </Panel>
          )}

          {active === "modules" && (
            <Panel title="Modules & navigation tabs">
              <Toggle label="Enquiries module" />
              <Toggle label="Reports module" />
              <Toggle label="Product import / export" />
              <Toggle label="Multi-branch billing" on={false} />
              <Toggle label="Loyalty points" on={false} />
            </Panel>
          )}

          {active === "users" && (
            <Panel
              title="Users"
              action={<Btn size="sm" variant="soft"><Plus className="h-3.5 w-3.5" /> Invite user</Btn>}
              bodyClassName="p-0"
            >
              <TableWrap className="rounded-none border-0 shadow-none">
                <thead>
                  <tr><Th>Name</Th><Th>Email</Th><Th>Role</Th><Th>Status</Th></tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <Tr key={u.email}>
                      <Td className="font-medium">{u.name}</Td>
                      <Td className="text-muted-foreground">{u.email}</Td>
                      <Td>{u.role}</Td>
                      <Td><StatusBadge status={u.status} /></Td>
                    </Tr>
                  ))}
                </tbody>
              </TableWrap>
            </Panel>
          )}

          {active === "permissions" && (
            <Panel title="Role permissions" bodyClassName="p-0">
              <TableWrap className="rounded-none border-0 shadow-none">
                <thead>
                  <tr><Th>Capability</Th><Th className="text-center">Admin</Th><Th className="text-center">Billing</Th><Th className="text-center">Accounts</Th></tr>
                </thead>
                <tbody>
                  {[
                    ["Create invoice", true, true, false],
                    ["Cancel invoice", true, false, true],
                    ["Manage products", true, true, false],
                    ["View reports", true, false, true],
                    ["Manage users", true, false, false],
                  ].map((row) => (
                    <Tr key={String(row[0])}>
                      <Td className="font-medium">{String(row[0])}</Td>
                      {row.slice(1).map((v, i) => (
                        <Td key={i} className="text-center">
                          <input type="checkbox" defaultChecked={Boolean(v)} className="h-3.5 w-3.5 accent-[var(--color-primary)]" />
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </tbody>
              </TableWrap>
            </Panel>
          )}

          {active === "activity" && (
            <Panel title="Activity log" bodyClassName="p-0">
              <ul className="divide-y divide-border">
                {activityLog.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 px-3.5 py-2.5">
                    <span className="grid h-6.5 w-6.5 shrink-0 place-items-center rounded-md bg-primary-soft text-[10.5px] font-semibold text-primary">
                      {a.user.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px]">{a.action}</span>
                      <span className="block text-[11.5px] text-muted-foreground">{a.user} · {a.time}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          {active === "backup" && (
            <Panel title="Backup & restore">
              <p className="text-[13px] text-muted-foreground">
                Last backup completed yesterday at 02:00 · 48.2 MB
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Btn variant="primary" size="sm">Download backup</Btn>
                <Btn size="sm">Restore from file</Btn>
                <Btn size="sm" variant="danger">Purge cancelled invoices</Btn>
              </div>
              <div className="mt-3">
                <Toggle label="Nightly automatic backup" desc="Runs every day at 02:00" />
                <Toggle label="Email backup report to admin" on={false} />
              </div>
            </Panel>
          )}
        </section>
      </div>
    </AppShell>
  );
}
