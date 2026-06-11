"use client";
import { Droplets, TrendingDown, TrendingUp, Activity, MapPin, BarChart3 } from "lucide-react";

const forages = [
  { id: "AQF-001", nom: "Nappe Linguère", profondeur: 45, niveau: 38.2, tendance: -0.8, debit: 12.4, qualite: "Bonne", region: "Louga" },
  { id: "AQF-002", nom: "Nappe Ranérou", profondeur: 62, niveau: 54.1, tendance: -1.4, debit: 8.9, qualite: "Moyenne", region: "Matam" },
  { id: "AQF-003", nom: "Nappe Mbane", profondeur: 38, niveau: 29.6, tendance: +0.3, debit: 18.2, qualite: "Bonne", region: "Saint-Louis" },
  { id: "AQF-004", nom: "Nappe Ourossogui", profondeur: 55, niveau: 44.8, tendance: -0.2, debit: 22.1, qualite: "Excellente", region: "Matam" },
  { id: "AQF-005", nom: "Nappe Dodji", profondeur: 71, niveau: 68.9, tendance: -2.1, debit: 4.2, qualite: "Mauvaise", region: "Saint-Louis" },
  { id: "AQF-006", nom: "Nappe Sagatta", profondeur: 42, niveau: 36.7, tendance: +0.5, debit: 15.8, qualite: "Bonne", region: "Thiès" },
];

const qualiteColor: Record<string,string> = {
  "Excellente": "bg-emerald-100 text-emerald-700",
  "Bonne": "bg-blue-100 text-blue-700",
  "Moyenne": "bg-amber-100 text-amber-700",
  "Mauvaise": "bg-red-100 text-red-700",
};

export default function AquiferesPage() {
  const moy = (forages.reduce((s, f) => s + (f.niveau / f.profondeur * 100), 0) / forages.length).toFixed(0);
  const decharge = forages.filter(f => f.tendance < 0).length;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Droplets size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-15 · Hydrologie</p>
              <h1 className="text-2xl font-black text-white">Aquifer Monitor</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Nappes surveillées", value: forages.length, color: "text-cyan-400" },
              { label: "Taux de remplissage moy.", value: moy + "%", color: "text-blue-400" },
              { label: "En décharge", value: decharge, color: "text-red-400" },
              { label: "En recharge", value: forages.length - decharge, color: "text-emerald-400" },
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
        {forages.map(f => {
          const pct = Math.round(f.niveau / f.profondeur * 100);
          return (
            <div key={f.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-black text-slate-800">{f.nom}</p>
                  <p className="text-[10px] text-slate-400">{f.region} · Profondeur {f.profondeur}m</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${qualiteColor[f.qualite]}`}>{f.qualite}</span>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>Niveau nappe</span>
                  <span className="font-black text-slate-700">{f.niveau}m / {f.profondeur}m ({pct}%)</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${pct >= 70 ? "bg-blue-400" : pct >= 40 ? "bg-amber-400" : "bg-red-500"}`} style={{ width: pct + "%" }} />
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Débit: <strong className="text-slate-700">{f.debit} m³/h</strong></span>
                <span className={`flex items-center gap-0.5 font-bold ${f.tendance < 0 ? "text-red-500" : "text-emerald-500"}`}>
                  {f.tendance < 0 ? <TrendingDown size={11} /> : <TrendingUp size={11} />}
                  {Math.abs(f.tendance)} m/mois
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}