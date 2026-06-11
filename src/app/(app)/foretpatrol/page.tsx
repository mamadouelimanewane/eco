"use client";
import { Shield, AlertTriangle, MapPin, Clock, User, CheckCircle, XCircle } from "lucide-react";

const patrouilles = [
  { id: "PTR-001", agent: "Ibrahima Diallo", zone: "Forêt Linguère Nord", statut: "En cours", debut: "06:30", signalements: 2, surface: "4.2 km²", risque: "Moyen" },
  { id: "PTR-002", agent: "Fatou Sow", zone: "Périmètre Ranérou Est", statut: "Terminée", debut: "05:00", signalements: 0, surface: "3.8 km²", risque: "Faible" },
  { id: "PTR-003", agent: "Moussa Ndiaye", zone: "Zone Mbane Sud", statut: "Alerte", debut: "07:15", signalements: 5, surface: "2.1 km²", risque: "Critique" },
  { id: "PTR-004", agent: "Aissatou Baldé", zone: "Couloir Sagatta", statut: "En cours", debut: "06:00", signalements: 1, surface: "5.6 km²", risque: "Faible" },
  { id: "PTR-005", agent: "Ousmane Fall", zone: "Forêt Ourossogui", statut: "Planifiée", debut: "08:00", signalements: 0, surface: "6.0 km²", risque: "—" },
];

const alertes = [
  { type: "Coupe illégale", zone: "Mbane Sud", heure: "07:42", agent: "Moussa Ndiaye", gravite: "Élevée" },
  { type: "Feux de brousse", zone: "Mbane Sud", heure: "07:58", agent: "Moussa Ndiaye", gravite: "Critique" },
  { type: "Intrusion véhicule", zone: "Linguère Nord", heure: "06:55", agent: "Ibrahima Diallo", gravite: "Moyenne" },
];

const statColors: Record<string,string> = {
  "En cours": "bg-blue-100 text-blue-700",
  "Terminée": "bg-emerald-100 text-emerald-700",
  "Alerte": "bg-red-100 text-red-700 animate-pulse",
  "Planifiée": "bg-slate-100 text-slate-500",
};

export default function ForetPatrolPage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-09 · Surveillance</p>
              <h1 className="text-2xl font-black text-white">ForêtPatrol</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Patrouilles actives", value: "3", color: "text-green-400" },
              { label: "Alertes du jour", value: "3", color: "text-red-400" },
              { label: "Surface couverte", value: "21.7 km²", color: "text-blue-400" },
              { label: "Signalements", value: "8", color: "text-amber-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alertes */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={16} className="text-red-500" />
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Alertes en temps réel</h2>
          <span className="ml-auto text-[10px] bg-red-100 text-red-600 font-black px-2 py-0.5 rounded-full">3 ACTIVES</span>
        </div>
        <div className="space-y-3">
          {alertes.map((a, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-red-50 rounded-xl border border-red-100">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">{a.type} — <span className="text-red-600">{a.zone}</span></p>
                <p className="text-[11px] text-slate-400">Signalé par {a.agent} à {a.heure}</p>
              </div>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${a.gravite === "Critique" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{a.gravite}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Patrouilles */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Patrouilles du jour</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{["ID","Agent","Zone","Départ","Surface","Signalements","Statut"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {patrouilles.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-slate-500">{p.id}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">{p.agent}</td>
                  <td className="px-4 py-3 text-slate-600">{p.zone}</td>
                  <td className="px-4 py-3 text-slate-600">{p.debut}</td>
                  <td className="px-4 py-3 text-slate-600">{p.surface}</td>
                  <td className="px-4 py-3 text-center font-black text-slate-700">{p.signalements}</td>
                  <td className="px-4 py-3"><span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${statColors[p.statut]}`}>{p.statut}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}