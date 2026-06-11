"use client";
import { UserCog, Users, TrendingUp, Award, MapPin, Briefcase } from "lucide-react";

const agents = [
  { matricule: "GMV-2021-042", nom: "Ibrahima Diallo", poste: "Chef de zone", region: "Louga", statut: "Actif", dateEmbauche: "15/03/2021", salaire: 285000, competences: ["Sylviculture","Management","SIG"] },
  { matricule: "GMV-2022-118", nom: "Fatou Sow", poste: "Agente terrain", region: "Matam", statut: "Actif", dateEmbauche: "01/09/2022", salaire: 185000, competences: ["Plantation","Monitoring","Wolof/Pulaar"] },
  { matricule: "GMV-2023-201", nom: "Moussa Ndiaye", poste: "Coordonnateur", region: "Saint-Louis", statut: "Actif", dateEmbauche: "10/01/2023", salaire: 320000, competences: ["Coordination","Reporting","ForêtPatrol"] },
  { matricule: "GMV-2020-019", nom: "Aissatou Baldé", poste: "Formatrice", region: "Thiès", statut: "Détachement", dateEmbauche: "20/06/2020", salaire: 240000, competences: ["Formation","Communication","Tostan"] },
  { matricule: "GMV-2024-389", nom: "Ousmane Fall", poste: "Agent terrain", region: "Kolda", statut: "Essai", dateEmbauche: "01/04/2024", salaire: 150000, competences: ["Plantation","Surveillance"] },
];

const statutColor: Record<string,string> = {
  "Actif": "bg-emerald-100 text-emerald-700",
  "Détachement": "bg-amber-100 text-amber-700",
  "Essai": "bg-blue-100 text-blue-700",
};

const effectifParRegion = [
  { region: "Louga", nb: 124 },
  { region: "Matam", nb: 98 },
  { region: "Saint-Louis", nb: 87 },
  { region: "Thiès", nb: 62 },
  { region: "Kolda", nb: 45 },
];

export default function RhPage() {
  const totalPersonnel = effectifParRegion.reduce((s, r) => s + r.nb, 0) + 350;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-400/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
              <UserCog size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-51 · RH</p>
              <h1 className="text-2xl font-black text-white">RH & Personnel ASERGMV</h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Personnel total", value: totalPersonnel+"", color: "text-slate-400" },
              { label: "Agents de terrain", value: "842", color: "text-emerald-400" },
              { label: "Chefs de zone", value: "24", color: "text-blue-400" },
              { label: "Formations ce mois", value: "8", color: "text-amber-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Fiches personnel</h2>
            <button className="text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200">+ Recruter</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>{["Matricule","Nom","Poste","Région","Statut","Salaire"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-wider">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {agents.map(a => (
                  <tr key={a.matricule} className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-mono text-slate-400 text-[10px]">{a.matricule}</td>
                    <td className="px-4 py-3 font-bold text-slate-800">{a.nom}</td>
                    <td className="px-4 py-3 text-slate-600">{a.poste}</td>
                    <td className="px-4 py-3 text-slate-500">{a.region}</td>
                    <td className="px-4 py-3"><span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${statutColor[a.statut]}`}>{a.statut}</span></td>
                    <td className="px-4 py-3 font-black text-slate-700">{a.salaire.toLocaleString()} FCFA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Effectif par région</h2>
          <div className="space-y-3">
            {effectifParRegion.map(r => (
              <div key={r.region}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700">{r.region}</span>
                  <span className="text-slate-500">{r.nb}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-500 rounded-full" style={{ width: (r.nb/124*100)+"%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}