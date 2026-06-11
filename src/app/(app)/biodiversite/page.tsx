"use client";
import { Leaf, Eye, AlertTriangle, TrendingUp, Bird, Fish } from "lucide-react";

const especes = [
  { nom: "Acacia senegal", type: "Flore", statut: "Stable", observations: 1240, population: "Abondante", menace: "Faible", zone: "Zones arides" },
  { nom: "Adansonia digitata (Baobab)", type: "Flore", statut: "Vulnérable", observations: 342, population: "En déclin", menace: "Élevée", zone: "Toutes zones" },
  { nom: "Gazelle dorcas", type: "Faune", statut: "Vulnerable", observations: 89, population: "Rare", menace: "Critique", zone: "Sahel" },
  { nom: "Vautour africain", type: "Faune", statut: "Menacé", observations: 12, population: "Très rare", menace: "Critique", zone: "Ferlo" },
  { nom: "Calotropis procera", type: "Flore", statut: "Invasive", observations: 2890, population: "En expansion", menace: "—", zone: "Toutes zones" },
  { nom: "Pangolin géant", type: "Faune", statut: "En danger", observations: 3, population: "Critique", menace: "Critique", zone: "Kolda" },
  { nom: "Combretum glutinosum", type: "Flore", statut: "Stable", observations: 890, population: "Bonne", menace: "Faible", zone: "Sahel" },
  { nom: "Lamentin africain", type: "Faune", statut: "Vulnérable", observations: 28, population: "Rare", menace: "Élevée", zone: "Zones humides" },
];

const statutColor: Record<string, string> = {
  "Stable": "bg-emerald-100 text-emerald-700",
  "Vulnérable": "bg-amber-100 text-amber-700",
  "Vulnerable": "bg-amber-100 text-amber-700",
  "Menacé": "bg-orange-100 text-orange-700",
  "En danger": "bg-red-100 text-red-700",
  "Invasive": "bg-violet-100 text-violet-700",
};

export default function BiodiversitePage() {
  const flore = especes.filter(e => e.type === "Flore").length;
  const faune = especes.filter(e => e.type === "Faune").length;
  const critiques = especes.filter(e => e.menace === "Critique").length;
  const totalObs = especes.reduce((s, e) => s + e.observations, 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Leaf size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-17 · Biodiversité</p>
              <h1 className="text-2xl font-black text-white">Biodiversité GMV</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Espèces suivies", value: especes.length, color: "text-teal-400" },
              { label: "Espèces flore", value: flore, color: "text-emerald-400" },
              { label: "Espèces faune", value: faune, color: "text-blue-400" },
              { label: "Espèces menacées", value: critiques, color: "text-red-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {especes.filter(e => e.menace === "Critique").map(e => (
          <div key={e.nom} className="bg-white rounded-2xl border border-red-100 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={14} className="text-red-500" />
              <span className="text-[10px] font-black text-red-600 uppercase">Espèce menacée</span>
            </div>
            <p className="text-sm font-black text-slate-800 italic mb-1">{e.nom}</p>
            <p className="text-[11px] text-slate-500">{e.type} · {e.zone}</p>
            <p className="text-[11px] text-slate-400 mt-1">{e.observations} observations</p>
            <span className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${statutColor[e.statut] ?? "bg-gray-100 text-gray-700"}`}>{e.statut}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Registre des espèces</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{["Espèce","Type","Population","Zone","Observations","Statut","Menace"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {especes.map(e => (
                <tr key={e.nom} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-800 italic">{e.nom}</td>
                  <td className="px-4 py-3 text-slate-500">{e.type}</td>
                  <td className="px-4 py-3 text-slate-600">{e.population}</td>
                  <td className="px-4 py-3 text-slate-500">{e.zone}</td>
                  <td className="px-4 py-3 font-black text-teal-600">{e.observations}</td>
                  <td className="px-4 py-3"><span className={`font-bold px-2 py-0.5 rounded-full ${statutColor[e.statut] ?? "bg-gray-100 text-gray-600"}`}>{e.statut}</span></td>
                  <td className="px-4 py-3 font-bold text-slate-600">{e.menace}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}