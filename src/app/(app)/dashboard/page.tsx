"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Map, Sprout, Users, BarChart3, FolderKanban, BookOpen,
  TreePine, Shield, Droplets, FlaskConical, FileText, Settings,
  Plus, TrendingUp, ArrowUpRight, AlertCircle, CheckCircle2, Clock,
  Leaf, Building2, Target, Wind,
} from "lucide-react";

interface Stats {
  arbresPlantes: number; communesActives: number; superficieHa: number;
  tauxSurvie: number; projetsActifs: number; co2Tonnes: number;
  projets: Array<{ id: string; nom: string; bailleur: string; statut: string; _count: { parcelles: number } }>;
}

const modules = [
  { name: "Carte GMV",     href: "/carte",       icon: Map,          bg: "bg-emerald-100", color: "text-emerald-600" },
  { name: "Communes",      href: "/communes",    icon: Building2,    bg: "bg-blue-100",    color: "text-blue-600"    },
  { name: "Projets",       href: "/projets",     icon: FolderKanban, bg: "bg-violet-100",  color: "text-violet-600"  },
  { name: "Parcelles",     href: "/parcelles",   icon: Sprout,       bg: "bg-lime-100",    color: "text-lime-700"    },
  { name: "Saisies",       href: "/saisies",     icon: Target,       bg: "bg-amber-100",   color: "text-amber-600"   },
  { name: "Volontaires",   href: "/volontaires", icon: Users,        bg: "bg-rose-100",    color: "text-rose-600"    },
  { name: "Pépinières",    href: "/pepinieres",  icon: TreePine,     bg: "bg-teal-100",    color: "text-teal-600"    },
  { name: "Rapports",      href: "/rapports",    icon: BarChart3,    bg: "bg-indigo-100",  color: "text-indigo-600"  },
];

const quickActions = [
  { label: "Nouvelle saisie", href: "/saisies",     icon: Plus,        color: "text-emerald-300" },
  { label: "Voir la carte",   href: "/carte",       icon: Map,         color: "text-blue-300"    },
  { label: "Rapport KPI",     href: "/rapports",    icon: BarChart3,   color: "text-amber-300"   },
  { label: "Volontaires",     href: "/volontaires", icon: Users,       color: "text-rose-300"    },
];

const statutStyle: Record<string, string> = {
  EN_COURS: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  TERMINE:  "bg-slate-100 text-slate-500 border border-slate-200",
  SUSPENDU: "bg-amber-100 text-amber-700 border border-amber-200",
  PLANIFIE: "bg-blue-100 text-blue-700 border border-blue-200",
};
const statutLabel: Record<string, string> = {
  EN_COURS:"En cours", TERMINE:"Terminé", SUSPENDU:"Suspendu", PLANIFIE:"Planifié",
};

