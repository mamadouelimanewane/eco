"use client";
import { Mic, Play, Clock, Users, Headphones, TrendingUp } from "lucide-react";

const episodes = [
  { num: 12, titre: "La grande muraille verte avance — bilan 2025", invite: "Dir. Technique ASERGMV", duree: "47 min", ecoutes: 8420, date: "05/06/2026", categorie: "Bilan" },
  { num: 11, titre: "Femmes et reforestation : histoires de vie", invite: "Rokhaya Diallo, Khady Sow", duree: "52 min", ecoutes: 12100, date: "22/05/2026", categorie: "Portraits" },
  { num: 10, titre: "Carbone et finance verte — comment ça marche ?", invite: "Expert GEF", duree: "38 min", ecoutes: 6800, date: "08/05/2026", categorie: "Finance" },
  { num: 9, titre: "Sécheresse et solutions : les leçons du Ferlo", invite: "Chercheur ISRA", duree: "44 min", ecoutes: 9200, date: "24/04/2026", categorie: "Science" },
  { num: 8, titre: "Les jeunes prennent le relais — clubs éco-jeunes", invite: "Membres Club Vert Mbane", duree: "31 min", ecoutes: 14500, date: "10/04/2026", categorie: "Jeunesse" },
];

const catColor: Record<string,string> = {
  "Bilan": "bg-blue-100 text-blue-700",
  "Portraits": "bg-pink-100 text-pink-700",
  "Finance": "bg-amber-100 text-amber-700",
  "Science": "bg-violet-100 text-violet-700",
  "Jeunesse": "bg-yellow-100 text-yellow-700",
};

export default function PodcastPage() {
  const totalEcoutes = episodes.reduce((s, e) => s + e.ecoutes, 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Mic size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-39 · Podcast</p>
              <h1 className="text-2xl font-black text-white">Podcast ASERGMV</h1>
              <p className="text-slate-400 text-sm mt-1">Les voix de la Grande Muraille Verte</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Épisodes publiés", value: episodes.length, color: "text-violet-400" },
              { label: "Écoutes totales", value: totalEcoutes.toLocaleString(), color: "text-blue-400" },
              { label: "Durée totale", value: "3h 32min", color: "text-amber-400" },
              { label: "Plateformes", value: "5", color: "text-emerald-400" },
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
        {episodes.map(e => (
          <div key={e.num} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center shrink-0 cursor-pointer hover:bg-violet-200 transition-colors">
              <Play size={20} className="text-violet-600 ml-0.5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-black text-slate-400">EP.{String(e.num).padStart(2,"0")}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${catColor[e.categorie]}`}>{e.categorie}</span>
              </div>
              <p className="text-sm font-black text-slate-800">{e.titre}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Invité: {e.invite}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-center gap-1 text-[11px] text-slate-400 justify-end mb-1">
                <Clock size={11} />{e.duree}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 justify-end">
                <Headphones size={11} />{e.ecoutes.toLocaleString()}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">{e.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}