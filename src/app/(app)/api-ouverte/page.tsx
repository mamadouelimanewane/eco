"use client";
import { Code, Zap, Key, Globe, TrendingUp, CheckCircle } from "lucide-react";

const endpoints = [
  { methode: "GET", chemin: "/api/v1/communes", description: "Liste des 131 communes GMV avec métadonnées", auth: "Publique", appels: "42k/mois" },
  { methode: "GET", chemin: "/api/v1/communes/{id}/plants", description: "Plants géolocalisés d'une commune", auth: "API Key", appels: "18k/mois" },
  { methode: "GET", chemin: "/api/v1/carbone/credits", description: "Registre des crédits carbone vérifiés", auth: "API Key", appels: "8k/mois" },
  { methode: "POST", chemin: "/api/v1/plants/identify", description: "Identification IA d'une espèce par photo", auth: "API Key + OAuth", appels: "2k/mois" },
  { methode: "GET", chemin: "/api/v1/meteo/{commune}", description: "Données météo locales en temps réel", auth: "Publique", appels: "95k/mois" },
  { methode: "GET", chemin: "/api/v1/stats/global", description: "Statistiques globales de la GMV", auth: "Publique", appels: "120k/mois" },
];

const methodColor: Record<string,string> = {
  "GET": "bg-emerald-100 text-emerald-700",
  "POST": "bg-blue-100 text-blue-700",
  "PUT": "bg-amber-100 text-amber-700",
  "DELETE": "bg-red-100 text-red-700",
};

const partenaires = [
  { nom: "IUCN — Union mondiale pour la nature", usage: "Biodiversité", appels: "12k/mois" },
  { nom: "Planet Labs", usage: "Imagerie satellite", appels: "3k/mois" },
  { nom: "ANACIM", usage: "Données météo", appels: "45k/mois" },
  { nom: "ONU Environnement", usage: "Reporting SDGs", appels: "8k/mois" },
];

export default function ApiOuvertePage() {
  const totalAppels = endpoints.reduce((s, e) => s + parseInt(e.appels.replace("k/mois","")) * 1000, 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Code size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-48 · Open Data</p>
              <h1 className="text-2xl font-black text-white">API Ouverte GMV</h1>
              <p className="text-slate-400 text-sm mt-1">API REST publique · Données de la Grande Muraille Verte en accès libre</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Endpoints disponibles", value: endpoints.length, color: "text-teal-400" },
              { label: "Appels ce mois", value: "285k", color: "text-emerald-400" },
              { label: "Partenaires API", value: partenaires.length+"+", color: "text-blue-400" },
              { label: "Uptime", value: "99.8%", color: "text-amber-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{String(value)}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-950 rounded-2xl p-5">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Exemple d'appel</p>
        <pre className="text-xs text-emerald-400 font-mono overflow-x-auto"><code>{`curl -X GET \\
  "https://api.asergmv.sn/v1/stats/global" \\
  -H "Authorization: Bearer YOUR_API_KEY"

// Réponse:
{
  "arbres_total": 5284920,
  "communes": 131,
  "surface_ha": 184320,
  "tCO2_sequestree": 428000,
  "updated_at": "2026-06-11T08:32:00Z"
}`}</code></pre>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Référence API</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {endpoints.map(e => (
            <div key={e.chemin} className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-colors">
              <span className={`text-[10px] font-black px-2 py-1 rounded-md shrink-0 ${methodColor[e.methode]}`}>{e.methode}</span>
              <code className="text-xs font-mono text-slate-700 flex-1">{e.chemin}</code>
              <p className="text-[11px] text-slate-500 hidden md:block flex-1">{e.description}</p>
              <span className="text-[10px] font-bold text-slate-400 shrink-0">{e.appels}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}