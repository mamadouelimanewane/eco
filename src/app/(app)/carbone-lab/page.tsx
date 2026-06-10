"use client";
import ComingSoon from "@/components/ComingSoon";
import { Microscope } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="C4"
      nom="Carbon Science Lab"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Microscope}
      prio="P3"
      bloc="Bloc C — Donnees et environnement"
      color="teal"
      auths={["ADMIN", "SUPER_ADMIN"]}
    />
  );
}