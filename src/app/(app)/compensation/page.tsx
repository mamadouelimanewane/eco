"use client";
import ComingSoon from "@/components/ComingSoon";
import { Zap } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="D6"
      nom="Compensation Carbone Evenementielle"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Zap}
      prio="P3"
      bloc="Bloc D — Finance et revenus"
      color="teal"
      auths={["PUBLIC", "ADMIN"]}
    />
  );
}