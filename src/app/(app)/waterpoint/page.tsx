"use client";
import ComingSoon from "@/components/ComingSoon";
import { Droplets } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="B3"
      nom="WaterPoint Tracker"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Droplets}
      prio="P2"
      bloc="Bloc B — Operations terrain"
      color="cyan"
      auths={["AGENT", "ADMIN"]}
    />
  );
}