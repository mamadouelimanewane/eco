"use client";
import { GraduationCap, Users, Trophy, Zap, Star, BookOpen } from "lucide-react";

const clubs = [
  { nom: "Club Vert Linguère", commune: "Linguère", membres: 84, arbres: 8400, activites: ["Plantation", "Sensibilisation", "Quiz"], note: 9.2 },
  { nom: "Éco-Jeunes Ranérou", commune: "Ranérou", membres: 52, arbres: 5200, activites: ["Pépinière", "Nettoyage", "Plantation"], note: 8.8 },
  { nom: "Nature Squad Mbane", commune: "Mbane", membres: 120, arbres: 12000, activites: ["Reboisement", "Monitoring", "Education"], note: 9.5 },
  { nom: "GMV Warriors Ourossogui", commune: "Ourossogui", membres: 67, arbres: 6700, activites: ["Patrouille", "Plantation", "Média"], note: 8.5 },
];

const challenges = [
  { titre: "Défi 1000 plants", participants: 2840, progress: 87, recompense: "Badge Or + diplôme", statut: "En cours" },
  { titre: "Photo du mois nature", participants: 1240, progress: 100, recompense: "Télescope + stage", statut: "Terminé" },
  { titre: "Quiz biodiversité", participants: 4200, progress: 65, recompense: "Tablette scolaire", statut: "En cours" },
  { titre: "Ramassage déchets GMV", participants: 890, progress: 40, recompense: "Vélo + kit jardinage", statut: "En cours" },
];

export default function JeunesPage() {
  const totalJeunes = clubs.reduce((s, c) => s + c.membres, 0) + 8400;
  const totalArbres = clubs.reduce((s, c) => s + c.arbres, 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-32 · Jeunesse</p>
              <h1 className="text-2xl font-black text-white">JeunesGMV</h1>
              <p className="text-slate-400 text-sm mt-1">Les gardiens de demain de la Grande Muraille Verte</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Jeunes engagés", value: totalJeunes.toLocaleString(), color: "text-yellow-400" },
              { label: "Clubs actifs", value: clubs.length + "+", color: "text-emerald-400" },
              { label: "Arbres plantés", value: (totalArbres/1000).toFixed(0)+"k", color: "text-teal-400" },
              { label: "Challenges en cours", value: challenges.filter(c=>c.statut==="En cours").length, color: "text-violet-400" },
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
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Clubs Éco-Jeunes</h2>
          <div className="space-y-3">
            {clubs.map(c => (
              <div key={c.nom} className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-black text-slate-800">{c.nom}</p>
                  <div className="flex items-center gap-1 text-[11px] text-amber-500">
                    <Star size={11} className="fill-amber-400" />{c.note}
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mb-2">{c.commune}</p>
                <div className="flex justify-between text-[11px]">
                  <span className="text-yellow-700 font-bold">{c.membres} membres</span>
                  <span className="text-emerald-600 font-bold">{c.arbres.toLocaleString()} arbres</span>
                </div>
                <div className="flex gap-1 mt-2">
                  {c.activites.map(a => <span key={a} className="text-[9px] font-bold bg-white border border-yellow-200 text-slate-500 px-1.5 py-0.5 rounded-md">{a}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Challenges nationaux</h2>
          <div className="space-y-4">
            {challenges.map(c => (
              <div key={c.titre} className="p-3 bg-slate-50 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-black text-slate-800">{c.titre}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${c.statut==="Terminé"?"bg-emerald-100 text-emerald-700":"bg-blue-100 text-blue-700"}`}>{c.statut}</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                  <div className={`h-full rounded-full ${c.progress===100?"bg-emerald-500":"bg-yellow-400"}`} style={{ width: c.progress+"%" }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span><Users size={10} className="inline mr-1" />{c.participants.toLocaleString()} participants</span>
                  <span>🏆 {c.recompense}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}