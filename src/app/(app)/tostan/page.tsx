"use client";
import { Radio, Users, BookOpen, Globe, Mic, Heart } from "lucide-react";

const sessions = [
  { titre: "Droits environnementaux — Module 1", commune: "Linguère", facilitateur: "Aminata Sall", participants: 45, langue: "Wolof", date: "08/06/2026", statut: "Terminée" },
  { titre: "Gouvernance locale et forêts", commune: "Ranérou", facilitateur: "Ibrahima Koné", participants: 38, langue: "Pulaar", date: "10/06/2026", statut: "En cours" },
  { titre: "Femmes et gestion des ressources", commune: "Mbane", facilitateur: "Khady Diop", participants: 62, langue: "Wolof", date: "12/06/2026", statut: "Planifiée" },
  { titre: "Jeunesse et GMV — Engagement", commune: "Ourossogui", facilitateur: "Pape Ndir", participants: 89, langue: "Pulaar", date: "15/06/2026", statut: "Planifiée" },
];

const modules = [
  { nom: "Citoyenneté environnementale", terminee: 12, total: 12 },
  { nom: "Droits fonciers ruraux", terminee: 8, total: 12 },
  { nom: "Gestion communautaire des forêts", terminee: 6, total: 10 },
  { nom: "Santé et biodiversité", terminee: 3, total: 8 },
];

export default function TostanPage() {
  const totalParticipants = sessions.reduce((s, s2) => s + s2.participants, 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Radio size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-34 · Éducation communautaire</p>
              <h1 className="text-2xl font-black text-white">Tostan Digital GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Éducation aux droits et à l'environnement en langues locales</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Sessions tenues", value: sessions.length, color: "text-orange-400" },
              { label: "Participants formés", value: totalParticipants+"", color: "text-emerald-400" },
              { label: "Communes atteintes", value: "24", color: "text-blue-400" },
              { label: "Langues couvertes", value: "5", color: "text-violet-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Modules d'apprentissage</h2>
          <div className="space-y-4">
            {modules.map(m => (
              <div key={m.nom}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700">{m.nom}</span>
                  <span className="text-slate-500">{m.terminee}/{m.total}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 rounded-full" style={{ width: (m.terminee/m.total*100)+"%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Sessions récentes</h2>
          <div className="space-y-3">
            {sessions.map(s => (
              <div key={s.titre} className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-xs font-black text-slate-800 flex-1 pr-2">{s.titre}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${s.statut==="Terminée"?"bg-emerald-100 text-emerald-700":s.statut==="En cours"?"bg-blue-100 text-blue-700":"bg-slate-100 text-slate-500"}`}>{s.statut}</span>
                </div>
                <p className="text-[10px] text-slate-400">{s.commune} · {s.facilitateur} · {s.langue}</p>
                <p className="text-[10px] text-orange-600 font-bold mt-1">{s.participants} participants · {s.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}