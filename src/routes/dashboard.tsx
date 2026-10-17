import { createFileRoute } from "@tanstack/react-router";
import { BLOOD_GROUPS, CITIES } from "@/lib/demo-data";
import { DemoBadge } from "@/components/site";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "National dashboard – BloodBridge AI" },
      { name: "description", content: "Live view of blood group stock, expiries, regional shortages and pending requests (demo data)." },
      { property: "og:title", content: "National blood stock dashboard – BloodBridge AI" },
      { property: "og:description", content: "Blood group tiles, expiry alerts, regional shortages and fulfillment trends." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const stock: Record<string, { units: number; expiring: number } | undefined> = {
  "O−": { units: 412, expiring: 38 }, "O+": { units: 3820, expiring: 140 }, "A−": { units: 298, expiring: 12 }, "A+": { units: 2960, expiring: 96 },
  "B−": { units: 236, expiring: 21 }, "B+": { units: 3410, expiring: 118 }, "AB−": { units: 84, expiring: 6 }, "AB+": { units: 1120, expiring: 44 },
};
const levels = ["ok", "low", "critical"] as const;
const heat: Record<string, (typeof levels)[number][]> = {
  Mumbai: ["low", "ok", "critical", "ok", "low", "ok", "critical", "ok"],
  Pune: ["ok", "ok", "low", "ok", "critical", "ok", "low", "ok"],
  Nagpur: ["critical", "ok", "low", "ok", "low", "low", "critical", "ok"],
  Delhi: ["low", "ok", "ok", "ok", "low", "ok", "low", "ok"],
};
const cellCls = { ok: "bg-success-soft text-success", low: "bg-warning-soft text-warning", critical: "bg-coral-soft text-destructive" };
const requests = [
  { id: "REQ-2041", h: "Lokmanya Tilak Hospital, Mumbai", g: "O−", c: "Packed red cells", u: 3, s: "Matching" },
  { id: "REQ-2040", h: "AIIMS Trauma Centre, Delhi", g: "AB−", c: "Plasma", u: 2, s: "Awaiting verification" },
  { id: "REQ-2038", h: "Sassoon General, Pune", g: "B+", c: "Platelets", u: 4, s: "Donors alerted" },
  { id: "REQ-2035", h: "GMC Nagpur", g: "A−", c: "Whole blood", u: 1, s: "Matching" },
];
const trend = [42, 38, 35, 29, 24, 19, 15, 13, 11];

function Dashboard() {
  const max = Math.max(...trend);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">National dashboard</p>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">Blood stock across India</h1>
        </div>
        <DemoBadge />
      </div>

      <section aria-label="Blood groups" className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {BLOOD_GROUPS.map((g) => (
          <div key={g} className="card-surface card-lift p-5">
            <div className="flex items-start justify-between">
              <p className="font-heading text-2xl font-extrabold text-primary">{g}</p>
              {(stock[g]?.units ?? 0) < 500 && <span className="rounded-full bg-warning-soft px-2 py-0.5 text-[11px] font-bold text-warning">Low</span>}
            </div>
            <p className="mt-3 font-heading text-2xl font-bold">{(stock[g]?.units ?? 0).toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted-foreground">units available</p>
            <span className="mt-3 inline-block rounded-full bg-muted px-2.5 py-1 text-xs font-semibold">{stock[g]?.expiring ?? 0} expire in 3 days</span>
          </div>
        ))}
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="card-surface overflow-x-auto p-5 sm:p-6">
          <h2 className="text-lg font-bold">Regional shortage map</h2>
          <table className="mt-4 w-full min-w-[480px] border-separate border-spacing-1 text-center text-xs">
            <thead><tr><th className="text-left font-semibold">City</th>{BLOOD_GROUPS.map((g) => <th key={g} className="font-semibold">{g}</th>)}</tr></thead>
            <tbody>
              {CITIES.map((c) => (
                <tr key={c}>
                  <th className="text-left font-medium">{c}</th>
                  {(heat[c] ?? []).map((l, i) => <td key={i} className={`rounded-lg py-2 font-semibold capitalize ${cellCls[l]}`}>{l}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card-surface p-5 sm:p-6">
          <h2 className="text-lg font-bold">Average time to a match</h2>
          <p className="text-sm text-muted-foreground">Minutes, last 9 weeks</p>
          <div className="mt-6 flex h-40 items-end gap-2" role="img" aria-label="Match time fell from 42 to 11 minutes">
            {trend.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">{v}</span>
                <div className={`w-full rounded-t-lg ${i === trend.length - 1 ? "bg-primary" : "bg-chart-1/70"}`} style={{ height: `${(v / max) * 120}px` }} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="card-surface mt-6 overflow-x-auto p-5 sm:p-6">
        <h2 className="text-lg font-bold">Pending requests</h2>
        <table className="mt-4 w-full min-w-[600px] text-left text-sm">
          <thead className="text-xs text-muted-foreground"><tr><th className="py-2">ID</th><th>Hospital</th><th>Group</th><th>Component</th><th>Units</th><th>Status</th></tr></thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="py-3 font-mono text-xs">{r.id}</td><td>{r.h}</td><td className="font-bold text-primary">{r.g}</td><td>{r.c}</td><td>{r.u}</td>
                <td><span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold">{r.s}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
