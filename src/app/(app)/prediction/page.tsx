"use client";
import { Brain, TrendingUp, Activity, Target, BarChart3, Leaf } from "lucide-react";

const modeles = [
  { nom: "Survie à 12 mois (Random Forest)", precision: 91.4, rmse: 0.08, features: ["Température","Pluviométrie","Type sol","Espèce","Pente"], statut: "Production" },
  { nom: "Croissance hauteur (Gradient Boost)", precision: 87.2, rmse: 3.2, features: ["Espèce","Âge","Engrais","Sol pH","Eau disponible"], statut: "Production" },
  { nom: "Risque érosion (CNN + Satellite)", precision: 84.6, rmse: 0.12, features: ["NDVI","Pluie cumulée","Couverture sol","Pente"], statut: "Test" },
  { nom: "Propagation feux (Simulation)", precision: 78.9, rmse: 0.18, features: ["Vent","Humidité","Temp","Végétation"], statut: "Test" },
];

const predictions = [
  { zone: "Linguère", espece: "Acacia senegal", surviePred: 84, survieActuelle: 84, cible2027: 88 },
  { zone: "Ranérou", espece: "Balanites aegyptiaca", surviePred: 69, survieActuelle: 71, cible2027: 78 },
  { zone: "Mbane", espece: "Ziziphus mauritiana", surviePred: 91, survieActuelle: 91, cible2027: 93 },
  { zone: "Dodji", espece: "Piliostigma", surviePred: 58, survieActuelle: 62, cible2027: 70 },
];

export default function PredictionPage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-46 · ML Prédictions</p>
              <h1 className="text-2xl font-black text-white">Prediction Plants AI</h1>
              <p className="text-slate-400 text-sm mt-1">Modèles prédictifs pour la gestion proactive de la GMV</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Modèles actifs", value: modeles.length, color: "text-teal-400" },
              { label: "En production", value: modeles.filter(m=>m.statut==="Production").length, color: "text-emerald-400" },
              { label: "Données d'entraînement", value: "284k", color: "text-blue-400" },
              { label: "Prédictions/mois", value: "12k", color: "text-violet-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{String(value)}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Modèles ML déployés</h2>
        <div className="space-y-4">
          {modeles.map(m => (
            <div key={m.nom} className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-start justify-between mb-2">
                <p className="text-xs font-black text-slate-800">{m.nom}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.statut==="Production"?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-700"}`}>{m.statut}</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-400 rounded-full" style={{ width: m.precision+"%" }} />
                </div>
                <span className="text-xs font-black text-teal-600">{m.precision}%</span>
                <span className="text-[10px] text-slate-400">RMSE: {m.rmse}</span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {m.features.map(f => <span key={f} className="text-[9px] font-bold bg-teal-50 text-teal-600 border border-teal-100 px-1.5 py-0.5 rounded">{f}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Prédictions taux de survie 2027</h2>
        <div className="space-y-3">
          {predictions.map(p => (
            <div key={p.zone} className="flex items-center gap-4">
              <div className="w-24 shrink-0">
                <p className="text-xs font-bold text-slate-800">{p.zone}</p>
                <p className="text-[10px] text-slate-400 italic">{p.espece}</p>
              </div>
              <div className="flex-1 relative h-6">
                <div className="h-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full opacity-60" style={{ width: p.survieActuelle+"%" }} />
                </div>
                <div className="absolute top-0 h-full" style={{ left: p.cible2027+"%" }}>
                  <div className="w-0.5 h-full bg-teal-600" />
                </div>
              </div>
              <div className="text-right shrink-0 w-24 text-[11px]">
                <p className="font-black text-slate-700">Actuel: {p.survieActuelle}%</p>
                <p className="text-teal-600 font-bold">Cible 27: {p.cible2027}%</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 mt-3">⬛ Actuel  |  <span className="text-teal-600">|</span> Cible 2027 (modèle prédictif)</p>
      </div>
    </div>
  );
}