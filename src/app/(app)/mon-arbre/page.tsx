"use client";
import ComingSoon from "@/components/ComingSoon";
import { Sprout } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="A3"
      nom="Mon Arbre — App Mobile Citoyenne"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Sprout}
      prio="P1"
      bloc="Bloc A — Applications socles"
      color="lime"
      auths={["PUBLIC", "CITOYEN"]}
    />
  );
}