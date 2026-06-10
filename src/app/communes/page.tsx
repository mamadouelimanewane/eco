"use client";
import { useEffect, useState } from "react";
import { Building2, MapPin, Search, TreePine } from "lucide-react";

interface Commune {
  id: string; nom: string; code: string; latitude: number; longitude: number;
  statut: string; region: { nom: string };
  parcelles: { nombrePlants: number; superficie: number }[];
}

const statutStyle: Record<string, string> = {
  EN_COURS:  "bg-emerald-100 text-emerald-700",
  TERMINE:   "bg-slate-100 text-slate-600",
  PLANIFIE:  "bg-blue-100 text-blue-700",
  ABANDONNE: "bg-red-100 text-red-700",
};
const statutLabel: Record<string, string> = {
  EN_COURS: "En cours", TERMINE: "Terminé", PLANIFIE: "Planifié", ABANDONNE: "Abandonné",
};

export default function CommunesPage() {
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher une commune…"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <span className="text-xs text-gray-400">{filtered.length} commune(s)</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading ? Array.from({length: 6}).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 h-36 animate-pulse">
            <div className="h-4 bg-gray-100 rounded w-3/4 mb-3" />
            <div className="h-3 bg-gray-100 rounded w-1/2 mb-6" />
            <div className="h-3 bg-gray-100 rounded w-full" />
          </div>
        )) : filtered.map(c => {
          const arbres = c.parcelles?.reduce((s, p) => s + (p.nombrePlants ?? 0), 0) ?? 0;
          const ha = c.parcelles?.reduce((s, p) => s + (p.superficie ?? 0), 0) ?? 0;
          return (
            <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Building2 size={18} className="text-emerald-600" />
                </div>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statutStyle[c.statut] ?? "bg-gray-100 text-gray-600"}`}>
                  {statutLabel[c.statut] ?? c.statut}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{c.nom}</h3>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <MapPin size={11} /> {c.region?.nom} · {c.code}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-50 flex gap-4">
                <div>
                  <p className="text-xs text-gray-400">Arbres</p>
                  <p className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                    <TreePine size={12} className="text-emerald-500" />
                    {arbres.toLocaleString("fr-FR")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Superficie</p>
                  <p className="text-sm font-semibold text-gray-800">{ha.toFixed(1)} ha</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Parcelles</p>
                  <p className="text-sm font-semibold text-gray-800">{c.parcelles?.length ?? 0}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Building2 size={32} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">Aucune commune trouvée</p>
        </div>
      )}
    </div>
  );
}
