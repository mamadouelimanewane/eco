"use client";
import { Plane, Camera, MapPin, Battery, Clock, CheckCircle } from "lucide-react";

const missions = [
  { id: "DRN-001", pilote: "Seydou Camara", zone: "Linguère — Secteur A4", date: "10/06/2026", duree: "47 min", images: 1240, superficie: "8.4 km²", statut: "Terminée", batterie: 100 },
  { id: "DRN-002", pilote: "Mariama Diop", zone: "Ranérou — Zone B2", date: "10/06/2026", duree: "32 min", images: 890, superficie: "5.1 km²", statut: "En cours", batterie: 62 },
  { id: "DRN-003", pilote: "Cheikh Sall", zone: "Mbane — Secteur C1", date: "09/06/2026", duree: "1h 12 min", images: 2100, superficie: "12.8 km²", statut: "Analyse", batterie: 100 },
  { id: "DRN-004", pilote: "Aminata Bâ", zone: "Ourossogui — Zone D3", date: "08/06/2026", duree: "55 min", images: 1560, superficie: "10.2 km²", statut: "Terminée", batterie: 100 },
  { id: "DRN-005", pilote: "Ibrahima Ndiaye", zone: "Vélingara — Secteur E1", date: "07/06/2026", duree: "—", images: 0, superficie: "9.0 km²", statut: "Planifiée", batterie: 0 },
];

const statColors: Record<string,string> = {
  "Terminée": "bg-emerald-100 text-emerald-700",
  "En cours": "bg-blue-100 text-blue-700 animate-pulse",
  "Analyse": "bg-violet-100 text-violet-700",
  "Planifiée": "bg-slate-100 text-slate-500",
};

export default function DronesPage() {
  const totalImages = missions.reduce((s, m) => s + m.images, 0);
  const totalSuperficie = missions.filter(m => m.superficie !== "—").reduce((s, m) => s + parseFloat(m.superficie), 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-violet-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Plane size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-13 · Surveillance Aérienne</p>
              <h1 className="text-2xl font-black text-white">Drone Survey GMV</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Missions ce mois", value: missions.length, color: "text-violet-400" },
              { label: "Images capturées", value: totalImages.toLocaleString(), color: "text-blue-400" },
              { label: "Surface couverte", value: totalSuperficie.toFixed(1) + " km²", color: "text-emerald-400" },
              { label: "Drones actifs", value: "2", color: "text-amber-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Drone cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {missions.filter(m => m.statut === "En cours" || m.statut === "Analyse").map(m => (
          <div key={m.id} className="bg-white rounded-2xl border border-violet-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-mono text-slate-400">{m.id}</p>
                <p className="text-sm font-black text-slate-800">{m.zone}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statColors[m.statut]}`}>{m.statut}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Battery size={13} className="text-slate-400" />
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${m.batterie > 50 ? "bg-emerald-400" : "bg-amber-400"}`} style={{ width: m.batterie + "%" }} />
              </div>
              <span className="text-[10px] font-black text-slate-500">{m.batterie}%</span>
            </div>
            <div className="flex gap-4 text-[11px] text-slate-500">
              <span><Camera size={10} className="inline mr-1" />{m.images} images</span>
              <span><MapPin size={10} className="inline mr-1" />{m.superficie}</span>
              <span><Clock size={10} className="inline mr-1" />{m.duree}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Journal des missions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{["ID","Pilote","Zone","Date","Durée","Images","Surface","Statut"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {missions.map(m => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-slate-400">{m.id}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">{m.pilote}</td>
                  <td className="px-4 py-3 text-slate-600">{m.zone}</td>
                  <td className="px-4 py-3 text-slate-500">{m.date}</td>
                  <td className="px-4 py-3 text-slate-500">{m.duree}</td>
                  <td className="px-4 py-3 font-black text-violet-600">{m.images || "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{m.superficie}</td>
                  <td className="px-4 py-3"><span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${statColors[m.statut]}`}>{m.statut}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}