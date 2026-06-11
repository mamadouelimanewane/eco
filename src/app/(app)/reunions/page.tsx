"use client";
import { FileText, Calendar, Users, Clock, CheckCircle, Video } from "lucide-react";

const reunions = [
  { id: "REU-2026-042", titre: "Réunion mensuelle Direction + Chefs de zone", date: "15/06/2026", heure: "09:00", lieu: "Siège ASERGMV + Zoom", participants: 28, statut: "Planifiée", type: "Hybride" },
  { id: "REU-2026-041", titre: "Comité technique plantation campagne 2026", date: "10/06/2026", heure: "14:00", lieu: "Zoom", participants: 15, statut: "Terminée", type: "Virtuelle", CR: true },
  { id: "REU-2026-040", titre: "Point terrain hebdomadaire Louga", date: "09/06/2026", heure: "08:00", lieu: "Terrain Linguère", participants: 8, statut: "Terminée", type: "Présentielle", CR: true },
  { id: "REU-2026-039", titre: "Réunion bailleurs Q2 2026", date: "05/06/2026", heure: "15:00", lieu: "Zoom + Paris", participants: 22, statut: "Terminée", type: "Hybride", CR: false },
];

const typeColor: Record<string,string> = {
  "Hybride": "bg-violet-100 text-violet-700",
  "Virtuelle": "bg-blue-100 text-blue-700",
  "Présentielle": "bg-emerald-100 text-emerald-700",
};

const statutColor: Record<string,string> = {
  "Planifiée": "bg-amber-100 text-amber-700",
  "Terminée": "bg-slate-100 text-slate-500",
};

export default function ReunionsPage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Video size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-54 · Réunions</p>
              <h1 className="text-2xl font-black text-white">Réunions Auto GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Planification, comptes-rendus et suivi des décisions</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Réunions ce mois", value: reunions.length, color: "text-indigo-400" },
              { label: "CR générés", value: reunions.filter((r: any) => r.CR).length, color: "text-emerald-400" },
              { label: "Participants total", value: reunions.reduce((s, r) => s + r.participants, 0), color: "text-blue-400" },
              { label: "Planifiées", value: reunions.filter(r => r.statut === "Planifiée").length, color: "text-amber-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {reunions.map(r => (
          <div key={r.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                <Video size={18} className="text-indigo-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                  <div>
                    <p className="text-[10px] font-mono text-slate-400">{r.id}</p>
                    <p className="text-sm font-black text-slate-800">{r.titre}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColor[r.type]}`}>{r.type}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statutColor[r.statut]}`}>{r.statut}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1"><Calendar size={10} />{r.date} à {r.heure}</span>
                  <span className="flex items-center gap-1"><Users size={10} />{r.participants} participants</span>
                  <span>{r.lieu}</span>
                  {(r as any).CR !== undefined && (
                    <span className={(r as any).CR ? "text-emerald-600 font-bold" : "text-slate-400"}>
                      {(r as any).CR ? "✓ CR disponible" : "CR en attente"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}