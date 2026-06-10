"use client";
import ComingSoon from "@/components/ComingSoon";
import { Shield } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="B2"
      nom="ForetPatrol — Anti-Deforestation"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Shield}
      prio="P1"
      bloc="Bloc B — Operations terrain"
      color="rose"
      auths={["PUBLIC", "AGENT"]}
    />
  );
}