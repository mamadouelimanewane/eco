"use client";
import { Trophy, Star, Users, CheckCircle, BookOpen, TrendingUp } from "lucide-react";

const questions = [
  { q: "Quelle est la longueur de la Grande Muraille Verte au Sénégal ?", options: ["500 km","850 km","1200 km","600 km"], reponse: 1 },
  { q: "Combien de communes sont traversées par la GMV au Sénégal ?", options: ["89 communes","115 communes","131 communes","98 communes"], reponse: 2 },
  { q: "Quelle espèce est la plus plantée dans la GMV sénégalaise ?", options: ["Baobab","Acacia senegal","Balanites","Ziziphus"], reponse: 1 },
];

const palmares = [
  { rang: 1, nom: "Coumba Ndoye", commune: "Ourossogui", score: 980, badge: "🥇" },
  { rang: 2, nom: "Mamadou Dia", commune: "Linguère", score: 950, badge: "🥈" },
  { rang: 3, nom: "Awa Sarr", commune: "Ranérou", score: 920, badge: "🥉" },
  { rang: 4, nom: "Ibrahima Kane", commune: "Mbane", score: 890, badge: "" },
  { rang: 5, nom: "Fatou Sall", commune: "Sagatta", score: 870, badge: "" },
];

export default function QuizPage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Trophy size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-40 · Éducation ludique</p>
              <h1 className="text-2xl font-black text-white">Quiz National GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Testez vos connaissances sur la Grande Muraille Verte</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Questions en base", value: "240", color: "text-yellow-400" },
              { label: "Participants", value: "18 420", color: "text-emerald-400" },
              { label: "Score moyen", value: "74%", color: "text-blue-400" },
              { label: "Badges délivrés", value: "4 821", color: "text-violet-400" },
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
        {/* Quiz preview */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} className="text-yellow-500" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Aperçu du quiz du jour</h2>
          </div>
          <div className="space-y-4">
            {questions.map((q, qi) => (
              <div key={qi} className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <p className="text-xs font-black text-slate-800 mb-3">Q{qi+1}. {q.q}</p>
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, oi) => (
                    <button key={oi} className={`text-[11px] font-medium px-2 py-1.5 rounded-lg text-left transition-colors ${oi === q.reponse ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                      {oi === q.reponse && <CheckCircle size={10} className="inline mr-1" />}{opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-black text-sm py-3 rounded-xl transition-colors">Démarrer le Quiz complet (20 questions)</button>
        </div>

        {/* Palmarès */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={16} className="text-amber-500" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Palmarès national</h2>
          </div>
          <div className="space-y-2">
            {palmares.map(p => (
              <div key={p.rang} className={`flex items-center gap-3 p-3 rounded-xl ${p.rang <= 3 ? "bg-amber-50 border border-amber-100" : "bg-slate-50"}`}>
                <span className="w-6 text-center text-[16px]">{p.badge || <span className="text-[12px] font-black text-slate-400">#{p.rang}</span>}</span>
                <div className="flex-1">
                  <p className="text-xs font-black text-slate-800">{p.nom}</p>
                  <p className="text-[10px] text-slate-400">{p.commune}</p>
                </div>
                <p className="text-sm font-black text-amber-600">{p.score} pts</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}