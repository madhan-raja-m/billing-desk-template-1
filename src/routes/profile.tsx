import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { Btn, Field, Panel, PageHeader, inputClass } from "@/components/app/kit";
import { cn } from "@/lib/utils";
import { currentUser, activityLog } from "@/data/mock";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Billing Desk" },
      { name: "description", content: "Manage your operator profile, contact details, password and recent billing activity." },
      { property: "og:title", content: "Profile — Billing Desk" },
      { property: "og:description", content: "Your Billing Desk operator profile and recent activity." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <AppShell>
      <PageHeader title="Profile" subtitle="Your account details and recent activity" actions={<Btn variant="primary" size="sm">Save profile</Btn>} />

      <div className="grid gap-2.5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Panel title="Account details">
          <div className="mb-3 flex items-center gap-3 border-b border-border pb-3">
            <span className="brand-gradient grid h-12 w-12 place-items-center rounded-lg text-[16px] font-semibold text-primary-foreground shadow-raise">
              {currentUser.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold">{currentUser.name}</p>
              <p className="truncate text-[12.5px] text-muted-foreground">{currentUser.role}</p>
            </div>
            <Btn size="sm" className="ml-auto">Change photo</Btn>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <Field label="Full name"><input className={inputClass} defaultValue={currentUser.name} /></Field>
            <Field label="Email"><input className={inputClass} defaultValue={currentUser.email} /></Field>
            <Field label="Mobile"><input className={cn(inputClass, "tnum")} defaultValue="+91 98204 41120" /></Field>
            <Field label="Role"><input className={inputClass} defaultValue={currentUser.role} disabled /></Field>
            <Field label="New password" hint="Leave blank to keep current password"><input type="password" className={inputClass} placeholder="••••••••" /></Field>
            <Field label="Confirm password"><input type="password" className={inputClass} placeholder="••••••••" /></Field>
          </div>
        </Panel>

        <Panel title="Recent activity" bodyClassName="p-0">
          <ul className="divide-y divide-border">
            {activityLog.map((a, i) => (
              <li key={i} className="px-3.5 py-2.5">
                <p className="text-[12.5px]">{a.action}</p>
                <p className="text-[11.5px] text-muted-foreground">{a.time}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
