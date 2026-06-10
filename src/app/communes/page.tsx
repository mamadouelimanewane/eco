"use client";
import { useEffect, useState } from "react";
import { Building2, MapPin, Search, TreePine, Sprout, LayoutGrid, List } from "lucide-react";

interface Commune {
  id: string; nom: string; code: string; latitude: number; longitude: number;
  statut: string; region: { nom: string };
  parcelles: { nombrePlants: number; superficie: number }[];
}

const statutStyle: Record<string, { pill: string; bar: string; dot: string }> = {
  EN_COURS:  { pill: "bg-emerald-100 text-emerald-700 border border-emerald-200", bar: "bg-emerald-500", dot: "bg-emerald-400" },
  TERMINE:   { pill: "bg-slate-100 text-slate-500 border border-slate-200",       bar: "bg-slate-400",   dot: "bg-slate-400"   },
  PLANIFIE:  { pill: "bg-blue-100 text-blue-700 border border-blue-200",           bar: "bg-blue-500",    dot: "bg-blue-400"    },
  ABANDONNE: { pill: "bg-red-100 text-red-700 border border-red-200",              bar: "bg-red-500",     dot: "bg-red-400"     },
};
const statutLabel: Record<string, string> = {
  EN_COURS: "En cours", TERMINE: "Terminé", PLANIFIE: "Planifié", ABANDONNE: "Abandonné",
};

const regionColor: Record<string, string> = {
  "Matam":   "from-emerald-400 to-teal-500",
  "Louga":   "from-lime-400 to-emerald-500",
  "Tambacounda": "from-teal-400 to-cyan-500",
  "Kédougou": "from-cyan-400 to-blue-500",
  "Saint-Louis": "from-blue-400 to-indigo-500",
};

function getGradient(region: string) {
  return regionColor[region] ?? "from-emerald-400 to-teal-600";
}

