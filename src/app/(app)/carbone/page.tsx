"use client";
import { BarChart3, TrendingUp, Leaf, Award, Globe, DollarSign } from "lucide-react";

const credits = [
  { id: "CR-2026-001", commune: "Linguère", projet: "Plantation acacia — Zone A", arbres: 12400, tCO2: 248, statut: "Vérifié", acheteur: "Total Énergies", prix: 18, annee: 2026 },
  { id: "CR-2026-002", commune: "Ourossogui", projet: "Reboisement Ferlo", arbres: 9800, tCO2: 196, statut: "En cours", acheteur: "—", prix: null, annee: 2026 },
  { id: "CR-2025-018", commune: "Sagatta", projet: "Corridor biologique", arbres: 15600, tCO2: 312, statut: "Vendu", acheteur: "Orange Sénégal", prix: 22, annee: 2025 },
  { id: "CR-2025-014", commune: "Ranérou", projet: "Reforestation Matam", arbres: 8200, tCO2: 164, statut: "Vérifié", acheteur: "Sonatel", prix: 20, annee: 2025 },
  { id: "CR-2024-009", commune: "Mbane", projet: "Haies vives Saint-Louis", arbres: 5400, tCO2: 108, statut: "Vendu", acheteur: "AXA Assurance", prix: 19, annee: 2024 },
];

const statutColor: Record<string,string> = {
  "Vérifié": "bg-blue-100 text-blue-700",
  "En cours": "bg-amber-100 text-amber-700",
  "Vendu": "bg-emerald-100 text-emerald-700",
};

export default function CarbonePage() {
  const totalCO2 = credits.reduce((s, c) => s + c.tCO2, 0);
  const totalArbres = credits.reduce((s, c) => s + c.arbres, 0);
  const revenus = credits.filter(c => c.prix).reduce((s, c) => s + (c.tCO2 * (c.prix ?? 0)), 0);
  const vendu = credits.filter(c => c.statut === "Vendu").length;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BarChart3 size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-20 · Carbone</p>
              <h1 className="text-2xl font-black text-white">Registre Carbone GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Crédits carbone certifiés · Standard VCS</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Total crédits (tCO₂)", value: totalCO2.toLocaleString(), color: "text-emerald-400" },
              { label: "Arbres comptabilisés", value: (totalArbres/1000).toFixed(0)+"k", color: "text-teal-400" },
              { label: "Revenus générés", value: (revenus/1000).toFixed(0)+"k €", color: "text-amber-400" },
              { label: "Crédits vendus", value: vendu + "/" + credits.length, color: "text-blue-400" },
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
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-5">Volume CO₂ par projet</h2>
        <div className="space-y-3">
          {credits.map(c => (
            <div key={c.id} className="flex items-center gap-4">
              <div className="w-44 shrink-0">
                <p className="text-xs font-bold text-slate-800 truncate">{c.projet}</p>
                <p className="text-[10px] text-slate-400">{c.commune} · {c.annee}</p>
              </div>
              <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: (c.tCO2 / 312 * 100) + "%" }} />
              </div>
              <span className="w-16 text-right text-xs font-black text-emerald-700">{c.tCO2} tCO₂</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${statutColor[c.statut]}`}>{c.statut}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Registre des crédits</h2>
          <button className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100">Exporter PDF</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{["ID Crédit","Commune","Projet","Arbres","tCO₂","Prix €/t","Acheteur","Statut"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {credits.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-slate-400">{c.id}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">{c.commune}</td>
                  <td className="px-4 py-3 text-slate-600">{c.projet}</td>
                  <td className="px-4 py-3 text-slate-700">{c.arbres.toLocaleString()}</td>
                  <td className="px-4 py-3 font-black text-emerald-600">{c.tCO2}</td>
                  <td className="px-4 py-3 text-slate-600">{c.prix ? c.prix + " €" : "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{c.acheteur}</td>
                  <td className="px-4 py-3"><span className={`font-bold px-2 py-0.5 rounded-full ${statutColor[c.statut]}`}>{c.statut}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}