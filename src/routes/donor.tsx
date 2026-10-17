import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { BLOOD_GROUPS, CITIES } from "@/lib/demo-data";
import { DemoBadge } from "@/components/site";

export const Route = createFileRoute("/donor")({
  head: () => ({
    meta: [
      { title: "Become a donor – BloodBridge AI" },
      { name: "description", content: "Register once and get opt-in alerts when someone nearby needs your blood group." },
      { property: "og:title", content: "Become a blood donor – BloodBridge AI" },
      { property: "og:description", content: "Opt-in alerts, private location, no pressure." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Donor,
});

function Donor() {
  const [done, setDone] = useState<string | null>(null);
  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <p className="eyebrow">Volunteer portal</p>
      <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">Become a donor</h1>
      <p className="mt-2 text-muted-foreground">Register once. We'll only reach out when someone near you needs your blood group.</p>
      <div className="card-surface mt-8 p-6">
        {done ? (
          <div role="status" className="text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
            <h2 className="mt-3 text-xl font-bold">Thank you, {done}</h2>
            <p className="mt-1 text-muted-foreground">You're registered. You can change your availability anytime.</p>
            <button className="btn btn-outline mt-6" onClick={() => setDone(null)}>Register another donor</button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setDone(String(new FormData(e.currentTarget).get("name"))); }}>
            <div className="flex justify-end"><DemoBadge /></div>
            <label className="block text-sm font-medium">Full name<input name="name" required className="field mt-1" autoComplete="name" /></label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium">Blood group<select name="group" className="field mt-1">{BLOOD_GROUPS.map((g) => <option key={g}>{g}</option>)}</select></label>
              <label className="block text-sm font-medium">City<select name="city" className="field mt-1">{CITIES.map((g) => <option key={g}>{g}</option>)}</select></label>
            </div>
            <label className="block text-sm font-medium">Availability
              <select name="avail" className="field mt-1">
                <option>Available now</option><option>Weekends only</option><option>Emergencies only</option><option>Not available this month</option>
              </select>
            </label>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" required className="mt-1 h-4 w-4 accent-primary" />
              <span>I agree to receive opt-in alerts when someone nearby needs my blood group. I can opt out anytime.</span>
            </label>
            <button className="btn btn-primary w-full">Register as donor</button>
          </form>
        )}
      </div>
    </div>
  );
}
