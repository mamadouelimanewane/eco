"use client";
import { Gavel, Clock, FileText, Users, TrendingUp, CheckCircle } from "lucide-react";

const appels = [
  { ref: "AO-2026-018", titre: "Fourniture de 500 000 plants d'espèces locales", budget: 250000000, soumissions: 8, cloture: "30/06/2026", statut: "Ouvert", categorie: "Matériel végétal" },
  { ref: "AO-2026-017", titre: "Prestation de reboisement — Zones Nord (Matam, Louga)", budget: 180000000, soumissions: 5, cloture: "25/06/2026", statut: "Ouvert", categorie: "Travaux" },
  { ref: "AO-2026-016", titre: "Système de monitoring et capteurs IoT", budget: 95000000, soumissions: 12, cloture: "15/06/2026", statut: "Evaluation", categorie: "Technologie" },
  { ref: "AO-2026-015", titre: "Formation de 200 agents terrain", budget: 45000000, soumissions: 6, cloture: "10/06/2026", statut: "Attribué", categorie: "Formation", attributaire: "Cabinet GEOVIC" },
  { ref: "AO-2026-014", titre: "Audit environnemental annuel 2026", budget: 35000000, soumissions: 4, cloture: "01/06/2026", statut: "Clôturé", categorie: "Audit", attributaire: "Bureau Véritas" },
];

const statutColor: Record<string,string> = {
  "Ouvert": "bg-emerald-100 text-emerald-700",
  "Evaluation": "bg-amber-100 text-amber-700",
  "Attribué": "bg-blue-100 text-blue-700",
  "Clôturé": "bg-slate-100 text-slate-500",
};

const fmt = (n: number) => new Intl.NumberFormat("fr-FR").format(n) + " FCFA";

export default function AppelsOffresPage() {
  const budgetTotal = appels.reduce((s, a) => s + a.budget, 0);
  const ouverts = appels.filter(a => a.statut === "Ouvert").length;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Gavel size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-27 · Marchés</p>
              <h1 className="text-2xl font-black text-white">Appels d'Offres ASERGMV</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Appels publiés", value: appels.length, color: "text-blue-400" },
              { label: "Actuellement ouverts", value: ouverts, color: "text-emerald-400" },
              { label: "Budget total", value: (budgetTotal/1000000).toFixed(0)+"M FCFA", color: "text-amber-400" },
              { label: "Soumissions totales", value: appels.reduce((s,a)=>s+a.soumissions,0), color: "text-violet-400" },
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
        {appels.map(a => (
          <div key={a.ref} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Gavel size={18} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <p className="text-[10px] font-mono text-slate-400">{a.ref}</p>
                    <p className="text-sm font-black text-slate-800 mt-0.5">{a.titre}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${statutColor[a.statut]}`}>{a.statut}</span>
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-[11px] text-slate-500">
                  <span className="font-black text-slate-700">{fmt(a.budget)}</span>
                  <span className="flex items-center gap-1"><Users size={10} />{a.soumissions} soumissions</span>
                  <span className="flex items-center gap-1"><Clock size={10} />Clôture: {a.cloture}</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded-md">{a.categorie}</span>
                </div>
                {a.attributaire && <p className="text-[11px] text-blue-600 font-bold mt-1">✓ Attribué à: {a.attributaire}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}