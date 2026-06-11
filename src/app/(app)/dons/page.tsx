"use client";
import { Heart, Users, TrendingUp, Globe, Star, Award } from "lucide-react";

const donsRecents = [
  { donateur: "Aminata D.", pays: "Sénégal", montant: 50000, arbres: 200, date: "Aujourd'hui", message: "Pour ma région natale !" },
  { donateur: "Jean-Michel T.", pays: "France", montant: 150000, arbres: 600, date: "Hier", message: "Beau projet, continuez !" },
  { donateur: "Anonyme", pays: "USA", montant: 500000, arbres: 2000, date: "Il y a 2j", message: "" },
  { donateur: "Khouma F.", pays: "Canada", montant: 25000, arbres: 100, date: "Il y a 3j", message: "Plantez pour l'Afrique 🌱" },
  { donateur: "ONG Verte 77", pays: "Allemagne", montant: 2000000, arbres: 8000, date: "Il y a 5j", message: "Partenariat solidaire" },
];

const niveaux = [
  { niveau: "Semeur", min: 0, max: 50000, couleur: "bg-slate-400", donateurs: 1240 },
  { niveau: "Jardinier", min: 50000, max: 200000, couleur: "bg-emerald-400", donateurs: 342 },
  { niveau: "Forestier", min: 200000, max: 1000000, couleur: "bg-teal-500", donateurs: 89 },
  { niveau: "Gardien GMV", min: 1000000, max: Infinity, couleur: "bg-violet-500", donateurs: 17 },
];

const fmt = (n: number) => new Intl.NumberFormat("fr-FR").format(n);

export default function DonsPage() {
  const totalDons = donsRecents.reduce((s, d) => s + d.montant, 0);
  const totalArbres = donsRecents.reduce((s, d) => s + d.arbres, 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Heart size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-25 · Dons</p>
              <h1 className="text-2xl font-black text-white">Portail des Dons GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Chaque don plante des arbres réels, géolocalisés</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Dons ce mois", value: fmt(totalDons)+" FCFA", color: "text-rose-400" },
              { label: "Arbres financés", value: totalArbres.toLocaleString(), color: "text-emerald-400" },
              { label: "Donateurs actifs", value: "1 688", color: "text-blue-400" },
              { label: "Pays représentés", value: "24", color: "text-violet-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Niveaux */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Niveaux de donateurs</h2>
          <div className="space-y-3">
            {niveaux.map(n => (
              <div key={n.niveau} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className={`w-3 h-3 rounded-full ${n.couleur} shrink-0`} />
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-800">{n.niveau}</p>
                  <p className="text-[10px] text-slate-400">à partir de {fmt(n.min)} FCFA</p>
                </div>
                <span className="text-xs font-black text-slate-500">{n.donateurs} donateurs</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dons récents */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Dons récents</h2>
          <div className="space-y-3">
            {donsRecents.map((d, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-rose-100 rounded-xl flex items-center justify-center text-[12px] font-black text-rose-500 shrink-0">
                  {d.donateur[0]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs font-bold text-slate-800">{d.donateur} <span className="text-slate-400 font-normal">({d.pays})</span></p>
                    <p className="text-xs font-black text-rose-600">{fmt(d.montant)} FCFA</p>
                  </div>
                  <p className="text-[10px] text-slate-400">{d.arbres} arbres · {d.date}</p>
                  {d.message && <p className="text-[10px] text-slate-500 italic mt-0.5">"{d.message}"</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}