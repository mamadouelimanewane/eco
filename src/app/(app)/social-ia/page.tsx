"use client";
import { useState } from "react";
import { Users, MessageSquare, Trophy, Smartphone, Heart } from "lucide-react";

const sentiments = [
  { commune: "Linguere", positif: 78, neutre: 14, negatif: 8, total: 2847, tendance: "+12%" },
  { commune: "Ranerou", positif: 65, neutre: 22, negatif: 13, total: 1234, tendance: "+5%" },
  { commune: "Matam", positif: 71, neutre: 18, negatif: 11, total: 3102, tendance: "+8%" },
  { commune: "Podor", positif: 52, neutre: 25, negatif: 23, total: 987, tendance: "-3%" },
  { commune: "Dagana", positif: 82, neutre: 12, negatif: 6, total: 1876, tendance: "+18%" },
  { commune: "Bakel", positif: 74, neutre: 16, negatif: 10, total: 1543, tendance: "+9%" },
];

const classement = [
  { rang: 1, nom: "Aminata Diallo", commune: "Dagana", arbres: 847, co2: 42.3, points: 9870, badge: "Champion GMV" },
  { rang: 2, nom: "Ousmane Ba", commune: "Linguere", arbres: 712, co2: 35.6, points: 8240, badge: "Planificateur Elite" },
  { rang: 3, nom: "Fatou Ndiaye", commune: "Matam", arbres: 634, co2: 31.7, points: 7120, badge: "Gardienne Foret" },
  { rang: 4, nom: "Ibrahima Sow", commune: "Bakel", arbres: 589, co2: 29.4, points: 6840, badge: "Reboiseur Pro" },
  { rang: 5, nom: "Mariama Diop", commune: "Ranerou", arbres: 541, co2: 27.1, points: 6210, badge: "Sentinelle Verte" },
];

const conflits = [
  { type: "Conflit foncier", zone: "Ranerou - Zone B", intensite: "Modere", statut: "Mediation en cours", date: "2026-01-07" },
  { type: "Opposition plantation", zone: "Podor - Eleveurs", intensite: "Eleve", statut: "Dialogue initie", date: "2026-01-05" },
  { type: "Acces eau dispute", zone: "Matam - Village Ngaol", intensite: "Faible", statut: "Resolu", date: "2025-12-20" },
];

const ussd = [
  { code: "*444#", description: "Enregistrer une plantation", sessions: 12847, succes: "94%" },
  { code: "*444*1#", description: "Signaler un feu", sessions: 342, succes: "99%" },
  { code: "*444*2#", description: "Consulter son score", sessions: 8421, succes: "97%" },
  { code: "*444*3#", description: "Demander une inspection", sessions: 891, succes: "88%" },
];

