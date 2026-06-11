"use client";
import { Package, CheckCircle, Clock, TrendingUp, Truck, AlertTriangle } from "lucide-react";

const commandes = [
  { id: "PRC-2026-089", article: "Plants d'Acacia senegal — 200 000 unités", fournisseur: "Pépinière Ranérou SARL", montant: 50000000, statut: "Livré", dateCommande: "15/04/2026", dateLivraison: "10/05/2026" },
  { id: "PRC-2026-088", article: "Engrais organique — 50 tonnes", fournisseur: "Bioferme Thiès", montant: 15000000, statut: "En transit", dateCommande: "01/06/2026", dateLivraison: "Prévue 20/06/2026" },
  { id: "PRC-2026-087", article: "GPS terrain 40 unités", fournisseur: "Teknor Dakar", montant: 8000000, statut: "Commandé", dateCommande: "05/06/2026", dateLivraison: "Prévue 25/06/2026" },
  { id: "PRC-2026-086", article: "Véhicules 4x4 — 3 unités", fournisseur: "CFAO Motors", montant: 75000000, statut: "Retard", dateCommande: "01/03/2026", dateLivraison: "Prévue 30/04/2026 (retard)" },
  { id: "PRC-2026-085", article: "Matériel irrigation goutte-à-goutte", fournisseur: "Irrisol SN", montant: 22000000, statut: "Livré", dateCommande: "10/04/2026", dateLivraison: "05/05/2026" },
];

const statutColor: Record<string,string> = {
  "Livré": "bg-emerald-100 text-emerald-700",
  "En transit": "bg-blue-100 text-blue-700",
  "Commandé": "bg-amber-100 text-amber-700",
  "Retard": "bg-red-100 text-red-700",
};

const fmt = (n: number) => new Intl.NumberFormat("fr-FR").format(n) + " FCFA";

export default function ProcurementPage() {
  const totalEngagement = commandes.reduce((s, c) => s + c.montant, 0);
  const retard = commandes.filter(c => c.statut === "Retard").length;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Package size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-55 · Achats</p>
              <h1 className="text-2xl font-black text-white">Procurement ASERGMV</h1>
              <p className="text-slate-400 text-sm mt-1">Suivi des commandes et approvisionnements</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Commandes actives", value: commandes.length, color: "text-amber-400" },
              { label: "Engagements total", value: (totalEngagement/1000000).toFixed(0)+"M FCFA", color: "text-emerald-400" },
              { label: "Fournisseurs actifs", value: "12", color: "text-blue-400" },
              { label: "Retards détectés", value: retard, color: "text-red-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{String(value)}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Commandes en cours</h2>
          <button className="text-[11px] font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg hover:bg-amber-100">+ Nouvelle commande</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>{["Réf.","Article","Fournisseur","Montant","Date commande","Livraison","Statut"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {commandes.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-slate-400 text-[10px]">{c.id}</td>
                  <td className="px-4 py-3 font-bold text-slate-800 max-w-xs truncate">{c.article}</td>
                  <td className="px-4 py-3 text-slate-600">{c.fournisseur}</td>
                  <td className="px-4 py-3 font-black text-amber-700">{fmt(c.montant)}</td>
                  <td className="px-4 py-3 text-slate-500">{c.dateCommande}</td>
                  <td className="px-4 py-3 text-slate-500">{c.dateLivraison}</td>
                  <td className="px-4 py-3"><span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${statutColor[c.statut]}`}>{c.statut}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}