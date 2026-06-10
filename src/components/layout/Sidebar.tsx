"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard, Map, FolderKanban, Sprout, Users,
  BarChart3, BookOpen, LogOut, Leaf, Building2,
  FlaskConical, Target, FileText, Settings, TreePine, Globe, Route,
} from "lucide-react";

const groups = [
  {
    label: "PILOTAGE",
    items: [
      { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "CARTOGRAPHIE",
    items: [
      { label: "Carte GMV", href: "/carte", icon: Map },
      { label: "Communes", href: "/communes", icon: Building2 },
    ],
  },
  {
    label: "PROJETS & TERRAIN",
    items: [
      { label: "Projets", href: "/projets", icon: FolderKanban },
      { label: "Parcelles", href: "/parcelles", icon: Sprout },
      { label: "Saisies terrain", href: "/saisies", icon: Target },
    ],
  },
  {
    label: "RESSOURCES",
    items: [
      { label: "Volontaires", href: "/volontaires", icon: Users },
      { label: "Pépinières", href: "/pepinieres", icon: TreePine },
      { label: "Stocks", href: "/stocks", icon: FlaskConical },
    ],
  },
  {
    label: "ANALYSES",
    items: [
      { label: "Rapports KPI", href: "/rapports", icon: BarChart3 },
      { label: "Documents", href: "/documents", icon: FileText },
      { label: "E-learning", href: "/elearning", icon: BookOpen },
    ],
  },
  {
    label: "ADMINISTRATION",
    items: [
      { label: "Paramètres", href: "/parametres", icon: Settings },
    ],
  },
];

const externalLinks = [
  { label: "Portail Citoyen",   href: "/portail",  icon: Globe },
  { label: "Feuille de route",  href: "/roadmap",  icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const initials = session?.user?.name
    ? session.user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AS";

  return (
    <aside className="flex flex-col h-screen w-64 bg-black text-white fixed left-0 top-0 z-40 border-r border-slate-800 shadow-sm">
      {/* Logo */}
      <div className="h-20 flex flex-col justify-center px-6 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md shrink-0">
            <Leaf size={18} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-sm leading-tight tracking-wide">ASERGMV</p>
            <p className="text-[11px] text-slate-400 leading-tight">Grande Muraille Verte</p>
          </div>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-slate-900
        [&::-webkit-scrollbar-thumb]:bg-slate-700
        [&::-webkit-scrollbar-thumb]:rounded-full
        hover:[&::-webkit-scrollbar-thumb]:bg-slate-500">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-semibold text-slate-500 tracking-widest px-3 mb-1.5">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ label, href, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group ${
                      active
                        ? "bg-slate-800 text-white shadow-sm"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={active ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"}
                    />
                    <span>{label}</span>
                    {active && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Portail citoyen */}
      <div className="px-3 pb-2 border-t border-slate-800 pt-3">
        {externalLinks.map(({ label, href, icon: Icon }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-white transition-all duration-150 group">
            <Icon size={16} className="text-slate-500 group-hover:text-emerald-400" />
            <span>{label}</span>
            <span className="ml-auto text-[10px] border border-slate-700 text-slate-600 px-1.5 py-0.5 rounded">↗</span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950 space-y-3 shrink-0">
        {/* User info */}
        <div className="flex items-center gap-3 px-1">
          <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-xs font-bold text-emerald-200 shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-white truncate">
              {session?.user?.name ?? "Utilisateur"}
            </p>
            <p className="text-[10px] text-slate-500 truncate">
              {(session?.user as any)?.role?.replace("_", " ") ?? "Agent"}
            </p>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-all w-full"
        >
          <LogOut size={15} />
          Déconnexion
        </button>

        <p className="text-[10px] text-slate-600 text-center">v2026.1 · ASERGMV Platform</p>
      </div>
    </aside>
  );
}
