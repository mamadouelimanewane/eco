"use client";
import ComingSoon from "@/components/ComingSoon";
import { Megaphone } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="H1"
      nom="ASERGMV Media Hub"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Megaphone}
      prio="P2"
      bloc="Bloc H — Communication et plaidoyer"
      color="rose"
      auths={["ADMIN", "SUPER_ADMIN"]}
    />
  );
}