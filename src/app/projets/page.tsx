"use client";
import { useEffect, useState } from "react";
import { Search, Calendar, Wallet, Sprout, FileText, TrendingUp } from "lucide-react";

interface Projet {
  id: string; code: string; nom: string; bailleur: string; budget: number; devise: string;
  dateDebut: string; dateFin: string; statut: string;
  _count: { parcelles: number; saisies: number };
}

const statutConfig: Record<string, { label: string; pill: string; spine: string; tab: string; dot: string }> = {
  EN_COURS: { label: "En cours",  spine: "bg-emerald-500", tab: "bg-emerald-600", pill: "bg-emerald-100 text-emerald-700 border border-emerald-200", dot: "bg-emerald-400" },
  TERMINE:  { label: "Terminé",   spine: "bg-slate-400",   tab: "bg-slate-500",   pill: "bg-slate-100 text-slate-500 border border-slate-200",       dot: "bg-slate-400"   },
  PLANIFIE: { label: "Planifié",  spine: "bg-blue-500",    tab: "bg-blue-600",    pill: "bg-blue-100 text-blue-700 border border-blue-200",           dot: "bg-blue-400"    },
  SUSPENDU: { label: "Suspendu",  spine: "bg-amber-500",   tab: "bg-amber-600",   pill: "bg-amber-100 text-amber-700 border border-amber-200",        dot: "bg-amber-400"   },
};

const binderColors = [
  { body: "bg-violet-50",  spine: "bg-violet-500",  tab: "bg-violet-600",  icon: "text-violet-500",  ring: "ring-violet-200" },
  { body: "bg-emerald-50", spine: "bg-emerald-500", tab: "bg-emerald-600", icon: "text-emerald-500", ring: "ring-emerald-200" },
  { body: "bg-blue-50",    spine: "bg-blue-500",    tab: "bg-blue-600",    icon: "text-blue-500",    ring: "ring-blue-200"   },
  { body: "bg-rose-50",    spine: "bg-rose-500",    tab: "bg-rose-600",    icon: "text-rose-500",    ring: "ring-rose-200"   },
  { body: "bg-amber-50",   spine: "bg-amber-500",   tab: "bg-amber-600",   icon: "text-amber-500",   ring: "ring-amber-200"  },
  { body: "bg-teal-50",    spine: "bg-teal-500",    tab: "bg-teal-600",    icon: "text-teal-500",    ring: "ring-teal-200"   },
  { body: "bg-indigo-50",  spine: "bg-indigo-500",  tab: "bg-indigo-600",  icon: "text-indigo-500",  ring: "ring-indigo-200" },
  { body: "bg-lime-50",    spine: "bg-lime-600",    tab: "bg-lime-700",    icon: "text-lime-600",    ring: "ring-lime-200"   },
];

