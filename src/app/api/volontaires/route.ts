import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const volontaires = await prisma.volontaire.findMany({
      include: {
        user:     { select: { name: true, email: true } },
        missions: { select: { id: true, titre: true, statut: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(volontaires);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
