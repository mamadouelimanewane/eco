"use client";
import { Map, Users, Star, Camera, TrendingUp, Calendar } from "lucide-react";

const circuits = [
  { nom: "Grande Muraille du Ferlo", duree: "3 jours", communes: ["Linguère", "Ranérou", "Dodji"], prix: 85000, participants: 320, note: 4.9, places: 12, depart: "15/07/2026" },
  { nom: "Oasis du Sahel", duree: "1 jour", communes: ["Ourossogui"], prix: 25000, participants: 890, note: 4.7, places: 25, depart: "28/06/2026" },
  { nom: "Corridor de Biodiversité", duree: "2 jours", communes: ["Mbane", "Sagatta"], prix: 55000, participants: 185, note: 4.8, places: 8, depart: "10/07/2026" },
  { nom: "Immersion Forestière Kolda", duree: "5 jours", communes: ["Vélingara", "Dianké Makha"], prix: 140000, participants: 62, note: 5.0, places: 6, depart: "01/08/2026" },
];

const temoignages = [
  { auteur: "Sophie M.", pays: "France", texte: "Incroyable expérience ! Voir les arbres plantés et rencontrer les communautés locales... je reviens l'année prochaine.", note: 5 },
  { auteur: "Carlos R.", pays: "Espagne", texte: "Voyage qui change la vision du monde. La GMV est une ambition extraordinaire et les équipes sont passionnées.", note: 5 },
];

export default function EcotourPage() {
  const totalVisiteurs = circuits.reduce((s, c) => s + c.participants, 0);
  const revenuTotal = circuits.reduce((s, c) => s + c.participants * c.prix, 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Map size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-35 · Éco-tourisme</p>
              <h1 className="text-2xl font-black text-white">EcoTour GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Circuits touristiques le long de la Grande Muraille Verte</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Circuits proposés", value: circuits.length, color: "text-teal-400" },
              { label: "Visiteurs 2026", value: totalVisiteurs.toLocaleString(), color: "text-emerald-400" },
              { label: "Revenus (FCFA)", value: (revenuTotal/1000000).toFixed(0)+"M", color: "text-amber-400" },
              { label: "Note moyenne", value: "4.9/5", color: "text-yellow-400" },
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
        {circuits.map(c => (
          <div key={c.nom} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-black text-slate-800">{c.nom}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{c.duree} · {c.communes.join(" → ")}</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-amber-500 shrink-0">
                <Star size={12} className="fill-amber-400" />{c.note}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xl font-black text-teal-600">{c.prix.toLocaleString()} FCFA</p>
                <p className="text-[10px] text-slate-400">{c.participants} visiteurs · Départ {c.depart}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-slate-700">{c.places} places</p>
                <button className="mt-1 text-[11px] font-bold bg-teal-500 text-white px-3 py-1.5 rounded-lg hover:bg-teal-600 transition-colors">Réserver</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Témoignages</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {temoignages.map(t => (
            <div key={t.auteur} className="p-4 bg-teal-50 rounded-xl border border-teal-100">
              <div className="flex gap-1 mb-2">
                {Array.from({length: t.note}).map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-sm text-slate-600 italic mb-2">"{t.texte}"</p>
              <p className="text-[11px] font-bold text-slate-500">— {t.auteur}, {t.pays}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}