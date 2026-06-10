"use client";
import ComingSoon from "@/components/ComingSoon";
import { Radio } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="E4"
      nom="Tostan Digital"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Radio}
      prio="P4"
      bloc="Bloc E — Communautes et social"
      color="amber"
      auths={["PUBLIC"]}
    />
  );
}