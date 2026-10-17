export const BLOOD_GROUPS = ["O−", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"] as const;
export const COMPONENTS = ["Whole blood", "Packed red cells", "Platelets", "Plasma"] as const;
export const CITIES = ["Mumbai", "Pune", "Nagpur", "Delhi"] as const;

export type BloodGroup = (typeof BLOOD_GROUPS)[number];
export type Component = (typeof COMPONENTS)[number];
export type City = (typeof CITIES)[number];

export const BANKS: Record<City, { name: string; km: number }[]> = {
  Mumbai: [
    { name: "KEM Hospital Blood Bank", km: 2.1 },
    { name: "Tata Memorial Blood Centre", km: 4.6 },
    { name: "JJ Hospital Blood Bank", km: 6.3 },
    { name: "Lilavati Hospital Blood Bank", km: 9.8 },
  ],
  Pune: [
    { name: "Sassoon General Blood Bank", km: 1.8 },
    { name: "Ruby Hall Clinic Blood Centre", km: 3.9 },
    { name: "Jehangir Hospital Blood Bank", km: 5.2 },
    { name: "Deenanath Mangeshkar Blood Bank", km: 7.4 },
  ],
  Nagpur: [
    { name: "GMC Nagpur Blood Bank", km: 2.4 },
    { name: "Mayo Hospital Blood Centre", km: 3.1 },
    { name: "Lifeline Blood Bank", km: 6.7 },
    { name: "City Blood Bank", km: 8.9 },
  ],
  Delhi: [
    { name: "AIIMS Blood Bank", km: 3.2 },
    { name: "Red Cross Blood Bank", km: 4.4 },
    { name: "Safdarjung Hospital Blood Bank", km: 5.9 },
    { name: "Rotary Blood Bank", km: 11.2 },
  ],
};

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return Math.abs(h);
}

/** Deterministic mock stock. Negative groups and platelets are scarcer. */
export function mockUnits(bank: string, group: BloodGroup, component: Component): number {
  const h = hash(`${bank}|${group}|${component}`);
  let max = 40;
  if (group.includes("−")) max = Math.round(max * 0.25);
  if (component === "Platelets") max = Math.round(max * 0.35);
  const units = h % (max + 1);
  // ~30% chance a scarce item is fully out
  if ((group.includes("−") || component === "Platelets") && h % 10 < 3) return 0;
  return units;
}

export function searchBanks(city: City, group: BloodGroup, component: Component) {
  return BANKS[city].map((b) => ({
    ...b,
    units: mockUnits(b.name, group, component),
    verifiedMin: (hash(b.name + group) % 28) + 2,
  }));
}
