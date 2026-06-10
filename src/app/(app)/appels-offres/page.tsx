"use client";
import ComingSoon from "@/components/ComingSoon";
import { Gavel } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="D3"
      nom="GreenTender — Appels d'Offres Verts"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Gavel}
      prio="P4"
      bloc="Bloc D — Finance et revenus"
      color="slate"
      auths={["ADMIN", "SUPER_ADMIN"]}
    />
  );
}