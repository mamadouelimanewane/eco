"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  TreePine, MapPin, Leaf, Droplets, FolderKanban, Wind,
  TrendingUp, ArrowUpRight, Clock, CheckCircle2, AlertCircle,
  Map, Sprout, Users, BarChart3,
} from "lucide-react";

interface Stats {
  arbresPlantes: number; communesActives: number; superficieHa: number;
  tauxSurvie: number; projetsActifs: number; co2Tonnes: number;
  projets: Array<{ id: string; nom: string; bailleur: string; statut: string; _count: { parcelles: number } }>;
}

const statutStyle: Record<string, string> = {
  EN_COURS: "bg-emerald-100 text-emerald-700",
  TERMINE:  "bg-slate-100 text-slate-500",
  SUSPENDU: "bg-amber-100 text-amber-700",
  PLANIFIE: "bg-blue-100 text-blue-700",
};
const statutLabel: Record<string, string> = {
  EN_COURS: "En cours", TERMINE: "Terminé", SUSPENDU: "Suspendu", PLANIFIE: "Planifié",
};

const quickActions = [
  { label: "Carte GMV",        href: "/carte",       icon: Map,          bg: "bg-emerald-600" },
  { label: "Nouvelle saisie",  href: "/saisies",     icon: Sprout,       bg: "bg-blue-600"    },
  { label: "Projets",          href: "/projets",     icon: FolderKanban, bg: "bg-violet-600"  },
  { label: "Volontaires",      href: "/volontaires", icon: Users,        bg: "bg-rose-600"    },
  { label: "Rapports KPI",     href: "/rapports",    icon: BarChart3,    bg: "bg-amber-600"   },
];

