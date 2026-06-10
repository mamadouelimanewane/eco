"use client";
import ComingSoon from "@/components/ComingSoon";
import { TrendingUp } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="H2"
      nom="Impact Report Generator"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={TrendingUp}
      prio="P4"
      bloc="Bloc H — Communication et plaidoyer"
      color="emerald"
      auths={["ADMIN", "SUPER_ADMIN"]}
    />
  );
}