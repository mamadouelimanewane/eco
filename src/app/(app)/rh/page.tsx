"use client";
import ComingSoon from "@/components/ComingSoon";
import { UserCog } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="G1"
      nom="ASERGMV HR — Gestion du Personnel"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={UserCog}
      prio="P2"
      bloc="Bloc G — Administration et RH"
      color="slate"
      auths={["SUPER_ADMIN", "ADMIN"]}
    />
  );
}