"use client";
import ComingSoon from "@/components/ComingSoon";
import { Gift } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="D1"
      nom="ASERGMV Crowdfunding"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Gift}
      prio="P1"
      bloc="Bloc D — Finance et revenus"
      color="emerald"
      auths={["PUBLIC", "CITOYEN"]}
    />
  );
}