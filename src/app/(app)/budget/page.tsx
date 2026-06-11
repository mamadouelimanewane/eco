"use client";
import { Wallet, TrendingUp, TrendingDown, DollarSign, CheckCircle, Clock } from "lucide-react";

const lignes = [
  { categorie: "Ressources humaines", prevu: 450000000, realise: 312000000, pct: 69, type: "Dépense" },
  { categorie: "Matériel végétal", prevu: 280000000, realise: 280000000, pct: 100, type: "Dépense" },
  { categorie: "Équipements terrain", prevu: 120000000, realise: 89000000, pct: 74, type: "Dépense" },
  { categorie: "Formation & Renforcement", prevu: 75000000, realise: 45000000, pct: 60, type: "Dépense" },
  { categorie: "Évaluation & Monitoring", prevu: 55000000, realise: 38000000, pct: 69, type: "Dépense" },
  { categorie: "Communication", prevu: 30000000, realise: 12000000, pct: 40, type: "Dépense" },
];

const financements = [
  { source: "État sénégalais", montant: 600000000, statut: "Décaissé", pct: 100 },
  { source: "Union Européenne", montant: 250000000, statut: "Partiel", pct: 65 },
  { source: "Banque Mondiale", montant: 120000000, statut: "En attente", pct: 0 },
  { source: "GEF — Fond Environnement", montant: 80000000, statut: "Décaissé", pct: 100 },
];

const fmt = (n: number) => (n / 1000000).toFixed(1) + " M FCFA";

export default function BudgetPage() {
  const totalPrevu = lignes.reduce((s, l) => s + l.prevu, 0);
  const totalRealise = lignes.reduce((s, l) => s + l.realise, 0);
  const totalFinancement = financements.reduce((s, f) => s + f.montant, 0);
  const pctGlobal = Math.round(totalRealise / totalPrevu * 100);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Wallet size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-22 · Finance</p>
              <h1 className="text-2xl font-black text-white">Budget Projets GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Exercice 2026 · En FCFA</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Budget prévu", value: fmt(totalPrevu), color: "text-blue-400" },
              { label: "Réalisé", value: fmt(totalRealise), color: "text-emerald-400" },
              { label: "Taux d'exécution", value: pctGlobal + "%", color: "text-amber-400" },
              { label: "Financement total", value: fmt(totalFinancement), color: "text-violet-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Dépenses */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-5">Exécution budgétaire</h2>
          <div className="space-y-4">
            {lignes.map(l => (
              <div key={l.categorie}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700">{l.categorie}</span>
                  <span className="font-black text-slate-500">{l.pct}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${l.pct === 100 ? "bg-emerald-500" : l.pct >= 60 ? "bg-blue-400" : "bg-amber-400"}`} style={{ width: l.pct + "%" }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>{fmt(l.realise)} réalisé</span>
                  <span>{fmt(l.prevu)} prévu</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financements */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-5">Sources de financement</h2>
          <div className="space-y-4">
            {financements.map(f => (
              <div key={f.source} className="p-3 bg-slate-50 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-bold text-slate-800">{f.source}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${f.statut === "Décaissé" ? "bg-emerald-100 text-emerald-700" : f.statut === "Partiel" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}>{f.statut}</span>
                </div>
                <p className="text-base font-black text-slate-700 mb-2">{fmt(f.montant)}</p>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 rounded-full" style={{ width: f.pct + "%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}