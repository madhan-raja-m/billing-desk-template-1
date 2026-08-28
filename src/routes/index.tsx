import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  Plus,
  Receipt,
  Users,
  Wallet,
  Percent,
  IndianRupee,
  CalendarDays,
} from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { Panel, StatusBadge, TableWrap, Td, Th, Tr, Btn } from "@/components/app/kit";
import {
  dashboardStats,
  inr,
  invoices,
  paymentMix,
  salesTrend,
  shortDate,
  topCustomers,
  topProducts,
} from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Billing Desk" },
      { name: "description", content: "Daily sales, GST collected, invoices and customer insights in one compact billing dashboard." },
      { property: "og:title", content: "Billing Desk — Professional Billing Dashboard" },
      { property: "og:description", content: "A premium SaaS billing dashboard for fast daily invoicing, GST reports and customer management." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Today's Sales", value: inr(dashboardStats.todaySales), delta: dashboardStats.todayDelta, icon: IndianRupee, note: "vs yesterday" },
  { label: "Monthly Sales", value: inr(dashboardStats.monthSales), delta: dashboardStats.monthDelta, icon: CalendarDays, note: "Aug 2026" },
  { label: "Invoices", value: dashboardStats.invoiceCount.toString(), delta: dashboardStats.invoiceDelta, icon: Receipt, note: "this month" },
  { label: "Customers", value: dashboardStats.customerCount.toLocaleString("en-IN"), delta: dashboardStats.customerDelta, icon: Users, note: "total active" },
  { label: "Avg. Invoice Value", value: inr(dashboardStats.avgInvoice), delta: dashboardStats.avgDelta, icon: Wallet, note: "this month" },
  { label: "GST Collected", value: inr(dashboardStats.gstCollected), delta: dashboardStats.gstDelta, icon: Percent, note: "payable" },
];

const chartColors = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

function tooltipStyle() {
  return {
    contentStyle: {
      background: "var(--color-popover)",
      border: "1px solid var(--color-border)",
      borderRadius: 8,
      fontSize: 12,
      boxShadow: "var(--shadow-pop)",
      color: "var(--color-foreground)",
    },
    labelStyle: { color: "var(--color-muted-foreground)", fontSize: 11 },
  };
}

function Dashboard() {
  return (
    <AppShell>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pb-3 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-[17px] font-semibold sm:text-xl">Dashboard</h1>
          <p className="mt-0.5 truncate text-[12.5px] text-muted-foreground">
            Thursday, 27 August 2026 · Meridian Traders Pvt. Ltd.
          </p>
        </div>
        <Link
          to="/create-invoice"
          className="brand-gradient inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3.5 text-[13px] font-semibold text-primary-foreground shadow-raise transition-all hover:brightness-108 active:translate-y-px"
        >
          <Plus className="h-4 w-4" /> Create Invoice
        </Link>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2.5 lg:grid-cols-6">
        {stats.map((s) => {
          const up = s.delta >= 0;
          return (
            <div key={s.label} className="plate relative overflow-hidden p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[11.5px] font-medium tracking-wide text-muted-foreground uppercase">
                  {s.label}
                </p>
                <s.icon className="h-3.5 w-3.5 shrink-0 text-primary opacity-70" />
              </div>
              <p className="tnum mt-1.5 truncate text-[19px] leading-tight font-semibold">{s.value}</p>
              <div className="mt-1 flex items-center gap-1 text-[11.5px]">
                <span
                  className={`inline-flex items-center gap-0.5 font-medium ${up ? "text-success" : "text-destructive"}`}
                >
                  {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(s.delta)}%
                </span>
                <span className="truncate text-muted-foreground">{s.note}</span>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-px brand-gradient opacity-40" />
            </div>
          );
        })}
      </div>

      <div className="mb-3 grid gap-2.5 lg:grid-cols-3">
        <Panel title="Sales Trend" className="lg:col-span-2" bodyClassName="p-2 pt-3">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrend} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip {...tooltipStyle()} formatter={(v: number) => [inr(v), "Sales"]} />
                <Area type="monotone" dataKey="sales" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#salesFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Payment Methods" bodyClassName="p-2 pt-3">
          <div className="flex h-56 items-center">
            <ResponsiveContainer width="55%" height="100%">
              <PieChart>
                <Pie data={paymentMix} dataKey="value" innerRadius={38} outerRadius={62} paddingAngle={2} stroke="none">
                  {paymentMix.map((_, i) => (
                    <Cell key={i} fill={chartColors[i % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle()} formatter={(v: number) => [`${v}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
            <ul className="flex-1 space-y-1.5 pr-1">
              {paymentMix.map((p, i) => (
                <li key={p.name} className="flex items-center gap-2 text-[12.5px]">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: chartColors[i % chartColors.length] }} />
                  <span className="min-w-0 flex-1 truncate text-muted-foreground">{p.name}</span>
                  <span className="tnum font-medium">{p.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>

      <div className="mb-3 grid gap-2.5 lg:grid-cols-2">
        <Panel title="Top Products" bodyClassName="p-2 pt-3">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ top: 0, right: 12, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <YAxis type="category" dataKey="name" width={116} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} tickLine={false} axisLine={false} />
                <Tooltip {...tooltipStyle()} cursor={{ fill: "var(--color-muted)" }} formatter={(v: number) => [inr(v), "Revenue"]} />
                <Bar dataKey="value" fill="var(--color-chart-1)" radius={[0, 3, 3, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Top Customers" bodyClassName="p-0">
          <ul className="divide-y divide-border">
            {topCustomers.map((c, i) => (
              <li key={c.name} className="flex items-center gap-2.5 px-3.5 py-2.5">
                <span className="grid h-6.5 w-6.5 shrink-0 place-items-center rounded-md bg-primary-soft text-[11px] font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{c.name}</span>
                <span className="tnum text-[13px] font-semibold">{inr(c.value, true)}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[14px] font-semibold">Recent Invoices</h2>
        <Link
          to="/invoices"
          className="rounded-md px-2 py-1 text-[12.5px] font-medium text-primary hover:bg-primary-soft"
        >
          View all
        </Link>
      </div>

      <TableWrap>
        <thead>
          <tr>
            <Th>Invoice</Th>
            <Th>Customer</Th>
            <Th>Date</Th>
            <Th className="text-right">Amount</Th>
            <Th>Payment</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {invoices.slice(0, 7).map((inv) => (
            <Tr key={inv.id}>
              <Td className="font-medium whitespace-nowrap text-primary">{inv.number}</Td>
              <Td className="max-w-[180px] truncate">{inv.customer}</Td>
              <Td className="whitespace-nowrap text-muted-foreground">{shortDate(inv.date)}</Td>
              <Td className="tnum text-right font-semibold">{inr(inv.amount)}</Td>
              <Td className="text-muted-foreground">{inv.payment}</Td>
              <Td>
                <StatusBadge status={inv.status} />
              </Td>
            </Tr>
          ))}
        </tbody>
      </TableWrap>
    </AppShell>
  );
}
