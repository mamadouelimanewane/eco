"use client";
import { useState } from "react";
import { Eye, Leaf, Ruler, Camera, BarChart3 } from "lucide-react";

const diagnostics = [
  { id: "DGN-001", plante: "Acacia senegal", lieu: "Linguere Sect.2", maladie: "Mildiou foliaire", confiance: 94, gravite: "Moderee", traitement: "Fongicide cuivrique dilue 0.3%" },
  { id: "DGN-002", plante: "Balanites aegyptiaca", lieu: "Ranerou Nord", maladie: "Carence azote", confiance: 88, gravite: "Legere", traitement: "Apport compost 2kg/pied" },
  { id: "DGN-003", plante: "Faidherbia albida", lieu: "Matam", maladie: "Attaque termites", confiance: 97, gravite: "Severe", traitement: "Traitement systemique + barriere physique" },
  { id: "DGN-004", plante: "Prosopis africana", lieu: "Podor", maladie: "Stress hydrique", confiance: 91, gravite: "Critique", traitement: "Arrosage d urgence 10L/plant + paillage" },
];

const mesures = [
  { arbre: "ACsen-2021-0234", espece: "Acacia senegal", lieu: "Linguere", dhp: 8.4, hauteur: 3.2, couronne: 2.1, biomasse: 12.4, co2: 6.2, annee: 2021 },
  { arbre: "FAalb-2020-0891", espece: "Faidherbia albida", lieu: "Matam", dhp: 14.7, hauteur: 6.1, couronne: 4.8, biomasse: 38.7, co2: 19.4, annee: 2020 },
  { arbre: "BAaeg-2022-0156", espece: "Balanites aegyptiaca", lieu: "Ranerou", dhp: 6.2, hauteur: 2.8, couronne: 1.7, biomasse: 7.1, co2: 3.6, annee: 2022 },
  { arbre: "KHsen-2019-0044", espece: "Khaya senegalensis", lieu: "Bakel", dhp: 22.3, hauteur: 9.4, couronne: 7.2, biomasse: 98.4, co2: 49.2, annee: 2019 },
];

const fonctions = [
  { nom: "Diagnostic phytosanitaire", desc: "Photo feuille ou tronc - identification maladie, carence, ravageur. Modele CNN MobileNetV3 fine-tune sur 45 000 images africaines.", precision: "94%", statut: "Production" },
  { nom: "Mensuration dendrometrique", desc: "Photo tronc avec jauge de reference - calcul automatique DHP, hauteur estimee, biomasse et CO2 sequestre.", precision: "89%", statut: "Production" },
  { nom: "Comptage graines semences", desc: "Photo plateau germoir - comptage automatique graines germees vs non germees. Suivi pepiniere optimise.", precision: "97%", statut: "Production" },
  { nom: "Cartographie couvert canopee", desc: "Images drone RGB+NIR - segmentation canopee, calcul LAI (Leaf Area Index), taux couverture sol.", precision: "92%", statut: "Beta" },
  { nom: "Detection especes faune", desc: "Cameras pieges - identification automatique faune sauvage, comptage populations, suivi biodiversite.", precision: "86%", statut: "Beta" },
  { nom: "Verification plantation terrain", desc: "Photo GPS+timestamp - validation planting event via vision IA + detection doublons et fraudes.", precision: "99%", statut: "Production" },
];

export default function VisionIaPage() {
  const [tab, setTab] = useState<"fonctions" | "diagnostics" | "mesures">("fonctions");
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-700 rounded-2xl flex items-center justify-center">
              <Eye size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">IA AVANCEE - COMPUTER VISION</p>
              <h1 className="text-2xl font-black text-white">Vision par ordinateur</h1>
              <p className="text-slate-400 text-sm mt-1">Diagnostic phytosanitaire - Mensuration - Comptage - Canopee - Faune</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Diagnostics realises", value: "1 847", color: "text-teal-400" },
              { label: "Precision moyenne", value: "93%", color: "text-emerald-400" },
              { label: "Alertes phyto actives", value: "4", color: "text-red-400" },
              { label: "Arbres mesures IA", value: "12 400", color: "text-blue-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {([["fonctions","Modules vision"],["diagnostics","Diagnostics recents"],["mesures","Mesures dendrometriques"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === id ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>{label}</button>
        ))}
      </div>
      {tab === "fonctions" && (
        <div className="grid md:grid-cols-2 gap-4">
          {fonctions.map(f => (
            <div key={f.nom} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-black text-slate-900 flex-1">{f.nom}</h3>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ml-2 shrink-0 ${f.statut === "Production" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{f.statut}</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">{f.desc}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: f.precision }} />
                </div>
                <span className="text-xs font-black text-teal-600">{f.precision}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "diagnostics" && (
        <div className="space-y-3">
          {diagnostics.map(d => (
            <div key={d.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-teal-100 rounded-xl flex items-center justify-center shrink-0"><Leaf size={14} className="text-teal-600" /></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-black text-slate-900">{d.plante}</span>
                    <span className="text-xs text-slate-400">- {d.lieu}</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${d.gravite === "Severe" || d.gravite === "Critique" ? "bg-red-100 text-red-700" : d.gravite === "Moderee" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>{d.gravite}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-700">{d.maladie}</p>
                  <p className="text-xs text-slate-400 mt-1">Traitement : {d.traitement}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-black text-teal-600">{d.confiance}%</p>
                  <p className="text-[10px] text-slate-400">Confiance</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "mesures" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-base font-black text-slate-900">Mesures dendrometriques par vision IA</h2>
            <p className="text-xs text-slate-400 mt-0.5">DHP, hauteur, biomasse et CO2 calcules automatiquement</p>
          </div>
          <div className="divide-y divide-slate-50">
            {mesures.map(m => (
              <div key={m.arbre} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50">
                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center shrink-0"><Ruler size={14} className="text-slate-500" /></div>
                <div className="w-40 shrink-0">
                  <p className="text-sm font-bold text-slate-900">{m.espece}</p>
                  <p className="text-xs text-slate-400">{m.lieu} - {m.annee}</p>
                </div>
                <div className="flex-1 grid grid-cols-4 gap-3">
                  {[["DHP", `${m.dhp} cm`], ["Haut.", `${m.hauteur} m`], ["Biomasse", `${m.biomasse} kg`], ["CO2", `${m.co2} kg`]].map(([k, v]) => (
                    <div key={k} className="text-center"><p className="text-[10px] text-slate-400">{k}</p><p className="text-xs font-black text-slate-800">{v}</p></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}