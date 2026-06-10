import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { nom, email, telephone, zone, competences, motivation } = await req.json();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "Email déjà utilisé" }, { status: 400 });

    const password = await bcrypt.hash("volontaire2026", 10);
    const user = await prisma.user.create({
      data: {
        name: nom,
        email,
        password,
        role: "VOLONTAIRE",
        volontaire: {
          create: {
            competences: competences ?? [],
            zone: zone ?? null,
            disponible: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, userId: user.id });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
