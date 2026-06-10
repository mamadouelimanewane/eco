"use client";
import { useEffect, useState } from "react";
import { FolderKanban, Search, Calendar, Wallet } from "lucide-react";

interface Projet {
  id: string; code: string; nom: string; bailleur: string; budget: number; devise: string;
  dateDebut: string; dateFin: string; statut: string;
  _count: { parcelles: number; saisies: number };
}

const statutStyle: Record<string, string> = {
  EN_COURS: "bg-emerald-100 text-emerald-700", TERMINE: "bg-slate-100 text-slate-600",
  PLANIFIE: "bg-blue-100 text-blue-700", SUSPENDU: "bg-amber-100 text-amber-700",
};
const statutLabel: Record<string, string> = {
  EN_COURS: "En cours", TERMINE: "Terminé", PLANIFIE: "Planifié", SUSPENDU: "Suspendu",
};

export default function ProjetsPage() {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projets").then(r => r.json()).then(d => { setProjets(d); setLoading(false); });
  }, []);

  const filtered = projets.filter(p =>
    p.nom.toLowerCase().includes(search.toLowerCase()) ||
    p.bailleur.toLowerCase().includes(search.toLowerCase()) ||
    p.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Nom, bailleur, code…"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
        </div>
        <span className="text-xs text-gray-400">{filtered.length} projet(s)</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {loading ? Array.from({length: 4}).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 h-48 animate-pulse">
            <div className="h-4 bg-gray-100 rounded w-3/4 mb-3" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
        )) : filtered.map(p => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-violet-50 rounded-lg flex items-center justify-center shrink-0">
                  <FolderKanban size={18} className="text-violet-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm leading-tight">{p.nom}</p>
                  <p className="text-xs text-gray-400">{p.code} · {p.bailleur}</p>
                </div>
              </div>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${statutStyle[p.statut] ?? "bg-gray-100 text-gray-600"}`}>
                {statutLabel[p.statut] ?? p.statut}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-50">
              <div>
                <p className="text-[11px] text-gray-400 flex items-center gap-1"><Wallet size={10} /> Budget</p>
                <p className="text-sm font-semibold text-gray-800">
                  {(p.budget / 1_000_000).toFixed(1)}M {p.devise}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-gray-400">Parcelles</p>
                <p className="text-sm font-semibold text-gray-800">{p._count.parcelles}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-400">Saisies</p>
                <p className="text-sm font-semibold text-gray-800">{p._count.saisies}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
              <Calendar size={11} />
              {new Date(p.dateDebut).toLocaleDateString("fr-FR")} → {new Date(p.dateFin).toLocaleDateString("fr-FR")}
            </div>
          </div>
        ))}
      </div>

      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <FolderKanban size={32} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">Aucun projet trouvé</p>
        </div>
      )}
    </div>
  );
}
