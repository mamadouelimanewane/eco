"use client";
import ComingSoon from "@/components/ComingSoon";
import { Droplets } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="C6"
      nom="Aquifer Monitor"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Droplets}
      prio="P4"
      bloc="Bloc C — Donnees et environnement"
      color="indigo"
      auths={["ADMIN", "SUPER_ADMIN"]}
    />
  );
}