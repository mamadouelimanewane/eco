"use client";
import { usePathname } from "next/navigation";
import { Bell, Search, ChevronRight, Home, Plus, StickyNote, Moon, Sun } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/dashboard":   { title: "Tableau de bord",    subtitle: "Vue consolidee Grande Muraille Verte" },
  "/carte":       { title: "Carte GMV",           subtitle: "850 km · 131 communes · Senegal" },
  "/communes":    { title: "Communes",            subtitle: "Gestion des 131 communes GMV" },
  "/projets":     { title: "Projets",             subtitle: "Suivi des programmes de reboisement" },
  "/parcelles":   { title: "Parcelles",           subtitle: "Zones reboisees et taux de survie" },
  "/saisies":     { title: "Saisies terrain",     subtitle: "Collecte de donnees agents" },
  "/volontaires": { title: "Volontaires",         subtitle: "Reseau des volontaires GMV" },
  "/pepinieres":  { title: "Pepinieres",          subtitle: "Gestion des pepinieres" },
  "/stocks":      { title: "Stocks",              subtitle: "Inventaire plants et semences" },
  "/rapports":    { title: "Rapports & KPIs",     subtitle: "Indicateurs de performance" },
  "/documents":   { title: "Documents",           subtitle: "Base documentaire ASERGMV" },
  "/elearning":   { title: "E-learning",          subtitle: "Formation des agents terrain" },
  "/parametres":  { title: "Parametres",          subtitle: "Configuration de la plateforme" },
};

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession() ?? {};
  const [dark, setDark] = useState(false);

  const key = Object.keys(pageMeta).find(k => pathname === k || pathname.startsWith(k + "/"));
  const meta = key ? pageMeta[key] : { title: "ASERGMV", subtitle: "Plateforme Digitale" };

  const initials = session?.user?.name
    ? session.user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AS";

  return (
    <header className="sticky top-0 z-30 h-[64px] bg-white border-b border-slate-100 flex items-center px-5 gap-3 shadow-sm shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-1">
        <Home size={12} className="text-slate-300" />
        <ChevronRight size={11} className="text-slate-300" />
        <span className="text-slate-700 font-semibold">{meta.title}</span>
      </div>

      {/* Vertical divider */}
      <div className="w-px h-5 bg-slate-200 mx-1" />

      {/* Page subtitle — md+ */}
      <p className="hidden md:block text-[11px] text-slate-400 truncate max-w-xs">{meta.subtitle}</p>

      <div className="flex-1" />

      {/* Quick actions */}
      <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all hover:scale-105">
        <Plus size={13} /> Saisie
      </button>
      <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-lg transition-all">
        <StickyNote size={13} /> Note
      </button>

      {/* Divider */}
      <div className="w-px h-5 bg-slate-200 mx-1" />

      {/* Search */}
      <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-400 hover:border-slate-300 hover:bg-white transition-all w-44 shadow-sm">
        <Search size={12} />
        <span className="flex-1 text-left">Rechercher...</span>
        <kbd className="text-[10px] border border-slate-200 bg-white rounded px-1 py-0.5 text-slate-400">Ctrl K</kbd>
      </button>

      {/* Theme toggle */}
      <button onClick={() => setDark(d => !d)}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-all">
        {dark ? <Sun size={14} /> : <Moon size={14} />}
      </button>

      {/* Notif */}
      <button className="relative w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
        <Bell size={14} className="text-slate-400" />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-white" />
      </button>

      {/* Avatar + name */}
      <div className="flex items-center gap-2 pl-2 border-l border-slate-200 ml-1">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-[11px] font-black text-white shadow-sm">
          {initials}
        </div>
        <div className="hidden sm:block">
          <p className="text-xs font-bold text-slate-800 leading-tight">{session?.user?.name ?? "Agent"}</p>
          <p className="text-[10px] text-slate-400 leading-tight">
            {(session?.user as any)?.role?.replace(/_/g, " ") ?? "ASERGMV"}
          </p>
        </div>
        <div className="hidden sm:block px-1.5 py-0.5 bg-emerald-50 border border-emerald-200 rounded-md">
          <p className="text-[9px] font-black text-emerald-600">PRO</p>
        </div>
      </div>
    </header>
  );
}