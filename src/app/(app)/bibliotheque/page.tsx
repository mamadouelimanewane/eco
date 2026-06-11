"use client";
import { useState } from "react";
import { BookOpen, Download, FileText } from "lucide-react";

const documents = [
  { titre: "Plan d'action Grande Muraille Verte 2030", type: "Plan stratégique", annee: 2024, pages: 148, telechargements: 2840, langue: "Fr/En" },
  { titre: "Guide pratique de reboisement en zone sahélienne", type: "Manuel technique", annee: 2025, pages: 92, telechargements: 4120, langue: "Fr/Wo" },
  { titre: "Rapport annuel ASERGMV 2025", type: "Rapport", annee: 2025, pages: 64, telechargements: 1890, langue: "Fr" },
  { titre: "Atlas cartographique GMV Sénégal", type: "Atlas", annee: 2024, pages: 210, telechargements: 980, langue: "Fr/En" },
  { titre: "Espèces locales recommandées — Fiche terrain", type: "Fiche technique", annee: 2026, pages: 28, telechargements: 6240, langue: "Fr/Wo/Pu" },
  { titre: "Financement climatique et GMV — Guide ONG", type: "Guide", annee: 2025, pages: 56, telechargements: 1540, langue: "Fr/En" },
];

const typeColor: Record<string, string> = {
  "Plan stratégique": "bg-blue-100 text-blue-700",
  "Manuel technique": "bg-emerald-100 text-emerald-700",
  "Rapport": "bg-violet-100 text-violet-700",
  "Atlas": "bg-teal-100 text-teal-700",
  "Fiche technique": "bg-amber-100 text-amber-700",
  "Guide": "bg-indigo-100 text-indigo-700",
};

export default function BibliothequePage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tous types");
  const totalDl = documents.reduce((s, d) => s + d.telechargements, 0);

  const filtered = documents.filter(d => {
    const matchSearch = d.titre.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "Tous types" || d.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-37 · Documentation</p>
              <h1 className="text-2xl font-black text-white">Bibliothèque Verte GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Ressources documentaires ouvertes au grand public</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Documents disponibles", value: String(documents.length), color: "text-emerald-400" },
              { label: "Téléchargements total", value: totalDl.toLocaleString(), color: "text-blue-400" },
              { label: "Langues couvertes", value: "4", color: "text-amber-400" },
              { label: "Accès libre", value: "100%", color: "text-teal-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <input
            className="flex-1 text-sm border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="Rechercher un document..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 outline-none text-slate-600"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option>Tous types</option>
            <option>Manuel technique</option>
            <option>Rapport</option>
            <option>Guide</option>
            <option>Atlas</option>
            <option>Fiche technique</option>
            <option>Plan stratégique</option>
          </select>
        </div>
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm">Aucun document correspondant à votre recherche.</div>
        ) : (
          <div className="divide-y divide-slate-50">
            {filtered.map(d => (
              <div key={d.titre} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{d.titre}</p>
                  <div className="flex gap-3 text-[10px] text-slate-400 mt-0.5">
                    <span>{d.annee}</span>
                    <span>{d.pages} pages</span>
                    <span>{d.langue}</span>
                    <span className={`font-bold px-1.5 py-0.5 rounded-md ${typeColor[d.type]}`}>{d.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Download size={10} />{d.telechargements.toLocaleString()}
                  </div>
                  <button className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-1">
                    <Download size={11} />Télécharger
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}