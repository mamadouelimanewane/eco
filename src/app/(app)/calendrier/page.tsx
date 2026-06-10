"use client";
import ComingSoon from "@/components/ComingSoon";
import { Calendar } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="B6"
      nom="Calendrier Agricole Intelligent"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Calendar}
      prio="P2"
      bloc="Bloc B — Operations terrain"
      color="emerald"
      auths={["AGENT", "PUBLIC"]}
    />
  );
}