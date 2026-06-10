"use client";
import ComingSoon from "@/components/ComingSoon";
import { Globe } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="E5"
      nom="Village Connect"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Globe}
      prio="P2"
      bloc="Bloc E — Communautes et social"
      color="emerald"
      auths={["PUBLIC", "CITOYEN"]}
    />
  );
}