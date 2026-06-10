"use client";
import ComingSoon from "@/components/ComingSoon";
import { Package } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="G5"
      nom="Procurement et Stocks"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Package}
      prio="P4"
      bloc="Bloc G — Administration et RH"
      color="amber"
      auths={["ADMIN", "SUPER_ADMIN"]}
    />
  );
}