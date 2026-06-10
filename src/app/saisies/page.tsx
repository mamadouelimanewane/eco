"use client";
import { useEffect, useState } from "react";
import { Target, Search, Calendar } from "lucide-react";

interface Saisie {
  id: string; type: string; nombrePlants: number | null; tauxSurvie: number | null;
  notes: string | null; synced: boolean; createdAt: string;
  user: { name: string | null };
  commune: { nom: string } | null;
  projet: { nom: string } | null;
}

const typeStyle: Record<string, string> = {
  PLANTATION:        "bg-emerald-100 text-emerald-700",
  INVENTAIRE_SURVIE: "bg-blue-100 text-blue-700",
  SIGNALEMENT:       "bg-amber-100 text-amber-700",
  PHOTO:             "bg-violet-100 text-violet-700",
  PEPIN_STOCK:       "bg-teal-100 text-teal-700",
  EAU_POINT:         "bg-cyan-100 text-cyan-700",
};
const typeLabel: Record<string, string> = {
  PLANTATION: "Plantation", INVENTAIRE_SURVIE: "Inventaire survie",
  SIGNALEMENT: "Signalement", PHOTO: "Photo", PEPIN_STOCK: "Stock pépinière", EAU_POINT: "Point d'eau",
};

export default function SaisiesPage() {
  const [saisies, setSaisies] = useState<Saisie[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/saisies").then(r => r.json()).then(d => { setSaisies(d); setLoading(false); });
  }, []);

  const filtered = saisies.filter(s =>
    s.type.toLowerCase().includes(search.toLowerCase()) ||
    s.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.commune?.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Type, agent, commune…"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
        </div>
        <span className="text-xs text-gray-400">{filtered.length} saisie(s)</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Type", "Agent", "Commune", "Projet", "Plants", "Survie", "Notes", "Date"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? Array.from({length:8}).map((_,i) => (
              <tr key={i}>
                {Array.from({length:8}).map((__,j) => (
                  <td key={j} className="px-4 py-3"><div className="h-3 bg-gray-100 rounded animate-pulse" /></td>
                ))}
              </tr>
            )) : filtered.map(s => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${typeStyle[s.type] ?? "bg-gray-100 text-gray-600"}`}>
                    {typeLabel[s.type] ?? s.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700 text-xs">{s.user?.name ?? "—"}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{s.commune?.nom ?? "—"}</td>
                <td className="px-4 py-3 text-gray-500 text-xs max-w-[140px] truncate">{s.projet?.nom ?? "—"}</td>
                <td className="px-4 py-3 font-semibold text-gray-800 text-xs">{s.nombrePlants?.toLocaleString("fr-FR") ?? "—"}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{s.tauxSurvie != null ? `${(s.tauxSurvie*100).toFixed(0)}%` : "—"}</td>
                <td className="px-4 py-3 text-xs text-gray-500 max-w-[120px] truncate">{s.notes ?? "—"}</td>
                <td className="px-4 py-3 text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={10} />{new Date(s.createdAt).toLocaleDateString("fr-FR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Target size={28} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Aucune saisie trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}