export default function SocialIaPage() {
  const [tab, setTab] = useState<"sentiment" | "gamification" | "conflits" | "ussd">("sentiment");
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-pink-700 rounded-2xl flex items-center justify-center">
              <Users size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">IA AVANCEE - SOCIAL & GOUVERNANCE</p>
              <h1 className="text-2xl font-black text-white">Social & Gouvernance IA</h1>
              <p className="text-slate-400 text-sm mt-1">Sentiment communautes - Gamification - Detection conflits - USSD sans internet</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Communes analysees", value: "131", color: "text-pink-400" },
              { label: "Sentiment positif moy.", value: "70%", color: "text-emerald-400" },
              { label: "Utilisateurs USSD", value: "24 k", color: "text-amber-400" },
              { label: "Conflits detectes", value: "3", color: "text-red-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {([["sentiment","Sentiment communautes"],["gamification","Gamification"],["conflits","Detection conflits"],["ussd","USSD sans internet"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === id ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>{label}</button>
        ))}
      </div>
      {tab === "sentiment" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-base font-black text-slate-900">Analyse sentiment - Communautes GMV</h2>
            <p className="text-xs text-slate-400 mt-0.5">NLP sur SMS, enquetes terrain, reseaux sociaux - Modele CamemBERT fine-tune Wolof/Francais</p>
          </div>
          <div className="divide-y divide-slate-50">
            {sentiments.map(s => (
              <div key={s.commune} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50">
                <div className="w-24 shrink-0">
                  <p className="text-sm font-bold text-slate-900">{s.commune}</p>
                  <p className="text-xs text-slate-400">{s.total} messages</p>
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-emerald-500" style={{ width: `${s.positif}%` }} />
                    <div className="h-full bg-slate-300" style={{ width: `${s.neutre}%` }} />
                    <div className="h-full bg-red-400" style={{ width: `${s.negatif}%` }} />
                  </div>
                  <div className="flex gap-3 mt-1 text-[10px]">
                    <span className="text-emerald-600 font-bold">Pos {s.positif}%</span>
                    <span className="text-slate-400">Neu {s.neutre}%</span>
                    <span className="text-red-500 font-bold">Neg {s.negatif}%</span>
                  </div>
                </div>
                <span className={`text-xs font-bold shrink-0 ${s.tendance.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>{s.tendance}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === "gamification" && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5"><Trophy size={20} className="text-amber-600 mb-2" /><p className="text-2xl font-black text-amber-700">1 240</p><p className="text-xs text-amber-600">Utilisateurs actifs</p></div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5"><Heart size={20} className="text-emerald-600 mb-2" /><p className="text-2xl font-black text-emerald-700">8 420</p><p className="text-xs text-emerald-600">Arbres plantes via app</p></div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5"><MessageSquare size={20} className="text-blue-600 mb-2" /><p className="text-2xl font-black text-blue-700">24 badges</p><p className="text-xs text-blue-600">Types de recompenses</p></div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100"><h2 className="text-base font-black text-slate-900">Classement planteurs GMV - Saison 2026</h2></div>
            <div className="divide-y divide-slate-50">
              {classement.map(c => (
                <div key={c.nom} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${c.rang === 1 ? "bg-amber-400 text-white" : c.rang === 2 ? "bg-slate-300 text-slate-700" : c.rang === 3 ? "bg-orange-300 text-white" : "bg-slate-100 text-slate-500"}`}>{c.rang}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-black text-slate-900">{c.nom}</p>
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">{c.badge}</span>
                    </div>
                    <p className="text-xs text-slate-400">{c.commune} - {c.arbres} arbres - {c.co2} t CO2</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-slate-900">{c.points.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400">points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {tab === "conflits" && (
        <div className="space-y-3">
          {conflits.map(c => (
            <div key={c.zone} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start gap-4">
                <div className={`w-2 h-2 rounded-full shrink-0 mt-2 ${c.intensite === "Eleve" ? "bg-red-500" : c.intensite === "Modere" ? "bg-amber-400" : "bg-emerald-500"}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-sm font-black text-slate-900">{c.type}</p>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${c.intensite === "Eleve" ? "bg-red-100 text-red-700" : c.intensite === "Modere" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>{c.intensite}</span>
                  </div>
                  <p className="text-xs text-slate-600">{c.zone}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{c.date}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full shrink-0 ${c.statut === "Resolu" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{c.statut}</span>
              </div>
            </div>
          ))}
          <div className="bg-slate-900 rounded-2xl p-5 text-white">
            <h3 className="font-black mb-2">Algorithme de detection precoce conflits</h3>
            <p className="text-sm text-slate-300">NLP en temps reel sur SMS communautes + rapports terrain. Modele de classification fine-tune sur corpus conflits fonciers sahel. Alertes automatiques si score de tension depasse seuil critique (0.75). Integration avec module mediation TOSTAN.</p>
          </div>
        </div>
      )}
      {tab === "ussd" && (
        <div className="space-y-4">
          <div className="bg-slate-900 rounded-2xl p-6 text-white mb-4">
            <div className="flex items-center gap-3 mb-3"><Smartphone size={20} className="text-green-400" /><h2 className="font-black">Interface USSD - Acces sans smartphone ni internet</h2></div>
            <p className="text-slate-300 text-sm">Compose le *444# sur tout telephone basique (2G/3G) pour acceder aux fonctions GMV : plantation, signalement feux, score gamification. Critique pour les 60% d agents terrain sans smartphone.</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100"><h2 className="text-base font-black text-slate-900">Codes USSD actifs</h2></div>
            <div className="divide-y divide-slate-50">
              {ussd.map(u => (
                <div key={u.code} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50">
                  <span className="text-base font-black text-green-600 font-mono w-20 shrink-0">{u.code}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">{u.description}</p>
                    <p className="text-xs text-slate-400">{u.sessions.toLocaleString()} sessions</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">{u.succes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}