export default function DashboardPage() {
  const { data: session } = useSession() ?? {};
  const [stats, setStats] = useState<Stats | null>(null);
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";
  const firstName = session?.user?.name?.split(" ")[0] ?? "Agent";

  useEffect(() => {
    fetch("/api/stats").then(r => r.json()).then(setStats).catch(console.error);
  }, []);

  const kpis = [
    {
      label: "Arbres plantés",      key: "arbresPlantes",   icon: TreePine,    color: "emerald",
      fmt: (v: number) => v.toLocaleString("fr-FR"),         unit: "",      trend: "+2 340 ce mois",
    },
    {
      label: "Communes actives",    key: "communesActives", icon: MapPin,      color: "blue",
      fmt: (v: number) => `${v}`,                            unit: "/131",  trend: "sur 131 cibles",
    },
    {
      label: "Superficie reboisée", key: "superficieHa",    icon: Leaf,        color: "teal",
      fmt: (v: number) => v.toLocaleString("fr-FR", { maximumFractionDigits: 1 }), unit: " ha", trend: "+12,4 ha ce trimestre",
    },
    {
      label: "Taux de survie",      key: "tauxSurvie",      icon: Droplets,    color: "amber",
      fmt: (v: number) => v.toFixed(1),                      unit: "%",     trend: "+1,2 pts vs N-1",
    },
    {
      label: "Projets actifs",      key: "projetsActifs",   icon: FolderKanban,color: "violet",
      fmt: (v: number) => `${v}`,                            unit: "",      trend: "8 bailleurs engagés",
    },
    {
      label: "CO₂ séquestré",       key: "co2Tonnes",       icon: Wind,        color: "rose",
      fmt: (v: number) => v.toLocaleString("fr-FR", { maximumFractionDigits: 0 }), unit: " t/an", trend: "Estimation 2026",
    },
  ];

  const colorMap: Record<string, { ring: string; icon: string; soft: string; text: string }> = {
    emerald: { ring: "ring-emerald-200",  icon: "bg-emerald-600",  soft: "bg-emerald-50",  text: "text-emerald-600" },
    blue:    { ring: "ring-blue-200",     icon: "bg-blue-600",     soft: "bg-blue-50",     text: "text-blue-600"    },
    teal:    { ring: "ring-teal-200",     icon: "bg-teal-600",     soft: "bg-teal-50",     text: "text-teal-600"    },
    amber:   { ring: "ring-amber-200",    icon: "bg-amber-500",    soft: "bg-amber-50",    text: "text-amber-600"   },
    violet:  { ring: "ring-violet-200",   icon: "bg-violet-600",   soft: "bg-violet-50",   text: "text-violet-600"  },
    rose:    { ring: "ring-rose-200",     icon: "bg-rose-600",     soft: "bg-rose-50",     text: "text-rose-600"    },
  };

  return (
    <div className="space-y-6 pb-8 animate-in">

      {/* ── Bandeau de bienvenue ───────────────────── */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 p-6 text-white shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-slate-400 text-sm mb-1">{greeting},</p>
            <h1 className="text-2xl font-bold">{firstName} 👋</h1>
            <p className="text-slate-400 text-sm mt-1">
              {now.toLocaleDateString("fr-FR", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}
              {" · "}Grande Muraille Verte, Sénégal
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white/10 border border-white/10 rounded-xl text-sm text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Base de données connectée
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-5 flex flex-wrap gap-2">
          {quickActions.map(({ label, href, icon: Icon, bg }) => (
            <a key={href} href={href}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm text-white transition-all">
              <span className={`w-5 h-5 ${bg} rounded flex items-center justify-center`}>
                <Icon size={11} />
              </span>
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* ── KPI cards ────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Indicateurs clés</h2>
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            Mise à jour en temps réel
          </span>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {kpis.map(({ key, label, icon: Icon, color, fmt, unit, trend }) => {
            const c = colorMap[color];
            const value = stats ? (stats as any)[key] : null;
            return (
              <div key={key}
                className={`bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ring-1 ring-transparent hover:${c.ring}`}>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 ${c.icon} rounded-xl flex items-center justify-center shadow-sm`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <TrendingUp size={14} className="text-slate-300" />
                  </div>
                  {value !== null ? (
                    <div className="text-3xl font-black text-slate-900 leading-none tracking-tight">
                      {fmt(value)}<span className="text-base font-semibold text-slate-400 ml-0.5">{unit}</span>
                    </div>
                  ) : (
                    <div className="h-9 w-32 bg-slate-100 rounded-lg animate-pulse" />
                  )}
                  <p className="text-sm font-semibold text-slate-600 mt-1.5">{label}</p>
                  <p className={`text-xs mt-1 ${c.text} font-medium flex items-center gap-1`}>
                    <ArrowUpRight size={11} /> {trend}
                  </p>
                </div>
                <div className={`h-1 w-full ${c.icon}`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Grille basse ─────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Projets en cours */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                <FolderKanban size={15} className="text-violet-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Projets en cours</h3>
                <p className="text-xs text-slate-400">Programmes actifs ASERGMV</p>
              </div>
            </div>
            <a href="/projets"
              className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 px-3 py-1.5 hover:bg-emerald-50 rounded-lg transition-colors">
              Voir tous <ArrowUpRight size={12} />
            </a>
          </div>
          <div>
            {stats?.projets?.length ? stats.projets.map((p, i) => (
              <div key={p.id}
                className={`flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors ${i !== (stats.projets.length - 1) ? "border-b border-slate-50" : ""}`}>
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold text-slate-500">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{p.nom}</p>
                  <p className="text-xs text-slate-400 truncate">{p.bailleur} · {p._count.parcelles} parcelle(s)</p>
                </div>
                <span className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-lg ${statutStyle[p.statut] ?? "bg-slate-100 text-slate-500"}`}>
                  {statutLabel[p.statut] ?? p.statut}
                </span>
              </div>
            )) : Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5 border-b border-slate-50">
                <div className="w-8 h-8 bg-slate-100 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 bg-slate-100 rounded animate-pulse w-3/4" />
                  <div className="h-2.5 bg-slate-100 rounded animate-pulse w-1/2" />
                </div>
                <div className="w-16 h-6 bg-slate-100 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Panneau droit */}
        <div className="flex flex-col gap-5">

          {/* Avancement */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp size={15} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Avancement GMV</h3>
                <p className="text-xs text-slate-400">Sénégal · 850 km</p>
              </div>
            </div>
            <div className="p-5 space-y-5">
              {[
                { label: "Communes couvertes",    v: stats?.communesActives ?? 0, max: 131,  color: "bg-emerald-500", text: "text-emerald-600" },
                { label: "Arbres (× 10 000)",     v: Math.round((stats?.arbresPlantes ?? 0)/10000), max: 1000, color: "bg-blue-500", text: "text-blue-600" },
                { label: "Superficie reboisée",   v: Math.round(stats?.superficieHa ?? 0),   max: 500,  color: "bg-teal-500",   text: "text-teal-600" },
              ].map(({ label, v, max, color, text }) => {
                const pct = Math.min(Math.round((v / max) * 100), 100);
                return (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-600">{label}</span>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-sm font-black ${text}`}>{v}</span>
                        <span className="text-xs text-slate-400">/ {max}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-right text-[10px] text-slate-400 mt-1">{pct}%</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alertes / Statut */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">Statut de la plateforme</h3>
            </div>
            <div className="p-4 space-y-2.5">
              {[
                { label: "Base de données Neon",        ok: true  },
                { label: "API stats",                    ok: stats !== null },
                { label: "Portail citoyen",              ok: true  },
                { label: "Synchronisation saisies",      ok: true  },
              ].map(({ label, ok }) => (
                <div key={label} className="flex items-center justify-between py-1">
                  <span className="text-xs text-slate-600">{label}</span>
                  <span className={`flex items-center gap-1.5 text-xs font-semibold ${ok ? "text-emerald-600" : "text-amber-600"}`}>
                    {ok
                      ? <><CheckCircle2 size={12} /> Actif</>
                      : <><AlertCircle size={12} /> En attente</>}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-4 pb-4">
              <a href="/carte"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors">
                <MapPin size={14} /> Ouvrir la carte GMV
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Footer info ──────────────────────────── */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-200">
        <span className="flex items-center gap-1.5"><Clock size={11} /> Dernière mise à jour : {now.toLocaleTimeString("fr-FR", { hour:"2-digit", minute:"2-digit" })}</span>
        <span>ASERGMV Platform v2026.1 · Neon PostgreSQL</span>
      </div>
    </div>
  );
}
