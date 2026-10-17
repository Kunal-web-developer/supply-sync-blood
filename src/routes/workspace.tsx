import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BLOOD_GROUPS, COMPONENTS } from "@/lib/demo-data";
import { DemoBadge } from "@/components/site";

export const Route = createFileRoute("/workspace")({
  head: () => ({
    meta: [
      { title: "Blood bank workspace – BloodBridge AI" },
      { name: "description", content: "Update blood inventory by group, component, units and expiry date (demo)." },
      { property: "og:title", content: "Blood bank workspace – BloodBridge AI" },
      { property: "og:description", content: "Manage live inventory and coordinate supply across your network." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Workspace,
});

type Row = { group: string; component: string; units: number; expiry: string };
const addDays = (d: number) => new Date(Date.now() + d * 864e5).toISOString().slice(0, 10);
const initial: Row[] = [
  { group: "O+", component: "Packed red cells", units: 42, expiry: addDays(21) },
  { group: "O−", component: "Platelets", units: 3, expiry: addDays(2) },
  { group: "B+", component: "Whole blood", units: 18, expiry: addDays(12) },
  { group: "AB−", component: "Plasma", units: 6, expiry: addDays(180) },
];
const daysLeft = (d: string) => Math.ceil((new Date(d).getTime() - Date.now()) / 864e5);

function Workspace() {
  const [rows, setRows] = useState(initial);
  const [msg, setMsg] = useState("");
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">KEM Hospital Blood Bank, Mumbai</p>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">Inventory workspace</h1>
        </div>
        <DemoBadge />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <form
          className="card-surface space-y-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const row: Row = { group: String(f.get("group")), component: String(f.get("component")), units: Number(f.get("units")), expiry: String(f.get("expiry")) };
            setRows((r) => [row, ...r.filter((x) => !(x.group === row.group && x.component === row.component))]);
            setMsg(`Saved ${row.units} units of ${row.group} ${row.component.toLowerCase()}.`);
          }}
        >
          <h2 className="text-lg font-bold">Update stock</h2>
          <label className="block text-sm font-medium">Blood group<select name="group" className="field mt-1">{BLOOD_GROUPS.map((g) => <option key={g}>{g}</option>)}</select></label>
          <label className="block text-sm font-medium">Component<select name="component" className="field mt-1">{COMPONENTS.map((g) => <option key={g}>{g}</option>)}</select></label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-sm font-medium">Units<input name="units" type="number" min={0} required defaultValue={10} className="field mt-1" /></label>
            <label className="block text-sm font-medium">Expiry date<input name="expiry" type="date" required defaultValue={addDays(30)} className="field mt-1" /></label>
          </div>
          <button className="btn btn-primary w-full">Save update</button>
          {msg && <p role="status" className="text-sm font-medium text-success">{msg}</p>}
        </form>
        <section className="card-surface overflow-x-auto p-6">
          <h2 className="text-lg font-bold">Current inventory</h2>
          <table className="mt-4 w-full min-w-[440px] text-left text-sm">
            <thead className="text-xs text-muted-foreground"><tr><th className="py-2">Group</th><th>Component</th><th>Units</th><th>Expiry</th></tr></thead>
            <tbody>
              {rows.map((r) => {
                const d = daysLeft(r.expiry);
                return (
                  <tr key={r.group + r.component} className="border-t border-border">
                    <td className="py-3 font-bold text-primary">{r.group}</td>
                    <td>{r.component}</td>
                    <td>{r.units === 0 ? <span className="text-destructive">Out of stock</span> : r.units}</td>
                    <td>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${d <= 3 ? "bg-warning-soft text-warning" : "bg-muted"}`}>
                        {d <= 0 ? "Expired" : `${d} days left`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
