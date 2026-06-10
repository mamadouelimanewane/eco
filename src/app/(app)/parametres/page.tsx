"use client";
import { useSession } from "next-auth/react";
import { User, Globe, Bell, Shield, Database } from "lucide-react";

export default function ParametresPage() {
  const { data: session } = useSession() ?? {};

  const sections = [
    {
      icon: User, titre: "Profil utilisateur",
      items: [
        { label: "Nom complet", value: session?.user?.name ?? "—" },
        { label: "Email", value: session?.user?.email ?? "—" },
        { label: "Rôle", value: (session?.user as any)?.role?.replace(/_/g, " ") ?? "—" },
        { label: "Langue", value: "Français" },
      ],
    },
    {
      icon: Globe, titre: "Plateforme GMV",
      items: [
        { label: "Nom plateforme", value: "ASERGMV Digital" },
        { label: "Version", value: "v2026.1" },
        { label: "Zone couverte", value: "Sénégal · 850 km" },
        { label: "Communes cibles", value: "131 communes" },
      ],
    },
    {
      icon: Database, titre: "Base de données",
      items: [
        { label: "Fournisseur", value: "Neon PostgreSQL" },
        { label: "Environnement", value: "Production" },
        { label: "Région", value: "us-east-1 (AWS)" },
        { label: "Statut", value: "Connecté ✓" },
      ],
    },
    {
      icon: Bell, titre: "Notifications",
      items: [
        { label: "Email", value: "Activé" },
        { label: "Alertes terrain", value: "Activé" },
        { label: "Rapports hebdo", value: "Désactivé" },
        { label: "Alertes stock bas", value: "Activé" },
      ],
    },
  ];

  return (
    <div className="space-y-5 max-w-3xl">
      {sections.map(({ icon: Icon, titre, items }) => (
        <div key={titre} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
              <Icon size={16} className="text-slate-600" />
            </div>
            <h2 className="text-sm font-semibold text-gray-800">{titre}</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {items.map(({ label, value }) => (
              <div key={label} className="px-5 py-3.5 flex items-center justify-between">
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-sm font-medium text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-red-50 flex items-center gap-3">
          <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
            <Shield size={16} className="text-red-500" />
          </div>
          <h2 className="text-sm font-semibold text-gray-800">Zone dangereuse</h2>
        </div>
        <div className="px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">Réinitialiser les données de session</p>
            <p className="text-xs text-gray-400 mt-0.5">Supprime votre session locale sans affecter la base de données</p>
          </div>
          <button className="px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors">
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}
