"use client";
import { FolderLock, FileText, Download, Eye, Lock, Upload } from "lucide-react";

const documents = [
  { id: "DOC-2026-184", titre: "Procès-verbal CA ASERGMV — Juin 2026", categorie: "Gouvernance", acces: "Direction", taille: "2.4 MB", date: "10/06/2026", auteur: "DG ASERGMV" },
  { id: "DOC-2026-183", titre: "Rapport mensuel terrain — Mai 2026", categorie: "Rapport interne", acces: "Cadres", taille: "8.1 MB", date: "05/06/2026", auteur: "Dir. Technique" },
  { id: "DOC-2026-182", titre: "Convention ASERGMV-AFD signée", categorie: "Juridique", acces: "Direction", taille: "1.2 MB", date: "01/06/2026", auteur: "Juridique" },
  { id: "DOC-2026-181", titre: "Plan de masse plantation zone Louga 2026", categorie: "Technique", acces: "Tous agents", taille: "14.8 MB", date: "28/05/2026", auteur: "SIG GMV" },
  { id: "DOC-2026-180", titre: "Grille salariale 2026 — Confidentiel", categorie: "RH", acces: "Direction + RH", taille: "0.8 MB", date: "25/05/2026", auteur: "DRH" },
];

const accesColor: Record<string,string> = {
  "Direction": "bg-red-100 text-red-700",
  "Cadres": "bg-amber-100 text-amber-700",
  "Tous agents": "bg-emerald-100 text-emerald-700",
  "Direction + RH": "bg-red-100 text-red-700",
};

const catColor: Record<string,string> = {
  "Gouvernance": "bg-violet-100 text-violet-700",
  "Rapport interne": "bg-blue-100 text-blue-700",
  "Juridique": "bg-red-100 text-red-700",
  "Technique": "bg-teal-100 text-teal-700",
  "RH": "bg-slate-100 text-slate-600",
};

export default function DocVaultPage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
              <FolderLock size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-53 · GED Sécurisée</p>
              <h1 className="text-2xl font-black text-white">DocVault ASERGMV</h1>
              <p className="text-slate-400 text-sm mt-1">Gestion documentaire sécurisée avec contrôle d'accès</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Documents archivés", value: "1 842", color: "text-slate-400" },
              { label: "Taille totale", value: "24.8 GB", color: "text-blue-400" },
              { label: "Catégories", value: "12", color: "text-emerald-400" },
              { label: "Niveaux d'accès", value: "5", color: "text-amber-400" },
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
          <input className="flex-1 text-sm border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-slate-200" placeholder="Rechercher un document..." />
          <button className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-3 py-2 rounded-lg hover:bg-slate-200 transition-colors shrink-0">
            <Upload size={11} />Uploader
          </button>
        </div>
        <div className="divide-y divide-slate-50">
          {documents.map(d => (
            <div key={d.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                <FileText size={18} className="text-slate-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">{d.titre}</p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${catColor[d.categorie]}`}>{d.categorie}</span>
                  <span className="text-[10px] text-slate-400">{d.auteur} · {d.date} · {d.taille}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${accesColor[d.acces]}`}>
                  <Lock size={8} />{d.acces}
                </div>
                <button className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors">
                  <Download size={13} className="text-slate-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}