"use client";
import { Timer, TreePine, Users, Globe, TrendingUp, Activity } from "lucide-react";

const stats = [
  { label: "Arbres plantés depuis 2008", valeur: 5284920, increment: 12, unite: "arbres", icone: TreePine, couleur: "text-emerald-400" },
  { label: "Hectares restaurés", valeur: 184320, increment: 0.3, unite: "ha", icone: Globe, couleur: "text-teal-400" },
  { label: "Communes actives", valeur: 131, increment: 0, unite: "communes", icone: Activity, couleur: "text-blue-400" },
  { label: "Volontaires inscrits", valeur: 28492, increment: 5, unite: "personnes", icone: Users, couleur: "text-violet-400" },
];

const jalons = [
  { annee: 2008, event: "Lancement officiel GMV", arbres: 50000 },
  { annee: 2012, event: "1 million d'arbres", arbres: 1000000 },
  { annee: 2018, event: "Création ASERGMV", arbres: 2100000 },
  { annee: 2022, event: "Plateforme digitale lancée", arbres: 3800000 },
  { annee: 2025, event: "5 millions d'arbres", arbres: 5000000 },
  { annee: 2030, event: "Objectif : 10 millions", arbres: 10000000, futur: true },
];

export default function LiveCounterPage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Timer size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-42 · Compteur</p>
              <h1 className="text-2xl font-black text-white">Live Counter GMV</h1>
              <p className="text-slate-400 text-sm mt-1">La Grande Muraille Verte en chiffres, en temps réel</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {stats.map(s => {
              const Icon = s.icone;
              return (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-3xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={18} className={s.couleur} />
                    <p className="text-xs text-slate-500">{s.label}</p>
                  </div>
                  <p className={`text-4xl font-black ${s.couleur} tabular-nums`}>{s.valeur.toLocaleString()}</p>
                  {s.increment > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      <p className="text-[10px] text-emerald-400">+{s.increment} {s.unite} par heure</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-6">Jalons historiques</h2>
        <div className="relative">
          <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-slate-100" />
          <div className="space-y-6">
            {jalons.map(j => (
              <div key={j.annee} className="flex items-start gap-4">
                <div className={`w-14 shrink-0 text-right text-xs font-black ${j.futur ? "text-slate-300" : "text-slate-600"}`}>{j.annee}</div>
                <div className={`relative w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 ${j.futur ? "border-slate-300 bg-white" : "border-emerald-500 bg-emerald-500"}`} />
                <div className="flex-1">
                  <p className={`text-sm font-bold ${j.futur ? "text-slate-400" : "text-slate-800"}`}>{j.event}</p>
                  <p className={`text-[11px] ${j.futur ? "text-slate-300" : "text-emerald-600 font-bold"}`}>{j.arbres.toLocaleString()} arbres</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}