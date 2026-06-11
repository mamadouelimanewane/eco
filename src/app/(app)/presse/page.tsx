"use client";
import { Newspaper, FileText, Download, ExternalLink, Calendar, Globe } from "lucide-react";

const communiques = [
  { titre: "ASERGMV franchit le cap des 5 millions de plants géolocalisés", date: "05/06/2026", langue: "Fr/En", type: "Communiqué" },
  { titre: "Partenariat ASERGMV — Orange Sénégal pour la numérisation du suivi", date: "28/05/2026", langue: "Fr", type: "Accord" },
  { titre: "Résultats de la campagne de plantation 2025-2026", date: "15/05/2026", langue: "Fr/En/Wo", type: "Rapport presse" },
  { titre: "Lancement de la plateforme digitale ASERGMV v2.0", date: "10/04/2026", langue: "Fr", type: "Communiqué" },
];

const couvertures = [
  { media: "RFI Afrique", titre: "Le Sénégal reboise son désert", date: "06/06/2026", pays: "International" },
  { media: "Le Soleil (Sénégal)", titre: "ASERGMV : 5 millions d'arbres géolocalisés", date: "06/06/2026", pays: "Sénégal" },
  { media: "Jeune Afrique", titre: "La Grande Muraille Verte s'outille du numérique", date: "02/06/2026", pays: "International" },
  { media: "Sud Quotidien", titre: "La muraille verte avance à Linguère", date: "20/05/2026", pays: "Sénégal" },
];

export default function PressePage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Newspaper size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-43 · Relations presse</p>
              <h1 className="text-2xl font-black text-white">Press Kit ASERGMV</h1>
              <p className="text-slate-400 text-sm mt-1">Espace journalistes · Contacts et ressources officielles</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Communiqués 2026", value: communiques.length, color: "text-slate-400" },
              { label: "Couvertures médias", value: couvertures.length+"+", color: "text-blue-400" },
              { label: "Journalistes accrédités", value: "42", color: "text-emerald-400" },
              { label: "Pays couverts", value: "12", color: "text-amber-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{String(value)}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Communiqués de presse</h2>
          <div className="space-y-3">
            {communiques.map(c => (
              <div key={c.titre} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                <FileText size={16} className="text-slate-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-800">{c.titre}</p>
                  <div className="flex gap-2 mt-1 text-[10px] text-slate-400">
                    <span>{c.date}</span>
                    <span className="bg-slate-200 px-1.5 py-0.5 rounded">{c.type}</span>
                    <span>{c.langue}</span>
                  </div>
                </div>
                <Download size={14} className="text-slate-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">Revue de presse</h2>
          <div className="space-y-3">
            {couvertures.map(c => (
              <div key={c.titre} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                <Globe size={16} className="text-slate-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-[10px] font-black text-slate-500 mb-0.5">{c.media} · <span className="bg-blue-100 text-blue-600 px-1 py-0.5 rounded text-[9px]">{c.pays}</span></p>
                  <p className="text-xs font-bold text-slate-800">{c.titre}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{c.date}</p>
                </div>
                <ExternalLink size={14} className="text-slate-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}