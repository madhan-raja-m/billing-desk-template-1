import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { Btn, Panel, PageHeader, StatusBadge, inputClass } from "@/components/app/kit";
import { ThemePicker } from "@/components/app/ThemePicker";
import { inr } from "@/data/mock";

export const Route = createFileRoute("/themes")({
  head: () => ({
    meta: [
      { title: "Themes — Billing Desk" },
      { name: "description", content: "Switch the entire billing workspace between ten professional colour themes powered by design tokens." },
      { property: "og:title", content: "Themes — Billing Desk" },
      { property: "og:description", content: "Ten professional themes — Royal Blue, Navy, Emerald, Burgundy and more — applied app-wide." },
    ],
  }),
  component: ThemesPage,
});

function ThemesPage() {
  return (
    <AppShell>
      <PageHeader title="Themes" subtitle="Every colour is a design token — themes apply across all screens instantly" />

      <Panel title="Choose a theme" className="mb-2.5">
        <ThemePicker />
      </Panel>

      <div className="grid gap-2.5 lg:grid-cols-2">
        <Panel title="Live preview — components">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Btn variant="primary">Primary</Btn>
              <Btn>Secondary</Btn>
              <Btn variant="soft">Soft</Btn>
              <Btn variant="ghost">Ghost</Btn>
              <Btn variant="danger">Danger</Btn>
              <Btn disabled>Disabled</Btn>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Paid", "Pending", "Overdue", "Cancelled", "New", "Active"].map((s) => (
                <StatusBadge key={s} status={s} />
              ))}
            </div>
            <input className={inputClass} placeholder="Input field" />
            <div className="rounded-md border border-destructive bg-destructive/5 px-2.5 py-2 text-[12.5px] font-medium text-destructive">
              Validation error — GSTIN is invalid
            </div>
          </div>
        </Panel>

        <Panel title="Live preview — invoice summary" bodyClassName="p-0">
          <dl className="divide-y divide-border text-[13px]">
            <div className="flex justify-between px-3.5 py-2"><dt className="text-muted-foreground">Subtotal</dt><dd className="tnum">{inr(42500)}</dd></div>
            <div className="flex justify-between px-3.5 py-2"><dt className="text-muted-foreground">Discount</dt><dd className="tnum">- {inr(1500)}</dd></div>
            <div className="flex justify-between px-3.5 py-2"><dt className="text-muted-foreground">GST 18%</dt><dd className="tnum">{inr(7380)}</dd></div>
            <div className="flex items-center justify-between bg-primary-soft px-3.5 py-3">
              <dt className="font-semibold">Grand Total</dt>
              <dd className="tnum text-[19px] font-semibold text-primary">{inr(48380)}</dd>
            </div>
          </dl>
        </Panel>
      </div>
    </AppShell>
  );
}
