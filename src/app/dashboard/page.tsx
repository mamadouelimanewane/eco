"use client";
import { useEffect, useState } from "react";
import {
  TreePine, MapPin, Leaf, Droplets,
  FolderKanban, Wind, ArrowUpRight, TrendingUp,
} from "lucide-react";

interface Stats {
  arbresPlantes: number;
  communesActives: number;
  superficieHa: number;
  tauxSurvie: number;
  projetsActifs: number;
  co2Tonnes: number;
  projets: Array<{ id: string; nom: string; bailleur: string; statut: string; _count: { parcelles: number } }>;
}

const kpis = [
  { key: "arbresPlantes",   label: "Arbres plantés",      icon: TreePine,    unit: "",      color: "emerald", fmt: (v: number) => v.toLocaleString("fr-FR") },
  { key: "communesActives", label: "Communes actives",    icon: MapPin,      unit: "/131",  color: "blue",    fmt: (v: number) => v.toString() },
  { key: "superficieHa",    label: "Superficie reboisée", icon: Leaf,        unit: " ha",   color: "teal",    fmt: (v: number) => v.toLocaleString("fr-FR", { maximumFractionDigits: 1 }) },
  { key: "tauxSurvie",      label: "Taux de survie",      icon: Droplets,    unit: "%",     color: "amber",   fmt: (v: number) => v.toFixed(1) },
  { key: "projetsActifs",   label: "Projets actifs",      icon: FolderKanban,unit: "",      color: "violet",  fmt: (v: number) => v.toString() },
  { key: "co2Tonnes",       label: "CO₂ séquestré",       icon: Wind,        unit: " t/an", color: "rose",    fmt: (v: number) => v.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) },
];

const colorMap: Record<string, { bg: string; icon: string; badge: string }> = {
  emerald: { bg: "bg-emerald-50",  icon: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700" },
  blue:    { bg: "bg-blue-50",     icon: "text-blue-600",    badge: "bg-blue-100 text-blue-700"       },
  teal:    { bg: "bg-teal-50",     icon: "text-teal-600",    badge: "bg-teal-100 text-teal-700"       },
  amber:   { bg: "bg-amber-50",    icon: "text-amber-600",   badge: "bg-amber-100 text-amber-700"     },
  violet:  { bg: "bg-violet-50",   icon: "text-violet-600",  badge: "bg-violet-100 text-violet-700"   },
  rose:    { bg: "bg-rose-50",     icon: "text-rose-600",    badge: "bg-rose-100 text-rose-700"       },
};

const statutStyles: Record<string, string> = {
  EN_COURS: "bg-emerald-100 text-emerald-700",
  TERMINE:  "bg-slate-100 text-slate-600",
  SUSPENDU: "bg-amber-100 text-amber-700",
  PLANIFIE: "bg-blue-100 text-blue-700",
};
const statutLabel: Record<string, string> = {
  EN_COURS: "En cours", TERMINE: "Terminé", SUSPENDU: "Suspendu", PLANIFIE: "Planifié",
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats").then((r) => r.json()).then(setStats).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">

      {/* KPI grid */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {kpis.map(({ key, label, icon: Icon, unit, color, fmt }) => {
          const c = colorMap[color];
          const value = stats ? (stats as any)[key] : null;
          return (
            <div key={key} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                  <Icon size={20} className={c.icon} />
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.badge} flex items-center gap-1`}>
                  <TrendingUp size={10} />
                  Live
                </span>
              </div>
              <div className="mt-4">
                {value !== null ? (
                  <p className="text-2xl font-bold text-gray-900 leading-none">
                    {fmt(value)}<span className="text-sm font-normal text-gray-400 ml-0.5">{unit}</span>
                  </p>
                ) : (
                  <div className="h-7 w-24 bg-gray-100 rounded animate-pulse" />
                )}
                <p className="text-xs text-gray-500 mt-1.5">{label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Projets */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">Projets en cours</h2>
              <p className="text-xs text-gray-400">Programmes actifs ASERGMV</p>
            </div>
            <a href="/projets" className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium">
              Voir tous <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {stats?.projets?.length ? stats.projets.slice(0, 6).map((p) => (
              <div key={p.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{p.nom}</p>
                  <p className="text-xs text-gray-400 truncate">{p.bailleur} · {p._count.parcelles} parcelle(s)</p>
                </div>
                <span className={`ml-4 shrink-0 text-[11px] font-medium px-2.5 py-0.5 rounded-full ${statutStyles[p.statut] ?? "bg-gray-100 text-gray-600"}`}>
                  {statutLabel[p.statut] ?? p.statut}
                </span>
              </div>
            )) : (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-5 py-3.5 flex items-center gap-3">
                  <div className="flex-1 h-4 bg-gray-100 rounded animate-pulse" />
                  <div className="w-16 h-4 bg-gray-100 rounded animate-pulse" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Avancement */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="text-sm font-semibold text-gray-800">Avancement GMV</h2>
            <p className="text-xs text-gray-400">Sénégal · 850 km</p>
          </div>
          <div className="flex-1 p-5 space-y-5">
            {[
              { label: "Communes couvertes",  value: stats?.communesActives ?? 0, total: 131, color: "bg-emerald-500" },
              { label: "Objectif arbres (×10k)", value: Math.round((stats?.arbresPlantes ?? 0) / 10000), total: 1000, color: "bg-blue-500" },
              { label: "Superficie cible (ha)", value: Math.round(stats?.superficieHa ?? 0), total: 500, color: "bg-teal-500" },
            ].map(({ label, value, total, color }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-semibold text-gray-800">{value}<span className="text-gray-400 font-normal"> / {total}</span></span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${color} transition-all duration-700`}
                    style={{ width: `${Math.min((value / total) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-gray-50">
              <a
                href="/carte"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                <MapPin size={15} />
                Ouvrir la carte GMV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
