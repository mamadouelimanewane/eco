"use client";
import { Sprout, MapPin, Heart, Share2, Trophy, Users, Leaf, Camera } from "lucide-react";

const arbres = [
  { id: "ARB-001-2024", proprietaire: "Aminata Diallo", espece: "Acacia senegal", commune: "Linguère", plante: "15 mars 2024", age: "15 mois", hauteur: 42, sante: 94, nbPhotos: 12 },
  { id: "ARB-002-2024", proprietaire: "Oumar Seck", espece: "Balanites aegyptiaca", commune: "Ranérou", plante: "22 juin 2024", age: "12 mois", hauteur: 28, sante: 78, nbPhotos: 8 },
  { id: "ARB-003-2025", proprietaire: "Fatou Ndiaye", espece: "Ziziphus mauritiana", commune: "Mbane", plante: "10 fév 2025", age: "4 mois", hauteur: 15, sante: 89, nbPhotos: 5 },
  { id: "ARB-004-2023", proprietaire: "Modou Fall", espece: "Acacia senegal", commune: "Ourossogui", plante: "5 juil 2023", age: "35 mois", hauteur: 85, sante: 96, nbPhotos: 28 },
  { id: "ARB-005-2024", proprietaire: "Aissatou Bâ", espece: "Piliostigma reticulatum", commune: "Sagatta", plante: "8 août 2024", age: "10 mois", hauteur: 35, sante: 82, nbPhotos: 7 },
];

const santeColor = (s: number) => s >= 90 ? "bg-emerald-400" : s >= 70 ? "bg-amber-400" : "bg-red-400";

export default function MonArbrePage() {
  const totalArbres = 28492;
  const totalPhotos = arbres.reduce((s,a)=>s+a.nbPhotos,0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-lime-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Sprout size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-29 · Engagement citoyen</p>
              <h1 className="text-2xl font-black text-white">Mon Arbre GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Chaque citoyen suit son arbre avec géolocalisation et photo</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Arbres adoptés", value: totalArbres.toLocaleString(), color: "text-lime-400" },
              { label: "Citoyens engagés", value: "21 847", color: "text-emerald-400" },
              { label: "Photos uploadées", value: "94 821", color: "text-blue-400" },
              { label: "Communes actives", value: "89", color: "text-amber-400" },
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
        {arbres.map(a => (
          <div key={a.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[10px] font-mono text-slate-400">{a.id}</p>
                <p className="text-sm font-black text-slate-800 italic mt-0.5">{a.espece}</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <Camera size={11} /><span>{a.nbPhotos}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-3">
              <Users size={10} /><span>{a.proprietaire}</span>
              <span>·</span>
              <MapPin size={10} /><span>{a.commune}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-[10px]">
              <div className="bg-slate-50 rounded-lg p-2 text-center">
                <p className="text-slate-400">Âge</p>
                <p className="font-black text-slate-700">{a.age}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 text-center">
                <p className="text-slate-400">Hauteur</p>
                <p className="font-black text-slate-700">{a.hauteur} cm</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 text-center">
                <p className="text-slate-400">Santé</p>
                <p className="font-black text-slate-700">{a.sante}%</p>
              </div>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${santeColor(a.sante)}`} style={{ width: a.sante + "%" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}