"use client";
import { useState } from "react";
import { Satellite, Flame, Eye, AlertTriangle } from "lucide-react";

const communes = [
  { nom: "Linguere", ndvi: 0.42, tendance: "+0.08", feux: 0, pluie: 312, statut: "Bon" },
  { nom: "Ranerou", ndvi: 0.38, tendance: "+0.05", feux: 1, pluie: 287, statut: "Bon" },
  { nom: "Matam", ndvi: 0.31, tendance: "-0.03", feux: 0, pluie: 198, statut: "Attention" },
  { nom: "Podor", ndvi: 0.27, tendance: "-0.07", feux: 2, pluie: 156, statut: "Critique" },
  { nom: "Dagana", ndvi: 0.35, tendance: "+0.02", feux: 0, pluie: 234, statut: "Bon" },
  { nom: "Louga", ndvi: 0.29, tendance: "-0.04", feux: 3, pluie: 178, statut: "Attention" },
  { nom: "Kebemer", ndvi: 0.33, tendance: "+0.01", feux: 0, pluie: 212, statut: "Bon" },
  { nom: "Bakel", ndvi: 0.44, tendance: "+0.11", feux: 0, pluie: 445, statut: "Excellent" },
];

const sources = [
  { nom: "Sentinel-2 (ESA)", resol: "10m", freq: "5 jours", usage: "NDVI, vegetation" },
  { nom: "Landsat 8/9 (NASA)", resol: "30m", freq: "16 jours", usage: "LandTrendr 30 ans" },
  { nom: "MODIS Terra/Aqua", resol: "250m", freq: "Quotidien", usage: "Feux actifs, albedo" },
  { nom: "NASA FIRMS", resol: "375m", freq: "Temps reel", usage: "Detection feux" },
  { nom: "SRTM/Copernicus DEM", resol: "30m", freq: "Statique", usage: "MNT, pentes" },
  { nom: "GPM (NASA)", resol: "10km", freq: "3h", usage: "Pluviometrie temps reel" },
];

const landTrendr = [
  { annee: "1995", surface: 19, ndvi: 0.15 },
  { annee: "2000", surface: 18, ndvi: 0.14 },
  { annee: "2005", surface: 21, ndvi: 0.17 },
  { annee: "2010", surface: 28, ndvi: 0.22 },
  { annee: "2015", surface: 38, ndvi: 0.29 },
  { annee: "2020", surface: 52, ndvi: 0.37 },
  { annee: "2024", surface: 63, ndvi: 0.43 },
];

const alertesFeux = [
  { zone: "Ranerou-Ferlo Sud", confiance: "Haute", surface: "1 240 ha", date: "2026-01-08", statut: "Actif" },
  { zone: "Louga Nord-Est", confiance: "Moyenne", surface: "380 ha", date: "2026-01-07", statut: "Controle" },
  { zone: "Podor Ouest", confiance: "Haute", surface: "2 100 ha", date: "2026-01-06", statut: "Eteint" },
];

