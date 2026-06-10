"use client";
import ComingSoon from "@/components/ComingSoon";
import { Timer } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="H4"
      nom="Live Counter — Mur Vert en Temps Reel"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Timer}
      prio="P2"
      bloc="Bloc H — Communication et plaidoyer"
      color="blue"
      auths={["PUBLIC"]}
    />
  );
}