"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import {
  LayoutDashboard, Map, Building2, FolderKanban, Sprout, Target,
  Users, TreePine, FlaskConical, BarChart3, BookOpen, FileText, Settings,
  Leaf, LogOut, ChevronRight, ChevronDown, Globe, Shield, Droplets,
  TrendingUp, Activity, Package, Calendar, Flame, Plane,
  Microscope, Cloud, Gift, ShoppingBag, Gavel, Heart, Wallet, Zap,
  MessageSquare, GraduationCap, Radio, Eye, Camera, Mic, Trophy,
  UserCog, Navigation, FolderLock, Megaphone, Timer, Newspaper,
  Cpu, Brain, Box, Code, Link as LinkIcon, Satellite, Bot,
} from "lucide-react";

const groups = [
  {
    label: "PILOTAGE",
    items: [
      { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard, badge: null },
    ],
  },
  {
    label: "CARTOGRAPHIE & SURVIE",
    items: [
      { label: "Carte GMV",             href: "/carte",        icon: Map,         badge: null },
      { label: "Communes",              href: "/communes",     icon: Building2,   badge: "131" },
      { label: "Taux de Survie IA",     href: "/survie",       icon: Activity,    badge: "NEW" },
      { label: "Drone Survey",          href: "/drones",       icon: Plane,       badge: null },
      { label: "Erosion Watch",         href: "/erosion",      icon: Globe,       badge: null },
      { label: "Aquifer Monitor",       href: "/aquiferes",    icon: Droplets,    badge: null },
    ],
  },
  {
    label: "PROJETS & TERRAIN",
    items: [
      { label: "Projets",              href: "/projets",      icon: FolderKanban, badge: null },
      { label: "Parcelles",            href: "/parcelles",    icon: Sprout,       badge: null },
      { label: "Saisies terrain",      href: "/saisies",      icon: Target,       badge: null },
      { label: "ForetPatrol",          href: "/foretpatrol",  icon: Shield,       badge: "P1"  },
      { label: "WaterPoint",           href: "/waterpoint",   icon: Droplets,     badge: null },
      { label: "Calendrier Agricole",  href: "/calendrier",   icon: Calendar,     badge: null },
      { label: "Feux de Brousse",      href: "/feux",         icon: Flame,        badge: null },
    ],
  },
  {
    label: "RESSOURCES NATURELLES",
    items: [
      { label: "Volontaires",     href: "/volontaires",  icon: Users,         badge: null },
      { label: "Pepinieres",      href: "/pepinieres",   icon: TreePine,      badge: null },
      { label: "Stocks",          href: "/stocks",       icon: FlaskConical,  badge: null },
      { label: "GrainBank",       href: "/grainbank",    icon: Package,       badge: null },
      { label: "Biodiversite",    href: "/biodiversite", icon: Leaf,          badge: null },
      { label: "Qualite des Sols",href: "/sols",         icon: Microscope,    badge: null },
      { label: "Meteo Locale",    href: "/meteo",        icon: Cloud,         badge: null },
    ],
  },
  {
    label: "CARBONE & FINANCE",
    items: [
      { label: "Registre Carbone",  href: "/carbone",       icon: BarChart3,   badge: "P1"  },
      { label: "Carbon Science Lab",href: "/carbone-lab",   icon: Zap,         badge: null },
      { label: "Budget Projets",    href: "/budget",        icon: Wallet,      badge: null },
      { label: "Crowdfunding",      href: "/crowdfunding",  icon: Gift,        badge: "P1"  },
      { label: "Marketplace",       href: "/marketplace",   icon: ShoppingBag, badge: null },
      { label: "Portail Dons",      href: "/dons",          icon: Heart,       badge: null },
      { label: "Compensation CO2",  href: "/compensation",  icon: Zap,         badge: null },
      { label: "Appels d'Offres",   href: "/appels-offres", icon: Gavel,       badge: null },
      { label: "Dashboard Bailleurs",href: "/bailleurs",    icon: TrendingUp,  badge: null },
    ],
  },
  {
    label: "COMMUNAUTE & SOCIAL",
    items: [
      { label: "Mon Arbre (Mobile)", href: "/mon-arbre",  icon: Sprout,          badge: "P1"  },
      { label: "ASERGMV Social",    href: "/social",      icon: MessageSquare,   badge: null },
      { label: "FemmeVerte",        href: "/femmes",      icon: Users,           badge: null },
      { label: "JeunesGMV",         href: "/jeunes",      icon: GraduationCap,   badge: null },
      { label: "Village Connect",   href: "/villages",    icon: Globe,           badge: null },
      { label: "Tostan Digital",    href: "/tostan",      icon: Radio,           badge: null },
    ],
  },
  {
    label: "ANALYSES & RAPPORTS",
    items: [
      { label: "Rapports KPI",      href: "/rapports",       icon: BarChart3,   badge: null },
      { label: "E-learning",        href: "/elearning",      icon: BookOpen,    badge: null },
      { label: "Documents",         href: "/documents",      icon: FileText,    badge: null },
      { label: "Impact Reports",    href: "/impact-report",  icon: TrendingUp,  badge: null },
    ],
  },
  {
    label: "MEDIAS & CULTURE",
    items: [
      { label: "EcoTour GMV",       href: "/ecotour",      icon: Map,       badge: null },
      { label: "Musee Virtuel",     href: "/musee",        icon: Eye,       badge: null },
      { label: "Bibliotheque Verte",href: "/bibliotheque", icon: BookOpen,  badge: null },
      { label: "ArbreStory",        href: "/arbre-story",  icon: Camera,    badge: null },
      { label: "Podcast ASERGMV",   href: "/podcast",      icon: Mic,       badge: null },
      { label: "Quiz National",     href: "/quiz",         icon: Trophy,    badge: null },
      { label: "Media Hub",         href: "/media",        icon: Megaphone, badge: null },
      { label: "Live Counter",      href: "/live-counter", icon: Timer,     badge: null },
      { label: "Press Kit",         href: "/presse",       icon: Newspaper, badge: null },
    ],
  },
  {
    label: "TECH & INNOVATION",
    items: [
      { label: "IA Identification", href: "/ia-especes",   icon: Cpu,        badge: null },
      { label: "Prediction Plants", href: "/prediction",   icon: Brain,      badge: null },
      { label: "Digital Twin GMV",  href: "/digital-twin", icon: Box,        badge: null },
      { label: "API Ouverte",       href: "/api-ouverte",  icon: Code,       badge: null },
      { label: "Blockchain",        href: "/blockchain",   icon: LinkIcon,   badge: null },
      { label: "Chatbot GMV",       href: "/chatbot",      icon: Bot,        badge: null },
    ],
  },
  {
    label: "ADMINISTRATION & RH",
    items: [
      { label: "RH & Personnel",    href: "/rh",           icon: UserCog,    badge: null },
      { label: "Mission Manager",   href: "/missions-rh",  icon: Navigation, badge: null },
      { label: "DocVault",          href: "/docvault",     icon: FolderLock, badge: null },
      { label: "Reunions Auto",     href: "/reunions",     icon: FileText,   badge: null },
      { label: "Procurement",       href: "/procurement",  icon: Package,    badge: null },
      { label: "Parametres",        href: "/parametres",   icon: Settings,   badge: null },
    ],
  },
];

