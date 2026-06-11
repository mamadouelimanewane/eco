"use client";
import { TrendingUp, Globe, TreePine, Users, BarChart3, Download } from "lucide-react";

const indicateurs = [
  { label: "Arbres plantés et géolocalisés", valeur: "5 284 920", evolution: "+18%", icone: TreePine, couleur: "emerald" },
  { label: "Surface restaurée (ha)", valeur: "184 320", evolution: "+22%", icone: Globe, couleur: "teal" },
  { label: "Communes couvertes", valeur: "131 / 131", evolution: "100%", icone: BarChart3, couleur: "blue" },
  { label: "Emplois créés", valeur: "12 840", evolution: "+31%", icone: Users, couleur: "violet" },
  { label: "CO₂ séquestrée (tCO₂)", valeur: "428 000", evolution: "+19%", icone: TrendingUp, couleur: "green" },
  { label: "Volontaires formés", valeur: "28 492", evolution: "+42%", icone: Users, couleur: "amber" },
];

const rapports = [
  { annee: 2025, titre: "Rapport d'Impact Annuel ASERGMV", pages: 64, statut: "Publié" },
  { annee: 2024, titre: "Rapport d'Impact Annuel ASERGMV", pages: 58, statut: "Publié" },
  { annee: 2023, titre: "Rapport d'Impact Annuel ASERGMV", pages: 52, statut: "Publié" },
];

const sdgs = [
  { num: "01", label: "Pas de pauvreté", niveau: 72 },
  { num: "02", label: "Faim zéro", niveau: 65 },
  { num: "08", label: "Travail décent", niveau: 81 },
  { num: "13", label: "Lutte contre le climat", niveau: 94 },
  { num: "15", label: "Vie terrestre", niveau: 98 },
  { num: "17", label: "Partenariats", niveau: 78 },
];

const colorMap: Record<string,string> = { emerald:"bg-emerald-400", teal:"bg-teal-400", blue:"bg-blue-400", violet:"bg-violet-400", green:"bg-green-400", amber:"bg-amber-400" };
const textMap: Record<string,string> = { emerald:"text-emerald-600", teal:"text-teal-600", blue:"text-blue-600", violet:"text-violet-600", green:"text-green-600", amber:"text-amber-600" };

export default function ImpactReportPage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <TrendingUp size={24} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-44 · Impact</p>
            <h1 className="text-2xl font-black text-white">Impact Reports GMV</h1>
            <p className="text-slate-400 text-sm mt-1">Mesure d'impact environnemental, social et économique</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {indicateurs.map(ind => {
          const Icon = ind.icone;
          return (
            <div key={ind.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className={`w-10 h-10 ${colorMap[ind.couleur]}/15 rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={20} className={textMap[ind.couleur]} />
              </div>
              <p className={`text-2xl font-black ${textMap[ind.couleur]}`}>{ind.valeur}</p>
              <p className="text-xs text-slate-600 mt-1 mb-1">{ind.label}</p>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{ind.evolution} vs 2024</span>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Contribution aux ODD (SDGs)</h2>
          <div className="space-y-3">
            {sdgs.map(sdg => (
              <div key={sdg.num} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-black text-emerald-700">{sdg.num}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="font-bold text-slate-700">{sdg.label}</span>
                    <span className="font-black text-slate-500">{sdg.niveau}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: sdg.niveau+"%" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Rapports annuels</h2>
          <div className="space-y-3">
            {rapports.map(r => (
              <div key={r.annee} className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-black text-white">{r.annee}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-black text-slate-800">{r.titre} {r.annee}</p>
                  <p className="text-[10px] text-slate-400">{r.pages} pages · Accès libre</p>
                </div>
                <button className="text-[11px] font-bold bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1">
                  <Download size={11} />PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}