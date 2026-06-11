"use client";
import { useState } from "react";
import { Brain, TrendingDown, Leaf, AlertTriangle, BarChart3 } from "lucide-react";

const modeles = [
  {
    nom: "LSTM Prediction Secheresse",
    type: "Reseau neuronal recursif",
    precision: "87%",
    horizon: "30 jours",
    variables: ["NDVI historique", "Precipitations CHIRPS", "Temperature ERA5", "Humidite sol SMAP"],
    statut: "Production",
    dernierRun: "Il y a 2h",
    couleur: "bg-red-100 text-red-700",
  },
  {
    nom: "XGBoost Survie Plantations",
    type: "Gradient boosting",
    precision: "91%",
    horizon: "Saison",
    variables: ["Espece", "Sol texture", "Pente", "Distance cours d eau", "Age plant"],
    statut: "Production",
    dernierRun: "Il y a 1h",
    couleur: "bg-emerald-100 text-emerald-700",
  },
  {
    nom: "Random Forest Optimiseur Especes",
    type: "Foret aleatoire 500 arbres",
    precision: "84%",
    horizon: "Plantation",
    variables: ["Type sol", "Biome local", "Isohyete", "Usage terres actuel"],
    statut: "Production",
    dernierRun: "Il y a 6h",
    couleur: "bg-blue-100 text-blue-700",
  },
  {
    nom: "Isolation Forest Anomalies",
    type: "Detection non supervisee",
    precision: "93%",
    horizon: "Temps reel",
    variables: ["NDVI delta", "Mortalite anormale", "Debit riviere", "Feux non signales"],
    statut: "Actif",
    dernierRun: "Continu",
    couleur: "bg-amber-100 text-amber-700",
  },
];

const predictions = [
  { commune: "Ranerou-Ferlo", risqueSecheresse: 78, surviePredit: 64, espece: "Acacia senegal", alerte: true },
  { commune: "Podor", risqueSecheresse: 82, surviePredit: 58, espece: "Balanites aegyptiaca", alerte: true },
  { commune: "Matam", risqueSecheresse: 45, surviePredit: 79, espece: "Faidherbia albida", alerte: false },
  { commune: "Linguere", risqueSecheresse: 38, surviePredit: 84, espece: "Prosopis africana", alerte: false },
  { commune: "Dagana", risqueSecheresse: 52, surviePredit: 76, espece: "Acacia tortilis", alerte: false },
  { commune: "Bakel", risqueSecheresse: 22, surviePredit: 91, espece: "Khaya senegalensis", alerte: false },
];

export default function MlPredictionPage() {
  const [tab, setTab] = useState<"modeles" | "predictions" | "anomalies">("modeles");
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-violet-700 rounded-2xl flex items-center justify-center">
              <Brain size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">IA AVANCEE - MACHINE LEARNING</p>
              <h1 className="text-2xl font-black text-white">ML & Prediction avancee</h1>
              <p className="text-slate-400 text-sm mt-1">LSTM Secheresse - XGBoost Survie - Random Forest Especes - Isolation Forest Anomalies</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Modeles en production", value: "4", color: "text-violet-400" },
              { label: "Precision moyenne", value: "89%", color: "text-emerald-400" },
              { label: "Communes a risque", value: "2", color: "text-red-400" },
              { label: "Predictions/jour", value: "131", color: "text-blue-400" },
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
        {([["modeles","Modeles ML"],["predictions","Predictions communes"],["anomalies","Anomalies detectees"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === id ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>{label}</button>
        ))}
      </div>
      {tab === "modeles" && (
        <div className="grid md:grid-cols-2 gap-4">
          {modeles.map(m => (
            <div key={m.nom} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-black text-slate-900">{m.nom}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{m.type}</p>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${m.couleur}`}>{m.statut}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[["Precision", m.precision], ["Horizon", m.horizon], ["Dernier run", m.dernierRun]].map(([k, v]) => (
                  <div key={k} className="bg-slate-50 rounded-xl p-2.5 text-center">
                    <p className="text-[10px] text-slate-400">{k}</p>
                    <p className="text-xs font-black text-slate-700 mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1.5">Variables d entree</p>
                <div className="flex flex-wrap gap-1">
                  {m.variables.map(v => <span key={v} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{v}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "predictions" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-base font-black text-slate-900">Predictions secheresse & survie - Horizon 30 jours</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {predictions.map(p => (
              <div key={p.commune} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50">
                <div className="w-36 shrink-0">
                  <div className="flex items-center gap-2">
                    {p.alerte && <AlertTriangle size={12} className="text-red-500" />}
                    <p className="text-sm font-bold text-slate-900">{p.commune}</p>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{p.espece}</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  <div>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-slate-500">Risque secheresse</span>
                      <span className={`font-bold ${p.risqueSecheresse > 70 ? "text-red-600" : "text-amber-600"}`}>{p.risqueSecheresse}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${p.risqueSecheresse > 70 ? "bg-red-500" : "bg-amber-400"}`} style={{ width: `${p.risqueSecheresse}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-slate-500">Survie predite</span>
                      <span className="font-bold text-emerald-600">{p.surviePredit}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${p.surviePredit}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === "anomalies" && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5"><AlertTriangle size={20} className="text-red-600 mb-2" /><p className="text-2xl font-black text-red-700">7</p><p className="text-xs text-red-600">Anomalies detectees (7j)</p></div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5"><TrendingDown size={20} className="text-amber-600 mb-2" /><p className="text-2xl font-black text-amber-700">93%</p><p className="text-xs text-amber-600">Precision Isolation Forest</p></div>
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5"><BarChart3 size={20} className="text-violet-600 mb-2" /><p className="text-2xl font-black text-violet-700">12 min</p><p className="text-xs text-violet-600">Temps de detection moyen</p></div>
          </div>
          {[
            { type: "Mortalite anormale", zone: "Podor Secteur 3", score: 0.91, action: "Inspection terrain requise" },
            { type: "NDVI chute brutale", zone: "Ranerou Nord", score: 0.88, action: "Verifier feux non signales" },
            { type: "Debit riviere aberrant", zone: "Matam Faleme", score: 0.76, action: "Capteur a verifier" },
          ].map(a => (
            <div key={a.zone} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-black text-slate-900">{a.type} - {a.zone}</p>
                <p className="text-xs text-slate-400 mt-0.5">Action : {a.action}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-black text-red-600">{(a.score * 100).toFixed(0)}%</p>
                <p className="text-[10px] text-slate-400">Score anomalie</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}