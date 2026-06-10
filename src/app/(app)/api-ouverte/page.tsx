"use client";
import ComingSoon from "@/components/ComingSoon";
import { Code } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="I4"
      nom="API Ouverte ASERGMV"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Code}
      prio="P3"
      bloc="Bloc I — Innovation et technologie"
      color="slate"
      auths={["PUBLIC", "ADMIN"]}
    />
  );
}