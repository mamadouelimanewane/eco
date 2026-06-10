"use client";
import { usePathname } from "next/navigation";
import { Bell, Search, Menu } from "lucide-react";
import { useSession } from "next-auth/react";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard":   { title: "Tableau de bord",    subtitle: "Vue consolidée · Grande Muraille Verte" },
  "/carte":       { title: "Carte GMV",           subtitle: "850 km · 131 communes · Sénégal" },
  "/communes":    { title: "Communes",             subtitle: "Gestion des 131 communes GMV" },
  "/projets":     { title: "Projets",             subtitle: "Suivi des programmes de reboisement" },
  "/parcelles":   { title: "Parcelles",           subtitle: "Gestion des parcelles reboisées" },
  "/saisies":     { title: "Saisies terrain",     subtitle: "Collecte de données agents" },
  "/volontaires": { title: "Volontaires",         subtitle: "Réseau des volontaires GMV" },
  "/pepinieres":  { title: "Pépinières",          subtitle: "Gestion des pépinières" },
  "/stocks":      { title: "Stocks",              subtitle: "Inventaire plants et semences" },
  "/rapports":    { title: "Rapports & KPIs",     subtitle: "Indicateurs de performance" },
  "/documents":   { title: "Documents",           subtitle: "Base documentaire" },
  "/elearning":   { title: "E-learning",          subtitle: "Formation des agents terrain" },
  "/parametres":  { title: "Paramètres",          subtitle: "Configuration de la plateforme" },
};

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const key = Object.keys(pageTitles).find((k) =>
    pathname === k || pathname.startsWith(k + "/")
  );
  const meta = key ? pageTitles[key] : { title: "ASERGMV", subtitle: "Plateforme Digitale GMV" };

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-6 bg-white border-b border-gray-100 shrink-0">
      {/* Left — page title */}
      <div>
        <h1 className="text-base font-semibold text-gray-900 leading-tight">{meta.title}</h1>
        <p className="text-xs text-gray-400 leading-tight">{meta.subtitle}</p>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-colors bg-gray-50">
          <Search size={14} />
          <span className="hidden sm:block">Rechercher…</span>
          <kbd className="hidden sm:block text-[10px] border border-gray-200 rounded px-1 bg-white text-gray-400">⌘K</kbd>
        </button>

        {/* Notifs */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <Bell size={16} className="text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center text-xs font-bold text-emerald-100 cursor-pointer select-none">
          {session?.user?.name
            ? session.user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
            : "AS"}
        </div>
      </div>
    </header>
  );
}
