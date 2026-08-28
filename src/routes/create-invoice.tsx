import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Phone, Plus, Search, Trash2, X, Save, Printer } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { Btn, Field, Panel, inputClass, inputErrorClass } from "@/components/app/kit";
import { cn } from "@/lib/utils";
import { customers, inr, products, type Product } from "@/data/mock";

export const Route = createFileRoute("/create-invoice")({
  head: () => ({
    meta: [
      { title: "Create Invoice — Billing Desk" },
      { name: "description", content: "Fast keyboard-friendly billing screen with customer lookup, product entry, GST and live invoice totals." },
      { property: "og:title", content: "Create Invoice — Billing Desk" },
      { property: "og:description", content: "Bill a customer in seconds with mobile-number lookup, product search and instant GST totals." },
    ],
  }),
  component: CreateInvoice,
});

type Line = { key: number; product: Product | null; qty: number; price: number; gst: number };

let seq = 1;
const newLine = (): Line => ({ key: seq++, product: null, qty: 1, price: 0, gst: 18 });

function CreateInvoice() {
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gstBilling, setGstBilling] = useState(true);
  const [payment, setPayment] = useState("UPI");
  const [discount, setDiscount] = useState(0);
  const [lines, setLines] = useState<Line[]>([newLine()]);
  const [touched, setTouched] = useState(false);
  const [saved, setSaved] = useState(false);

  const matches = useMemo(() => {
    const q = mobile.replace(/\D/g, "");
    if (q.length < 3) return [];
    return customers.filter((c) => c.mobile.replace(/\D/g, "").includes(q) || c.name.toLowerCase().includes(mobile.toLowerCase())).slice(0, 5);
  }, [mobile]);

  const picked = customers.find((c) => c.mobile === mobile);

  const totals = useMemo(() => {
    const sub = lines.reduce((s, l) => s + l.qty * l.price, 0);
    const afterDisc = Math.max(sub - discount, 0);
    const gst = gstBilling
      ? lines.reduce((s, l) => {
          const share = sub > 0 ? (l.qty * l.price) / sub : 0;
          return s + (afterDisc * share * l.gst) / 100;
        }, 0)
      : 0;
    return { sub, gst, total: afterDisc + gst };
  }, [lines, discount, gstBilling]);

  const nameError = touched && !name.trim() ? "Customer name is required" : "";
  const mobileError = touched && mobile.replace(/\D/g, "").length < 10 ? "Enter a valid 10-digit mobile number" : "";
  const itemsError = touched && lines.every((l) => !l.product) ? "Add at least one product to bill" : "";

  const update = (key: number, patch: Partial<Line>) =>
    setLines((ls) => ls.map((l) => (l.key === key ? { ...l, ...patch } : l)));

  return (
    <AppShell>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pb-3 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-[17px] font-semibold sm:text-xl">Create Invoice</h1>
          <p className="mt-0.5 truncate text-[12.5px] text-muted-foreground">
            Invoice INV-2026-0413 · 27 Aug 2026
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Btn variant="ghost" size="sm">
            <Save className="h-3.5 w-3.5" /> Draft
          </Btn>
          <Btn variant="default" size="sm">
            <Printer className="h-3.5 w-3.5" /> Preview
          </Btn>
        </div>
      </div>

      {saved && (
        <div className="mb-3 flex items-center gap-2 rounded-md border border-success/25 bg-success/8 px-3 py-2 text-[13px] text-success">
          <Check className="h-4 w-4" /> Invoice created successfully (demo only — no data is stored).
          <button className="ml-auto text-muted-foreground" onClick={() => setSaved(false)} aria-label="Dismiss">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div className="grid gap-2.5 xl:grid-cols-[minmax(0,1fr)_312px]">
        <div className="space-y-2.5">
          {/* Customer + invoice meta */}
          <Panel title="Customer & Invoice" bodyClassName="p-3">
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Mobile number" required error={mobileError} className="relative">
                <div className="relative">
                  <Phone className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    inputMode="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="98xxx xxxxx"
                    className={cn(inputClass, "pl-8 tnum", mobileError && inputErrorClass)}
                  />
                </div>
                {matches.length > 0 && !picked && (
                  <ul className="absolute top-full right-0 left-0 z-20 mt-1 overflow-hidden rounded-md border border-border bg-popover shadow-pop">
                    {matches.map((c) => (
                      <li key={c.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setMobile(c.mobile);
                            setName(c.name);
                            setEmail(c.email);
                          }}
                          className="flex w-full items-center gap-2 px-2.5 py-2 text-left hover:bg-primary-soft"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] font-medium">{c.name}</span>
                            <span className="tnum block truncate text-[11.5px] text-muted-foreground">
                              {c.mobile} · {c.invoices} invoices
                            </span>
                          </span>
                          <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </Field>

              <Field label="Customer name" required error={nameError}>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Walk-in customer"
                  className={cn(inputClass, nameError && inputErrorClass)}
                />
              </Field>

              <Field label="Email">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="optional@email.com"
                  className={inputClass}
                />
              </Field>

              <Field label="Invoice number">
                <input value="INV-2026-0413" readOnly disabled className={cn(inputClass, "tnum")} />
              </Field>

              <Field label="Invoice date">
                <input type="date" defaultValue="2026-08-27" className={cn(inputClass, "tnum")} />
              </Field>

              <Field label="Payment method">
                <select value={payment} onChange={(e) => setPayment(e.target.value)} className={inputClass}>
                  {["Cash", "UPI", "Card", "Bank Transfer", "Credit"].map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </Field>

              <Field label="Place of supply">
                <select className={inputClass} defaultValue="Maharashtra (27)">
                  <option>Maharashtra (27)</option>
                  <option>Gujarat (24)</option>
                  <option>Karnataka (29)</option>
                  <option>Delhi (07)</option>
                </select>
              </Field>

              <div className="flex items-end">
                <label className="flex h-9 w-full cursor-pointer items-center gap-2 rounded-md border border-border bg-surface-muted px-2.5 text-[13px] font-medium">
                  <input
                    type="checkbox"
                    checked={gstBilling}
                    onChange={(e) => setGstBilling(e.target.checked)}
                    className="h-3.5 w-3.5 accent-[var(--color-primary)]"
                  />
                  GST Billing
                </label>
              </div>
            </div>
          </Panel>

          {/* Items */}
          <Panel
            title="Products"
            action={<span className="text-[11.5px] text-muted-foreground">{lines.length} line item(s)</span>}
            bodyClassName="p-0"
          >
            {/* desktop grid */}
            <div className="hidden md:block">
              <div className="grid grid-cols-[minmax(0,1fr)_74px_100px_84px_110px_32px] gap-2 border-b border-border bg-surface-muted px-3 py-1.5 text-[11.5px] tracking-wide text-muted-foreground uppercase">
                <span>Product</span>
                <span className="text-right">Qty</span>
                <span className="text-right">Price</span>
                <span className="text-right">GST %</span>
                <span className="text-right">Amount</span>
                <span />
              </div>
              {lines.map((l) => (
                <div
                  key={l.key}
                  className="grid grid-cols-[minmax(0,1fr)_74px_100px_84px_110px_32px] items-center gap-2 border-b border-border px-3 py-1.5"
                >
                  <select
                    value={l.product?.id ?? ""}
                    onChange={(e) => {
                      const p = products.find((x) => x.id === e.target.value) ?? null;
                      update(l.key, { product: p, price: p?.price ?? 0, gst: p?.gst ?? 18 });
                    }}
                    className={cn(inputClass, "h-8", itemsError && !l.product && inputErrorClass)}
                  >
                    <option value="">Search or select product…</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} · {p.sku}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={1}
                    value={l.qty}
                    onChange={(e) => update(l.key, { qty: Number(e.target.value) })}
                    className={cn(inputClass, "tnum h-8 text-right")}
                  />
                  <input
                    type="number"
                    value={l.price}
                    onChange={(e) => update(l.key, { price: Number(e.target.value) })}
                    className={cn(inputClass, "tnum h-8 text-right")}
                  />
                  <input
                    type="number"
                    value={l.gst}
                    onChange={(e) => update(l.key, { gst: Number(e.target.value) })}
                    disabled={!gstBilling}
                    className={cn(inputClass, "tnum h-8 text-right")}
                  />
                  <span className="tnum text-right text-[13px] font-semibold">{inr(l.qty * l.price)}</span>
                  <button
                    onClick={() => setLines((ls) => (ls.length > 1 ? ls.filter((x) => x.key !== l.key) : ls))}
                    className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Remove line"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* mobile cards */}
            <div className="divide-y divide-border md:hidden">
              {lines.map((l, i) => (
                <div key={l.key} className="space-y-2 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11.5px] font-medium tracking-wide text-muted-foreground uppercase">
                      Item {i + 1}
                    </span>
                    <button
                      onClick={() => setLines((ls) => (ls.length > 1 ? ls.filter((x) => x.key !== l.key) : ls))}
                      className="text-muted-foreground"
                      aria-label="Remove line"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <select
                    value={l.product?.id ?? ""}
                    onChange={(e) => {
                      const p = products.find((x) => x.id === e.target.value) ?? null;
                      update(l.key, { product: p, price: p?.price ?? 0, gst: p?.gst ?? 18 });
                    }}
                    className={inputClass}
                  >
                    <option value="">Select product…</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <div className="grid grid-cols-3 gap-2">
                    <Field label="Qty">
                      <input
                        type="number"
                        value={l.qty}
                        onChange={(e) => update(l.key, { qty: Number(e.target.value) })}
                        className={cn(inputClass, "tnum text-right")}
                      />
                    </Field>
                    <Field label="Price">
                      <input
                        type="number"
                        value={l.price}
                        onChange={(e) => update(l.key, { price: Number(e.target.value) })}
                        className={cn(inputClass, "tnum text-right")}
                      />
                    </Field>
                    <Field label="GST %">
                      <input
                        type="number"
                        value={l.gst}
                        onChange={(e) => update(l.key, { gst: Number(e.target.value) })}
                        disabled={!gstBilling}
                        className={cn(inputClass, "tnum text-right")}
                      />
                    </Field>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 text-[13px]">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="tnum font-semibold">{inr(l.qty * l.price)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 px-3 py-2">
              {itemsError ? (
                <p className="text-[11.5px] font-medium text-destructive">{itemsError}</p>
              ) : (
                <span className="text-[11.5px] text-muted-foreground">Press Add Item to bill more products</span>
              )}
              <Btn size="sm" variant="soft" onClick={() => setLines((ls) => [...ls, newLine()])}>
                <Plus className="h-3.5 w-3.5" /> Add Item
              </Btn>
            </div>
          </Panel>
        </div>

        {/* Summary */}
        <aside className="xl:sticky xl:top-16 xl:self-start">
          <Panel title="Invoice Summary" bodyClassName="p-0">
            <dl className="divide-y divide-border text-[13px]">
              <div className="flex justify-between px-3.5 py-2">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tnum font-medium">{inr(totals.sub)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 px-3.5 py-2">
                <dt className="text-muted-foreground">Discount</dt>
                <dd>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className={cn(inputClass, "tnum h-7.5 w-24 text-right")}
                  />
                </dd>
              </div>
              <div className="flex justify-between px-3.5 py-2">
                <dt className="text-muted-foreground">GST {gstBilling ? "" : "(disabled)"}</dt>
                <dd className="tnum font-medium">{inr(Math.round(totals.gst))}</dd>
              </div>
              <div className="flex items-center justify-between bg-primary-soft px-3.5 py-3">
                <dt className="text-[13px] font-semibold">Grand Total</dt>
                <dd className="tnum text-[19px] font-semibold text-primary">{inr(Math.round(totals.total))}</dd>
              </div>
            </dl>
            <div className="space-y-2 border-t border-border p-3">
              <Btn
                variant="primary"
                className="h-10 w-full text-[13.5px] tracking-wide"
                onClick={() => {
                  setTouched(true);
                  if (name.trim() && mobile.replace(/\D/g, "").length >= 10 && lines.some((l) => l.product)) {
                    setSaved(true);
                  }
                }}
              >
                CREATE INVOICE
              </Btn>
              <div className="grid grid-cols-2 gap-2">
                <Btn size="sm">Save & Print</Btn>
                <Btn size="sm" variant="ghost">
                  Clear
                </Btn>
              </div>
              <p className="text-center text-[11px] text-muted-foreground">
                Prototype only — nothing is submitted to a server.
              </p>
            </div>
          </Panel>
        </aside>
      </div>

      {/* mobile sticky total bar */}
      <div className="no-print fixed inset-x-0 bottom-13 z-20 flex items-center gap-2 border-t border-border bg-surface/95 px-3 py-2 backdrop-blur xl:hidden">
        <div className="min-w-0 flex-1">
          <p className="text-[10.5px] tracking-wide text-muted-foreground uppercase">Grand Total</p>
          <p className="tnum truncate text-[16px] font-semibold text-primary">{inr(Math.round(totals.total))}</p>
        </div>
        <Btn variant="primary" className="h-9" onClick={() => setTouched(true)}>
          Create Invoice
        </Btn>
      </div>
    </AppShell>
  );
}
