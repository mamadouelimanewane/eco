"use client";
import { useState } from "react";
import { Globe2, Droplets, Flame, Wind, Play, Pause } from "lucide-react";

const simulations = [
  {
    nom: "Hydrologie bassin Senegal",
    type: "Hydrologique",
    modele: "SWAT+ (Soil & Water Assessment Tool)",
    resolution: "90m",
    horizon: "2050",
    variables: ["Debit Fleuve Senegal", "Recharge nappes", "Ruissellement", "Evapotranspiration"],
    statut: "Calibre 1990-2020",
    couleur: "bg-blue-100 text-blue-700",
  },
  {
    nom: "Propagation feux savannes",
    type: "Feux",
    modele: "FARSITE / Phoenix FireSim",
    resolution: "30m",
    horizon: "72h",
    variables: ["Vitesse vent", "Humidite combustible", "Topographie", "Type vegetation"],
    statut: "Temps reel",
    couleur: "bg-red-100 text-red-700",
  },
  {
    nom: "Erosion eolienne zone Ferlo",
    type: "Erosion",
    modele: "RWEQ (Revised Wind Erosion Equation)",
    resolution: "100m",
    horizon: "Annuel",
    variables: ["Vitesse vent 10m", "Couvert vegetal", "Humidite sol", "Rugosité surface"],
    statut: "Production",
    couleur: "bg-amber-100 text-amber-700",
  },
  {
    nom: "Croissance plantation 3D",
    type: "Croissance",
    modele: "3-PG + LiDAR Reconstruction",
    resolution: "1m",
    horizon: "2035",
    variables: ["Espece", "Sol", "Climat projeté RCP4.5", "Age"],
    statut: "Production",
    couleur: "bg-emerald-100 text-emerald-700",
  },
];

const scenarios = [
  { nom: "Scenario RCP2.6 - Objectif Paris", delta_t: "+1.5C", pluie: "-8%", survie: "84%", ndvi2035: 0.52 },
  { nom: "Scenario RCP4.5 - Moderé", delta_t: "+2.0C", pluie: "-15%", survie: "71%", ndvi2035: 0.43 },
  { nom: "Scenario RCP8.5 - Pessimiste", delta_t: "+3.2C", pluie: "-28%", survie: "54%", ndvi2035: 0.31 },
];

export default function JumeauNumeriquePage() {
  const [tab, setTab] = useState<"simulations" | "scenarios" | "terrain3d">("simulations");
  const [running, setRunning] = useState<string | null>(null);
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-700 rounded-2xl flex items-center justify-center">
              <Globe2 size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">IA AVANCEE - JUMEAU NUMERIQUE</p>
              <h1 className="text-2xl font-black text-white">Jumeau numerique avance</h1>
              <p className="text-slate-400 text-sm mt-1">Simulation hydrologique - Feux - Erosion eolienne - Croissance 3D - Scenarios climat</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Modeles actifs", value: "4", color: "text-indigo-400" },
              { label: "Resolution terrain", value: "30m", color: "text-emerald-400" },
              { label: "Scenarios clima", value: "3 RCP", color: "text-amber-400" },
              { label: "Horizon projection", value: "2050", color: "text-blue-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {([["simulations","Modeles simulation"],["scenarios","Scenarios climatiques"],["terrain3d","Terrain 3D"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === id ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>{label}</button>
        ))}
      </div>
      {tab === "simulations" && (
        <div className="grid md:grid-cols-2 gap-4">
          {simulations.map(s => (
            <div key={s.nom} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${s.couleur}`}>{s.type}</span>
                  <h3 className="text-sm font-black text-slate-900 mt-2">{s.nom}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{s.modele}</p>
                </div>
                <button onClick={() => setRunning(running === s.nom ? null : s.nom)} className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ml-2 ${running === s.nom ? "bg-amber-100 text-amber-700" : "bg-slate-900 text-white"}`}>
                  {running === s.nom ? <Pause size={14} /> : <Play size={14} />}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[["Resolution", s.resolution], ["Horizon", s.horizon], ["Statut", s.statut]].map(([k, v]) => (
                  <div key={k} className="bg-slate-50 rounded-xl p-2"><p className="text-[10px] text-slate-400">{k}</p><p className="text-xs font-black text-slate-700">{v}</p></div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {s.variables.map(v => <span key={v} className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{v}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "scenarios" && (
        <div className="space-y-4">
          {scenarios.map((s, i) => (
            <div key={s.nom} className={`rounded-2xl border p-5 ${i === 0 ? "border-emerald-200 bg-emerald-50" : i === 1 ? "border-amber-200 bg-amber-50" : "border-red-200 bg-red-50"}`}>
              <h3 className={`text-base font-black mb-4 ${i === 0 ? "text-emerald-900" : i === 1 ? "text-amber-900" : "text-red-900"}`}>{s.nom}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[["Hausse temperature", s.delta_t], ["Variation pluies", s.pluie], ["Taux survie plants", s.survie], ["NDVI 2035", String(s.ndvi2035)]].map(([k, v]) => (
                  <div key={k} className="bg-white/70 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-slate-500">{k}</p>
                    <p className={`text-lg font-black mt-0.5 ${i === 0 ? "text-emerald-700" : i === 1 ? "text-amber-700" : "text-red-700"}`}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="bg-slate-900 rounded-2xl p-6 text-white">
            <h3 className="font-black text-lg mb-2">Conclusion : investir dans la GMV = resilience climatique</h3>
            <p className="text-slate-300 text-sm">Meme dans le scenario pessimiste RCP8.5, un taux de survie de 54% justifie l investissement. Dans le scenario realiste RCP4.5, la GMV Senegal representera 0.43 NDVI moyen en 2035, soit le double de 2000. Le jumeau numerique permet d optimiser les especes et zones de plantation en fonction des projections climatiques locales.</p>
          </div>
        </div>
      )}
      {tab === "terrain3d" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-base font-black text-slate-900 mb-4">Terrain 3D - Zone GMV Senegal (850 km)</h2>
          <div className="bg-slate-900 rounded-2xl h-64 flex items-center justify-center mb-4">
            <div className="text-center">
              <Globe2 size={48} className="text-indigo-400 mx-auto mb-3" />
              <p className="text-white font-bold">Visualisation 3D terrain</p>
              <p className="text-slate-400 text-sm mt-1">CesiumJS + MNT Copernicus 30m - Integration Cesium Ion</p>
              <p className="text-slate-500 text-xs mt-2">Mode demonstration - Viewer 3D complet en production</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { titre: "Modele numerique terrain", desc: "SRTM 30m + correction LiDAR zones cles. Affichage altimetrie, pentes, bassins versants.", icon: <Wind size={16} className="text-slate-500" /> },
              { titre: "Couches vegetation", desc: "Superposition NDVI, couvert canopee, zones plantees vs naturelles sur modele 3D.", icon: <Droplets size={16} className="text-blue-500" /> },
              { titre: "Animation temporelle", desc: "Slider 1990-2035 montrant evolution vegetation et restauration GMV annee par annee.", icon: <Flame size={16} className="text-amber-500" /> },
            ].map(f => (
              <div key={f.titre} className="bg-slate-50 rounded-2xl p-4">
                <div className="mb-2">{f.icon}</div>
                <h3 className="text-sm font-black text-slate-900 mb-1">{f.titre}</h3>
                <p className="text-xs text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}