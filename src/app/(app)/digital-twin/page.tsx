"use client";
import { Box, Activity, Globe, Zap, TrendingUp, Layers } from "lucide-react";

const scenarios = [
  { nom: "Baseline 2026 — Situation actuelle", arbres: 5284920, survie: 81, seqCO2: 428000, couverture: 23 },
  { nom: "Scénario optimiste 2030 — Financement complet", arbres: 10000000, survie: 88, seqCO2: 1200000, couverture: 45 },
  { nom: "Scénario tendanciel 2030 — Budget actuel", arbres: 7800000, survie: 84, seqCO2: 890000, couverture: 36 },
  { nom: "Scénario pessimiste 2030 — Sécheresse accrue", arbres: 5900000, survie: 72, seqCO2: 520000, couverture: 28 },
];

const couches = [
  { nom: "Végétation (NDVI)", visible: true, source: "Sentinel-2", MAJ: "Hebdomadaire" },
  { nom: "Réseau hydrologique", visible: true, source: "SRTM + terrain", MAJ: "Mensuelle" },
  { nom: "Températures sol", visible: false, source: "MODIS", MAJ: "Quotidienne" },
  { nom: "Zones à risque érosion", visible: true, source: "Modèle ML", MAJ: "Mensuelle" },
  { nom: "Parcelles GMV", visible: true, source: "Terrain ASERGMV", MAJ: "Temps réel" },
  { nom: "Prévisions météo", visible: false, source: "ANACIM", MAJ: "Quotidienne" },
];

export default function DigitalTwinPage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Box size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-47 · Simulation</p>
              <h1 className="text-2xl font-black text-white">Digital Twin GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Jumeau numérique de la Grande Muraille Verte sur 850 km</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Couches de données", value: couches.length, color: "text-blue-400" },
              { label: "Surface simulée", value: "850 km", color: "text-teal-400" },
              { label: "Scénarios 2030", value: scenarios.length, color: "text-violet-400" },
              { label: "Résolution spatiale", value: "10m", color: "text-amber-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{String(value)}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carte simulée */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center gap-2">
          <Globe size={16} className="text-blue-500" />
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Visualisation 3D — GMV Sénégal</h2>
        </div>
        <div className="h-48 bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {Array.from({length:20}).map((_,i) => (
              <div key={i} className="absolute bg-emerald-400 rounded-full opacity-40" style={{ width: Math.random()*8+4+"px", height: Math.random()*8+4+"px", left: Math.random()*100+"%", top: Math.random()*100+"%", animationDelay: Math.random()+"s" }} />
            ))}
          </div>
          <p className="text-emerald-400 font-black text-sm z-10">🛰️ Simulation 3D · Chargement WebGL...</p>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100">
          <div className="flex gap-2 flex-wrap">
            {couches.map(c => (
              <div key={c.nom} className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-lg ${c.visible ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-400 line-through"}`}>
                <Layers size={10} />{c.nom}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-5">Comparaison de scénarios 2030</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{["Scénario","Arbres","Taux survie","CO₂ séquestrée","Couverture végétale"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {scenarios.map((s, i) => (
                <tr key={s.nom} className={`hover:bg-slate-50 transition-colors ${i===0?"bg-blue-50/30":""}`}>
                  <td className="px-4 py-3 font-bold text-slate-700">{s.nom}</td>
                  <td className="px-4 py-3 font-black text-emerald-600">{s.arbres.toLocaleString()}</td>
                  <td className="px-4 py-3 font-black text-teal-600">{s.survie}%</td>
                  <td className="px-4 py-3 font-black text-blue-600">{s.seqCO2.toLocaleString()} tCO₂</td>
                  <td className="px-4 py-3 font-black text-violet-600">{s.couverture}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}