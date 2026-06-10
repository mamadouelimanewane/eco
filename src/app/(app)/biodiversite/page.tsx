"use client";
import ComingSoon from "@/components/ComingSoon";
import { Leaf } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="C1"
      nom="BiodiversiteSN — Faune et Flore"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Leaf}
      prio="P2"
      bloc="Bloc C — Donnees et environnement"
      color="lime"
      auths={["PUBLIC", "AGENT"]}
    />
  );
}