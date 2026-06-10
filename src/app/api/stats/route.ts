import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [agg, communesCount, projetsActifs, projets] = await Promise.all([
      prisma.parcelle.aggregate({
        _sum: { nombrePlants: true, superficie: true },
        _avg: { tauxSurvie: true },
      }),
      prisma.commune.count(),
      prisma.projet.count({ where: { statut: "EN_COURS" } }),
      prisma.projet.findMany({
        where: { statut: "EN_COURS" },
        include: { _count: { select: { parcelles: true } } },
        orderBy: { dateDebut: "desc" },
        take: 6,
      }),
    ]);

    const arbresPlantes = agg._sum.nombrePlants ?? 0;
    const superficieHa  = Math.round((agg._sum.superficie ?? 0) * 10) / 10;
    const tauxSurvie    = Math.round((agg._avg.tauxSurvie ?? 0) * 1000) / 10;
    const co2Tonnes     = Math.round(arbresPlantes * 22) / 1000;

    return NextResponse.json({
      arbresPlantes,
      communesActives: communesCount,
      superficieHa,
      tauxSurvie,
      projetsActifs,
      co2Tonnes,
      projets: projets.map((p) => ({
        id: p.id,
        nom: p.nom,
        bailleur: p.bailleur,
        statut: p.statut,
        _count: p._count,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
