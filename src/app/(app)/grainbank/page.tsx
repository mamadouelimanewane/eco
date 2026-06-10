"use client";
import ComingSoon from "@/components/ComingSoon";
import { Package } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="B5"
      nom="GrainBank — Banque de Semences"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Package}
      prio="P4"
      bloc="Bloc B — Operations terrain"
      color="amber"
      auths={["AGENT", "ADMIN"]}
    />
  );
}