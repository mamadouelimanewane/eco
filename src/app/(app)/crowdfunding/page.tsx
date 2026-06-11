"use client";
import { Gift, Heart, Users, TrendingUp, Target, Share2 } from "lucide-react";

const campagnes = [
  { id: "CF-001", titre: "1000 arbres pour Linguère", objectif: 5000000, collecte: 4320000, donateurs: 342, jours: 8, statut: "Actif", commune: "Linguère" },
  { id: "CF-002", titre: "Haie vive Ranérou Sud", objectif: 2500000, collecte: 2500000, donateurs: 198, jours: 0, statut: "Financé", commune: "Ranérou" },
  { id: "CF-003", titre: "Pépinière communautaire Mbane", objectif: 8000000, collecte: 1250000, donateurs: 89, jours: 22, statut: "Actif", commune: "Mbane" },
  { id: "CF-004", titre: "WaterPoint Dodji", objectif: 12000000, collecte: 3800000, donateurs: 267, jours: 45, statut: "Actif", commune: "Dodji" },
  { id: "CF-005", titre: "École verte Ourossogui", objectif: 3500000, collecte: 3500000, donateurs: 412, jours: 0, statut: "Financé", commune: "Ourossogui" },
];

const fmt = (n: number) => new Intl.NumberFormat("fr-FR").format(n) + " FCFA";

export default function CrowdfundingPage() {
  const totalCollecte = campagnes.reduce((s, c) => s + c.collecte, 0);
  const totalDonateurs = campagnes.reduce((s, c) => s + c.donateurs, 0);
  const financees = campagnes.filter(c => c.statut === "Financé").length;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Gift size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-23 · Financement participatif</p>
              <h1 className="text-2xl font-black text-white">Crowdfunding GMV</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Fonds collectés", value: (totalCollecte/1000000).toFixed(1)+"M FCFA", color: "text-pink-400" },
              { label: "Donateurs", value: totalDonateurs.toLocaleString(), color: "text-rose-400" },
              { label: "Campagnes financées", value: financees + "/" + campagnes.length, color: "text-emerald-400" },
              { label: "Taux de succès", value: Math.round(financees/campagnes.length*100)+"%", color: "text-amber-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campagnes.map(c => {
          const pct = Math.min(100, Math.round(c.collecte / c.objectif * 100));
          return (
            <div key={c.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-black text-slate-800">{c.titre}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{c.commune}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${c.statut === "Financé" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>{c.statut}</span>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>{pct}% financé</span>
                  <span>{c.jours > 0 ? c.jours + " jours restants" : "Terminé"}</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${pct >= 100 ? "bg-emerald-500" : "bg-pink-400"}`} style={{ width: pct + "%" }} />
                </div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span className="font-black text-slate-700">{(c.collecte/1000000).toFixed(1)}M FCFA</span>
                <span>sur {(c.objectif/1000000).toFixed(1)}M</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-400">
                <Users size={10} /><span>{c.donateurs} donateurs</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}