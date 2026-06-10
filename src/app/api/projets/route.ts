import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projets = await prisma.projet.findMany({
      include: {
        _count: { select: { parcelles: true, saisies: true } },
        kpis: { orderBy: { createdAt: "desc" }, take: 3 },
      },
      orderBy: { dateDebut: "desc" },
    });
    return NextResponse.json(projets);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
