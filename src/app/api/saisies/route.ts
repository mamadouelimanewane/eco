import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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
      take: 50,
    });
    return NextResponse.json(saisies);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
