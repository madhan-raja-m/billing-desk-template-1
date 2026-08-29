import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FilePlus2, Mail, MessageCircle, Phone, MapPin, BadgeCheck } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { Btn, EmptyState, Panel, StatusBadge, TableWrap, Td, Th, Tr } from "@/components/app/kit";
import { customers, inr, invoices, shortDate } from "@/data/mock";

export const Route = createFileRoute("/customers/$id")({
  head: () => ({
    meta: [
      { title: "Customer Details — Billing Desk" },
      { name: "description", content: "Customer profile with lifetime purchase value, invoice history and quick contact actions." },
      { property: "og:title", content: "Customer Details — Billing Desk" },
      { property: "og:description", content: "See purchases, invoice history and contact a customer instantly." },
    ],
  }),
  component: CustomerDetail,
});

function CustomerDetail() {
  const { id } = Route.useParams();
  const customer = customers.find((c) => c.id === id);
  const history = invoices.filter((i) => i.customerId === id);

  if (!customer) {
    return (
      <AppShell>
        <div className="plate">
          <EmptyState title="Customer not found" hint="This customer may have been removed." />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Link to="/customers" className="mb-2 inline-flex items-center gap-1 text-[12.5px] text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to customers
      </Link>

      <div className="plate mb-2.5 p-3.5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="brand-gradient grid h-11 w-11 shrink-0 place-items-center rounded-lg text-[15px] font-semibold text-primary-foreground shadow-raise">
              {customer.name.slice(0, 2).toUpperCase()}
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-[17px] font-semibold">{customer.name}</h1>
              <p className="tnum truncate text-[12.5px] text-muted-foreground">
                {customer.mobile} · {customer.email}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Btn size="sm" variant="primary"><FilePlus2 className="h-3.5 w-3.5" /> Create Invoice</Btn>
            <Btn size="sm"><Phone className="h-3.5 w-3.5" /> Call</Btn>
            <Btn size="sm"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</Btn>
            <Btn size="sm"><Mail className="h-3.5 w-3.5" /> Email</Btn>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-2.5 text-[12.5px] text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {customer.address}</span>
          <span className="inline-flex items-center gap-1"><BadgeCheck className="h-3.5 w-3.5" /> GSTIN: {customer.gstin ?? "Not registered"}</span>
          <span>Customer ID: {customer.id}</span>
        </div>
      </div>

      <div className="mb-2.5 grid grid-cols-3 gap-2.5">
        {[
          { label: "Total Purchases", value: inr(customer.totalPurchase) },
          { label: "Invoice Count", value: String(customer.invoices) },
          { label: "Last Purchase", value: shortDate(customer.lastPurchase) },
        ].map((s) => (
          <div key={s.label} className="plate p-3">
            <p className="text-[11px] tracking-wide text-muted-foreground uppercase">{s.label}</p>
            <p className="tnum mt-1 truncate text-[17px] font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      <Panel title="Invoice History" bodyClassName="p-0">
        {history.length === 0 ? (
          <EmptyState title="No invoices yet" hint="Invoices raised for this customer will appear here." />
        ) : (
          <TableWrap className="rounded-none border-0 shadow-none">
            <thead>
              <tr>
                <Th>Invoice</Th>
                <Th>Date</Th>
                <Th className="text-right">Amount</Th>
                <Th>Payment</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {history.map((i) => (
                <Tr key={i.id}>
                  <Td className="font-medium text-primary">{i.number}</Td>
                  <Td className="whitespace-nowrap text-muted-foreground">{shortDate(i.date)}</Td>
                  <Td className="tnum text-right font-semibold">{inr(i.amount)}</Td>
                  <Td className="text-muted-foreground">{i.payment}</Td>
                  <Td><StatusBadge status={i.status} /></Td>
                </Tr>
              ))}
            </tbody>
          </TableWrap>
        )}
      </Panel>
    </AppShell>
  );
}
