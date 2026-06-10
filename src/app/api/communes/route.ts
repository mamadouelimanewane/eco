import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const communes = await prisma.commune.findMany({
      include: {
        region: true,
        _count: { select: { parcelles: true, saisies: true } },
      },
      orderBy: { nom: "asc" },
    });
    return NextResponse.json(communes);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
