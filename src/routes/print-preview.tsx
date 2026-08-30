import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Printer, Download } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { Btn, PageHeader } from "@/components/app/kit";
import { cn } from "@/lib/utils";
import { business, inr } from "@/data/mock";

export const Route = createFileRoute("/print-preview")({
  head: () => ({
    meta: [
      { title: "Print Preview — Billing Desk" },
      { name: "description", content: "Visual mockups of A4, A5, 80mm and 58mm thermal invoice print formats." },
      { property: "og:title", content: "Print Preview — Billing Desk" },
      { property: "og:description", content: "See how invoices print on A4, A5 and thermal receipt paper before you go live." },
    ],
  }),
  component: PrintPreview,
});

const FORMATS = [
  { id: "a4", label: "A4 Formal Invoice" },
  { id: "a5", label: "A5 Invoice" },
  { id: "80", label: "80mm Thermal" },
  { id: "58", label: "58mm Thermal" },
] as const;

const items = [
  { name: "Havells Ceiling Fan — Enticer", hsn: "8414", qty: 4, rate: 2450, gst: 18 },
  { name: "Finolex 1.5sqmm FR Wire 90m", hsn: "8544", qty: 2, rate: 1899, gst: 18 },
  { name: "Anchor Roma 6A Switch", hsn: "8536", qty: 12, rate: 95, gst: 18 },
];
const sub = items.reduce((s, i) => s + i.qty * i.rate, 0);
const gst = Math.round(items.reduce((s, i) => s + (i.qty * i.rate * i.gst) / 100, 0));

function A4({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("mx-auto bg-white text-black shadow-pop", compact ? "w-[420px] p-5 text-[9px]" : "w-[620px] p-8 text-[11px]")}>
      <div className="flex items-start justify-between border-b-2 border-black pb-3">
        <div>
          <p className={cn("font-bold", compact ? "text-[13px]" : "text-[17px]")}>{business.legalName}</p>
          <p className="mt-0.5 max-w-[260px] leading-snug text-neutral-600">{business.address}</p>
          <p className="text-neutral-600">GSTIN: {business.gstin} · {business.phone}</p>
        </div>
        <div className="text-right">
          <p className={cn("font-bold tracking-wide", compact ? "text-[12px]" : "text-[15px]")}>TAX INVOICE</p>
          <p className="text-neutral-600">INV-2026-0413</p>
          <p className="text-neutral-600">27 Aug 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-b border-neutral-300 py-3">
        <div>
          <p className="font-semibold text-neutral-500 uppercase">Bill to</p>
          <p className="font-semibold">Nimbus Hospitality</p>
          <p className="text-neutral-600">Powai, Mumbai 400076</p>
          <p className="text-neutral-600">GSTIN: 27AACCN5566L1Z8</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-neutral-500 uppercase">Payment</p>
          <p>Bank Transfer</p>
          <p className="text-neutral-600">Place of supply: Maharashtra (27)</p>
        </div>
      </div>

      <table className="mt-3 w-full border-collapse">
        <thead>
          <tr className="border-b border-black text-left">
            <th className="py-1">#</th><th>Description</th><th>HSN</th>
            <th className="text-right">Qty</th><th className="text-right">Rate</th>
            <th className="text-right">GST</th><th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i, n) => (
            <tr key={i.name} className="border-b border-neutral-200">
              <td className="py-1">{n + 1}</td>
              <td>{i.name}</td>
              <td>{i.hsn}</td>
              <td className="text-right">{i.qty}</td>
              <td className="text-right">{i.rate.toLocaleString("en-IN")}</td>
              <td className="text-right">{i.gst}%</td>
              <td className="text-right">{(i.qty * i.rate).toLocaleString("en-IN")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3 flex justify-end">
        <div className="w-52 space-y-1">
          <div className="flex justify-between"><span className="text-neutral-600">Subtotal</span><span>{inr(sub)}</span></div>
          <div className="flex justify-between"><span className="text-neutral-600">CGST 9%</span><span>{inr(gst / 2)}</span></div>
          <div className="flex justify-between"><span className="text-neutral-600">SGST 9%</span><span>{inr(gst / 2)}</span></div>
          <div className="flex justify-between border-t border-black pt-1 font-bold"><span>Grand Total</span><span>{inr(sub + gst)}</span></div>
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between border-t border-neutral-300 pt-3 text-neutral-600">
        <p className="max-w-[280px] leading-snug">Goods once sold will not be taken back. Warranty as per manufacturer terms.</p>
        <p className="text-center">For {business.legalName}<br /><br /><span className="text-black">Authorised Signatory</span></p>
      </div>
    </div>
  );
}

function Thermal({ width }: { width: 80 | 58 }) {
  const w = width === 80 ? "w-[280px]" : "w-[210px]";
  return (
    <div className={cn("mx-auto bg-white p-3 font-mono text-[10px] leading-tight text-black shadow-pop", w)}>
      <p className="text-center text-[12px] font-bold">MERIDIAN TRADERS</p>
      <p className="text-center">Andheri East, Mumbai</p>
      <p className="text-center">GSTIN {business.gstin}</p>
      <p className="my-1 border-t border-dashed border-black" />
      <p>Bill : INV-2026-0413</p>
      <p>Date : 27/08/2026 09:12</p>
      <p>Cust : Nimbus Hospitality</p>
      <p className="my-1 border-t border-dashed border-black" />
      {items.map((i) => (
        <div key={i.name} className="mb-1">
          <p className="truncate">{i.name}</p>
          <div className="flex justify-between">
            <span>{i.qty} x {i.rate}</span>
            <span>{(i.qty * i.rate).toLocaleString("en-IN")}</span>
          </div>
        </div>
      ))}
      <p className="my-1 border-t border-dashed border-black" />
      <div className="flex justify-between"><span>Subtotal</span><span>{sub.toLocaleString("en-IN")}</span></div>
      <div className="flex justify-between"><span>GST 18%</span><span>{gst.toLocaleString("en-IN")}</span></div>
      <div className="flex justify-between text-[12px] font-bold"><span>TOTAL</span><span>{(sub + gst).toLocaleString("en-IN")}</span></div>
      <p className="my-1 border-t border-dashed border-black" />
      <p className="text-center">Paid via Bank Transfer</p>
      <p className="mt-1 text-center">*** Thank you, visit again ***</p>
    </div>
  );
}

function PrintPreview() {
  const [fmt, setFmt] = useState<string>("a4");

  return (
    <AppShell>
      <PageHeader
        title="Print Preview"
        subtitle="Visual mockups of the supported invoice print formats"
        actions={
          <>
            <Btn size="sm"><Download className="h-3.5 w-3.5" /> PDF</Btn>
            <Btn size="sm" variant="primary" onClick={() => window.print()}><Printer className="h-3.5 w-3.5" /> Print</Btn>
          </>
        }
      />

      <div className="no-print plate mb-2.5 flex flex-wrap gap-1 p-1">
        {FORMATS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFmt(f.id)}
            className={cn(
              "rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors",
              fmt === f.id ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-secondary",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="scrollbar-thin overflow-x-auto rounded-lg border border-border bg-surface-muted p-4 sm:p-8">
        {fmt === "a4" && <A4 />}
        {fmt === "a5" && <A4 compact />}
        {fmt === "80" && <Thermal width={80} />}
        {fmt === "58" && <Thermal width={58} />}
      </div>
    </AppShell>
  );
}
