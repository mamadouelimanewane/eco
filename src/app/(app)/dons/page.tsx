"use client";
import ComingSoon from "@/components/ComingSoon";
import { Heart } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="D4"
      nom="Portail Dons et Mecenat"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Heart}
      prio="P4"
      bloc="Bloc D — Finance et revenus"
      color="rose"
      auths={["PUBLIC"]}
    />
  );
}