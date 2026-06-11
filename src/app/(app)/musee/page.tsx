"use client";
import { Eye, BookOpen, Camera, Globe, Users, Star } from "lucide-react";

const expositions = [
  { titre: "850 km de vie — Histoire de la GMV", type: "Permanente", objets: 142, visiteurs: 8420, langue: ["Fr","Wo","Pu"], note: 4.9 },
  { titre: "Espèces menacées du Sahel", type: "Temporaire", objets: 68, visiteurs: 3210, langue: ["Fr","En"], note: 4.7, expiration: "31/08/2026" },
  { titre: "Femmes et forêts — Portraits", type: "Temporaire", objets: 45, visiteurs: 2100, langue: ["Fr","Wo"], note: 4.8, expiration: "30/07/2026" },
  { titre: "L'arbre sacré au Sénégal", type: "Permanente", objets: 89, visiteurs: 5600, langue: ["Fr","Wo","Pu","Se"], note: 5.0 },
];

const artefacts = [
  { nom: "Baobab millénaire — Reconstruction 3D", categorie: "Botanique", format: "3D interactif" },
  { nom: "Outils traditionnels de sylviculture", categorie: "Ethnobotanique", format: "Galerie photo" },
  { nom: "Carte historique Grande Muraille 1952", categorie: "Cartographie", format: "Numérisé HD" },
  { nom: "Témoignages audio — Anciens du Ferlo", categorie: "Oral", format: "Audio (47 min)" },
  { nom: "Herbier digital — 200 espèces", categorie: "Botanique", format: "Base de données" },
  { nom: "Vidéo time-lapse plantation 2020-2026", categorie: "Audiovisuel", format: "Vidéo 4K" },
];

export default function MuseePage() {
  const totalVisiteurs = expositions.reduce((s, e) => s + e.visiteurs, 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Eye size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-36 · Culture</p>
              <h1 className="text-2xl font-black text-white">Musée Virtuel GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Patrimoine naturel et culturel de la Grande Muraille Verte</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Expositions", value: expositions.length, color: "text-indigo-400" },
              { label: "Visiteurs virtuels", value: totalVisiteurs.toLocaleString(), color: "text-blue-400" },
              { label: "Artefacts numériques", value: artefacts.length+"+", color: "text-violet-400" },
              { label: "Langues disponibles", value: "5", color: "text-teal-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {expositions.map(e => (
          <div key={e.titre} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${e.type==="Permanente"?"bg-indigo-100 text-indigo-700":"bg-amber-100 text-amber-700"}`}>{e.type}</span>
              <div className="flex items-center gap-1 text-[11px] text-amber-500">
                <Star size={11} className="fill-amber-400" />{e.note}
              </div>
            </div>
            <p className="text-sm font-black text-slate-800 mb-1">{e.titre}</p>
            {"expiration" in e && <p className="text-[10px] text-amber-600 mb-2">Jusqu'au {e.expiration}</p>}
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{e.objets} pièces</span>
              <span>{e.visiteurs.toLocaleString()} visiteurs</span>
              <span>{e.langue.join(" · ")}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Collection numérique</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {artefacts.map(a => (
            <div key={a.nom} className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 cursor-pointer hover:bg-indigo-100 transition-colors">
              <p className="text-xs font-bold text-slate-800 mb-1">{a.nom}</p>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>{a.categorie}</span>
                <span className="font-bold text-indigo-600">{a.format}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}