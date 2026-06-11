"use client";
import { Flame, AlertTriangle, Wind, Thermometer, Eye, Phone } from "lucide-react";

const incidents = [
  { id: "FEU-001", zone: "Forêt Mbane Nord", date: "10/06/2026", heure: "14:23", superficie: 12.4, statut: "Maîtrisé", cause: "Foudre", pertes: "2 400 plants" },
  { id: "FEU-002", zone: "Couloir Dodji", date: "08/06/2026", heure: "11:05", superficie: 5.8, statut: "Maîtrisé", cause: "Activité humaine", pertes: "900 plants" },
  { id: "FEU-003", zone: "Linguère Sud-Ouest", date: "05/06/2026", heure: "16:40", superficie: 0.3, statut: "Détecté", cause: "Inconnue", pertes: "En évaluation" },
  { id: "FEU-004", zone: "Périmètre Vélingara", date: "01/06/2026", heure: "09:15", superficie: 28.2, statut: "Maîtrisé", cause: "Élevage", pertes: "8 200 plants" },
];

const risques = [
  { commune: "Linguère", temp: 41, humidite: 12, vent: 18, indice: 4.2, niveau: "Très élevé" },
  { commune: "Ranérou", temp: 38, humidite: 18, vent: 12, indice: 3.1, niveau: "Élevé" },
  { commune: "Ourossogui", temp: 36, humidite: 22, vent: 8, indice: 2.4, niveau: "Modéré" },
  { commune: "Sagatta", temp: 33, humidite: 35, vent: 5, indice: 1.2, niveau: "Faible" },
  { commune: "Mbane", temp: 40, humidite: 10, vent: 22, indice: 4.8, niveau: "Extrême" },
];

const niveauColor: Record<string,string> = {
  "Extrême": "bg-red-200 text-red-800",
  "Très élevé": "bg-red-100 text-red-700",
  "Élevé": "bg-orange-100 text-orange-700",
  "Modéré": "bg-amber-100 text-amber-700",
  "Faible": "bg-emerald-100 text-emerald-700",
};

export default function FeuxPage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Flame size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-12 · Feux</p>
              <h1 className="text-2xl font-black text-white">Surveillance Feux de Brousse</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Incidents juin 2026", value: "4", color: "text-orange-400" },
              { label: "Superficie brûlée (ha)", value: "46.7", color: "text-red-400" },
              { label: "Plants perdus", value: "~11 500", color: "text-rose-400" },
              { label: "Zones à risque extrême", value: "1", color: "text-amber-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indice de risque */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-5">Indice de risque feux — Aujourd'hui</h2>
        <div className="space-y-3">
          {risques.map(r => (
            <div key={r.commune} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
              <p className="w-28 font-bold text-slate-800 text-sm">{r.commune}</p>
              <div className="flex gap-4 flex-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1"><Thermometer size={11} className="text-orange-400" />{r.temp}°C</span>
                <span className="flex items-center gap-1"><Wind size={11} className="text-blue-400" />{r.vent} km/h</span>
                <span>Hum. {r.humidite}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: (r.indice / 5 * 100) + "%" }} />
                </div>
                <span className="text-xs font-black text-slate-600">{r.indice}/5</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${niveauColor[r.niveau]}`}>{r.niveau}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Historique */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center gap-2">
          <Flame size={15} className="text-orange-500" />
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Historique des incidents</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{["ID","Zone","Date","Heure","Superficie (ha)","Cause","Pertes","Statut"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {incidents.map(inc => (
                <tr key={inc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-slate-500">{inc.id}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">{inc.zone}</td>
                  <td className="px-4 py-3 text-slate-600">{inc.date}</td>
                  <td className="px-4 py-3 text-slate-600">{inc.heure}</td>
                  <td className="px-4 py-3 font-black text-orange-600">{inc.superficie}</td>
                  <td className="px-4 py-3 text-slate-600">{inc.cause}</td>
                  <td className="px-4 py-3 text-slate-600">{inc.pertes}</td>
                  <td className="px-4 py-3"><span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">{inc.statut}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}