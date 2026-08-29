import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileSpreadsheet, Filter } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import {
  Btn,
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
import { cn } from "@/lib/utils";
import { inr, reportCatalog, reportRows, shortDate } from "@/data/mock";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Billing Desk" },
      { name: "description", content: "Sales, GST, customer and product reports with date ranges, filters and Excel export." },
      { property: "og:title", content: "Reports — Billing Desk" },
      { property: "og:description", content: "Run GST-ready sales, customer and product reports and export them to Excel." },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const [active, setActive] = useState("daily-sales");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" }>({ key: "date", dir: "desc" });

  const current = reportCatalog.flatMap((g) => g.items).find((i) => i.id === active);
  const rows = useSorted(
    reportRows.filter((r) => r.date.includes(q)),
    sort,
  );
  const onSort = (key: string) => setSort((s) => ({ key, dir: s.key === key && s.dir === "asc" ? "desc" : "asc" }));
  const selectCls = "h-8.5 rounded-md border border-input bg-surface px-2 text-[12.5px]";

  return (
    <AppShell>
      <PageHeader
        title="Reports"
        subtitle="15 standard reports · GST-ready exports"
        actions={
          <Btn variant="primary" size="sm">
            <FileSpreadsheet className="h-3.5 w-3.5" /> Export Excel
          </Btn>
        }
      />

      <div className="grid gap-2.5 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="plate h-fit overflow-hidden lg:sticky lg:top-16">
          <div className="scrollbar-thin max-h-[320px] overflow-y-auto lg:max-h-none">
            {reportCatalog.map((group) => (
              <div key={group.group}>
                <p className="border-y border-border bg-surface-muted px-3 py-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                  {group.group}
                </p>
                <ul className="p-1">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActive(item.id)}
                        className={cn(
                          "mb-0.5 w-full truncate rounded-md px-2.5 py-1.5 text-left text-[12.5px] transition-colors",
                          active === item.id
                            ? "bg-primary-soft font-medium text-primary"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                        )}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        <section className="min-w-0">
          <div className="plate mb-2.5 p-3">
            <h2 className="text-[14px] font-semibold">{current?.name}</h2>
            <p className="mt-0.5 text-[12.5px] text-muted-foreground">{current?.desc}</p>
          </div>

          <FilterBar>
            <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <Filter className="h-3.5 w-3.5" /> Filters
            </span>
            <input type="date" defaultValue="2026-08-01" className={cn(selectCls, "tnum")} />
            <input type="date" defaultValue="2026-08-27" className={cn(selectCls, "tnum")} />
            <select className={selectCls}>
              <option>All branches</option>
              <option>Andheri</option>
              <option>Pune</option>
            </select>
            <select className={selectCls}>
              <option>All users</option>
              <option>Rohan Mehta</option>
              <option>Sneha Patil</option>
            </select>
            <SearchBar value={q} onChange={setQ} placeholder="Search rows…" className="min-w-0 flex-1 sm:max-w-[200px]" />
          </FilterBar>

          <div className="mb-2.5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {[
              { l: "Total Sales", v: inr(reportRows.reduce((s, r) => s + r.total, 0)) },
              { l: "Taxable Value", v: inr(reportRows.reduce((s, r) => s + r.taxable, 0)) },
              { l: "GST", v: inr(reportRows.reduce((s, r) => s + r.gst, 0)) },
              { l: "Invoices", v: String(reportRows.reduce((s, r) => s + r.invoices, 0)) },
            ].map((k) => (
              <div key={k.l} className="plate p-2.5">
                <p className="text-[11px] tracking-wide text-muted-foreground uppercase">{k.l}</p>
                <p className="tnum mt-0.5 truncate text-[16px] font-semibold">{k.v}</p>
              </div>
            ))}
          </div>

          <TableWrap className="rounded-b-none border-b-0">
            <thead>
              <tr>
                <Th sortKey="date" sort={sort} onSort={onSort}>Date</Th>
                <Th sortKey="invoices" sort={sort} onSort={onSort} className="text-right">Invoices</Th>
                <Th sortKey="taxable" sort={sort} onSort={onSort} className="text-right">Taxable Value</Th>
                <Th sortKey="gst" sort={sort} onSort={onSort} className="text-right">GST</Th>
                <Th sortKey="total" sort={sort} onSort={onSort} className="text-right">Total</Th>
                <Th>Mode</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <Tr key={r.date}>
                  <Td className="whitespace-nowrap font-medium">{shortDate(r.date)}</Td>
                  <Td className="tnum text-right">{r.invoices}</Td>
                  <Td className="tnum text-right">{inr(r.taxable)}</Td>
                  <Td className="tnum text-right">{inr(r.gst)}</Td>
                  <Td className="tnum text-right font-semibold">{inr(r.total)}</Td>
                  <Td className="text-muted-foreground">{r.mode}</Td>
                </Tr>
              ))}
            </tbody>
          </TableWrap>
          <div className="plate rounded-t-none border-t-0 p-0">
            <Pager page={page} pages={2} total={rows.length} onPage={setPage} />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
