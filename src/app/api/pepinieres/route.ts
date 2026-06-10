import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pepinieres = await prisma.pepiniere.findMany({
      include: {
        stocks: true,
        _count: { select: { stocks: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(pepinieres);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
