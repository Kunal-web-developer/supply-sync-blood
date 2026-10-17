import { describe, expect, it } from "vitest";
import { BANKS, BLOOD_GROUPS, CITIES, COMPONENTS, mockUnits, searchBanks } from "@/lib/demo-data";

const total = (pred: (g: string, c: string) => boolean) => {
  let sum = 0;
  for (const city of CITIES)
    for (const b of BANKS[city])
      for (const g of BLOOD_GROUPS)
        for (const c of COMPONENTS) if (pred(g, c)) sum += mockUnits(b.name, g, c);
  return sum;
};

describe("demo stock", () => {
  it("shows 4 banks per city", () => {
    for (const city of CITIES) expect(searchBanks(city, "O+", "Plasma")).toHaveLength(4);
  });
  it("negative groups have lower stock than positive", () => {
    expect(total((g) => g.includes("−"))).toBeLessThan(total((g) => g.includes("+")) / 2);
  });
  it("platelets have lower stock than whole blood", () => {
    expect(total((_, c) => c === "Platelets")).toBeLessThan(total((_, c) => c === "Whole blood") / 2);
  });
});
