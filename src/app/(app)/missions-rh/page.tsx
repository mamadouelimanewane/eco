"use client";
import { Navigation, MapPin, Clock, Users, CheckCircle, Calendar } from "lucide-react";

const missions = [
  { id: "MSN-2026-042", titre: "Campagne de plantation — Zone Nord Linguère", type: "Terrain", agents: ["Ibrahima D.","Fatou S.","Moussa N."], region: "Louga", debut: "15/06/2026", fin: "22/06/2026", statut: "Validée", budget: 1250000 },
  { id: "MSN-2026-041", titre: "Évaluation survie secteur B2 Ranérou", type: "Évaluation", agents: ["Aissatou B."], region: "Matam", debut: "10/06/2026", fin: "12/06/2026", statut: "En cours", budget: 180000 },
  { id: "MSN-2026-040", titre: "Formation agents terrain — Ourossogui", type: "Formation", agents: ["Aissatou B.","Cheikh S."], region: "Matam", debut: "05/06/2026", fin: "07/06/2026", statut: "Terminée", budget: 450000 },
  { id: "MSN-2026-039", titre: "Audit pépinière Sagatta", type: "Audit", agents: ["Ousmane F."], region: "Thiès", debut: "02/06/2026", fin: "03/06/2026", statut: "Terminée", budget: 85000 },
];

const statutColor: Record<string,string> = {
  "Validée": "bg-blue-100 text-blue-700",
  "En cours": "bg-amber-100 text-amber-700",
  "Terminée": "bg-emerald-100 text-emerald-700",
};

const typeColor: Record<string,string> = {
  "Terrain": "bg-green-100 text-green-700",
  "Évaluation": "bg-violet-100 text-violet-700",
  "Formation": "bg-blue-100 text-blue-700",
  "Audit": "bg-slate-100 text-slate-600",
};

export default function MissionsRhPage() {
  const budgetTotal = missions.reduce((s, m) => s + m.budget, 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Navigation size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-52 · Missions</p>
              <h1 className="text-2xl font-black text-white">Mission Manager GMV</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Missions totales", value: missions.length, color: "text-blue-400" },
              { label: "En cours", value: missions.filter(m=>m.statut==="En cours").length, color: "text-amber-400" },
              { label: "Terminées", value: missions.filter(m=>m.statut==="Terminée").length, color: "text-emerald-400" },
              { label: "Budget total", value: (budgetTotal/1000000).toFixed(2)+"M FCFA", color: "text-violet-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{String(value)}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {missions.map(m => (
          <div key={m.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Navigation size={18} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                  <div>
                    <p className="text-[10px] font-mono text-slate-400">{m.id}</p>
                    <p className="text-sm font-black text-slate-800">{m.titre}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColor[m.type]}`}>{m.type}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statutColor[m.statut]}`}>{m.statut}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1"><MapPin size={10} />{m.region}</span>
                  <span className="flex items-center gap-1"><Calendar size={10} />{m.debut} → {m.fin}</span>
                  <span className="flex items-center gap-1"><Users size={10} />{m.agents.join(", ")}</span>
                  <span className="font-black text-slate-700">{m.budget.toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}