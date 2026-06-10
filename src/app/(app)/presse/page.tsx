"use client";
import ComingSoon from "@/components/ComingSoon";
import { Newspaper } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="H5"
      nom="Press Kit Digital"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Newspaper}
      prio="P4"
      bloc="Bloc H — Communication et plaidoyer"
      color="slate"
      auths={["PUBLIC", "ADMIN"]}
    />
  );
}