"use client";
import ComingSoon from "@/components/ComingSoon";
import { Plane } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="B8"
      nom="Drone Survey Manager"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Plane}
      prio="P4"
      bloc="Bloc B — Operations terrain"
      color="slate"
      auths={["ADMIN", "SUPER_ADMIN"]}
    />
  );
}