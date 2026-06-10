"use client";
import { useEffect, useState } from "react";
import { Sprout, Search, MapPin } from "lucide-react";

interface Parcelle {
  id: string; code: string; espece: string; superficie: number;
  nombrePlants: number; tauxSurvie: number | null; statut: string;
  datePlantation: string | null;
  commune: { nom: string }; projet: { nom: string; bailleur: string };
}

const statutStyle: Record<string, string> = {
  EN_COURS: "bg-emerald-100 text-emerald-700", TERMINE: "bg-slate-100 text-slate-600",
  PLANIFIE: "bg-blue-100 text-blue-700", ABANDONNE: "bg-red-100 text-red-700",
};

export default function ParcellesPage() {
  const [parcelles, setParcelles] = useState<Parcelle[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/parcelles").then(r => r.json()).then(d => { setParcelles(d); setLoading(false); });
  }, []);

  const filtered = parcelles.filter(p =>
    p.code.toLowerCase().includes(search.toLowerCase()) ||
    p.espece.toLowerCase().includes(search.toLowerCase()) ||
    p.commune?.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Code, espèce, commune…"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
        </div>
        <span className="text-xs text-gray-400">{filtered.length} parcelle(s)</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Code", "Commune", "Projet", "Espèce", "Plants", "Superficie", "Survie", "Statut"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? Array.from({length:6}).map((_,i) => (
              <tr key={i}>
                {Array.from({length:8}).map((__,j) => (
                  <td key={j} className="px-4 py-3"><div className="h-3 bg-gray-100 rounded animate-pulse" /></td>
                ))}
              </tr>
            )) : filtered.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-gray-600 font-medium">{p.code}</td>
                <td className="px-4 py-3 text-gray-700">
                  <span className="flex items-center gap-1">
                    <MapPin size={11} className="text-gray-400" />{p.commune?.nom}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs max-w-[180px] truncate">{p.projet?.nom}</td>
                <td className="px-4 py-3 text-gray-700 italic">{p.espece}</td>
                <td className="px-4 py-3 font-semibold text-gray-800">{p.nombrePlants.toLocaleString("fr-FR")}</td>
                <td className="px-4 py-3 text-gray-700">{p.superficie} ha</td>
                <td className="px-4 py-3">
                  {p.tauxSurvie != null ? (
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{width:`${p.tauxSurvie*100}%`}} />
                      </div>
                      <span className="text-xs text-gray-600">{(p.tauxSurvie*100).toFixed(0)}%</span>
                    </div>
                  ) : <span className="text-gray-300 text-xs">—</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statutStyle[p.statut] ?? "bg-gray-100 text-gray-600"}`}>
                    {p.statut.replace("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Sprout size={28} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Aucune parcelle trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}
