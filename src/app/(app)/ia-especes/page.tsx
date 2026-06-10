"use client";
import ComingSoon from "@/components/ComingSoon";
import { Cpu } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="I1"
      nom="IA Identification d'Especes"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Cpu}
      prio="P3"
      bloc="Bloc I — Innovation et technologie"
      color="violet"
      auths={["AGENT", "PUBLIC"]}
    />
  );
}