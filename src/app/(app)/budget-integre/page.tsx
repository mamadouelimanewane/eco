"use client";
import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, AlertCircle, CheckCircle, Clock, Download } from "lucide-react";

const budgets = [
  { projet: "PAREC-CC", bailleur: "Banque Mondiale", devise: "USD", total: 4200000, engage: 3150000, depense: 2890000, statut: "en_cours" },
  { projet: "Partenariat OCP", bailleur: "OCP Maroc", devise: "EUR", total: 1800000, engage: 1620000, depense: 1240000, statut: "en_cours" },
  { projet: "Jardins Scolaires GMV", bailleur: "AFD", devise: "EUR", total: 850000, engage: 850000, depense: 710000, statut: "alerte" },
  { projet: "RIPOSTES", bailleur: "UE", devise: "EUR", total: 2600000, engage: 780000, depense: 340000, statut: "en_cours" },
  { projet: "Reboisement Matam", bailleur: "FEM/GEF", devise: "USD", total: 1200000, engage: 480000, depense: 195000, statut: "nouveau" },
  { projet: "Agroforesterie Louga", bailleur: "FIDA", devise: "USD", total: 960000, engage: 672000, depense: 580000, statut: "en_cours" },
];

const lignes = [
  { categorie: "Ressources humaines", prevu: 3200000, realise: 2890000 },
  { categorie: "Matériaux & intrants", prevu: 1800000, realise: 1650000 },
  { categorie: "Transport & logistique", prevu: 980000, realise: 1120000 },
  { categorie: "Formation & renforcement", prevu: 620000, realise: 580000 },
  { categorie: "Équipements & matériels", prevu: 1240000, realise: 890000 },
  { categorie: "Suivi & évaluation", prevu: 480000, realise: 395000 },
  { categorie: "Communication", prevu: 290000, realise: 320000 },
  { categorie: "Frais généraux (15%)", prevu: 784000, realise: 710000 },
];

const sources = [
  { nom: "Banque Mondiale", montant: "4 200 000 USD", pct: 38, couleur: "bg-blue-500" },
  { nom: "Union Européenne", montant: "2 600 000 EUR", pct: 23, couleur: "bg-indigo-500" },
  { nom: "OCP Maroc", montant: "1 800 000 EUR", pct: 16, couleur: "bg-emerald-500" },
  { nom: "FEM / GEF", montant: "1 200 000 USD", pct: 11, couleur: "bg-teal-500" },
  { nom: "FIDA", montant: "960 000 USD", pct: 9, couleur: "bg-cyan-500" },
  { nom: "AFD", montant: "850 000 EUR", pct: 8, couleur: "bg-violet-500" },
  { nom: "Carbone VCS", montant: "340 000 USD", pct: 3, couleur: "bg-green-500" },
  { nom: "Crowdfunding diaspora", montant: "120 000 FCFA", pct: 1, couleur: "bg-amber-500" },
];

const alertes = [
  { type: "warning", msg: "Jardins Scolaires GMV — budget RH dépassé de 8%", date: "09/06/2026" },
  { type: "warning", msg: "Ligne transport PAREC-CC — écart +14,3% sur prévisionnel", date: "07/06/2026" },
  { type: "info", msg: "Tranche 2 RIPOSTES (780 000 EUR) — décaissement prévu J+14", date: "05/06/2026" },
  { type: "success", msg: "Audit financier OCP Q1 2026 — Conforme, aucune réserve", date: "01/06/2026" },
];

const tresorerie = [
  { mois: "Juil. 2026", entrees: 780, sorties: 420 },
  { mois: "Août 2026", entrees: 240, sorties: 380 },
  { mois: "Sept. 2026", entrees: 1200, sorties: 540 },
  { mois: "Oct. 2026", entrees: 180, sorties: 450 },
  { mois: "Nov. 2026", entrees: 960, sorties: 510 },
  { mois: "Déc. 2026", entrees: 340, sorties: 620 },
];

const statutBadge: Record<string, string> = {
  en_cours: "bg-blue-100 text-blue-700",
  alerte: "bg-red-100 text-red-700",
  nouveau: "bg-emerald-100 text-emerald-700",
};
const statutLabel: Record<string, string> = { en_cours: "En cours", alerte: "Alerte", nouveau: "Nouveau" };
const pct = (a: number, b: number) => Math.round((a / b) * 100);

