import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function GET() {
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
    const totalHectares = parcelles._sum.superficie ?? 0;
    const tauxSurvie = parcelles._avg.tauxSurvie ?? 0;
    // Estimation carbone : 1 arbre adulte séquestre ~22 kg CO2/an
    const co2Sequestre = Math.round(totalArbres * 22) / 1000; // en tonnes

    return NextResponse.json({
      totalArbres,
      totalCommunes: communes,
      totalHectares: Math.round(totalHectares * 10) / 10,
      tauxSurvieGlobal: Math.round(tauxSurvie * 1000) / 10,
      totalProjets: projets,
      co2Sequestre: Math.round(co2Sequestre * 10) / 10,
    });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