const externals = [
  { label: "Portail Citoyen",  href: "/portail",  icon: Globe    },
  { label: "Feuille de route", href: "/roadmap",  icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const initials = session?.user?.name
    ? session.user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AS";

  const toggleGroup = (label: string) =>
    setCollapsed(s => ({ ...s, [label]: !s[label] }));

  return (
    <aside className="flex flex-col h-screen w-64 bg-[#0a0a0f] text-white fixed left-0 top-0 z-40 border-r border-white/5 shadow-2xl">

      {/* Logo */}
      <div className="h-[64px] flex items-center px-4 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shrink-0">
            <Leaf size={15} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-black text-[13px] tracking-tight leading-none text-white">ASERGMV</p>
            <p className="text-[10px] text-slate-500 leading-none mt-0.5">Grande Muraille Verte</p>
          </div>
        </div>
        <div className="px-1.5 py-0.5 bg-emerald-500/15 border border-emerald-500/25 rounded-md shrink-0">
          <p className="text-[9px] font-black text-emerald-400 tracking-widest">GMV</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-2
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-slate-700
        [&::-webkit-scrollbar-thumb]:rounded-full">
        {groups.map((group) => {
          const isCollapsed = collapsed[group.label];
          const hasActive = group.items.some(i => pathname === i.href || pathname.startsWith(i.href + "/"));
          return (
            <div key={group.label} className="mb-0.5">
              <button
                onClick={() => toggleGroup(group.label)}
                className={`w-full flex items-center gap-1.5 px-3 py-1.5 text-left hover:bg-white/3 rounded-lg transition-colors ${hasActive ? "text-emerald-400" : ""}`}
              >
                <p className={`text-[9.5px] font-black tracking-[0.12em] uppercase flex-1 ${hasActive ? "text-emerald-400" : "text-slate-600"}`}>
                  {group.label}
                </p>
                <ChevronDown size={11} className={`text-slate-700 transition-transform duration-200 ${isCollapsed ? "-rotate-90" : ""}`} />
              </button>

              {!isCollapsed && (
                <div className="space-y-px mb-1">
                  {group.items.map(({ label, href, icon: Icon, badge }) => {
                    const active = pathname === href || pathname.startsWith(href + "/");
                    return (
                      <Link key={href} href={href}
                        className={`relative flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[12.5px] font-medium transition-all duration-150 group ${
                          active
                            ? "bg-emerald-500/10 text-white"
                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                        }`}
                      >
                        {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-emerald-400 rounded-r-full" />}
                        <Icon size={13} className={active ? "text-emerald-400 shrink-0" : "text-slate-600 group-hover:text-slate-400 shrink-0 transition-colors"} />
                        <span className="flex-1 truncate">{label}</span>
                        {badge && (
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${
                            badge === "P1" ? "bg-red-500/20 text-red-400" :
                            badge === "NEW" ? "bg-emerald-500/20 text-emerald-400" :
                            "bg-white/10 text-slate-400"
                          }`}>{badge}</span>
                        )}
                        {active && <ChevronRight size={10} className="text-emerald-400 shrink-0" />}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* External */}
        <div className="pt-1 mt-1 border-t border-white/5">
          <p className="text-[9.5px] font-black text-slate-600 tracking-[0.12em] px-3 py-1.5 uppercase">Acces public</p>
          {externals.map(({ label, href, icon: Icon }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[12.5px] text-slate-500 hover:bg-white/5 hover:text-slate-200 transition-all group">
              <Icon size={13} className="text-slate-600 group-hover:text-slate-400 shrink-0" />
              <span className="flex-1">{label}</span>
              <span className="text-slate-700 text-[10px]">↗</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Status */}
      <div className="px-4 py-2 border-t border-white/5 bg-emerald-500/5 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <p className="text-[10px] text-emerald-400 font-semibold flex-1 truncate">Neon DB · Connectee · 57 apps</p>
          <Satellite size={10} className="text-emerald-600 shrink-0" />
        </div>
      </div>

      {/* User footer */}
      <div className="p-3 bg-[#0d0d14] shrink-0">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors mb-1">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-[10px] font-black text-white shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold text-white truncate leading-tight">{session?.user?.name ?? "Utilisateur"}</p>
            <p className="text-[9px] text-slate-500 truncate">{(session?.user as any)?.role?.replace(/_/g, " ") ?? "Agent GMV"}</p>
          </div>
          <div className="px-1.5 py-0.5 bg-white/5 rounded-md border border-white/10 shrink-0">
            <p className="text-[8px] font-black text-slate-400">PRO</p>
          </div>
        </div>
        <button onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all w-full">
          <LogOut size={12} /> Deconnexion
        </button>
        <p className="text-[9px] text-slate-700 text-center mt-1.5">v2026.1 · ASERGMV Platform · 57 apps</p>
      </div>
    </aside>
  );
}