"use client";
import { Cpu, Camera, CheckCircle, AlertTriangle, Leaf, TrendingUp } from "lucide-react";

const identifications = [
  { id: "IA-2026-1842", espece: "Acacia senegal", confiance: 97.4, statut: "Confirmé", agent: "Ibrahima D.", date: "10/06/2026", photo: "Feuille + gousse", lat: "15.4392N", lon: "15.1248W" },
  { id: "IA-2026-1841", espece: "Balanites aegyptiaca", confiance: 89.2, statut: "Confirmé", agent: "Fatou S.", date: "10/06/2026", photo: "Fruit + rameau", lat: "15.1024N", lon: "14.8920W" },
  { id: "IA-2026-1840", espece: "Espèce inconnue", confiance: 42.1, statut: "À vérifier", agent: "Moussa N.", date: "09/06/2026", photo: "Ecorce", lat: "15.8801N", lon: "15.4210W" },
  { id: "IA-2026-1839", espece: "Calotropis procera (invasif)", confiance: 98.8, statut: "Alerte", agent: "Aissatou B.", date: "09/06/2026", photo: "Fleur + feuille", lat: "14.9201N", lon: "14.5680W" },
  { id: "IA-2026-1838", espece: "Ziziphus mauritiana", confiance: 93.6, statut: "Confirmé", agent: "Ousmane F.", date: "08/06/2026", photo: "Fruit", lat: "15.2840N", lon: "15.0120W" },
];

const statutColor: Record<string,string> = {
  "Confirmé": "bg-emerald-100 text-emerald-700",
  "À vérifier": "bg-amber-100 text-amber-700",
  "Alerte": "bg-red-100 text-red-700",
};

export default function IaEspecesPage() {
  const totalIds = 28492;
  const alerte = identifications.filter(i => i.statut === "Alerte").length;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Cpu size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-45 · IA Vision</p>
              <h1 className="text-2xl font-black text-white">IA Identification Espèces</h1>
              <p className="text-slate-400 text-sm mt-1">Reconnaissance automatique d'espèces végétales par photo</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Identifications totales", value: totalIds.toLocaleString(), color: "text-violet-400" },
              { label: "Espèces en base", value: "284", color: "text-teal-400" },
              { label: "Précision modèle", value: "94.2%", color: "text-emerald-400" },
              { label: "Alertes invasives", value: alerte, color: "text-red-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-red-50 shadow-sm p-5 border">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={15} className="text-red-500" />
          <h2 className="text-sm font-black text-slate-900">Alerte espèce invasive détectée</h2>
        </div>
        <div className="bg-red-50 rounded-xl p-4">
          <p className="text-sm font-bold text-slate-800">Calotropis procera détecté — Zone Linguère Sud</p>
          <p className="text-[11px] text-slate-500 mt-1">Confiance : 98.8% · Coordonnées : 14.9201N, 14.5680W · Agent : Aissatou B.</p>
          <p className="text-[11px] text-red-600 font-bold mt-2">Action requise : Extraction manuelle recommandée, signalement au coordinateur régional</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Identifications récentes</h2>
          <button className="text-[11px] font-bold text-violet-600 bg-violet-50 px-3 py-1.5 rounded-lg flex items-center gap-1">
            <Camera size={11} />Nouvelle photo
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{["ID","Espèce identifiée","Confiance","Agent","Date","Statut"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {identifications.map(id => (
                <tr key={id.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-slate-400 text-[10px]">{id.id}</td>
                  <td className="px-4 py-3 font-bold text-slate-800 italic">{id.espece}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${id.confiance >= 85 ? "bg-emerald-400" : id.confiance >= 60 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: id.confiance+"%" }} />
                      </div>
                      <span className="font-black text-slate-600">{id.confiance}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{id.agent}</td>
                  <td className="px-4 py-3 text-slate-500">{id.date}</td>
                  <td className="px-4 py-3"><span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${statutColor[id.statut]}`}>{id.statut}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}