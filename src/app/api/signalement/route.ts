import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, commune, description, latitude, longitude } = body;

    const systemUser = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
    if (!systemUser) return NextResponse.json({ error: "Erreur configuration" }, { status: 500 });

    const communeRecord = commune
      ? await prisma.commune.findFirst({ where: { nom: { contains: commune, mode: "insensitive" } } })
      : null;

    await prisma.saisie.create({
      data: {
        type: "SIGNALEMENT",
        notes: `[PORTAIL CITOYEN] ${type} — ${description}`,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
        userId: systemUser.id,
        communeId: communeRecord?.id ?? null,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
