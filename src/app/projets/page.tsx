import { prisma } from "@/lib/prisma";
import { FolderKanban, Calendar, DollarSign, Sprout } from "lucide-react";

const statutStyle: Record<string, { bg: string; text: string; label: string }> = {
  EN_COURS:  { bg: "bg-green-100",  text: "text-green-700",  label: "En cours" },
  PLANIFIE:  { bg: "bg-blue-100",   text: "text-blue-700",   label: "Planifié" },
  SUSPENDU:  { bg: "bg-orange-100", text: "text-orange-700", label: "Suspendu" },
  TERMINE:   { bg: "bg-gray-100",   text: "text-gray-600",   label: "Terminé" },
};

async function getProjets() {
  try {
    return await prisma.projet.findMany({
      include: {
        _count: { select: { parcelles: true, saisies: true } },
        kpis: { take: 3, orderBy: { createdAt: "desc" } },
      },
      orderBy: { dateDebut: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function ProjetsPage() {
  const projets = await getProjets();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projets</h1>
          <p className="text-gray-500 mt-1">{projets.length} projet(s) enregistré(s)</p>
        </div>
      </div>

      {projets.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
          <FolderKanban size={48} className="mx-auto mb-4 text-gray-200" />
          <p className="font-semibold text-gray-600">Aucun projet enregistré</p>
          <p className="text-sm text-gray-400 mt-2">
            Exécutez le seed pour initialiser les 8 projets ASERGMV.
          </p>
          <code className="block mt-4 text-xs bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-600 inline-block">
            npx prisma db seed
          </code>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projets.map((projet) => {
            const s = statutStyle[projet.statut] ?? statutStyle.PLANIFIE;
            const budget = projet.budget.toLocaleString("fr-FR");
            return (
              <div key={projet.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-[#2E8B57] bg-[#2E8B57]/10 px-2 py-0.5 rounded">
                      {projet.code}
                    </span>
                    <h3 className="font-bold text-gray-900 mt-2 text-base leading-snug">{projet.nom}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{projet.bailleur}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ml-3 flex-shrink-0 ${s.bg} ${s.text}`}>
                    {s.label}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2.5 bg-gray-50 rounded-lg">
                    <Sprout size={16} className="mx-auto text-[#2E8B57] mb-1" />
                    <p className="text-lg font-bold text-gray-900">{projet._count.parcelles}</p>
                    <p className="text-xs text-gray-500">Parcelles</p>
                  </div>
                  <div className="text-center p-2.5 bg-gray-50 rounded-lg">
                    <Calendar size={16} className="mx-auto text-blue-500 mb-1" />
                    <p className="text-lg font-bold text-gray-900">
                      {new Date(projet.dateDebut).getFullYear()}
                    </p>
                    <p className="text-xs text-gray-500">Début</p>
                  </div>
                  <div className="text-center p-2.5 bg-gray-50 rounded-lg">
                    <DollarSign size={16} className="mx-auto text-orange-500 mb-1" />
                    <p className="text-base font-bold text-gray-900">{budget}</p>
                    <p className="text-xs text-gray-500">{projet.devise}</p>
                  </div>
                </div>

                {projet.kpis.length > 0 && (
                  <div className="border-t border-gray-100 pt-3 space-y-1.5">
                    {projet.kpis.map((k) => (
                      <div key={k.id} className="flex justify-between text-xs">
                        <span className="text-gray-500">{k.nom}</span>
                        <span className="font-semibold text-gray-800">
                          {k.valeur.toLocaleString("fr-FR")} {k.unite}
                          {k.cible && (
                            <span className="text-gray-400 font-normal"> / {k.cible.toLocaleString("fr-FR")}</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
