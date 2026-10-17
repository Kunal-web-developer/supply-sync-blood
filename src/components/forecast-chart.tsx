// Hand-drawn SVG chart: stock history (solid), AI forecast (dashed), safe level.
const actual = [82, 78, 80, 74, 70, 66, 63, 60];
const predicted = [60, 54, 47, 38, 30];
const SAFE = 40;
const W = 560, H = 260, P = 32;
const n = actual.length + predicted.length - 1;
const x = (i: number) => P + (i * (W - P * 2)) / (n - 1);
const y = (v: number) => H - P - (v / 100) * (H - P * 2);
const path = (pts: number[], off: number) => pts.map((v, i) => `${i ? "L" : "M"}${x(i + off)},${y(v)}`).join(" ");

export function ForecastChart() {
  // crossing index ~ between predicted[2] (47) and predicted[3] (38)
  const ci = actual.length - 1 + 2 + (47 - SAFE) / (47 - 38);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Stock of O negative units falling, with a predicted shortage in 72 hours">
      {[0, 25, 50, 75, 100].map((t) => (
        <g key={t}>
          <line x1={P} x2={W - P} y1={y(t)} y2={y(t)} className="stroke-border" />
          <text x={4} y={y(t) + 4} className="fill-muted-foreground text-[10px]">{t}</text>
        </g>
      ))}
      <line x1={P} x2={W - P} y1={y(SAFE)} y2={y(SAFE)} className="stroke-warning" strokeWidth={2} strokeDasharray="2 4" />
      <text x={W - P} y={y(SAFE) - 6} textAnchor="end" className="fill-warning text-[11px] font-semibold">Safe level</text>
      <path d={path(actual, 0)} fill="none" className="stroke-chart-1" strokeWidth={3} strokeLinecap="round" />
      <path d={path(predicted, actual.length - 1)} fill="none" className="stroke-primary" strokeWidth={3} strokeDasharray="7 6" strokeLinecap="round" />
      <circle cx={x(ci)} cy={y(SAFE)} r={7} className="fill-primary" />
      <circle cx={x(ci)} cy={y(SAFE)} r={12} className="fill-none stroke-primary" strokeOpacity={0.4} />
      <g transform={`translate(${x(ci) - 150}, ${y(SAFE) + 22})`}>
        <rect width={170} height={28} rx={14} className="fill-coral-soft" />
        <text x={85} y={18} textAnchor="middle" className="fill-primary text-[11px] font-bold">Shortage predicted in 72 hours</text>
      </g>
      <text x={x(0)} y={H - 8} className="fill-muted-foreground text-[10px]">7 days ago</text>
      <text x={x(actual.length - 1)} y={H - 8} textAnchor="middle" className="fill-muted-foreground text-[10px]">Today</text>
      <text x={x(n - 1)} y={H - 8} textAnchor="end" className="fill-muted-foreground text-[10px]">+4 days</text>
    </svg>
  );
}
