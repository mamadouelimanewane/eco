"use client";
import { Megaphone, Camera, FileText, Video, Music, Download, Eye } from "lucide-react";

const ressources = [
  { titre: "Kit logo ASERGMV — Charte graphique 2026", type: "Identité visuelle", taille: "12 MB", telechargements: 840, format: "ZIP (SVG/PNG/PDF)" },
  { titre: "Photos officielles terrain 2025-2026", type: "Photothèque", taille: "2.4 GB", telechargements: 320, format: "ZIP (RAW/JPG)" },
  { titre: "Vidéo institutionnelle ASERGMV 4K", type: "Vidéo", taille: "820 MB", telechargements: 185, format: "MP4" },
  { titre: "Communiqués de presse 2026", type: "Texte", taille: "4 MB", telechargements: 210, format: "PDF" },
  { titre: "Infographies GMV — Pack réseaux sociaux", type: "Infographies", taille: "45 MB", telechargements: 1240, format: "ZIP (PNG/PDF)" },
  { titre: "B-Roll drone survols GMV", type: "Vidéo", taille: "1.8 GB", telechargements: 92, format: "MP4 4K" },
];

const typeColor: Record<string,string> = {
  "Identité visuelle": "bg-violet-100 text-violet-700",
  "Photothèque": "bg-blue-100 text-blue-700",
  "Vidéo": "bg-red-100 text-red-700",
  "Texte": "bg-slate-100 text-slate-600",
  "Infographies": "bg-amber-100 text-amber-700",
};

const typeIcon: Record<string, React.ElementType> = {
  "Identité visuelle": Camera,
  "Photothèque": Camera,
  "Vidéo": Video,
  "Texte": FileText,
  "Infographies": Megaphone,
};

export default function MediaPage() {
  const totalDl = ressources.reduce((s, r) => s + r.telechargements, 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Megaphone size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-41 · Communication</p>
              <h1 className="text-2xl font-black text-white">Media Hub ASERGMV</h1>
              <p className="text-slate-400 text-sm mt-1">Ressources presse, visuels et contenus officiels</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Ressources disponibles", value: ressources.length, color: "text-red-400" },
              { label: "Téléchargements", value: totalDl.toLocaleString(), color: "text-blue-400" },
              { label: "Formats disponibles", value: "8", color: "text-amber-400" },
              { label: "Accès journalistes", value: "Gratuit", color: "text-emerald-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{String(value)}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ressources.map(r => {
          const Icon = typeIcon[r.type] ?? FileText;
          return (
            <div key={r.titre} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-slate-500" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColor[r.type] ?? "bg-gray-100 text-gray-600"}`}>{r.type}</span>
              </div>
              <p className="text-xs font-black text-slate-800 mb-2">{r.titre}</p>
              <div className="flex justify-between text-[10px] text-slate-400 mb-3">
                <span>{r.taille}</span>
                <span>{r.format}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-[10px] text-slate-400"><Download size={10} />{r.telechargements}</span>
                <button className="text-[11px] font-bold bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-1">
                  <Download size={11} />Télécharger
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}