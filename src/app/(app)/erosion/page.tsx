"use client";
import ComingSoon from "@/components/ComingSoon";
import { Globe } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="C5"
      nom="Erosion Watch"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Globe}
      prio="P4"
      bloc="Bloc C — Donnees et environnement"
      color="slate"
      auths={["ADMIN"]}
    />
  );
}