"use client";
import ComingSoon from "@/components/ComingSoon";
import { Map } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="F1"
      nom="EcoTour GMV"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Map}
      prio="P2"
      bloc="Bloc F — Tourisme et education"
      color="cyan"
      auths={["PUBLIC", "CITOYEN"]}
    />
  );
}