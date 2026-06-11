"use client";
import { Bot, Send, User, Leaf, MessageSquare, Zap } from "lucide-react";
import { useState } from "react";

const premessages = [
  { role: "bot", texte: "Bonjour ! Je suis l'assistant virtuel de l'ASERGMV 🌱\nJe peux vous renseigner sur la Grande Muraille Verte, les projets en cours, les espèces végétales, et l'état des plantations. Que puis-je faire pour vous ?" },
];

const suggestions = [
  "Quel est le taux de survie actuel ?",
  "Quelles espèces sont recommandées au Sahel ?",
  "Comment déclarer un incident terrain ?",
  "Où en est la commune de Linguère ?",
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState(premessages);
  const [input, setInput] = useState("");

  const envoyer = (texte: string) => {
    if (!texte.trim()) return;
    setMessages(m => [
      ...m,
      { role: "user", texte },
      { role: "bot", texte: `Merci pour votre question sur "${texte}". Je cherche dans la base de données GMV... Cette fonctionnalité sera connectée à une IA conversationnelle entraînée sur les données ASERGMV lors du déploiement de l'application complète.` }
    ]);
    setInput("");
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-50 · IA Conversationnelle</p>
              <h1 className="text-2xl font-black text-white">Chatbot GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Assistant virtuel — Données GMV en temps réel</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Questions répondues", value: "12 484", color: "text-emerald-400" },
              { label: "Précision réponses", value: "94%", color: "text-blue-400" },
              { label: "Langues", value: "Fr / Wo / Pu", color: "text-amber-400" },
              { label: "Utilisateurs actifs", value: "842", color: "text-violet-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col" style={{ height: "480px" }}>
        <div className="p-4 border-b border-slate-100 flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-800">Assistant GMV</p>
            <div className="flex items-center gap-1 text-[10px] text-emerald-500"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />En ligne</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${m.role === "bot" ? "bg-emerald-100" : "bg-slate-200"}`}>
                {m.role === "bot" ? <Bot size={13} className="text-emerald-600" /> : <User size={13} className="text-slate-500" />}
              </div>
              <div className={`max-w-[80%] text-xs p-3 rounded-2xl whitespace-pre-wrap ${m.role === "bot" ? "bg-slate-100 text-slate-700 rounded-tl-sm" : "bg-emerald-500 text-white rounded-tr-sm"}`}>
                {m.texte}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-100">
          <div className="flex gap-2 mb-2 flex-wrap">
            {suggestions.map(s => (
              <button key={s} onClick={() => envoyer(s)} className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-lg hover:bg-emerald-100 transition-colors">{s}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && envoyer(input)}
              className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200" placeholder="Posez votre question..." />
            <button onClick={() => envoyer(input)} className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <Send size={14} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}