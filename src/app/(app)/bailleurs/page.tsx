"use client";
import { TrendingUp, Globe, DollarSign, CheckCircle, Building2, FileText } from "lucide-react";

const bailleurs = [
  { nom: "Union Européenne — DEVEQ", type: "Multilatéral", montant: 8500000, devise: "EUR", decaisse: 5525000, projets: 12, statut: "Actif", contact: "Direction UE Dakar" },
  { nom: "Banque Mondiale — PROGREEN", type: "Multilatéral", montant: 15000000, devise: "USD", decaisse: 0, projets: 3, statut: "Négociation", contact: "World Bank Sénégal" },
  { nom: "GEF — Fonds Environnement Mondial", type: "Multilatéral", montant: 4200000, devise: "USD", decaisse: 4200000, projets: 8, statut: "Clôturé", contact: "PNUD Dakar" },
  { nom: "AFD — Agence Française", type: "Bilatéral", montant: 12000000, devise: "EUR", decaisse: 7800000, projets: 5, statut: "Actif", contact: "AFD Dakar" },
  { nom: "USAID — Initiative Sahel", type: "Bilatéral", montant: 5000000, devise: "USD", decaisse: 2000000, projets: 4, statut: "Actif", contact: "USAID Dakar" },
  { nom: "Fondation Bill Gates", type: "Privé", montant: 2000000, devise: "USD", decaisse: 500000, projets: 2, statut: "Actif", contact: "BMGF Africa" },
];

const statutColor: Record<string,string> = {
  "Actif": "bg-emerald-100 text-emerald-700",
  "Négociation": "bg-amber-100 text-amber-700",
  "Clôturé": "bg-slate-100 text-slate-500",
};

export default function BailleursPage() {
  const totalEUR = bailleurs.filter(b => b.devise === "EUR").reduce((s, b) => s + b.montant, 0);
  const totalUSD = bailleurs.filter(b => b.devise === "USD").reduce((s, b) => s + b.montant, 0);
  const actifs = bailleurs.filter(b => b.statut === "Actif").length;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-28 · Financement international</p>
              <h1 className="text-2xl font-black text-white">Dashboard Bailleurs</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Bailleurs actifs", value: actifs, color: "text-emerald-400" },
              { label: "Total EUR engagé", value: (totalEUR/1000000).toFixed(1)+"M €", color: "text-blue-400" },
              { label: "Total USD engagé", value: (totalUSD/1000000).toFixed(1)+"M $", color: "text-amber-400" },
              { label: "Projets financés", value: bailleurs.reduce((s,b)=>s+b.projets,0), color: "text-violet-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bailleurs.map(b => {
          const pct = Math.round(b.decaisse / b.montant * 100);
          return (
            <div key={b.nom} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-black text-slate-800 leading-tight">{b.nom}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{b.type} · {b.contact}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${statutColor[b.statut]}`}>{b.statut}</span>
              </div>
              <p className="text-xl font-black text-indigo-600 mb-1">{b.montant.toLocaleString()} {b.devise}</p>
              <div className="mb-2">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>Décaissé: {b.decaisse.toLocaleString()} {b.devise}</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${pct >= 80 ? "bg-emerald-400" : pct >= 40 ? "bg-blue-400" : "bg-amber-400"}`} style={{ width: pct + "%" }} />
                </div>
              </div>
              <p className="text-[10px] text-slate-400">{b.projets} projets financés</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}