import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const saisies = await prisma.saisie.findMany({
      include: {
        user:    { select: { name: true } },
        commune: { select: { nom: true } },
        projet:  { select: { nom: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json(saisies);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

    const body = await req.json();
    const { type, communeId, projetId, parcelleId, nombrePlants, tauxSurvie, notes, latitude, longitude } = body;

    const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
    if (!user) return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });

    const saisie = await prisma.saisie.create({
      data: {
        type,
        userId: user.id,
        communeId: communeId || null,
        projetId: projetId || null,
        parcelleId: parcelleId || null,
        nombrePlants: nombrePlants ? parseInt(nombrePlants) : null,
        tauxSurvie: tauxSurvie ? parseFloat(tauxSurvie) / 100 : null,
        notes: notes || null,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
      },
    });

    return NextResponse.json(saisie);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
