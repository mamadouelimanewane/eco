"use client";
import ComingSoon from "@/components/ComingSoon";
import { Box } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="I3"
      nom="Digital Twin de la GMV"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Box}
      prio="P3"
      bloc="Bloc I — Innovation et technologie"
      color="cyan"
      auths={["SUPER_ADMIN", "ADMIN"]}
    />
  );
}