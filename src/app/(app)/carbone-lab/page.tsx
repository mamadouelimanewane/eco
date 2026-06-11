"use client";
import { Zap, FlaskConical, TrendingUp, BarChart3, Leaf, Microscope } from "lucide-react";

const experiences = [
  { id: "EXP-001", titre: "Séquestration acacia vs baobab", statut: "Terminée", debut: "Jan 2026", duree: "3 mois", tCO2: 2.4, methode: "Biomasse aérienne", auteur: "Dr. Diallo" },
  { id: "EXP-002", titre: "Impact mycorhizes sur séquestration", statut: "En cours", debut: "Mar 2026", duree: "6 mois", tCO2: null, methode: "IPCC Tier 2", auteur: "Dr. Sarr" },
  { id: "EXP-003", titre: "Carbone sol post-plantation", statut: "En cours", debut: "Avr 2026", duree: "12 mois", tCO2: null, methode: "Méthode gravimétrique", auteur: "Mme. Faye" },
  { id: "EXP-004", titre: "Modèle allométrique Sahel", statut: "Planifiée", debut: "Jul 2026", duree: "8 mois", tCO2: null, methode: "LiDAR + terrain", auteur: "Dr. Ndiaye" },
];

const modeles = [
  { espece: "Acacia senegal", seq1an: 12, seq5ans: 80, seq20ans: 420, confiance: 92 },
  { espece: "Balanites aegyptiaca", seq1an: 8, seq5ans: 55, seq20ans: 280, confiance: 85 },
  { espece: "Ziziphus mauritiana", seq1an: 6, seq5ans: 38, seq20ans: 190, confiance: 78 },
  { espece: "Piliostigma reticulatum", seq1an: 5, seq5ans: 30, seq20ans: 145, confiance: 71 },
];

const statutColor: Record<string,string> = {
  "Terminée": "bg-emerald-100 text-emerald-700",
  "En cours": "bg-blue-100 text-blue-700",
  "Planifiée": "bg-slate-100 text-slate-500",
};

export default function CarboneLabPage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FlaskConical size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-21 · Science</p>
              <h1 className="text-2xl font-black text-white">Carbon Science Lab</h1>
              <p className="text-slate-400 text-sm mt-1">Modèles de séquestration & expériences terrain</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Expériences actives", value: "2", color: "text-blue-400" },
              { label: "Publications", value: "7", color: "text-violet-400" },
              { label: "Modèles validés", value: modeles.length, color: "text-emerald-400" },
              { label: "tCO₂ mesurées", value: "2.4", color: "text-teal-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modèles allométriques */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-5">Modèles de séquestration (kg CO₂/arbre)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{["Espèce","1 an","5 ans","20 ans","Confiance modèle"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {modeles.map(m => (
                <tr key={m.espece} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-800 italic">{m.espece}</td>
                  <td className="px-4 py-3 text-slate-600">{m.seq1an} kg</td>
                  <td className="px-4 py-3 text-slate-600">{m.seq5ans} kg</td>
                  <td className="px-4 py-3 font-black text-emerald-700">{m.seq20ans} kg</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full"><div className="h-full bg-violet-400 rounded-full" style={{ width: m.confiance + "%" }} /></div>
                      <span className="font-black text-slate-600">{m.confiance}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expériences */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Expériences en cours</h2>
          <button className="text-[11px] font-bold text-violet-600 bg-violet-50 px-3 py-1.5 rounded-lg hover:bg-violet-100">+ Nouvelle expérience</button>
        </div>
        <div className="divide-y divide-slate-50">
          {experiences.map(e => (
            <div key={e.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
              <div className="w-8 h-8 bg-violet-100 rounded-xl flex items-center justify-center shrink-0">
                <Microscope size={14} className="text-violet-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">{e.titre}</p>
                <p className="text-[11px] text-slate-400">{e.auteur} · Méthode: {e.methode} · Durée: {e.duree}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${statutColor[e.statut]}`}>{e.statut}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}