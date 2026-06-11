"use client";
import { Calendar, Sprout, Sun, CloudRain, Scissors, Package } from "lucide-react";

const mois = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];
const activites = [
  { nom: "Préparation pépinières", icone: Sprout, couleur: "bg-lime-500", debut: 0, fin: 2, region: "Toutes" },
  { nom: "Plantation principale", icone: Sprout, couleur: "bg-emerald-500", debut: 6, fin: 9, region: "Nord & Centre" },
  { nom: "Saison des pluies", icone: CloudRain, couleur: "bg-blue-400", debut: 6, fin: 9, region: "Toutes" },
  { nom: "Entretien & Désherbage", icone: Scissors, couleur: "bg-amber-500", debut: 2, fin: 5, region: "Toutes" },
  { nom: "Collecte semences", icone: Package, couleur: "bg-violet-500", debut: 9, fin: 11, region: "Toutes" },
  { nom: "Évaluation survie", icone: Sun, couleur: "bg-orange-400", debut: 10, fin: 11, region: "Toutes" },
];

const evenements = [
  { date: "15 Jan", type: "Semis", commune: "Linguère", responsable: "Ibrahima Diallo", nb: 2000 },
  { date: "02 Fév", type: "Arrosage collectif", commune: "Ranérou", responsable: "Fatou Sow", nb: 8900 },
  { date: "20 Mar", type: "Formation", commune: "Ourossogui", responsable: "Équipe terrain", nb: 45 },
  { date: "10 Jul", type: "Plantation", commune: "Mbane", responsable: "Moussa Ndiaye", nb: 7200 },
  { date: "15 Sep", type: "Évaluation", commune: "Sagatta", responsable: "Chef région", nb: 5600 },
];

export default function CalendrierPage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Calendar size={24} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-11 · Planification</p>
            <h1 className="text-2xl font-black text-white">Calendrier Agricole GMV</h1>
            <p className="text-slate-400 text-sm mt-1">Campagne 2026 · 131 communes · 850 km</p>
          </div>
        </div>
      </div>

      {/* Gantt */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-5">Calendrier des activités 2026</h2>
        {/* Months header */}
        <div className="grid grid-cols-12 gap-1 mb-3">
          {mois.map(m => <p key={m} className="text-[9px] font-black text-slate-400 text-center uppercase">{m}</p>)}
        </div>
        <div className="space-y-3">
          {activites.map(a => {
            const Icon = a.icone;
            return (
              <div key={a.nom} className="flex items-center gap-3">
                <div className="w-32 shrink-0 flex items-center gap-2">
                  <div className={`w-5 h-5 ${a.couleur} rounded-md flex items-center justify-center shrink-0`}>
                    <Icon size={11} className="text-white" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-700 leading-tight">{a.nom}</p>
                </div>
                <div className="flex-1 grid grid-cols-12 gap-1 h-6">
                  {Array.from({length: 12}).map((_, i) => (
                    <div key={i} className={`rounded-sm h-full ${i >= a.debut && i <= a.fin ? a.couleur + " opacity-80" : "bg-slate-100"}`} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Événements */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Événements planifiés</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {evenements.map((e, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-colors">
              <div className="w-16 shrink-0 text-center">
                <p className="text-[10px] font-black text-amber-600 bg-amber-50 rounded-lg px-2 py-1">{e.date}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">{e.type}</p>
                <p className="text-[11px] text-slate-400">{e.commune} · {e.responsable}</p>
              </div>
              <p className="text-sm font-black text-slate-500">{e.nb.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}