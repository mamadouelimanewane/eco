"use client";
import ComingSoon from "@/components/ComingSoon";
import { Flame } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="B7"
      nom="Feu de Brousse — Alerte Precoce"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Flame}
      prio="P2"
      bloc="Bloc B — Operations terrain"
      color="rose"
      auths={["PUBLIC", "AGENT"]}
    />
  );
}