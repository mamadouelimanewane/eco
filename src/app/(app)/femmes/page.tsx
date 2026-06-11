"use client";
import { Users, TrendingUp, Award, Heart, Sprout, BookOpen } from "lucide-react";

const programmes = [
  { nom: "Pépiniéristes engagées", region: "Louga", participantes: 342, arbresPlantes: 48000, formation: "Sylviculture", statut: "Actif" },
  { nom: "Jardinières du Ferlo", region: "Matam", participantes: 218, arbresPlantes: 31500, formation: "Agroforesterie", statut: "Actif" },
  { nom: "Femmes semencières", region: "Saint-Louis", participantes: 186, arbresPlantes: 22000, formation: "Conservation semences", statut: "Actif" },
  { nom: "Apicultrices GMV", region: "Thiès", participantes: 94, arbresPlantes: 12000, formation: "Apiculture + reboisement", statut: "Actif" },
  { nom: "Coopérative Bois Vert", region: "Kolda", participantes: 127, arbresPlantes: 18500, formation: "Transformation bois durable", statut: "En attente" },
];

const membres = [
  { nom: "Rokhaya Diallo", commune: "Linguère", role: "Responsable pépinière", arbres: 4200, annees: 3 },
  { nom: "Mariama Kouyaté", commune: "Ranérou", role: "Formatrice locale", arbres: 2800, annees: 2 },
  { nom: "Khady Sow", commune: "Mbane", role: "Semencière certifiée", arbres: 5100, annees: 4 },
  { nom: "Aissata Baldé", commune: "Vélingara", role: "Apicultrice", arbres: 1900, annees: 1 },
];

export default function FemmesPage() {
  const totalParticipantes = programmes.reduce((s, p) => s + p.participantes, 0);
  const totalArbres = programmes.reduce((s, p) => s + p.arbresPlantes, 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Users size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-31 · Genre & Inclusion</p>
              <h1 className="text-2xl font-black text-white">FemmeVerte GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Autonomisation des femmes par la reforestation</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Femmes engagées", value: totalParticipantes.toLocaleString(), color: "text-pink-400" },
              { label: "Arbres plantés", value: (totalArbres/1000).toFixed(0)+"k", color: "text-emerald-400" },
              { label: "Programmes actifs", value: programmes.filter(p=>p.statut==="Actif").length, color: "text-violet-400" },
              { label: "Régions couvertes", value: "5", color: "text-blue-400" },
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
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Programmes par région</h2>
          <div className="space-y-4">
            {programmes.map(p => (
              <div key={p.nom} className="p-3 bg-pink-50 rounded-xl border border-pink-100">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-xs font-black text-slate-800">{p.nom}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.statut==="Actif"?"bg-emerald-100 text-emerald-700":"bg-slate-100 text-slate-500"}`}>{p.statut}</span>
                </div>
                <p className="text-[10px] text-slate-400 mb-2">{p.region} · Formation: {p.formation}</p>
                <div className="flex justify-between text-[11px]">
                  <span className="font-bold text-pink-600">{p.participantes} participantes</span>
                  <span className="text-emerald-600 font-bold">{p.arbresPlantes.toLocaleString()} arbres</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Championnes GMV</h2>
          <div className="space-y-3">
            {membres.map(m => (
              <div key={m.nom} className="flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center text-[14px] font-black text-white shrink-0">
                  {m.nom[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{m.nom}</p>
                  <p className="text-[10px] text-slate-400">{m.role} · {m.commune}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-emerald-600">{m.arbres.toLocaleString()}</p>
                  <p className="text-[9px] text-slate-400">arbres · {m.annees}ans</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}