export default function ObservationTerrePage() {
  const [tab, setTab] = useState<"ndvi" | "feux" | "historique" | "sources">("ndvi");
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-700 rounded-2xl flex items-center justify-center">
              <Satellite size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">IA AVANCEE - TELEDETECTION</p>
              <h1 className="text-2xl font-black text-white">Observation de la Terre</h1>
              <p className="text-slate-400 text-sm mt-1">NDVI temps reel - Feux NASA FIRMS - LandTrendr 30 ans - 6 sources satellite</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Communes surveillees", value: "131", color: "text-emerald-400" },
              { label: "NDVI moyen GMV", value: "0.34", color: "text-lime-400" },
              { label: "Alertes feux actives", value: "3", color: "text-red-400" },
              { label: "Vegetation restauree", value: "63 000 ha", color: "text-blue-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {([["ndvi","NDVI par commune"],["feux","Alertes feux NASA FIRMS"],["historique","LandTrendr 30 ans"],["sources","Sources satellite"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === id ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>{label}</button>
        ))}
      </div>
      {tab === "ndvi" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-base font-black text-slate-900">Indice NDVI - Communes cles GMV</h2>
            <p className="text-xs text-slate-400 mt-0.5">Donnees Sentinel-2 - mise a jour 5 jours</p>
          </div>
          <div className="divide-y divide-slate-50">
            {communes.map(c => (
              <div key={c.nom} className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50">
                <div className="w-28 shrink-0">
                  <p className="text-sm font-bold text-slate-900">{c.nom}</p>
                  <p className="text-xs text-slate-400">{c.pluie} mm/an</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-black text-slate-800">{c.ndvi}</span>
                    <span className={`text-xs font-bold ${c.tendance.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>{c.tendance}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${c.ndvi * 200}%` }} />
                  </div>
                </div>
                {c.feux > 0 && <div className="flex items-center gap-1 text-xs text-red-600 font-bold"><Flame size={12} />{c.feux}</div>}
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${c.statut === "Excellent" ? "bg-emerald-100 text-emerald-700" : c.statut === "Bon" ? "bg-blue-100 text-blue-700" : c.statut === "Attention" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{c.statut}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === "feux" && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5"><Flame size={20} className="text-red-600 mb-2" /><p className="text-2xl font-black text-red-700">3</p><p className="text-xs text-red-600">Alertes actives 48h</p></div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5"><AlertTriangle size={20} className="text-amber-600 mb-2" /><p className="text-2xl font-black text-amber-700">3 720 ha</p><p className="text-xs text-amber-600">Surface menacee</p></div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5"><Eye size={20} className="text-emerald-600 mb-2" /><p className="text-2xl font-black text-emerald-700">FIRMS</p><p className="text-xs text-emerald-600">MODIS + VIIRS 375m</p></div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100"><h2 className="text-base font-black text-slate-900">Alertes feux actifs - Zone GMV Senegal</h2></div>
            <div className="divide-y divide-slate-50">
              {alertesFeux.map(a => (
                <div key={a.zone} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${a.statut === "Actif" ? "bg-red-500" : a.statut === "Controle" ? "bg-amber-400" : "bg-slate-300"}`} />
                  <div className="flex-1"><p className="text-sm font-bold text-slate-900">{a.zone}</p><p className="text-xs text-slate-400">{a.date} - {a.surface}</p></div>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">Confiance {a.confiance}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${a.statut === "Actif" ? "bg-red-100 text-red-700" : a.statut === "Controle" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}>{a.statut}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {tab === "historique" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-base font-black text-slate-900 mb-1">Analyse LandTrendr - 30 ans de vegetation GMV</h2>
          <p className="text-xs text-slate-400 mb-6">Algorithme Google Earth Engine - Landsat 1990-2024</p>
          <div className="space-y-3">
            {landTrendr.map(p => (
              <div key={p.annee} className="flex items-center gap-4">
                <span className="text-xs font-black text-slate-500 w-12">{p.annee}</span>
                <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full" style={{ width: `${(p.surface / 65) * 100}%` }} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-700">{p.surface}k ha</span>
                </div>
                <span className="text-xs font-bold w-16 text-right text-emerald-600">NDVI {p.ndvi}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
            <p className="text-sm font-black text-emerald-800">+250% de vegetation restauree depuis 1995</p>
            <p className="text-xs text-emerald-600 mt-1">Le programme GMV Senegal a inverse la tendance de degradation. LandTrendr detecte 3 ruptures positives : 2004 (lancement GMV), 2012 (Plan Senegal Emergent), 2020 (financement G7 14,7 Mrd USD).</p>
          </div>
        </div>
      )}
      {tab === "sources" && (
        <div className="grid md:grid-cols-2 gap-4">
          {sources.map(s => (
            <div key={s.nom} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center shrink-0"><Satellite size={14} className="text-emerald-400" /></div>
                <div><h3 className="text-sm font-black text-slate-900">{s.nom}</h3><p className="text-xs text-slate-400 mt-0.5">{s.usage}</p></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[["Resolution", s.resol], ["Frequence", s.freq]].map(([k, v]) => (
                  <div key={k} className="bg-slate-50 rounded-xl p-2"><p className="text-[10px] text-slate-400">{k}</p><p className="text-xs font-bold text-slate-700 mt-0.5">{v}</p></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}