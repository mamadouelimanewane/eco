"use client";
import ComingSoon from "@/components/ComingSoon";
import { Wallet } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="D5"
      nom="Budget Tracker Projets"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Wallet}
      prio="P2"
      bloc="Bloc D — Finance et revenus"
      color="violet"
      auths={["ADMIN", "SUPER_ADMIN"]}
    />
  );
}