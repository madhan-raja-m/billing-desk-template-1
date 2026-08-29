import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Upload, Download, Pencil, Copy, Trash2, Eye } from "lucide-react";
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
import { inr, products } from "@/data/mock";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Billing Desk" },
      { name: "description", content: "Manage your product catalogue with SKU, HSN/SAC codes, GST rates, pricing and stock status." },
      { property: "og:title", content: "Products — Billing Desk" },
      { property: "og:description", content: "Catalogue management with import, export, GST rates and HSN codes for fast billing." },
    ],
  }),
  component: ProductsPage,
});

const PER = 8;

function ProductsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All categories");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" }>({ key: "name", dir: "asc" });

  const categories = ["All categories", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          [p.name, p.sku, p.hsn].join(" ").toLowerCase().includes(q.toLowerCase()) &&
          (cat === "All categories" || p.category === cat),
      ),
    [q, cat],
  );
  const sorted = useSorted(filtered, sort);
  const pages = Math.max(Math.ceil(sorted.length / PER), 1);
  const rows = sorted.slice((page - 1) * PER, page * PER);
  const onSort = (key: string) => setSort((s) => ({ key, dir: s.key === key && s.dir === "asc" ? "desc" : "asc" }));

  return (
    <AppShell>
      <PageHeader
        title="Products"
        subtitle={`${products.length} items in catalogue`}
        actions={
          <>
            <Btn size="sm"><Upload className="h-3.5 w-3.5" /> Import</Btn>
            <Btn size="sm"><Download className="h-3.5 w-3.5" /> Export</Btn>
            <Btn variant="primary" size="sm"><Plus className="h-3.5 w-3.5" /> Add Product</Btn>
          </>
        }
      />

      <FilterBar>
        <SearchBar value={q} onChange={(v) => { setQ(v); setPage(1); }} placeholder="Search product, SKU or HSN…" className="min-w-0 flex-1 sm:max-w-xs" />
        <select value={cat} onChange={(e) => { setCat(e.target.value); setPage(1); }} className="h-8.5 rounded-md border border-input bg-surface px-2 text-[12.5px]">
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="h-8.5 rounded-md border border-input bg-surface px-2 text-[12.5px]">
          <option>Any status</option>
          <option>Active</option>
          <option>Low stock</option>
          <option>Inactive</option>
        </select>
        <select className="h-8.5 rounded-md border border-input bg-surface px-2 text-[12.5px]">
          <option>Any GST</option>
          <option>0%</option><option>5%</option><option>12%</option><option>18%</option><option>28%</option>
        </select>
      </FilterBar>

      {rows.length === 0 ? (
        <div className="plate">
          <EmptyState title="No products match" hint="Adjust the search or category filter." action={<Btn size="sm" className="mt-1" onClick={() => { setQ(""); setCat("All categories"); }}>Reset filters</Btn>} />
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <TableWrap className="rounded-b-none border-b-0">
              <thead>
                <tr>
                  <Th sortKey="name" sort={sort} onSort={onSort}>Product</Th>
                  <Th sortKey="sku" sort={sort} onSort={onSort}>SKU</Th>
                  <Th sortKey="category" sort={sort} onSort={onSort}>Category</Th>
                  <Th sortKey="hsn" sort={sort} onSort={onSort}>HSN/SAC</Th>
                  <Th sortKey="price" sort={sort} onSort={onSort} className="text-right">Price</Th>
                  <Th sortKey="gst" sort={sort} onSort={onSort} className="text-right">GST</Th>
                  <Th sortKey="status" sort={sort} onSort={onSort}>Status</Th>
                  <Th className="w-10 text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <Tr key={p.id}>
                    <Td className="max-w-[260px]">
                      <span className="block truncate font-medium">{p.name}</span>
                      <span className="block text-[11.5px] text-muted-foreground">{p.stock} in stock</span>
                    </Td>
                    <Td className="tnum text-muted-foreground">{p.sku}</Td>
                    <Td>{p.category}</Td>
                    <Td className="tnum text-muted-foreground">{p.hsn}</Td>
                    <Td className="tnum text-right font-semibold">{inr(p.price)}</Td>
                    <Td className="tnum text-right">{p.gst}%</Td>
                    <Td><StatusBadge status={p.status} /></Td>
                    <Td className="text-right">
                      <ActionMenu items={[
                        { label: "View", icon: Eye },
                        { label: "Edit", icon: Pencil },
                        { label: "Duplicate", icon: Copy },
                        { label: "Delete", icon: Trash2, danger: true },
                      ]} />
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </TableWrap>
            <div className="plate rounded-t-none border-t-0 p-0">
              <Pager page={page} pages={pages} total={sorted.length} onPage={setPage} />
            </div>
          </div>

          <div className="space-y-2 md:hidden">
            {rows.map((p) => (
              <div key={p.id} className="plate p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-semibold">{p.name}</p>
                    <p className="tnum truncate text-[11.5px] text-muted-foreground">{p.sku} · HSN {p.hsn}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-[12.5px]">
                  <span className="text-muted-foreground">GST {p.gst}% · {p.category}</span>
                  <span className="tnum font-semibold">{inr(p.price)}</span>
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
