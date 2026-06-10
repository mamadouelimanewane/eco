"use client";
import { FileText, Download, Calendar, Tag } from "lucide-react";

const docs = [
  { id: 1, titre: "Rapport annuel ASERGMV 2025", type: "Rapport", taille: "4.2 MB", date: "2026-01-15", categorie: "Rapport annuel" },
  { id: 2, titre: "Plan de gestion forestière GMV — Ferlo", type: "Plan", taille: "8.7 MB", date: "2025-11-20", categorie: "Plan de gestion" },
  { id: 3, titre: "Guide technique plantation zone sahélienne", type: "Guide", taille: "2.1 MB", date: "2025-09-05", categorie: "Guide technique" },
  { id: 4, titre: "Convention partenariat PIGMV — Banque Mondiale", type: "Contrat", taille: "1.5 MB", date: "2024-06-01", categorie: "Convention" },
  { id: 5, titre: "Rapport suivi S1 2026 — Parcelles Linguère", type: "Rapport", taille: "3.8 MB", date: "2026-07-10", categorie: "Suivi" },
  { id: 6, titre: "Protocole inventaire biodiversité GMV", type: "Protocole", taille: "0.9 MB", date: "2025-03-22", categorie: "Protocole" },
  { id: 7, titre: "Budget prévisionnel 2026 — PAREC-CC", type: "Budget", taille: "1.2 MB", date: "2026-01-08", categorie: "Finance" },
  { id: 8, titre: "Carte zonage agricole — Région de Matam", type: "Carte", taille: "12.4 MB", date: "2025-07-30", categorie: "Cartographie" },
];

const typeStyle: Record<string, string> = {
  Rapport: "bg-blue-100 text-blue-700", Plan: "bg-emerald-100 text-emerald-700",
  Guide: "bg-amber-100 text-amber-700", Contrat: "bg-violet-100 text-violet-700",
  Budget: "bg-rose-100 text-rose-700", Carte: "bg-teal-100 text-teal-700",
  Protocole: "bg-slate-100 text-slate-700",
};

export default function DocumentsPage() {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-800">Base documentaire ASERGMV</h2>
          <span className="text-xs text-gray-400">{docs.length} documents</span>
        </div>
        <div className="divide-y divide-gray-50">
          {docs.map(d => (
            <div key={d.id} className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
              <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100">
                <FileText size={16} className="text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{d.titre}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar size={10} />{new Date(d.date).toLocaleDateString("fr-FR")}
                  </span>
                  <span className="text-xs text-gray-300">·</span>
                  <span className="text-xs text-gray-400">{d.taille}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Tag size={10} />{d.categorie}
                  </span>
                </div>
              </div>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${typeStyle[d.type] ?? "bg-gray-100 text-gray-600"}`}>
                {d.type}
              </span>
              <button className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                <Download size={14} className="text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
