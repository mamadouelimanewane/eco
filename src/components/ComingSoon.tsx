"use client";
import { Clock, Lock, Zap } from "lucide-react";

const prioConfig: Record<string, { label: string; badge: string; bar: string }> = {
  P1: { label: "Priorité 1 — Impact immédiat",          badge: "bg-red-100 text-red-700 border border-red-200",     bar: "bg-red-500"     },
  P2: { label: "Priorité 2 — Croissance 12–24 mois",     badge: "bg-amber-100 text-amber-700 border border-amber-200", bar: "bg-amber-500" },
  P3: { label: "Priorité 3 — Innovation 24–36 mois",     badge: "bg-emerald-100 text-emerald-700 border border-emerald-200", bar: "bg-emerald-500" },
  P4: { label: "Selon financement",                       badge: "bg-slate-100 text-slate-500 border border-slate-200",  bar: "bg-slate-400"   },
};

const colorMap: Record<string, { bg: string; text: string; glow: string; ring: string }> = {
  emerald: { bg: "bg-emerald-500", text: "text-emerald-500", glow: "bg-emerald-500/10", ring: "ring-emerald-200" },
  blue:    { bg: "bg-blue-500",    text: "text-blue-500",    glow: "bg-blue-500/10",    ring: "ring-blue-200"    },
  violet:  { bg: "bg-violet-500",  text: "text-violet-500",  glow: "bg-violet-500/10",  ring: "ring-violet-200"  },
  amber:   { bg: "bg-amber-500",   text: "text-amber-500",   glow: "bg-amber-500/10",   ring: "ring-amber-200"   },
  rose:    { bg: "bg-rose-500",    text: "text-rose-500",    glow: "bg-rose-500/10",    ring: "ring-rose-200"    },
  teal:    { bg: "bg-teal-500",    text: "text-teal-500",    glow: "bg-teal-500/10",    ring: "ring-teal-200"    },
  cyan:    { bg: "bg-cyan-500",    text: "text-cyan-500",    glow: "bg-cyan-500/10",    ring: "ring-cyan-200"    },
  slate:   { bg: "bg-slate-500",   text: "text-slate-500",   glow: "bg-slate-500/10",   ring: "ring-slate-200"   },
  lime:    { bg: "bg-lime-600",    text: "text-lime-600",    glow: "bg-lime-500/10",    ring: "ring-lime-200"    },
  pink:    { bg: "bg-pink-500",    text: "text-pink-500",    glow: "bg-pink-500/10",    ring: "ring-pink-200"    },
  indigo:  { bg: "bg-indigo-500",  text: "text-indigo-500",  glow: "bg-indigo-500/10",  ring: "ring-indigo-200"  },
};

interface Props {
  id: string;
  nom: string;
  description: string;
  icon: React.ElementType;
  prio: string;
  bloc: string;
  color?: string;
  auths?: string[];
  features?: string[];
}

export default function ComingSoon({ id, nom, description, icon: Icon, prio, bloc, color = "emerald", auths = [], features = [] }: Props) {
  const p = prioConfig[prio] ?? prioConfig["P4"];
  const c = colorMap[color] ?? colorMap["emerald"];

  return (
    <div className="space-y-6">
      {/* Hero card */}
      <div className={`relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5 shadow-2xl`}>
        <div className={`absolute top-0 right-0 w-80 h-80 ${c.glow} blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none`} />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className={`w-20 h-20 ${c.bg} rounded-3xl flex items-center justify-center shadow-2xl shrink-0`}>
            <Icon size={40} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{id}</span>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${p.badge}`}>{p.label}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">{nom}</h1>
            <p className="text-slate-400 text-base leading-relaxed max-w-2xl">{description}</p>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid md:grid-cols-3 gap-5">
        {/* Bloc */}
        <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-6 ring-1 ${c.ring}`}>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Bloc thématique</p>
          <p className="text-sm font-bold text-slate-900">{bloc}</p>
        </div>
        {/* Auth */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Niveaux d'accès</p>
          <div className="flex flex-wrap gap-2">
            {(auths.length ? auths : ["ADMIN"]).map(a => (
              <span key={a} className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-lg">
                <Lock size={10} /> {a}
              </span>
            ))}
          </div>
        </div>
        {/* Priority */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Avancement</p>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full ${p.bar} rounded-full`} style={{width: prio==="P1"?"20%":prio==="P2"?"10%":"5%"}} />
            </div>
            <span className="text-xs font-black text-slate-400">{prio==="P1"?"Planifié":"Conception"}</span>
          </div>
          <p className="text-[10px] text-slate-400">{p.label}</p>
        </div>
      </div>

      {/* Features placeholder */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <Zap size={16} className={c.text} />
          <p className="text-sm font-black text-slate-900 uppercase tracking-wide">Fonctionnalites prevues</p>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {(features.length ? features : [
            "Interface de gestion intuitive et responsive",
            "Tableau de bord avec indicateurs en temps reel",
            "Export CSV / PDF des donnees",
            "Notifications et alertes configurables",
            "API REST documentee pour integrations tierces",
            "Audit log et historique des actions",
          ]).map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
              <div className={`w-1.5 h-1.5 rounded-full ${c.bg} mt-1.5 shrink-0`} />
              <span className="text-sm text-slate-600">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dev status + CTA */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock size={13} className="text-amber-400" />
            <span className="text-[11px] font-black text-amber-400 uppercase tracking-widest">En cours de developpement</span>
          </div>
          <p className="text-white font-black text-base mb-1">Interessé par cette fonctionnalite ?</p>
          <p className="text-slate-400 text-sm">Contactez l'equipe ASERGMV pour accelerer le developpement.</p>
        </div>
        <a href="/parametres" className={`flex items-center gap-2 ${c.bg} hover:opacity-90 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:scale-105 shrink-0`}>
          <Zap size={15} /> Demander l'acces
        </a>
      </div>
    </div>
  );
}