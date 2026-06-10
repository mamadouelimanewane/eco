"use client";
import ComingSoon from "@/components/ComingSoon";
import { MessageSquare } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="E1"
      nom="ASERGMV Social — Reseau des Defenseurs"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={MessageSquare}
      prio="P2"
      bloc="Bloc E — Communautes et social"
      color="blue"
      auths={["CITOYEN", "AGENT"]}
    />
  );
}