"use client";
import { Package, TrendingDown, AlertTriangle, CheckCircle, Leaf, Users } from "lucide-react";

const stocks = [
  { espece: "Acacia senegal", categorie: "Arbre", quantite: 42000, dispo: 38500, reserve: 2000, provenance: "Linguère", qualite: "A+", expiration: "Avr 2027" },
  { espece: "Balanites aegyptiaca", categorie: "Arbre", quantite: 28000, dispo: 21000, reserve: 5000, provenance: "Ranérou", qualite: "A", expiration: "Mar 2027" },
  { espece: "Ziziphus mauritiana", categorie: "Arbuste", quantite: 15000, dispo: 15000, reserve: 0, provenance: "Mbane", qualite: "A+", expiration: "Jan 2027" },
  { espece: "Andropogon gayanus", categorie: "Graminée", quantite: 8500, dispo: 3200, reserve: 4000, provenance: "Sagatta", qualite: "B+", expiration: "Sep 2026" },
  { espece: "Piliostigma reticulatum", categorie: "Arbre", quantite: 19000, dispo: 11000, reserve: 6000, provenance: "Ourossogui", qualite: "A", expiration: "Fév 2027" },
  { espece: "Combretum aculeatum", categorie: "Arbuste", quantite: 6000, dispo: 800, reserve: 4000, provenance: "Dodji", qualite: "B", expiration: "Nov 2026" },
];

const qualiteColor: Record<string,string> = {
  "A+": "bg-emerald-100 text-emerald-700",
  "A": "bg-blue-100 text-blue-700",
  "B+": "bg-amber-100 text-amber-700",
  "B": "bg-orange-100 text-orange-700",
};

export default function GrainBankPage() {
  const totalSemences = stocks.reduce((s, g) => s + g.quantite, 0);
  const totalDispo = stocks.reduce((s, g) => s + g.dispo, 0);
  const enRupture = stocks.filter(g => g.dispo < g.quantite * 0.1).length;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-lime-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Package size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-16 · Semences</p>
              <h1 className="text-2xl font-black text-white">GrainBank GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Banque nationale de semences certifiées</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Espèces gérées", value: stocks.length, color: "text-lime-400" },
              { label: "Total semences (kg)", value: (totalSemences/1000).toFixed(0)+"k", color: "text-emerald-400" },
              { label: "Disponibles (kg)", value: (totalDispo/1000).toFixed(0)+"k", color: "text-blue-400" },
              { label: "Stock critique", value: enRupture, color: "text-red-400" },
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
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-5">Disponibilité par espèce</h2>
        <div className="space-y-3">
          {stocks.map(g => {
            const pct = Math.round(g.dispo / g.quantite * 100);
            return (
              <div key={g.espece} className="flex items-center gap-4">
                <div className="w-48 shrink-0">
                  <p className="text-xs font-bold text-slate-800 italic">{g.espece}</p>
                  <p className="text-[10px] text-slate-400">{g.categorie} · {g.provenance}</p>
                </div>
                <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${pct >= 60 ? "bg-emerald-400" : pct >= 25 ? "bg-amber-400" : "bg-red-500"}`} style={{ width: pct + "%" }} />
                </div>
                <span className="w-16 text-right text-xs text-slate-600">{g.dispo.toLocaleString()} kg</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${qualiteColor[g.qualite]}`}>{g.qualite}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Inventaire détaillé</h2>
          <button className="text-[11px] font-bold text-lime-600 bg-lime-50 px-3 py-1.5 rounded-lg hover:bg-lime-100">+ Nouvelle entrée</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{["Espèce","Catégorie","Stock total","Disponible","Réservé","Qualité","Expiration"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {stocks.map(g => (
                <tr key={g.espece} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-800 italic">{g.espece}</td>
                  <td className="px-4 py-3 text-slate-500">{g.categorie}</td>
                  <td className="px-4 py-3 text-slate-700">{g.quantite.toLocaleString()} kg</td>
                  <td className="px-4 py-3 font-black text-lime-700">{g.dispo.toLocaleString()} kg</td>
                  <td className="px-4 py-3 text-slate-500">{g.reserve.toLocaleString()} kg</td>
                  <td className="px-4 py-3"><span className={`font-bold px-2 py-0.5 rounded-full ${qualiteColor[g.qualite]}`}>{g.qualite}</span></td>
                  <td className="px-4 py-3 text-slate-500">{g.expiration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}