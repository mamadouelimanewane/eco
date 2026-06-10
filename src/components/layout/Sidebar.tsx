"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Map, FolderKanban, Users,
  Sprout, BarChart3, BookOpen, LogOut, Leaf,
} from "lucide-react";
import { signOut } from "next-auth/react";

const nav = [
  { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { label: "Carte GMV", href: "/carte", icon: Map },
  { label: "Projets", href: "/projets", icon: FolderKanban },
  { label: "Parcelles", href: "/parcelles", icon: Sprout },
  { label: "Volontaires", href: "/volontaires", icon: Users },
  { label: "Rapports", href: "/rapports", icon: BarChart3 },
  { label: "E-learning", href: "/elearning", icon: BookOpen },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex flex-col h-screen w-64 bg-[#1A3A2A] text-white fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="w-9 h-9 bg-[#2E8B57] rounded-lg flex items-center justify-center">
          <Leaf size={20} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-sm leading-tight">ASERGMV</p>
          <p className="text-xs text-white/50 leading-tight">Plateforme Digitale</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                active
                  ? "bg-[#2E8B57] text-white font-medium"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:bg-white/10 hover:text-white transition-all w-full"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
