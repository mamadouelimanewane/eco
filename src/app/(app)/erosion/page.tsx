"use client";
import { Globe, TrendingDown, AlertTriangle, MapPin, BarChart3 } from "lucide-react";

const zones = [
  { id: "ERO-N01", commune: "Linguère", region: "Louga", surface: 142, indice: 3.8, type: "Éolienne", tendance: "-12%", risque: "Élevé" },
  { id: "ERO-N02", commune: "Ranérou", region: "Matam", surface: 89, indice: 2.1, type: "Hydrique", tendance: "+3%", risque: "Modéré" },
  { id: "ERO-N03", commune: "Mbane", region: "Saint-Louis", surface: 204, indice: 4.5, type: "Éolienne", tendance: "+8%", risque: "Très élevé" },
  { id: "ERO-N04", commune: "Dodji", region: "Saint-Louis", surface: 67, indice: 1.4, type: "Hydrique", tendance: "-5%", risque: "Faible" },
  { id: "ERO-N05", commune: "Ourossogui", region: "Matam", surface: 31, indice: 0.9, type: "Mixte", tendance: "-18%", risque: "Faible" },
  { id: "ERO-N06", commune: "Vélingara", region: "Kolda", surface: 318, indice: 5.2, type: "Hydrique", tendance: "+15%", risque: "Critique" },
];

const risqueColor: Record<string,string> = {
  "Critique": "bg-red-100 text-red-700",
  "Très élevé": "bg-orange-100 text-orange-700",
  "Élevé": "bg-amber-100 text-amber-700",
  "Modéré": "bg-yellow-100 text-yellow-700",
  "Faible": "bg-emerald-100 text-emerald-700",
};

export default function ErosionPage() {
  const totalSurface = zones.reduce((s, z) => s + z.surface, 0);
  const moy = (zones.reduce((s, z) => s + z.indice, 0) / zones.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Globe size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-14 · Sols</p>
              <h1 className="text-2xl font-black text-white">Erosion Watch</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Surface surveillée", value: totalSurface + " km²", color: "text-amber-400" },
              { label: "Indice moyen", value: moy + "/6", color: "text-orange-400" },
              { label: "Zones critiques", value: zones.filter(z => z.risque === "Critique" || z.risque === "Très élevé").length, color: "text-red-400" },
              { label: "Zones stabilisées", value: zones.filter(z => z.tendance.startsWith("-")).length, color: "text-emerald-400" },
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
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-5">Indice d'érosion par zone</h2>
        <div className="space-y-3">
          {zones.sort((a,b) => b.indice - a.indice).map(z => (
            <div key={z.id} className="flex items-center gap-4">
              <div className="w-32 shrink-0">
                <p className="text-xs font-bold text-slate-800">{z.commune}</p>
                <p className="text-[10px] text-slate-400">{z.type}</p>
              </div>
              <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${z.indice >= 4 ? "bg-red-500" : z.indice >= 2.5 ? "bg-amber-400" : "bg-emerald-500"}`}
                  style={{ width: (z.indice / 6 * 100) + "%" }}
                />
              </div>
              <span className="w-10 text-right text-xs font-black text-slate-700">{z.indice}/6</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${z.tendance.startsWith("-") ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>{z.tendance}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${risqueColor[z.risque]}`}>{z.risque}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Données détaillées</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{["ID","Commune","Région","Surface km²","Indice","Type","Tendance","Risque"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {zones.map(z => (
                <tr key={z.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-slate-400 text-[10px]">{z.id}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">{z.commune}</td>
                  <td className="px-4 py-3 text-slate-500">{z.region}</td>
                  <td className="px-4 py-3 text-slate-700">{z.surface}</td>
                  <td className="px-4 py-3 font-black text-amber-600">{z.indice}</td>
                  <td className="px-4 py-3 text-slate-600">{z.type}</td>
                  <td className="px-4 py-3"><span className={`font-bold ${z.tendance.startsWith("-") ? "text-emerald-600" : "text-red-600"}`}>{z.tendance}</span></td>
                  <td className="px-4 py-3"><span className={`font-bold px-2 py-0.5 rounded-full ${risqueColor[z.risque]}`}>{z.risque}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}