export default function DashboardPage() {
  const { data: session } = useSession() ?? {};
  const [stats, setStats] = useState<Stats | null>(null);
  const now = new Date();
  const h = now.getHours();
  const greeting = h < 12 ? "Bonjour" : h < 18 ? "Bon après-midi" : "Bonsoir";
  const firstName = session?.user?.name?.split(" ")[0] ?? "Agent";

  useEffect(() => {
    fetch("/api/stats").then(r => r.json()).then(setStats).catch(console.error);
  }, []);

  const kpis = [
    { label: "Arbres plantés",   key: "arbresPlantes",   fmt: (v: number) => v.toLocaleString("fr-FR"), unit: "" },
    { label: "Taux de survie",   key: "tauxSurvie",      fmt: (v: number) => `${v.toFixed(1)}`,         unit: "%" },
    { label: "Superficie",       key: "superficieHa",    fmt: (v: number) => v.toFixed(0),              unit: " ha" },
    { label: "CO₂ séq.",         key: "co2Tonnes",       fmt: (v: number) => v.toLocaleString("fr-FR", { maximumFractionDigits:0 }), unit: " t" },
  ];

  return (
    <div className="space-y-6 pb-8">

      {/* ── HERO ─────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 md:p-12 border border-white/5 shadow-2xl">
        {/* Blur décors */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-teal-400/5 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex-1">
            <p className="text-slate-400 text-sm mb-2">{greeting},</p>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-3">
              GRANDE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-400">
                MURAILLE VERTE.
              </span>
            </h1>
            <p className="text-slate-400 text-base font-light max-w-md">
              {firstName}, votre plateforme de monitoring est active.
              {" "}850 km de reforestation au Sénégal.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span className="text-xs text-slate-400 font-medium">Base de données Neon · connectée</span>
            </div>
          </div>

          {/* Stat glass cards */}
          <div className="grid grid-cols-2 gap-3 md:w-72 shrink-0">
            {kpis.map(({ label, key, fmt, unit }) => {
              const v = stats ? (stats as any)[key] : null;
              return (
                <div key={key} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl text-center">
                  {v !== null ? (
                    <div className="text-2xl font-black text-white leading-none">
                      {fmt(v)}<span className="text-xs font-semibold text-emerald-400 ml-0.5">{unit}</span>
                    </div>
                  ) : (
                    <div className="h-7 bg-white/10 rounded-lg animate-pulse mx-auto w-20" />
                  )}
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">{label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Communes / Projets strip */}
        <div className="relative z-10 mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-black text-emerald-400">{stats?.communesActives ?? "…"}<span className="text-slate-600">/131</span></p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Communes</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-black text-white">{stats?.projetsActifs ?? "…"}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Projets actifs</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-black text-teal-400">8</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Bailleurs</p>
          </div>
        </div>
      </div>

      {/* ── MODULE GRID ───────────────────────────── */}
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Navigation rapide</p>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {modules.map(({ name, href, icon: Icon, bg, color }) => (
            <a key={href} href={href}
              className="group flex flex-col items-center justify-center gap-2.5 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 ring-1 ring-transparent hover:ring-slate-200 cursor-pointer">
              <div className={`p-3 rounded-xl ${bg} ${color} group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-600 text-center leading-tight">{name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── LIGNE BASSE ─────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Projets en cours */}
        <div className="xl:col-span-2 bg-white rounded-2xl border-none shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderKanban size={16} className="text-violet-500" />
              <p className="text-sm font-bold text-slate-700 uppercase tracking-wide">Projets en cours</p>
            </div>
            <a href="/projets" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 px-3 py-1.5 hover:bg-emerald-50 rounded-lg transition-colors">
              Voir tous <ArrowUpRight size={12} />
            </a>
          </div>
          {stats?.projets?.length ? stats.projets.map((p, i) => (
            <div key={p.id} className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors ${i !== stats.projets.length - 1 ? "border-b border-slate-50" : ""}`}>
              <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center shrink-0 text-xs font-black text-violet-400">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{p.nom}</p>
                <p className="text-xs text-slate-400 truncate">{p.bailleur} · {p._count.parcelles} parcelle(s)</p>
              </div>
              <span className={`shrink-0 text-[11px] font-bold px-3 py-1 rounded-full ${statutStyle[p.statut] ?? "bg-slate-100 text-slate-500"}`}>
                {statutLabel[p.statut] ?? p.statut}
              </span>
            </div>
          )) : Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-slate-50">
              <div className="w-9 h-9 rounded-xl bg-slate-100 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 bg-slate-100 rounded animate-pulse w-3/4" />
                <div className="h-2.5 bg-slate-100 rounded animate-pulse w-1/2" />
              </div>
              <div className="w-20 h-6 bg-slate-100 rounded-full animate-pulse" />
            </div>
          ))}
        </div>

        {/* Actions rapides + Avancement */}
        <div className="flex flex-col gap-5">

          {/* Quick actions — dark card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-12 -mt-12 pointer-events-none" />
            <div className="px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="bg-white/15 p-1.5 rounded-lg"><Plus size={14} className="text-white" /></span>
                <p className="text-sm font-bold text-white">Actions rapides</p>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Raccourcis fréquents</p>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {quickActions.map(({ label, href, icon: Icon, color }) => (
                <a key={href} href={href}
                  className="flex flex-col items-center gap-2 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all hover:scale-105 duration-200 cursor-pointer text-center">
                  <Icon size={20} className={color} />
                  <span className="text-[11px] font-semibold leading-tight">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Avancement */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border-none flex-1">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
              <TrendingUp size={15} className="text-emerald-500" />
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Avancement GMV</p>
            </div>
            <div className="p-5 space-y-5">
              {[
                { label: "Communes", v: stats?.communesActives ?? 0, max: 131, bar: "bg-emerald-500", val: "text-emerald-600" },
                { label: "Arbres ×10k", v: Math.round((stats?.arbresPlantes ?? 0)/10000), max: 1000, bar: "bg-blue-500", val: "text-blue-600" },
                { label: "Superficie ha", v: Math.round(stats?.superficieHa ?? 0), max: 500, bar: "bg-teal-500", val: "text-teal-600" },
              ].map(({ label, v, max, bar, val }) => {
                const pct = Math.min(Math.round((v/max)*100),100);
                return (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-500">{label}</span>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-sm font-black ${val}`}>{v}</span>
                        <span className="text-[10px] text-slate-300">/{max}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${bar} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Statut */}
            <div className="px-5 pb-5 space-y-2 border-t border-slate-50 pt-4">
              {[
                { label: "Base de données", ok: true },
                { label: "API connectée",   ok: stats !== null },
                { label: "Portail citoyen", ok: true },
              ].map(({ label, ok }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{label}</span>
                  <span className={`flex items-center gap-1 text-[11px] font-bold ${ok ? "text-emerald-600" : "text-amber-500"}`}>
                    {ok ? <><CheckCircle2 size={11} /> Actif</> : <><AlertCircle size={11} /> Attente</>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200">
        <span className="flex items-center gap-1.5"><Clock size={11} /> {now.toLocaleString("fr-FR",{dateStyle:"long",timeStyle:"short"})}</span>
        <span>ASERGMV Platform v2026.1</span>
      </div>
    </div>
  );
}
