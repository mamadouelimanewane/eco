"use client";
import ComingSoon from "@/components/ComingSoon";
import { Activity } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="B4"
      nom="Taux de Survie Intelligent"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Activity}
      prio="P1"
      bloc="Bloc B — Operations terrain"
      color="teal"
      auths={["AGENT", "ADMIN"]}
    />
  );
}