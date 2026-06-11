"use client";
import { MessageSquare, Heart, Share2, Users, TrendingUp, Bell } from "lucide-react";

const posts = [
  { auteur: "Ibrahima Diallo", role: "Chef de zone", commune: "Linguère", contenu: "Excellente journée de plantation ! 2 400 acacias mis en terre avec les jeunes de la commune. Merci à toute l'équipe 💪", likes: 84, commentaires: 12, temps: "Il y a 2h", image: true },
  { auteur: "Fatou Sow", role: "Agente terrain", commune: "Ranérou", contenu: "Observation importante : pluies de 18mm ce matin sur la zone B2. Les plants ont l'air de bien reprendre. Taux de survie estimé à 87% pour ce secteur.", likes: 61, commentaires: 8, temps: "Il y a 4h", image: false },
  { auteur: "Direction ASERGMV", role: "Administration", commune: "Nationale", contenu: "📢 ANNONCE : La plateforme GMV dépasse officiellement 5 millions de plants géolocalisés ! Félicitations à toutes les équipes régionales pour cet exploit.", likes: 312, commentaires: 45, temps: "Hier", image: false },
  { auteur: "Moussa Ndiaye", role: "Coordonnateur", commune: "Mbane", contenu: "Alerte signalée dans le secteur C1. Coupe suspecte détectée lors de la patrouille. Signalement transmis aux autorités. La vigilance de tous est nécessaire.", likes: 28, commentaires: 19, temps: "Il y a 2j", image: false },
];

const actus = [
  { type: "Succès", texte: "5M plants géolocalisés atteints", temps: "Hier" },
  { type: "Formation", texte: "50 agents formés à Ourossogui", temps: "Il y a 3j" },
  { type: "Alerte", texte: "Coupe signalée — Secteur Mbane C1", temps: "Il y a 2j" },
  { type: "Partenariat", texte: "Accord signé avec Orange Sénégal", temps: "Il y a 5j" },
];

export default function SocialPage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageSquare size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-30 · Réseau social</p>
              <h1 className="text-2xl font-black text-white">ASERGMV Social</h1>
              <p className="text-slate-400 text-sm mt-1">Réseau interne des acteurs GMV</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Membres", value: "3 284", color: "text-blue-400" },
              { label: "Posts ce mois", value: "842", color: "text-emerald-400" },
              { label: "Communautés", value: "18", color: "text-violet-400" },
              { label: "Actifs aujourd'hui", value: "421", color: "text-amber-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <textarea className="w-full text-sm text-slate-600 resize-none outline-none" placeholder="Partagez une mise à jour terrain..." rows={3} />
            <div className="flex justify-end mt-2">
              <button className="bg-blue-500 text-white text-[12px] font-bold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">Publier</button>
            </div>
          </div>
          {posts.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-[12px] font-black text-white shrink-0">
                  {p.auteur[0]}
                </div>
                <div>
                  <p className="text-xs font-black text-slate-800">{p.auteur}</p>
                  <p className="text-[10px] text-slate-400">{p.role} · {p.commune} · {p.temps}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">{p.contenu}</p>
              {p.image && <div className="w-full h-32 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl mb-3 flex items-center justify-center text-sm text-emerald-600 font-bold">📸 Photo terrain</div>}
              <div className="flex gap-4 text-[11px] text-slate-400">
                <button className="flex items-center gap-1 hover:text-rose-500 transition-colors"><Heart size={12} />{p.likes}</button>
                <button className="flex items-center gap-1 hover:text-blue-500 transition-colors"><MessageSquare size={12} />{p.commentaires}</button>
                <button className="flex items-center gap-1 hover:text-emerald-500 transition-colors"><Share2 size={12} />Partager</button>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wide mb-3">Actualités GMV</h3>
            <div className="space-y-3">
              {actus.map((a, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px]">
                  <span className={`px-1.5 py-0.5 rounded font-black text-[9px] shrink-0 mt-0.5 ${a.type==="Succès"?"bg-emerald-100 text-emerald-700":a.type==="Alerte"?"bg-red-100 text-red-700":a.type==="Formation"?"bg-blue-100 text-blue-700":"bg-violet-100 text-violet-700"}`}>{a.type}</span>
                  <div>
                    <p className="text-slate-700 font-medium">{a.texte}</p>
                    <p className="text-slate-400 text-[10px]">{a.temps}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}