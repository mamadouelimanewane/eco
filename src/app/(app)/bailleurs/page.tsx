"use client";
import ComingSoon from "@/components/ComingSoon";
import { TrendingUp } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="A5"
      nom="Dashboard Bailleurs Suivi-Evaluation"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={TrendingUp}
      prio="P1"
      bloc="Bloc A — Applications socles"
      color="blue"
      auths={["BAILLEUR", "SUPER_ADMIN"]}
    />
  );
}