export default function BudgetIntegrePage() {
  const [onglet, setOnglet] = useState<"projets" | "lignes" | "sources" | "alertes">("projets");

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
              <DollarSign size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">MODULE FINANCES · ASERGMV</p>
              <h1 className="text-2xl font-black text-white">Gestion Budgétaire Intégrée</h1>
              <p className="text-slate-400 text-sm mt-1">Pilotage multi-bailleurs · Engagements · Trésorerie · Conformité SYSCOA/OHADA</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Budget total portefeuille", value: "11,61 M USD", color: "text-emerald-400" },
              { label: "Montant total engagé", value: "7,55 M USD", color: "text-blue-400" },
              { label: "Dépensé à date", value: "5,96 M USD", color: "text-amber-400" },
              { label: "Taux d'exécution global", value: "51,4%", color: "text-violet-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap items-center">
        {(["projets", "lignes", "sources", "alertes"] as const).map(id => (
          <button key={id} onClick={() => setOnglet(id)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${onglet === id ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"}`}>
            {id === "projets" ? "Projets & Bailleurs" : id === "lignes" ? "Lignes budgétaires" : id === "sources" ? "Sources financement" : "Alertes & Audit"}
          </button>
        ))}
        <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all">
          <Download size={14} /> Export SYSCOA/OHADA
        </button>
      </div>

      {onglet === "projets" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Projet", "Bailleur", "Budget total", "Engagé", "Dépensé", "Exécution", "Statut"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-black text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {budgets.map(b => {
                const exec = pct(b.depense, b.total);
                return (
                  <tr key={b.projet} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">{b.projet}</td>
                    <td className="px-4 py-3 text-slate-600">{b.bailleur}</td>
                    <td className="px-4 py-3 font-mono text-slate-700">{b.total.toLocaleString()} {b.devise}</td>
                    <td className="px-4 py-3 font-mono text-blue-600">{b.engage.toLocaleString()} {b.devise}</td>
                    <td className="px-4 py-3 font-mono text-emerald-600">{b.depense.toLocaleString()} {b.devise}</td>
                    <td className="px-4 py-3 w-36">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${exec > 90 ? "bg-red-500" : exec > 70 ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${exec}%` }} />
                        </div>
                        <span className="text-[11px] font-black text-slate-500">{exec}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statutBadge[b.statut]}`}>{statutLabel[b.statut]}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {onglet === "lignes" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-base font-black text-slate-900">Analyse des écarts — Portefeuille consolidé 2026</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {lignes.map(l => {
              const ecart = l.realise - l.prevu;
              return (
                <div key={l.categorie} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-800">{l.categorie}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">{l.realise.toLocaleString()} / {l.prevu.toLocaleString()} USD</span>
                      <span className={`flex items-center gap-1 text-xs font-black ${ecart > 0 ? "text-red-600" : "text-emerald-600"}`}>
                        {ecart > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {ecart > 0 ? "+" : ""}{ecart.toLocaleString()} USD
                      </span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${ecart > 0 ? "bg-red-400" : "bg-emerald-500"}`} style={{ width: `${Math.min(pct(l.realise, l.prevu), 100)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex justify-between">
            <span className="text-sm font-black text-slate-700">Total portefeuille</span>
            <span className="text-sm font-black text-emerald-600 flex items-center gap-1"><TrendingDown size={14} /> Économie nette : 1 009 000 USD</span>
          </div>
        </div>
      )}

      {onglet === "sources" && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-sm font-black text-slate-900 mb-4">Répartition par bailleur</h3>
            <div className="space-y-3">
              {sources.map(s => (
                <div key={s.nom}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-slate-700">{s.nom}</span>
                    <span className="text-slate-400">{s.montant} · {s.pct}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${s.couleur} rounded-full`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-sm font-black text-slate-900 mb-4">Flux de trésorerie prévisionnels (k USD)</h3>
            <div className="space-y-2">
              {tresorerie.map(f => (
                <div key={f.mois} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-24 shrink-0">{f.mois}</span>
                  <div className="flex-1 flex gap-1 h-6 items-center">
                    <div className="h-full bg-emerald-100 rounded flex items-center px-2 text-[10px] font-bold text-emerald-700" style={{ width: `${(f.entrees / 1400) * 55}%`, minWidth: "36px" }}>+{f.entrees}k</div>
                    <div className="h-full bg-red-100 rounded flex items-center px-2 text-[10px] font-bold text-red-700" style={{ width: `${(f.sorties / 1400) * 55}%`, minWidth: "36px" }}>-{f.sorties}k</div>
                  </div>
                  <span className={`text-xs font-black w-14 text-right ${f.entrees >= f.sorties ? "text-emerald-600" : "text-red-600"}`}>{f.entrees >= f.sorties ? "+" : ""}{f.entrees - f.sorties}k</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {onglet === "alertes" && (
        <div className="space-y-3">
          {alertes.map((a, i) => (
            <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl border ${a.type === "warning" ? "bg-red-50 border-red-100" : a.type === "success" ? "bg-emerald-50 border-emerald-100" : "bg-blue-50 border-blue-100"}`}>
              {a.type === "warning" ? <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" /> : a.type === "success" ? <CheckCircle size={18} className="text-emerald-500 mt-0.5 shrink-0" /> : <Clock size={18} className="text-blue-500 mt-0.5 shrink-0" />}
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">{a.msg}</p>
                <p className="text-xs text-slate-400 mt-0.5">{a.date}</p>
              </div>
            </div>
          ))}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mt-2">
            <h3 className="text-sm font-black text-slate-900 mb-3">Conformité & Audit</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { label: "Standard comptable", val: "SYSCOA / OHADA", ok: true },
                { label: "Piste d'audit", val: "100% des transactions", ok: true },
                { label: "Prochain audit externe", val: "15 sept. 2026", ok: false },
                { label: "Rapports bailleurs", val: "À jour — 6/6", ok: true },
                { label: "Déclaration fiscale", val: "Q1-Q2 2026 soumises", ok: true },
                { label: "Certification ISO 9001", val: "En cours — oct. 2026", ok: false },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${c.ok ? "bg-emerald-500" : "bg-amber-400"}`} />
                  <div><p className="text-xs font-bold text-slate-700">{c.label}</p><p className="text-[11px] text-slate-400">{c.val}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
