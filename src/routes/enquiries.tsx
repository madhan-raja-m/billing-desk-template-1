import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Phone, MessageCircle, ReceiptText, Eye, Plus } from "lucide-react";
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
import { enquiries, shortDate } from "@/data/mock";

export const Route = createFileRoute("/enquiries")({
  head: () => ({
    meta: [
      { title: "Enquiries — Billing Desk" },
      { name: "description", content: "Track incoming enquiries, follow up by call or WhatsApp and convert them into invoices." },
      { property: "og:title", content: "Enquiries — Billing Desk" },
      { property: "og:description", content: "Enquiry pipeline with status tracking and one-tap bill conversion." },
    ],
  }),
  component: EnquiriesPage,
});

const PER = 6;

function EnquiriesPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" }>({ key: "date", dir: "desc" });

  const filtered = useMemo(
    () =>
      enquiries.filter(
        (e) =>
          [e.customer, e.mobile, e.location, e.interest].join(" ").toLowerCase().includes(q.toLowerCase()) &&
          (status === "All statuses" || e.status === status),
      ),
    [q, status],
  );
  const sorted = useSorted(filtered, sort);
  const pages = Math.max(Math.ceil(sorted.length / PER), 1);
  const rows = sorted.slice((page - 1) * PER, page * PER);
  const onSort = (key: string) => setSort((s) => ({ key, dir: s.key === key && s.dir === "asc" ? "desc" : "asc" }));

  const actions = [
    { label: "Call", icon: Phone },
    { label: "WhatsApp", icon: MessageCircle },
    { label: "Bill Now", icon: ReceiptText },
    { label: "View", icon: Eye },
  ];

  return (
    <AppShell>
      <PageHeader
        title="Enquiries"
        subtitle={`${enquiries.filter((e) => e.status === "New").length} new enquiries awaiting follow-up`}
        actions={<Btn variant="primary" size="sm"><Plus className="h-3.5 w-3.5" /> Add Enquiry</Btn>}
      />

      <FilterBar>
        <SearchBar value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search customer, mobile or location…" className="min-w-0 flex-1 sm:max-w-xs" />
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="h-8.5 rounded-md border border-input bg-surface px-2 text-[12.5px]">
          {["All statuses", "New", "Contacted", "Quoted", "Converted", "Lost"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </FilterBar>

      {rows.length === 0 ? (
        <div className="plate">
          <EmptyState title="No enquiries found" hint="Try clearing the status filter or search term." />
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <TableWrap className="rounded-b-none border-b-0">
              <thead>
                <tr>
                  <Th sortKey="customer" sort={sort} onSort={onSort}>Customer</Th>
                  <Th sortKey="mobile" sort={sort} onSort={onSort}>Mobile</Th>
                  <Th sortKey="location" sort={sort} onSort={onSort}>Location</Th>
                  <Th sortKey="date" sort={sort} onSort={onSort}>Date</Th>
                  <Th sortKey="status" sort={sort} onSort={onSort}>Status</Th>
                  <Th className="w-10 text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((e) => (
                  <Tr key={e.id}>
                    <Td>
                      <span className="block font-medium">{e.customer}</span>
                      <span className="block text-[11.5px] text-muted-foreground">{e.interest}</span>
                    </Td>
                    <Td className="tnum whitespace-nowrap">{e.mobile}</Td>
                    <Td className="text-muted-foreground">{e.location}</Td>
                    <Td className="whitespace-nowrap text-muted-foreground">{shortDate(e.date)}</Td>
                    <Td><StatusBadge status={e.status} /></Td>
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
            {rows.map((e) => (
              <div key={e.id} className="plate p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-semibold">{e.customer}</p>
                    <p className="tnum truncate text-[12px] text-muted-foreground">{e.mobile} · {e.location}</p>
                  </div>
                  <StatusBadge status={e.status} />
                </div>
                <p className="mt-1.5 truncate text-[12.5px] text-muted-foreground">{e.interest}</p>
                <div className="mt-2 flex items-center gap-2 border-t border-border pt-2">
                  <Btn size="sm" className="flex-1"><Phone className="h-3.5 w-3.5" /> Call</Btn>
                  <Btn size="sm" className="flex-1"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</Btn>
                  <Btn size="sm" variant="primary" className="flex-1">Bill Now</Btn>
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