export default function CommunesPage() {
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"card" | "list">("card");

  useEffect(() => {
    fetch("/api/communes").then(r => r.json()).then(d => { setCommunes(d); setLoading(false); });
  }, []);

  const filtered = communes.filter(c =>
    c.nom.toLowerCase().includes(search.toLowerCase()) ||
    c.region?.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher une commune ou région…"
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          />
        </div>
        <span className="text-xs text-slate-400 font-semibold px-3 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          {filtered.length} / 131 communes
        </span>
        {/* View toggle */}
        <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm ml-auto">
          <button onClick={() => setView("card")} className={`p-2 rounded-lg transition-all ${view === "card" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-400 hover:text-slate-600"}`}>
            <LayoutGrid size={15} />
          </button>
          <button onClick={() => setView("list")} className={`p-2 rounded-lg transition-all ${view === "list" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-400 hover:text-slate-600"}`}>
            <List size={15} />
          </button>
        </div>
      </div>

      {/* ── CARD VIEW ── */}
      {view === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {loading ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-pulse">
              <div className="h-24 bg-slate-100" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-slate-100 rounded-lg w-3/4" />
                <div className="h-3 bg-slate-100 rounded-lg w-1/2" />
                <div className="h-px bg-slate-100 my-4" />
                <div className="flex gap-4">
                  <div className="h-8 bg-slate-100 rounded-lg flex-1" />
                  <div className="h-8 bg-slate-100 rounded-lg flex-1" />
                  <div className="h-8 bg-slate-100 rounded-lg flex-1" />
                </div>
              </div>
            </div>
          )) : filtered.map(c => {
            const arbres = c.parcelles?.reduce((s, p) => s + (p.nombrePlants ?? 0), 0) ?? 0;
            const ha = c.parcelles?.reduce((s, p) => s + (p.superficie ?? 0), 0) ?? 0;
            const st = statutStyle[c.statut] ?? statutStyle["PLANIFIE"];
            const grad = getGradient(c.region?.nom);
            const initials = c.nom.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

            return (
              <div key={c.id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl ring-1 ring-transparent hover:ring-slate-200 transition-all duration-300 overflow-hidden hover:-translate-y-1">
                {/* Card top — color band */}
                <div className={`relative h-20 bg-gradient-to-br ${grad} flex items-end px-5 pb-3`}>
                  {/* Decorative circles */}
                  <div className="absolute top-2 right-4 w-16 h-16 bg-white/10 rounded-full" />
                  <div className="absolute -top-3 right-10 w-10 h-10 bg-white/10 rounded-full" />
                  {/* Avatar initials */}
                  <div className="absolute -bottom-5 left-5 w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center text-sm font-black text-slate-700 border-2 border-white">
                    {initials}
                  </div>
                  {/* Statut badge top-right */}
                  <div className="ml-auto">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${st.pill}`}>
                      {statutLabel[c.statut] ?? c.statut}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="pt-8 px-5 pb-5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-black text-slate-900 text-base leading-tight">{c.nom}</h3>
                    <span className="text-[10px] font-bold text-slate-300 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg shrink-0">{c.code}</span>
                  </div>
                  <p className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <MapPin size={11} className="text-emerald-400" />
                    {c.region?.nom ?? "—"}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-slate-100 my-4" />

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center bg-emerald-50 rounded-2xl py-3 px-2">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <TreePine size={11} className="text-emerald-500" />
                        <p className="text-sm font-black text-emerald-700">{arbres > 0 ? arbres.toLocaleString("fr-FR") : "—"}</p>
                      </div>
                      <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">Arbres</p>
                    </div>
                    <div className="text-center bg-blue-50 rounded-2xl py-3 px-2">
                      <p className="text-sm font-black text-blue-700 mb-0.5">{ha > 0 ? ha.toFixed(0) : "—"}</p>
                      <p className="text-[9px] font-bold text-blue-400 uppercase tracking-wider">Hectares</p>
                    </div>
                    <div className="text-center bg-violet-50 rounded-2xl py-3 px-2">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <Sprout size={11} className="text-violet-500" />
                        <p className="text-sm font-black text-violet-700">{c.parcelles?.length ?? 0}</p>
                      </div>
                      <p className="text-[9px] font-bold text-violet-400 uppercase tracking-wider">Parcelles</p>
                    </div>
                  </div>

                  {/* Statut bar */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${st.dot} shrink-0`} />
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${st.bar} rounded-full`}
                        style={{ width: c.statut === "EN_COURS" ? "60%" : c.statut === "TERMINE" ? "100%" : c.statut === "PLANIFIE" ? "10%" : "0%" }} />
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold shrink-0">{statutLabel[c.statut] ?? c.statut}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {view === "list" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {loading ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-slate-50 animate-pulse">
              <div className="w-10 h-10 bg-slate-100 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 bg-slate-100 rounded w-1/3" />
                <div className="h-2.5 bg-slate-100 rounded w-1/4" />
              </div>
              <div className="flex gap-6">
                <div className="h-8 w-16 bg-slate-100 rounded-xl" />
                <div className="h-8 w-16 bg-slate-100 rounded-xl" />
              </div>
              <div className="w-20 h-6 bg-slate-100 rounded-full" />
            </div>
          )) : filtered.map((c, i) => {
            const arbres = c.parcelles?.reduce((s, p) => s + (p.nombrePlants ?? 0), 0) ?? 0;
            const ha = c.parcelles?.reduce((s, p) => s + (p.superficie ?? 0), 0) ?? 0;
            const st = statutStyle[c.statut] ?? statutStyle["PLANIFIE"];
            const grad = getGradient(c.region?.nom);
            const initials = c.nom.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

            return (
              <div key={c.id} className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors ${i !== filtered.length - 1 ? "border-b border-slate-50" : ""}`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-xs font-black text-white shrink-0`}>
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{c.nom}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin size={10} className="text-emerald-400" /> {c.region?.nom} · {c.code}
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-5 text-center">
                  <div>
                    <p className="text-sm font-black text-slate-900">{arbres > 0 ? arbres.toLocaleString("fr-FR") : "—"}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Arbres</p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{ha > 0 ? ha.toFixed(0) : "—"} ha</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Superficie</p>
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{c.parcelles?.length ?? 0}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Parcelles</p>
                  </div>
                </div>
                <span className={`shrink-0 text-[10px] font-bold px-3 py-1.5 rounded-full ${st.pill}`}>
                  {statutLabel[c.statut] ?? c.statut}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <Building2 size={36} className="mx-auto mb-3 opacity-20" />
          <p className="text-sm font-semibold">Aucune commune trouvée</p>
        </div>
      )}
    </div>
  );
}
