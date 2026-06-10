"use client";
import ComingSoon from "@/components/ComingSoon";
import { Navigation } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="G2"
      nom="Mission Manager"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Navigation}
      prio="P2"
      bloc="Bloc G — Administration et RH"
      color="blue"
      auths={["AGENT", "ADMIN"]}
    />
  );
}