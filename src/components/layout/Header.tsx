"use client";
import { usePathname } from "next/navigation";
import { Bell, Search, ChevronRight, Home } from "lucide-react";
import { useSession } from "next-auth/react";

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/dashboard":   { title: "Tableau de bord",    subtitle: "Vue consolidée Grande Muraille Verte" },
  "/carte":       { title: "Carte GMV",           subtitle: "850 km · 131 communes · Sénégal" },
  "/communes":    { title: "Communes",            subtitle: "Gestion des 131 communes GMV" },
  "/projets":     { title: "Projets",             subtitle: "Suivi des programmes de reboisement" },
  "/parcelles":   { title: "Parcelles",           subtitle: "Zones reboisées et taux de survie" },
  "/saisies":     { title: "Saisies terrain",     subtitle: "Collecte de données agents" },
  "/volontaires": { title: "Volontaires",         subtitle: "Réseau des volontaires GMV" },
  "/pepinieres":  { title: "Pépinières",          subtitle: "Gestion des pépinières" },
  "/stocks":      { title: "Stocks",              subtitle: "Inventaire plants et semences" },
  "/rapports":    { title: "Rapports & KPIs",     subtitle: "Indicateurs de performance" },
  "/documents":   { title: "Documents",           subtitle: "Base documentaire ASERGMV" },
  "/elearning":   { title: "E-learning",          subtitle: "Formation des agents terrain" },
  "/parametres":  { title: "Paramètres",          subtitle: "Configuration de la plateforme" },
};

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession() ?? {};

  const key = Object.keys(pageMeta).find(k => pathname === k || pathname.startsWith(k + "/"));
  const meta = key ? pageMeta[key] : { title: "ASERGMV", subtitle: "Plateforme Digitale" };

  const initials = session?.user?.name
    ? session.user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AS";

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4 shadow-sm shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-2">
        <Home size={12} />
        <ChevronRight size={11} />
        <span className="text-slate-600 font-medium">{meta.title}</span>
      </div>

      {/* Page title — visible md+ */}
      <div className="hidden md:block border-l border-slate-200 pl-4">
        <p className="text-sm font-bold text-slate-900 leading-tight">{meta.title}</p>
        <p className="text-[11px] text-slate-400 leading-tight">{meta.subtitle}</p>
      </div>

      <div className="flex-1" />

      {/* Search */}
      <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-400 hover:border-slate-300 hover:bg-white transition-all w-48 shadow-sm">
        <Search size={13} />
        <span className="flex-1 text-left">Rechercher…</span>
        <kbd className="text-[10px] border border-slate-200 bg-white rounded px-1 text-slate-400">⌘K</kbd>
      </button>

      {/* Notif */}
      <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
        <Bell size={15} className="text-slate-500" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
      </button>

      {/* Avatar */}
      <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
        <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-xs font-bold text-white select-none">
          {initials}
        </div>
        <div className="hidden sm:block">
          <p className="text-xs font-semibold text-slate-800 leading-tight">{session?.user?.name ?? "Agent"}</p>
          <p className="text-[10px] text-slate-400 leading-tight">
            {(session?.user as any)?.role?.replace(/_/g, " ") ?? "ASERGMV"}
          </p>
        </div>
      </div>
    </header>
  );
}
