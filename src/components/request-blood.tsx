import { useState } from "react";
import { BellRing, CheckCircle2, MapPin } from "lucide-react";
import { BLOOD_GROUPS, CITIES, COMPONENTS, searchBanks, type BloodGroup, type City, type Component } from "@/lib/demo-data";
import { DemoBadge } from "./site";
import { AskBloodBridge } from "./ask-bloodbridge";

export function RequestBloodCard() {
  const [group, setGroup] = useState<BloodGroup>("O−");
  const [component, setComponent] = useState<Component>("Platelets");
  const [city, setCity] = useState<City>("Mumbai");
  const [notified, setNotified] = useState(false);
  const results = searchBanks(city, group, component);
  const none = results.every((r) => r.units === 0);
  const reset = () => setNotified(false);

  return (
    <div id="request" className="card-surface scroll-mt-24 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-bold">Request blood</h2>
        <DemoBadge />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="text-sm font-medium">
          Blood group
          <select className="field mt-1" value={group} onChange={(e) => { setGroup(e.target.value as BloodGroup); reset(); }}>
            {BLOOD_GROUPS.map((g) => <option key={g}>{g}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium">
          Component
          <select className="field mt-1" value={component} onChange={(e) => { setComponent(e.target.value as Component); reset(); }}>
            {COMPONENTS.map((g) => <option key={g}>{g}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium">
          City
          <select className="field mt-1" value={city} onChange={(e) => { setCity(e.target.value as City); reset(); }}>
            {CITIES.map((g) => <option key={g}>{g}</option>)}
          </select>
        </label>
      </div>
      <ul className="mt-5 space-y-2" aria-live="polite">
        {results.map((r) => (
          <li key={r.name} className="flex items-center justify-between gap-3 rounded-2xl bg-muted px-4 py-3">
            <div className="min-w-0">
              <p className="truncate font-semibold">{r.name}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 shrink-0" aria-hidden /> {r.km} km · verified {r.verifiedMin} min ago
              </p>
            </div>
            {r.units > 0 ? (
              <span className="shrink-0 rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-success">{r.units} units</span>
            ) : (
              <span className="shrink-0 rounded-full bg-coral-soft px-3 py-1 text-xs font-bold text-destructive">Out of stock</span>
            )}
          </li>
        ))}
      </ul>
      {none && (
        <div className="mt-4 rounded-2xl border border-primary/40 p-4">
          {notified ? (
            <p className="flex items-center gap-2 text-sm font-medium text-success" role="status">
              <CheckCircle2 className="h-4 w-4" /> Done. We'll alert you as soon as {group} {component.toLowerCase()} is available in {city}.
            </p>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm">Nothing in stock nearby right now.</p>
              <button className="btn btn-primary" onClick={() => setNotified(true)}>
                <BellRing className="h-4 w-4" /> Notify me
              </button>
            </div>
          )}
        </div>
      )}
      <details className="mt-5 rounded-2xl border border-border p-4">
        <summary className="cursor-pointer font-semibold">Ask BloodBridge in your own words</summary>
        <div className="mt-4"><AskBloodBridge /></div>
      </details>
    </div>
  );
}
