import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Eye, Printer, Mail, Copy, Ban, Download } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import {
  ActionMenu,
  Btn,
  EmptyState,
  FilterBar,
  Pager,
  PageHeader,
  SearchBar,
  StatusBadge,
  TableWrap,
  Td,
  Th,
  Tr,
  useSorted,
} from "@/components/app/kit";
import { customers, inr, invoices, shortDate } from "@/data/mock";

export const Route = createFileRoute("/invoices")({
  head: () => ({
    meta: [
      { title: "Invoice History — Billing Desk" },
      { name: "description", content: "Filter invoices by date, customer, status and payment method, then print, email or duplicate them." },
      { property: "og:title", content: "Invoice History — Billing Desk" },
      { property: "og:description", content: "A complete invoice register with powerful filters, sorting and quick actions." },
    ],
  }),
  component: InvoiceHistory,
});

const PER = 8;

function InvoiceHistory() {
  const [q, setQ] = useState("");
  const [customer, setCustomer] = useState("All customers");
  const [status, setStatus] = useState("All statuses");
  const [payment, setPayment] = useState("All methods");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" }>({ key: "date", dir: "desc" });

  const filtered = useMemo(
    () =>
      invoices.filter(
        (i) =>
          [i.number, i.customer, i.createdBy].join(" ").toLowerCase().includes(q.toLowerCase()) &&
          (customer === "All customers" || i.customer === customer) &&
          (status === "All statuses" || i.status === status) &&
          (payment === "All methods" || i.payment === payment),
      ),
    [q, customer, status, payment],
  );
  const sorted = useSorted(filtered, sort);
  const pages = Math.max(Math.ceil(sorted.length / PER), 1);
  const rows = sorted.slice((page - 1) * PER, page * PER);
  const onSort = (key: string) => setSort((s) => ({ key, dir: s.key === key && s.dir === "asc" ? "desc" : "asc" }));

  const actions = [
    { label: "View", icon: Eye },
    { label: "Print", icon: Printer },
    { label: "Email", icon: Mail },
    { label: "Duplicate", icon: Copy },
    { label: "Cancel", icon: Ban, danger: true },
  ];

  const selectCls = "h-8.5 rounded-md border border-input bg-surface px-2 text-[12.5px]";

  return (
    <AppShell>
      <PageHeader
        title="Invoice History"
        subtitle={`${filtered.length} invoices · ${inr(filtered.reduce((s, i) => s + i.amount, 0), true)} billed`}
        actions={<Btn size="sm"><Download className="h-3.5 w-3.5" /> Export</Btn>}
      />

      <FilterBar>
        <SearchBar value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search invoice no. or customer…" className="min-w-0 flex-1 sm:max-w-[240px]" />
        <input type="date" defaultValue="2026-08-01" className={selectCls + " tnum"} />
        <input type="date" defaultValue="2026-08-27" className={selectCls + " tnum"} />
        <select value={customer} onChange={(e) => { setCustomer(e.target.value); setPage(1); }} className={selectCls}>
          <option>All customers</option>
          {customers.map((c) => <option key={c.id}>{c.name}</option>)}
        </select>
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className={selectCls}>
          {["All statuses", "Paid", "Pending", "Overdue", "Cancelled"].map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={payment} onChange={(e) => { setPayment(e.target.value); setPage(1); }} className={selectCls}>
          {["All methods", "Cash", "UPI", "Card", "Bank Transfer", "Credit"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </FilterBar>

      {rows.length === 0 ? (
        <div className="plate">
          <EmptyState
            title="No invoices match these filters"
            hint="Widen the date range or reset the customer, status and payment filters."
            action={<Btn size="sm" className="mt-1" onClick={() => { setQ(""); setCustomer("All customers"); setStatus("All statuses"); setPayment("All methods"); }}>Reset filters</Btn>}
          />
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <TableWrap className="rounded-b-none border-b-0">
              <thead>
                <tr>
                  <Th sortKey="number" sort={sort} onSort={onSort}>Invoice</Th>
                  <Th sortKey="customer" sort={sort} onSort={onSort}>Customer</Th>
                  <Th sortKey="date" sort={sort} onSort={onSort}>Date</Th>
                  <Th sortKey="amount" sort={sort} onSort={onSort} className="text-right">Amount</Th>
                  <Th sortKey="payment" sort={sort} onSort={onSort}>Payment</Th>
                  <Th sortKey="status" sort={sort} onSort={onSort}>Status</Th>
                  <Th sortKey="createdBy" sort={sort} onSort={onSort}>Created By</Th>
                  <Th className="w-10 text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((i) => (
                  <Tr key={i.id}>
                    <Td className="font-medium whitespace-nowrap text-primary">{i.number}</Td>
                    <Td className="max-w-[180px] truncate">{i.customer}</Td>
                    <Td className="whitespace-nowrap text-muted-foreground">{shortDate(i.date)}</Td>
                    <Td className="tnum text-right font-semibold">{inr(i.amount)}</Td>
                    <Td className="text-muted-foreground">{i.payment}</Td>
                    <Td><StatusBadge status={i.status} /></Td>
                    <Td className="text-muted-foreground">{i.createdBy}</Td>
                    <Td className="text-right"><ActionMenu items={actions} /></Td>
                  </Tr>
                ))}
              </tbody>
            </TableWrap>
            <div className="plate rounded-t-none border-t-0 p-0">
              <Pager page={page} pages={pages} total={sorted.length} onPage={setPage} />
            </div>
          </div>

          <div className="space-y-2 md:hidden">
            {rows.map((i) => (
              <div key={i.id} className="plate p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-primary">{i.number}</p>
                    <p className="truncate text-[12.5px]">{i.customer}</p>
                  </div>
                  <StatusBadge status={i.status} />
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-[12px] text-muted-foreground">
                  <span>{shortDate(i.date)} · {i.payment}</span>
                  <span className="tnum text-[13.5px] font-semibold text-foreground">{inr(i.amount)}</span>
                </div>
              </div>
            ))}
            <div className="plate p-0">
              <Pager page={page} pages={pages} total={sorted.length} onPage={setPage} />
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}