function dureeMonths(d1: string, d2: string) {
  const a = new Date(d1), b = new Date(d2);
  return Math.max(1, (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth());
}

function progressPct(statut: string, d1: string, d2: string) {
  if (statut === "TERMINE") return 100;
  if (statut === "PLANIFIE") return 0;
  const now = Date.now(), start = new Date(d1).getTime(), end = new Date(d2).getTime();
  return Math.min(100, Math.max(0, Math.round(((now - start) / (end - start)) * 100)));
}

export default function ProjetsPage() {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/projets").then(r => r.json()).then(d => { setProjets(d); setLoading(false); });
  }, []);

  const filtered = projets.filter(p =>
    p.nom.toLowerCase().includes(search.toLowerCase()) ||
    p.bailleur.toLowerCase().includes(search.toLowerCase()) ||
    p.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Nom, bailleur, code…"
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent" />
        </div>
        <span className="text-xs text-slate-400 font-semibold px-3 py-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
          {filtered.length} projet(s)
        </span>
      </div>

      {/* Classeurs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {loading ? Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            {/* Tab skeleton */}
            <div className="ml-4 w-24 h-5 bg-slate-200 rounded-t-lg" />
            {/* Binder body */}
            <div className="bg-slate-100 rounded-2xl rounded-tl-none h-52 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-slate-200 rounded-l-2xl" />
              <div className="pl-6 p-5 space-y-3">
                <div className="h-4 bg-slate-200 rounded w-4/5" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        )) : filtered.map((p, idx) => {
          const st = statutConfig[p.statut] ?? statutConfig["PLANIFIE"];
          const col = binderColors[idx % binderColors.length];
          const pct = progressPct(p.statut, p.dateDebut, p.dateFin);
          const mois = dureeMonths(p.dateDebut, p.dateFin);
          const isOpen = selected === p.id;

          return (
            <div key={p.id} className="group cursor-pointer" onClick={() => setSelected(isOpen ? null : p.id)}>
              {/* Classeur tab — the "onglet" on top */}
              <div className="flex items-center gap-0">
                <div className={`ml-5 px-4 py-1.5 ${col.tab} rounded-t-xl text-white text-[10px] font-black uppercase tracking-wider shadow-sm`}>
                  {p.code}
                </div>
              </div>

              {/* Classeur body */}
              <div className={`relative ${col.body} rounded-2xl rounded-tl-none border border-white shadow-md group-hover:shadow-xl ring-1 ring-transparent group-hover:${col.ring} transition-all duration-300 group-hover:-translate-y-1 overflow-hidden`}>

                {/* Spine — la tranche à gauche */}
                <div className={`absolute left-0 top-0 bottom-0 w-3.5 ${col.spine} rounded-l-2xl flex flex-col items-center justify-center gap-1`}>
                  {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 bg-white/30 rounded-full" />)}
                </div>

                {/* Rings — les anneaux du classeur */}
                <div className="absolute left-0 top-0 bottom-0 w-3.5 flex flex-col justify-around items-center pointer-events-none">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-3.5 h-3.5 border-2 border-white/50 rounded-full bg-transparent" />
                  ))}
                </div>

                <div className="pl-7 pr-4 pt-4 pb-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-slate-900 leading-tight truncate">{p.nom}</p>
                      <p className="text-xs text-slate-500 mt-0.5 truncate font-medium">{p.bailleur}</p>
                    </div>
                    <span className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full ${st.pill}`}>
                      {st.label}
                    </span>
                  </div>

                  {/* Ruled lines — effet papier */}
                  <div className="space-y-1.5 mb-4">
                    {[0,1,2].map(i => <div key={i} className="h-px bg-slate-200/60" />)}
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-white/70 rounded-xl p-2.5 text-center border border-white shadow-sm">
                      <p className="text-sm font-black text-slate-900">{(p.budget / 1_000_000).toFixed(1)}M</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{p.devise}</p>
                    </div>
                    <div className="bg-white/70 rounded-xl p-2.5 text-center border border-white shadow-sm">
                      <p className="text-sm font-black text-slate-900 flex items-center justify-center gap-0.5"><Sprout size={11} className={col.icon} />{p._count.parcelles}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Parcelles</p>
                    </div>
                    <div className="bg-white/70 rounded-xl p-2.5 text-center border border-white shadow-sm">
                      <p className="text-sm font-black text-slate-900 flex items-center justify-center gap-0.5"><FileText size={11} className={col.icon} />{p._count.saisies}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Saisies</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><TrendingUp size={10} />Avancement</span>
                      <span className="text-[10px] font-black text-slate-600">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full ${col.spine} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>

                  {/* Footer dates */}
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 border-t border-slate-200/60 pt-3">
                    <Calendar size={10} />
                    <span>{new Date(p.dateDebut).toLocaleDateString("fr-FR",{month:"short",year:"numeric"})}</span>
                    <span className="text-slate-300">→</span>
                    <span>{new Date(p.dateFin).toLocaleDateString("fr-FR",{month:"short",year:"numeric"})}</span>
                    <span className="ml-auto font-bold text-slate-500">{mois} mois</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <div className="text-6xl mb-3">📁</div>
          <p className="text-sm font-semibold">Aucun projet trouvé</p>
        </div>
      )}
    </div>
  );
}
