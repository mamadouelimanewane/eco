"use client";
import ComingSoon from "@/components/ComingSoon";
import { Users } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="E2"
      nom="FemmeVerte — Autonomisation"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Users}
      prio="P2"
      bloc="Bloc E — Communautes et social"
      color="pink"
      auths={["CITOYEN", "ADMIN"]}
    />
  );
}