"use client";
import { BookOpen, Play, Clock, Users, CheckCircle2, Lock } from "lucide-react";

const modules = [
  { id: 1, titre: "Introduction à la Grande Muraille Verte", duree: "45 min", niveau: "Débutant", inscrits: 128, complete: true, description: "Histoire, enjeux et objectifs du programme GMV au Sénégal." },
  { id: 2, titre: "Techniques de plantation en zone sahélienne", duree: "1h30", niveau: "Intermédiaire", inscrits: 94, complete: true, description: "Méthodes adaptées aux sols arides — plantation en potets, paillage, arrosage." },
  { id: 3, titre: "Suivi et évaluation des parcelles reboisées", duree: "1h15", niveau: "Intermédiaire", inscrits: 71, complete: false, description: "Protocoles de mesure du taux de survie, inventaires et saisie mobile." },
  { id: 4, titre: "Gestion des pépinières communautaires", duree: "2h", niveau: "Avancé", inscrits: 45, complete: false, description: "Production de plants, gestion des stocks et traçabilité des espèces locales." },
  { id: 5, titre: "Agroforesterie et systèmes sylvopastoraux", duree: "1h45", niveau: "Avancé", inscrits: 38, complete: false, description: "Intégration agriculture-forêt pour la résilience des communautés rurales." },
  { id: 6, titre: "Collecte de données terrain avec l'application", duree: "30 min", niveau: "Débutant", inscrits: 156, complete: false, description: "Utilisation de la plateforme ASERGMV pour la saisie et la synchronisation des données." },
];

const niveauStyle: Record<string, string> = {
  Débutant: "bg-blue-100 text-blue-700",
  Intermédiaire: "bg-amber-100 text-amber-700",
  Avancé: "bg-violet-100 text-violet-700",
};

export default function ElearningPage() {
  const done = modules.filter(m => m.complete).length;
  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex items-center gap-6">
        <div className="w-16 h-16 relative shrink-0">
          <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
            <circle cx="32" cy="32" r="26" fill="none" stroke="#f3f4f6" strokeWidth="8" />
            <circle cx="32" cy="32" r="26" fill="none" stroke="#10b981" strokeWidth="8"
              strokeDasharray={`${(done / modules.length) * 163} 163`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-800">{done}/{modules.length}</span>
          </div>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Progression de la formation</p>
          <p className="text-sm text-gray-500 mt-0.5">{done} module(s) complété(s) sur {modules.length} · Continuez votre apprentissage</p>
        </div>
      </div>

      {/* Modules */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {modules.map(m => (
          <div key={m.id} className={`bg-white rounded-xl border shadow-sm p-5 transition-shadow hover:shadow-md ${m.complete ? "border-emerald-100" : "border-gray-100"}`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${m.complete ? "bg-emerald-50" : "bg-gray-50"}`}>
                {m.complete
                  ? <CheckCircle2 size={20} className="text-emerald-500" />
                  : <BookOpen size={20} className="text-gray-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug">{m.titre}</h3>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${niveauStyle[m.niveau]}`}>{m.niveau}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{m.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock size={11} /> {m.duree}</span>
                  <span className="flex items-center gap-1"><Users size={11} /> {m.inscrits} inscrits</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50">
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                m.complete
                  ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  : "bg-black text-white hover:bg-slate-800"
              }`}>
                {m.complete ? <><CheckCircle2 size={14} /> Revoir</> : <><Play size={14} /> Commencer</>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
