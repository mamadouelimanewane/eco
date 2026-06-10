"use client";
import ComingSoon from "@/components/ComingSoon";
import { BarChart3 } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="A2"
      nom="Registre Carbone & Portail RSE"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={BarChart3}
      prio="P1"
      bloc="Bloc A — Applications socles"
      color="emerald"
      auths={["ADMIN", "BAILLEUR"]}
    />
  );
}