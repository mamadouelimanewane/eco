"use client";
import { Droplets, AlertTriangle, CheckCircle, Clock, MapPin, Activity } from "lucide-react";

const points = [
  { id: "WP-001", nom: "Forage Linguère Centre", type: "Forage", commune: "Linguère", debit: 12.4, niveau: 87, statut: "Opérationnel", dernierControle: "Aujourd'hui" },
  { id: "WP-002", nom: "Mare Ranérou", type: "Mare naturelle", commune: "Ranérou", debit: 3.2, niveau: 41, statut: "Surveillance", dernierControle: "Hier" },
  { id: "WP-003", nom: "Puits Mbane-1", type: "Puits", commune: "Mbane", debit: 0.8, niveau: 23, statut: "Critique", dernierControle: "Il y a 3j" },
  { id: "WP-004", nom: "Forage Ourossogui Sud", type: "Forage", commune: "Ourossogui", debit: 18.0, niveau: 94, statut: "Opérationnel", dernierControle: "Aujourd'hui" },
  { id: "WP-005", nom: "Citerne Sagatta", type: "Citerne", commune: "Sagatta", debit: 6.5, niveau: 68, statut: "Opérationnel", dernierControle: "Hier" },
  { id: "WP-006", nom: "Forage Dodji-2", type: "Forage", commune: "Dodji", debit: 0.0, niveau: 5, statut: "Panne", dernierControle: "Il y a 7j" },
  { id: "WP-007", nom: "Mare Dianké", type: "Mare naturelle", commune: "Dianké Makha", debit: 2.1, niveau: 55, statut: "Surveillance", dernierControle: "Hier" },
];

const statColors: Record<string,string> = {
  "Opérationnel": "bg-emerald-100 text-emerald-700",
  "Surveillance": "bg-amber-100 text-amber-700",
  "Critique": "bg-orange-100 text-orange-700",
  "Panne": "bg-red-100 text-red-700",
};

export default function WaterPointPage() {
  const ok = points.filter(p => p.statut === "Opérationnel").length;
  const critical = points.filter(p => p.statut === "Critique" || p.statut === "Panne").length;
  const totalDebit = points.reduce((s, p) => s + p.debit, 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Droplets size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-10 · Eau</p>
              <h1 className="text-2xl font-black text-white">WaterPoint Monitor</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Points d'eau", value: points.length, color: "text-blue-400" },
              { label: "Opérationnels", value: ok, color: "text-emerald-400" },
              { label: "En alerte", value: critical, color: "text-red-400" },
              { label: "Débit total (m³/h)", value: totalDebit.toFixed(1), color: "text-cyan-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Niveau visuel */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {points.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-black text-slate-800">{p.nom}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{p.type} · {p.commune}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${statColors[p.statut]}`}>{p.statut}</span>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>Niveau</span>
                <span className="font-black text-slate-700">{p.niveau}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${p.niveau >= 70 ? "bg-blue-400" : p.niveau >= 40 ? "bg-amber-400" : "bg-red-500"}`}
                  style={{ width: p.niveau + "%" }}
                />
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Débit: <span className="font-bold text-slate-600">{p.debit} m³/h</span></span>
              <span>{p.dernierControle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}