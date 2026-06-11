"use client";
import { useState } from "react";
import { Bot, FileText, Mic, MessageSquare, Zap } from "lucide-react";

const conversations = [
  { q: "Quel est le taux de survie des acacias plantes en 2023 a Linguere ?", r: "D apres la base de donnees GMV, les acacias senegal plantes en 2023 dans la commune de Linguere affichent un taux de survie de 78,4%. Ce chiffre est superieur a la moyenne nationale de 71,2%. Les principales causes de mortalite identifiees sont : manque d arrosage post-plantation (42%), attaques termites (31%), secheresse exceptionnelle aout 2023 (27%). Recommandation : intensifier le paillage et prevoir un arrosage supplementaire en saison seche 2024." },
  { q: "Genere un rapport mensuel pour janvier 2026", r: "Rapport Mensuel GMV - Janvier 2026\n\nPoints cles : 1 247 nouvelles plantations enregistrees (+8% vs decembre 2025). 3 alertes feux traitees (Ranerou, Louga, Podor). NDVI moyen stable a 0.34 (+0.01). Budget execute : 87% sur lignes Banque Mondiale PAREC-CC. 2 missions terrain effectuees..." },
];

const rapportsAuto = [
  { titre: "Rapport mensuel GMV - Janvier 2026", date: "01/02/2026", pages: 12, statut: "Genere", type: "Mensuel" },
  { titre: "Bilan carbone T4 2025", date: "15/01/2026", pages: 8, statut: "Genere", type: "Carbone" },
  { titre: "Rapport feux actifs - Decembre 2025", date: "02/01/2026", pages: 5, statut: "Genere", type: "Alertes" },
  { titre: "Synthese donneurs PAREC-CC", date: "28/12/2025", pages: 18, statut: "En cours", type: "Bailleurs" },
];

export default function LlmGeneratifPage() {
  const [tab, setTab] = useState<"chat" | "rapports" | "voix" | "multimodal">("chat");
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState(conversations);

  function envoyer() {
    if (!input.trim()) return;
    setMsgs(m => [...m, { q: input, r: "Analyse en cours... (demonstration - connecter API Claude en production)" }]);
    setInput("");
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-700 rounded-2xl flex items-center justify-center">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">IA AVANCEE - LLM GENERATIF</p>
              <h1 className="text-2xl font-black text-white">LLM & IA Generative</h1>
              <p className="text-slate-400 text-sm mt-1">RAG sur donnees GMV - Generation rapports - Voix Wolof - Vision multimodale</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Documents RAG indexes", value: "2 847", color: "text-blue-400" },
              { label: "Rapports auto-generes", value: "47/mois", color: "text-emerald-400" },
              { label: "Langues supportees", value: "FR / WO", color: "text-amber-400" },
              { label: "Requetes/jour", value: "324", color: "text-violet-400" },
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
        {([["chat","Chatbot RAG GMV"],["rapports","Rapports auto"],["voix","Voix Wolof"],["multimodal","Vision multimodale"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === id ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>{label}</button>
        ))}
      </div>
      {tab === "chat" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <Bot size={16} className="text-blue-600" />
            <h2 className="text-base font-black text-slate-900">Assistant GMV - RAG sur 2 847 documents</h2>
          </div>
          <div className="p-5 space-y-4 max-h-96 overflow-y-auto">
            {msgs.map((m, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-end"><div className="bg-blue-600 text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs">{m.q}</div></div>
                <div className="flex"><div className="bg-slate-100 text-slate-700 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-md whitespace-pre-line">{m.r}</div></div>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 border-t border-slate-100 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && envoyer()} placeholder="Posez une question sur les donnees GMV..." className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button onClick={envoyer} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700"><Zap size={14} /></button>
          </div>
        </div>
      )}
      {tab === "rapports" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900">Rapports auto-generes par LLM</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 flex items-center gap-2"><FileText size={14} />Generer rapport</button>
          </div>
          <div className="divide-y divide-slate-50">
            {rapportsAuto.map(r => (
              <div key={r.titre} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50">
                <FileText size={16} className="text-blue-600 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{r.titre}</p>
                  <p className="text-xs text-slate-400">{r.date} - {r.pages} pages</p>
                </div>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{r.type}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.statut === "Genere" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{r.statut}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === "voix" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mic size={20} className="text-amber-600" />
              <h2 className="text-base font-black text-slate-900">Interface vocale Wolof / Francais</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { lang: "Wolof", statut: "Beta", desc: "Reconnaissance vocale Wolof pour agents terrain. Commandes : enregistrement plantations, signalement feux, saisie inventaires. Modele ASR fine-tune sur corpus agricole sahelien." },
                { lang: "Francais", statut: "Production", desc: "STT/TTS francais haute qualite. Transcription automatique reunions, rapports dictes, alertes vocales. Whisper large-v3 + synthese vocale neurale." },
              ].map(l => (
                <div key={l.lang} className="bg-slate-50 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-black text-slate-900">{l.lang}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${l.statut === "Production" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{l.statut}</span>
                  </div>
                  <p className="text-xs text-slate-600">{l.desc}</p>
                  <div className="mt-4 flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full cursor-pointer hover:bg-amber-200 transition-colors">
                    <Mic size={20} className="text-amber-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {tab === "multimodal" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare size={20} className="text-violet-600" />
            <h2 className="text-base font-black text-slate-900">Vision Multimodale - Analyse images terrain</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { titre: "Diagnostic phytosanitaire", desc: "Photo feuille/plante - diagnostic maladie ou carence - recommandation traitement", icon: "🔬" },
              { titre: "Estimation biomasse", desc: "Photo couronne arbre - estimation biomasse et CO2 sequestre par vision IA", icon: "🌳" },
              { titre: "Verification plantation", desc: "Photo GPS + timestamp - verification plantation reelle vs registre - anti-fraude", icon: "📍" },
              { titre: "Cartographie dommages", desc: "Drone image - detection zones brulees, coulees de boue, erosion hydrique", icon: "🗺️" },
              { titre: "Inventaire automatique", desc: "Video transect - comptage automatique plants, especes, etat sante", icon: "📊" },
              { titre: "Rapport visuel auto", desc: "Galerie photos mission - genere rapport illustre automatiquement avec analyse IA", icon: "📄" },
            ].map(f => (
              <div key={f.titre} className="bg-slate-50 rounded-2xl p-4">
                <div className="text-2xl mb-2">{f.icon}</div>
                <h3 className="text-sm font-black text-slate-900 mb-1">{f.titre}</h3>
                <p className="text-xs text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}