import { Link } from "@tanstack/react-router";
import { Droplet, Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-heading text-lg font-extrabold">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-coral-soft text-primary">
        <Droplet className="h-5 w-5 fill-current" aria-hidden />
      </span>
      BloodBridge AI
    </Link>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const d = localStorage.getItem("bb-theme") === "dark";
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
  }, []);
  const toggle = () => {
    const d = !dark;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
    localStorage.setItem("bb-theme", d ? "dark" : "light");
  };
  return (
    <button onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

const links = [
  { href: "/#how", label: "How it works" },
  { href: "/#portals", label: "Portals" },
  { href: "/#forecast", label: "Forecasting" },
  { href: "/#trust", label: "Trust" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-muted-foreground hover:text-foreground">{l.label}</a>
          ))}
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <a href="/#request" className="btn btn-primary hidden sm:inline-flex">Find blood</a>
          <button className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 font-medium">{l.label}</a>
          ))}
          <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 font-medium">Dashboard</Link>
          <a href="/#request" onClick={() => setOpen(false)} className="btn btn-primary mt-2">Find blood</a>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <Logo />
        <nav aria-label="Project links" className="flex flex-wrap gap-5 text-sm font-medium">
          <a href="https://devpost.com" target="_blank" rel="noreferrer" className="hover:text-primary">DevPost</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary">GitHub</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-primary">Demo video</a>
        </nav>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-8 text-sm text-muted-foreground">
        Built with Python, PyTorch, TensorRT, FastAPI, PostgreSQL, React. All figures shown are demo data.
      </p>
    </footer>
  );
}

export function DemoBadge() {
  return <span className="rounded-full bg-warning-soft px-2.5 py-1 text-xs font-semibold text-warning">Demo data</span>;
}
