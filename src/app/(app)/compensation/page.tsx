"use client";
import { Zap, Building2, TreePine, Award, TrendingUp, CheckCircle } from "lucide-react";

const entreprises = [
  { nom: "Total Énergies Sénégal", secteur: "Énergie", tCO2: 12400, compensees: 8200, statut: "Certifié Gold", trees: 32800, annee: 2026 },
  { nom: "Orange Sénégal", secteur: "Télécom", tCO2: 4800, compensees: 4800, statut: "Certifié Platinum", trees: 19200, annee: 2026 },
  { nom: "Sonatel", secteur: "Télécom", tCO2: 3200, compensees: 1600, statut: "En cours", trees: 6400, annee: 2026 },
  { nom: "SENICO", secteur: "Industrie", tCO2: 8900, compensees: 4450, statut: "Partiel", trees: 17800, annee: 2026 },
  { nom: "Air Sénégal", secteur: "Transport", tCO2: 15600, compensees: 5000, statut: "Partiel", trees: 20000, annee: 2026 },
  { nom: "BIS Group", secteur: "BTP", tCO2: 2100, compensees: 2100, statut: "Certifié Gold", trees: 8400, annee: 2025 },
];

const statutColor: Record<string,string> = {
  "Certifié Platinum": "bg-violet-100 text-violet-700",
  "Certifié Gold": "bg-amber-100 text-amber-700",
  "En cours": "bg-blue-100 text-blue-700",
  "Partiel": "bg-slate-100 text-slate-500",
};

export default function CompensationPage() {
  const totalTrees = entreprises.reduce((s, e) => s + e.trees, 0);
  const totalCO2 = entreprises.reduce((s, e) => s + e.tCO2, 0);
  const totalComp = entreprises.reduce((s, e) => s + e.compensees, 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-26 · Compensation</p>
              <h1 className="text-2xl font-black text-white">Compensation CO₂</h1>
              <p className="text-slate-400 text-sm mt-1">Programme entreprise · Standard VCS + Gold</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Entreprises partenaires", value: entreprises.length, color: "text-emerald-400" },
              { label: "Total CO₂ (tCO₂)", value: totalCO2.toLocaleString(), color: "text-orange-400" },
              { label: "Compensées (tCO₂)", value: totalComp.toLocaleString(), color: "text-teal-400" },
              { label: "Arbres plantés", value: (totalTrees/1000).toFixed(0)+"k", color: "text-green-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-5">Taux de compensation par entreprise</h2>
        <div className="space-y-3">
          {entreprises.map(e => {
            const pct = Math.round(e.compensees / e.tCO2 * 100);
            return (
              <div key={e.nom} className="flex items-center gap-4">
                <div className="w-44 shrink-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{e.nom}</p>
                  <p className="text-[10px] text-slate-400">{e.secteur}</p>
                </div>
                <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${pct >= 100 ? "bg-emerald-500" : pct >= 60 ? "bg-teal-400" : "bg-amber-400"}`} style={{ width: Math.min(100, pct) + "%" }} />
                </div>
                <span className="w-10 text-right text-xs font-black text-slate-700">{pct}%</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${statutColor[e.statut]}`}>{e.statut}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Tableau des partenaires</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{["Entreprise","Secteur","Émissions tCO₂","Compensées tCO₂","Arbres","Certification"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {entreprises.map(e => (
                <tr key={e.nom} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-800">{e.nom}</td>
                  <td className="px-4 py-3 text-slate-500">{e.secteur}</td>
                  <td className="px-4 py-3 text-orange-600 font-black">{e.tCO2.toLocaleString()}</td>
                  <td className="px-4 py-3 text-emerald-600 font-black">{e.compensees.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-700">{e.trees.toLocaleString()}</td>
                  <td className="px-4 py-3"><span className={`font-bold px-2 py-0.5 rounded-full ${statutColor[e.statut]}`}>{e.statut}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}