"use client";
import { Camera, Heart, Share2, MapPin, TreePine, Eye } from "lucide-react";

const stories = [
  { id: "ST-001", titre: "De graine à 2 mètres — 3 ans de croissance", auteur: "Ibrahima Diallo", commune: "Linguère", espece: "Acacia senegal", vues: 12400, likes: 842, nbPhotos: 24, annee: "2023-2026" },
  { id: "ST-002", titre: "Le baobab de grand-mère retrouve sa place", auteur: "Mariama Kouyaté", commune: "Ranérou", espece: "Adansonia digitata", vues: 8900, likes: 621, nbPhotos: 18, annee: "2024-2026" },
  { id: "ST-003", titre: "500 plants pour une école — Une communauté mobilisée", auteur: "Club Vert Mbane", commune: "Mbane", espece: "Plusieurs espèces", vues: 24800, likes: 1840, nbPhotos: 45, annee: "2025-2026" },
  { id: "ST-004", titre: "Mon acacia a fleuri pour la première fois", auteur: "Fatoumata Bâ", commune: "Ourossogui", espece: "Acacia seyal", vues: 5200, likes: 398, nbPhotos: 12, annee: "2024-2026" },
  { id: "ST-005", titre: "Haie vive contre l'érosion — 1 an après", auteur: "Coopérative Sagatta", commune: "Sagatta", espece: "Combretum", vues: 7600, likes: 512, nbPhotos: 31, annee: "2025-2026" },
];

export default function ArbreStoryPage() {
  const totalVues = stories.reduce((s, st) => s + st.vues, 0);
  const totalLikes = stories.reduce((s, st) => s + st.likes, 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Camera size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-38 · Storytelling</p>
              <h1 className="text-2xl font-black text-white">ArbreStory</h1>
              <p className="text-slate-400 text-sm mt-1">Histoires vraies d'arbres, de vie et de communautés</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Stories publiées", value: stories.length, color: "text-amber-400" },
              { label: "Vues totales", value: totalVues.toLocaleString(), color: "text-blue-400" },
              { label: "Likes", value: totalLikes.toLocaleString(), color: "text-rose-400" },
              { label: "Créateurs actifs", value: "284", color: "text-emerald-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.map(st => (
          <div key={st.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer">
            <div className="h-28 bg-gradient-to-br from-amber-100 via-lime-100 to-emerald-100 flex items-center justify-center relative">
              <TreePine size={40} className="text-emerald-500 opacity-40" />
              <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] font-black text-amber-600">{st.annee}</div>
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] text-slate-500">{st.nbPhotos} photos</div>
            </div>
            <div className="p-4">
              <p className="text-xs font-black text-slate-800 mb-1 leading-snug">{st.titre}</p>
              <p className="text-[10px] text-slate-400 italic mb-2">{st.espece}</p>
              <p className="text-[10px] text-slate-400 flex items-center gap-1 mb-3"><MapPin size={9} />{st.commune} · {st.auteur}</p>
              <div className="flex gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1"><Eye size={11} />{st.vues.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Heart size={11} />{st.likes}</span>
                <button className="ml-auto flex items-center gap-1 hover:text-amber-500 transition-colors"><Share2 size={11} />Partager</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}