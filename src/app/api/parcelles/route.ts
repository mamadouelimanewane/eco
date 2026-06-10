import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const parcelles = await prisma.parcelle.findMany({
      include: {
        commune: { select: { nom: true } },
        projet:  { select: { nom: true, bailleur: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(parcelles);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
