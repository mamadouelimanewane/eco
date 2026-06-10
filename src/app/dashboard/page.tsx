import { Trees, MapPin, Sprout, Droplets, FolderKanban, Wind } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import { prisma } from "@/lib/prisma";

async function getStats() {
  try {
    const [parcelles, communes, projets] = await Promise.all([
      prisma.parcelle.aggregate({
        _sum: { nombrePlants: true, superficie: true },
        _avg: { tauxSurvie: true },
      }),
      prisma.commune.count(),
      prisma.projet.count({ where: { statut: "EN_COURS" } }),
    ]);
    const totalArbres = parcelles._sum.nombrePlants ?? 0;
    return {
      totalArbres,
      totalCommunes: communes,
      totalHectares: Math.round((parcelles._sum.superficie ?? 0) * 10) / 10,
      tauxSurvie: Math.round((parcelles._avg.tauxSurvie ?? 0) * 1000) / 10,
      totalProjets: projets,
      co2: Math.round(totalArbres * 22) / 1000,
    };
  } catch {
    return { totalArbres: 0, totalCommunes: 0, totalHectares: 0, tauxSurvie: 0, totalProjets: 0, co2: 0 };
  }
}

async function getRecentProjets() {
  try {
    return await prisma.projet.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { parcelles: true } } },
    });
  } catch {
    return [];
  }
}

export default async function DashboardPage() {
  const [stats, projets] = await Promise.all([getStats(), getRecentProjets()]);

  const statutColor: Record<string, string> = {
    EN_COURS: "bg-green-100 text-green-700",
    PLANIFIE: "bg-blue-100 text-blue-700",
    SUSPENDU: "bg-orange-100 text-orange-700",
    TERMINE: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord</h1>
        <p className="text-gray-500 mt-1">
          Vue consolidée — Grande Muraille Verte, Sénégal
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard label="Arbres Plantés" value={stats.totalArbres} icon={Trees} color="#2E8B57" trend="↑ Mise à jour en temps réel" />
        <StatCard label="Communes" value={stats.totalCommunes} unit="/ 131" icon={MapPin} color="#1A6B3A" />
        <StatCard label="Superficie Reboisée" value={stats.totalHectares} unit="ha" icon={Sprout} color="#4CAF50" />
        <StatCard label="Taux de Survie" value={stats.tauxSurvie} unit="%" icon={Droplets} color="#2196F3" />
        <StatCard label="Projets Actifs" value={stats.totalProjets} icon={FolderKanban} color="#9C27B0" />
        <StatCard label="CO₂ Séquestré" value={stats.co2} unit="t/an" icon={Wind} color="#FF9800" />
      </div>

      {/* Projets récents */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Projets en cours</h2>
          <a href="/projets" className="text-sm text-[#2E8B57] hover:underline font-medium">
            Voir tous →
          </a>
        </div>

        {projets.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-400">
            <FolderKanban size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">Aucun projet enregistré</p>
            <p className="text-sm mt-1">Les projets apparaîtront ici après initialisation de la base de données.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {projets.map((p) => (
              <div key={p.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{p.nom}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{p.bailleur} — {p._count.parcelles} parcelle(s)</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statutColor[p.statut] ?? "bg-gray-100"}`}>
                  {p.statut.replace("_", " ")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
