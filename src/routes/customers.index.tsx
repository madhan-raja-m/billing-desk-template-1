import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Eye, Phone, MessageCircle, Mail, FilePlus2 } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import {
  ActionMenu,
  Btn,
  EmptyState,
  FilterBar,
  Pager,
  PageHeader,
  SearchBar,
  TableWrap,
  Td,
  Th,
  Tr,
  useSorted,
} from "@/components/app/kit";
import { customers, inr, shortDate } from "@/data/mock";

export const Route = createFileRoute("/customers/")({
  head: () => ({
    meta: [
      { title: "Customers — Billing Desk" },
      { name: "description", content: "Search, sort and manage your customer ledger with purchase history and quick billing actions." },
      { property: "og:title", content: "Customers — Billing Desk" },
      { property: "og:description", content: "Customer directory with invoice counts, total purchase value and one-tap call, WhatsApp and billing." },
    ],
  }),
  component: CustomersPage,
});

const PER = 8;

function CustomersPage() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" }>({ key: "name", dir: "asc" });

  const filtered = useMemo(
    () =>
      customers.filter((c) =>
        [c.name, c.mobile, c.email].join(" ").toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );
  const sorted = useSorted(filtered, sort);
  const pages = Math.max(Math.ceil(sorted.length / PER), 1);
  const rows = sorted.slice((page - 1) * PER, page * PER);

  const onSort = (key: string) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === "asc" ? "desc" : "asc" }));

  return (
    <AppShell>
      <PageHeader
        title="Customers"
        subtitle={`${customers.length} customers · ${inr(customers.reduce((s, c) => s + c.totalPurchase, 0), true)} lifetime value`}
        actions={
          <Btn variant="primary">
            <Plus className="h-4 w-4" /> Add Customer
          </Btn>
        }
      />

      <FilterBar>
        <SearchBar value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search name, mobile or email…" className="min-w-0 flex-1 sm:max-w-xs" />
        <select className="h-8.5 rounded-md border border-input bg-surface px-2 text-[12.5px]">
          <option>All customers</option>
          <option>GST registered</option>
          <option>Retail</option>
        </select>
        <select className="h-8.5 rounded-md border border-input bg-surface px-2 text-[12.5px]">
          <option>Any period</option>
          <option>Last 30 days</option>
          <option>This quarter</option>
        </select>
      </FilterBar>

      {rows.length === 0 ? (
        <div className="plate">
          <EmptyState
            title="No customers found"
            hint="Try a different mobile number or clear the search filter."
            action={<Btn size="sm" className="mt-1" onClick={() => setQ("")}>Clear search</Btn>}
          />
        </div>
      ) : (
        <>
          {/* desktop table */}
          <div className="hidden md:block">
            <TableWrap className="rounded-b-none border-b-0">
              <thead>
                <tr>
                  <Th sortKey="name" sort={sort} onSort={onSort}>Name</Th>
                  <Th sortKey="mobile" sort={sort} onSort={onSort}>Mobile</Th>
                  <Th sortKey="email" sort={sort} onSort={onSort}>Email</Th>
                  <Th sortKey="invoices" sort={sort} onSort={onSort} className="text-right">Invoices</Th>
                  <Th sortKey="totalPurchase" sort={sort} onSort={onSort} className="text-right">Total Purchase</Th>
                  <Th sortKey="lastPurchase" sort={sort} onSort={onSort}>Last Purchase</Th>
                  <Th className="w-10 text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <Tr key={c.id}>
                    <Td>
                      <Link to="/customers/$id" params={{ id: c.id }} className="font-medium text-primary hover:underline">
                        {c.name}
                      </Link>
                      <span className="block text-[11.5px] text-muted-foreground">{c.gstin ?? "Unregistered"}</span>
                    </Td>
                    <Td className="tnum whitespace-nowrap">{c.mobile}</Td>
                    <Td className="max-w-[190px] truncate text-muted-foreground">{c.email}</Td>
                    <Td className="tnum text-right">{c.invoices}</Td>
                    <Td className="tnum text-right font-semibold">{inr(c.totalPurchase)}</Td>
                    <Td className="whitespace-nowrap text-muted-foreground">{shortDate(c.lastPurchase)}</Td>
                    <Td className="text-right">
                      <ActionMenu
                        items={[
                          { label: "View", icon: Eye },
                          { label: "Create Invoice", icon: FilePlus2 },
                          { label: "Call", icon: Phone },
                          { label: "WhatsApp", icon: MessageCircle },
                          { label: "Email", icon: Mail },
                        ]}
                      />
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </TableWrap>
            <div className="plate rounded-t-none border-t-0 p-0">
              <Pager page={page} pages={pages} total={sorted.length} onPage={setPage} />
            </div>
          </div>

          {/* mobile list */}
          <div className="space-y-2 md:hidden">
            {rows.map((c) => (
              <Link
                key={c.id}
                to="/customers/$id"
                params={{ id: c.id }}
                className="plate block p-3 active:translate-y-px"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-semibold">{c.name}</p>
                    <p className="tnum truncate text-[12px] text-muted-foreground">{c.mobile}</p>
                  </div>
                  <span className="tnum shrink-0 text-[13.5px] font-semibold">{inr(c.totalPurchase, true)}</span>
                </div>
                <div className="mt-2 flex items-center gap-3 border-t border-border pt-2 text-[11.5px] text-muted-foreground">
                  <span>{c.invoices} invoices</span>
                  <span>Last: {shortDate(c.lastPurchase)}</span>
                </div>
              </Link>
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
