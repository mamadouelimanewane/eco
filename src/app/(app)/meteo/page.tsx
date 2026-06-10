"use client";
import ComingSoon from "@/components/ComingSoon";
import { Cloud } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="C3"
      nom="ClimLocal — Station Meteo Communautaire"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Cloud}
      prio="P2"
      bloc="Bloc C — Donnees et environnement"
      color="blue"
      auths={["PUBLIC", "ADMIN"]}
    />
  );
}