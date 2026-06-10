"use client";
import ComingSoon from "@/components/ComingSoon";
import { Brain } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="I2"
      nom="Prediction de Mortalite des Plants"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Brain}
      prio="P3"
      bloc="Bloc I — Innovation et technologie"
      color="indigo"
      auths={["AGENT", "ADMIN"]}
    />
  );
}