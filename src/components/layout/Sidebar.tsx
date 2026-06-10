"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard, Map, FolderKanban, Sprout, Users,
  BarChart3, BookOpen, LogOut, Leaf, Building2,
  FlaskConical, Target, FileText, Settings, TreePine, Globe,
  TrendingUp, Zap, Radio, Satellite, ChevronRight,
} from "lucide-react";

const groups = [
  {
    label: "PILOTAGE",
    items: [
      { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard, badge: null },
    ],
  },
  {
    label: "CARTOGRAPHIE",
    items: [
      { label: "Carte GMV",  href: "/carte",    icon: Map,       badge: null },
      { label: "Communes",   href: "/communes", icon: Building2, badge: "131" },
    ],
  },
  {
    label: "PROJETS & TERRAIN",
    items: [
      { label: "Projets",        href: "/projets",   icon: FolderKanban, badge: null },
      { label: "Parcelles",      href: "/parcelles", icon: Sprout,       badge: null },
      { label: "Saisies terrain",href: "/saisies",   icon: Target,       badge: null },
    ],
  },
  {
    label: "RESSOURCES",
    items: [
      { label: "Volontaires", href: "/volontaires", icon: Users,        badge: null },
      { label: "Pepinieres",  href: "/pepinieres",  icon: TreePine,     badge: null },
      { label: "Stocks",      href: "/stocks",      icon: FlaskConical, badge: null },
    ],
  },
  {
    label: "ANALYSES",
    items: [
      { label: "Rapports KPI", href: "/rapports",   icon: BarChart3, badge: null },
      { label: "Documents",    href: "/documents",  icon: FileText,  badge: null },
      { label: "E-learning",   href: "/elearning",  icon: BookOpen,  badge: null },
    ],
  },
  {
    label: "ADMINISTRATION",
    items: [
      { label: "Parametres", href: "/parametres", icon: Settings, badge: null },
    ],
  },
];

const externals = [
  { label: "Portail Citoyen",  href: "/portail",  icon: Globe   },
  { label: "Feuille de route", href: "/roadmap",  icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const initials = session?.user?.name
    ? session.user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AS";

  return (
    <aside className="flex flex-col h-screen w-64 bg-[#0a0a0f] text-white fixed left-0 top-0 z-40 border-r border-white/5 shadow-2xl">

      {/* Logo */}
      <div className="h-[64px] flex items-center px-5 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shrink-0">
            <Leaf size={16} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-black text-[13px] tracking-tight leading-none text-white truncate">ASERGMV</p>
            <p className="text-[10px] text-slate-500 leading-none mt-0.5 truncate">Grande Muraille Verte</p>
          </div>
        </div>
        {/* Pro badge */}
        <div className="shrink-0 ml-2 px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/25 rounded-md">
          <p className="text-[9px] font-black text-emerald-400 tracking-widest">GMV</p>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-slate-700
        [&::-webkit-scrollbar-thumb]:rounded-full">
        {groups.map((group) => (
          <div key={group.label} className="mb-1">
            <p className="text-[9.5px] font-black text-slate-600 tracking-[0.15em] px-3 py-2 uppercase">
              {group.label}
            </p>
            {group.items.map(({ label, href, icon: Icon, badge }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 group mb-0.5 ${
                    active
                      ? "bg-emerald-500/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  {/* Active indicator */}
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-emerald-400 rounded-r-full" />
                  )}
                  <Icon
                    size={15}
                    className={active ? "text-emerald-400" : "text-slate-600 group-hover:text-slate-400 transition-colors"}
                  />
                  <span className="flex-1 truncate">{label}</span>
                  {badge && (
                    <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-md">
                      {badge}
                    </span>
                  )}
                  {active && (
                    <ChevronRight size={12} className="text-emerald-400 shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}

        {/* External links */}
        <div className="pt-2 mt-2 border-t border-white/5">
          <p className="text-[9.5px] font-black text-slate-600 tracking-[0.15em] px-3 py-2 uppercase">Acces public</p>
          {externals.map(({ label, href, icon: Icon }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-slate-500 hover:bg-white/5 hover:text-slate-200 transition-all duration-150 group mb-0.5">
              <Icon size={15} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
              <span className="flex-1">{label}</span>
              <span className="text-slate-700 text-[10px]">↗</span>
            </a>
          ))}
        </div>
      </nav>

      {/* System status strip */}
      <div className="px-4 py-2.5 border-t border-white/5 border-b border-white/5 bg-emerald-500/5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shrink-0" />
          <p className="text-[10px] text-emerald-400 font-semibold truncate">Neon DB · Connectee</p>
          <div className="ml-auto flex items-center gap-1">
            <Satellite size={10} className="text-emerald-500" />
          </div>
        </div>
      </div>

      {/* User footer */}
      <div className="p-3 bg-[#0d0d14] shrink-0">
        <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-white/5 transition-colors mb-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-[11px] font-black text-white shrink-0 shadow-md">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-bold text-white truncate leading-tight">
              {session?.user?.name ?? "Utilisateur"}
            </p>
            <p className="text-[10px] text-slate-500 truncate leading-tight">
              {(session?.user as any)?.role?.replace(/_/g, " ") ?? "Agent GMV"}
            </p>
          </div>
          <div className="shrink-0 px-1.5 py-0.5 bg-white/5 rounded-md border border-white/10">
            <p className="text-[9px] font-black text-slate-400">PRO</p>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all w-full"
        >
          <LogOut size={13} />
          Deconnexion
        </button>

        <p className="text-[9px] text-slate-700 text-center mt-2">v2026.1 · ASERGMV Platform</p>
      </div>
    </aside>
  );
}