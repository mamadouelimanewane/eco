"use client";
import ComingSoon from "@/components/ComingSoon";
import { GraduationCap } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="E3"
      nom="JeunesGMV — Engagement Scolaire"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={GraduationCap}
      prio="P4"
      bloc="Bloc E — Communautes et social"
      color="violet"
      auths={["PUBLIC", "CITOYEN"]}
    />
  );
}