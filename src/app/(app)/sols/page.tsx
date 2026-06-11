"use client";
import { Microscope, TrendingUp, TrendingDown, BarChart3, Leaf } from "lucide-react";

const analyses = [
  { commune: "Linguère", ph: 6.8, azote: 0.12, phosphore: 18, matierOrg: 1.4, texture: "Sableux", note: "B+", recommandation: "Compost organique" },
  { commune: "Ranérou", ph: 7.2, azote: 0.08, phosphore: 12, matierOrg: 0.8, texture: "Sablo-argileux", note: "C+", recommandation: "Amendement calcaire" },
  { commune: "Mbane", ph: 6.4, azote: 0.18, phosphore: 24, matierOrg: 2.1, texture: "Limoneux", note: "A", recommandation: "Maintien pratiques actuelles" },
  { commune: "Ourossogui", ph: 7.8, azote: 0.06, phosphore: 8, matierOrg: 0.5, texture: "Sableux", note: "D", recommandation: "Enrichissement urgent" },
  { commune: "Sagatta", ph: 6.9, azote: 0.15, phosphore: 21, matierOrg: 1.8, texture: "Argilo-limoneux", note: "A-", recommandation: "Légumineuses fixatrices" },
  { commune: "Dodji", ph: 8.1, azote: 0.04, phosphore: 6, matierOrg: 0.3, texture: "Argileux", note: "D-", recommandation: "Traitement acidifiant d'urgence" },
];

const noteColor: Record<string,string> = {
  "A": "bg-emerald-100 text-emerald-700",
  "A-": "bg-emerald-100 text-emerald-600",
  "B+": "bg-blue-100 text-blue-700",
  "C+": "bg-amber-100 text-amber-700",
  "D": "bg-orange-100 text-orange-700",
  "D-": "bg-red-100 text-red-700",
};

export default function SolsPage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Microscope size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-18 · Pédologie</p>
              <h1 className="text-2xl font-black text-white">Qualité des Sols GMV</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Zones analysées", value: analyses.length, color: "text-amber-400" },
              { label: "Sol excellent (A)", value: analyses.filter(a => a.note.startsWith("A")).length, color: "text-emerald-400" },
              { label: "Sol dégradé (D)", value: analyses.filter(a => a.note.startsWith("D")).length, color: "text-red-400" },
              { label: "pH moyen", value: (analyses.reduce((s, a) => s + a.ph, 0) / analyses.length).toFixed(1), color: "text-blue-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analyses.map(a => (
          <div key={a.commune} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-4">
              <p className="text-sm font-black text-slate-800">{a.commune}</p>
              <div className="text-right">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${noteColor[a.note]}`}>{a.note}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
              <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-slate-400">pH</p>
                <p className="font-black text-slate-700">{a.ph}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-slate-400">Azote (%)</p>
                <p className="font-black text-slate-700">{a.azote}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-slate-400">Phosphore</p>
                <p className="font-black text-slate-700">{a.phosphore} mg/kg</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-slate-400">Mat. organique</p>
                <p className="font-black text-slate-700">{a.matierOrg}%</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 italic">⚗ {a.recommandation}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Tableau comparatif</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{["Commune","pH","Azote %","Phosphore","Mat. Org.","Texture","Note","Recommandation"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {analyses.map(a => (
                <tr key={a.commune} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-800">{a.commune}</td>
                  <td className="px-4 py-3 text-slate-600">{a.ph}</td>
                  <td className="px-4 py-3 text-slate-600">{a.azote}</td>
                  <td className="px-4 py-3 text-slate-600">{a.phosphore}</td>
                  <td className="px-4 py-3 text-slate-600">{a.matierOrg}%</td>
                  <td className="px-4 py-3 text-slate-600">{a.texture}</td>
                  <td className="px-4 py-3"><span className={`font-bold px-2 py-0.5 rounded-full ${noteColor[a.note]}`}>{a.note}</span></td>
                  <td className="px-4 py-3 text-slate-500 text-[10px]">{a.recommandation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}