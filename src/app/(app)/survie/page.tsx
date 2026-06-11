"use client";
import { Activity, TrendingUp, AlertTriangle, CheckCircle, TreePine, Droplets, Sun, Wind } from "lucide-react";

const zones = [
  { commune: "Linguere", region: "Louga", plantes: 12400, survie: 84, risque: "Faible", eau: "Optimal", sol: "Bon" },
  { commune: "Ranérou", region: "Matam", plantes: 8900, survie: 71, risque: "Moyen", eau: "Déficit", sol: "Moyen" },
  { commune: "Sagatta", region: "Thiès", plantes: 5600, survie: 91, risque: "Faible", eau: "Optimal", sol: "Excellent" },
  { commune: "Dodji", region: "Saint-Louis", plantes: 9800, survie: 62, risque: "Élevé", eau: "Critique", sol: "Pauvre" },
  { commune: "Mbane", region: "Saint-Louis", plantes: 7200, survie: 78, risque: "Moyen", eau: "Bon", sol: "Bon" },
  { commune: "Ourossogui", region: "Matam", plantes: 11000, survie: 88, risque: "Faible", eau: "Optimal", sol: "Bon" },
  { commune: "Vélingara", region: "Kolda", plantes: 6500, survie: 55, risque: "Critique", eau: "Critique", sol: "Dégradé" },
  { commune: "Dianké Makha", region: "Kolda", plantes: 4300, survie: 93, risque: "Faible", eau: "Optimal", sol: "Excellent" },
];

const risqueColor: Record<string, string> = {
  "Faible": "bg-emerald-100 text-emerald-700",
  "Moyen": "bg-amber-100 text-amber-700",
  "Élevé": "bg-orange-100 text-orange-700",
  "Critique": "bg-red-100 text-red-700",
};

export default function SurviePage() {
  const moy = Math.round(zones.reduce((s, z) => s + z.survie, 0) / zones.length);
  const total = zones.reduce((s, z) => s + z.plantes, 0);
  const enRisque = zones.filter(z => z.risque === "Élevé" || z.risque === "Critique").length;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Activity size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-08 · IA Survie</p>
              <h1 className="text-2xl font-black text-white">Taux de Survie IA</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Taux moyen", value: moy + "%", icon: TrendingUp, color: "text-emerald-400" },
              { label: "Plants suivis", value: (total/1000).toFixed(0)+"k", icon: TreePine, color: "text-teal-400" },
              { label: "Zones à risque", value: enRisque, icon: AlertTriangle, color: "text-amber-400" },
              { label: "Zones saines", value: zones.length - enRisque, icon: CheckCircle, color: "text-green-400" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <Icon size={18} className={color + " mb-2"} />
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Survie Bar Chart */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-5">Taux de survie par commune</h2>
        <div className="space-y-3">
          {zones.sort((a,b) => b.survie - a.survie).map(z => (
            <div key={z.commune} className="flex items-center gap-4">
              <div className="w-28 shrink-0">
                <p className="text-xs font-bold text-slate-700 truncate">{z.commune}</p>
                <p className="text-[10px] text-slate-400">{z.region}</p>
              </div>
              <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${z.survie >= 80 ? "bg-emerald-500" : z.survie >= 65 ? "bg-amber-400" : "bg-red-500"}`}
                  style={{ width: z.survie + "%" }}
                />
              </div>
              <span className="w-10 text-right text-xs font-black text-slate-700">{z.survie}%</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${risqueColor[z.risque]}`}>{z.risque}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide flex-1">Données détaillées IA</h2>
          <button className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">Exporter CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{["Commune","Région","Plants","Taux %","Eau","Sol","Risque IA"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {zones.map(z => (
                <tr key={z.commune} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-800">{z.commune}</td>
                  <td className="px-4 py-3 text-slate-500">{z.region}</td>
                  <td className="px-4 py-3 text-slate-700">{z.plantes.toLocaleString()}</td>
                  <td className="px-4 py-3 font-black text-slate-800">{z.survie}%</td>
                  <td className="px-4 py-3 text-slate-600">{z.eau}</td>
                  <td className="px-4 py-3 text-slate-600">{z.sol}</td>
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