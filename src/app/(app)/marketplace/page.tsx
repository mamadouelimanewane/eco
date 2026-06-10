"use client";
import ComingSoon from "@/components/ComingSoon";
import { ShoppingBag } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="D2"
      nom="MarketPlace Produits Forestiers"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={ShoppingBag}
      prio="P2"
      bloc="Bloc D — Finance et revenus"
      color="amber"
      auths={["PUBLIC", "CITOYEN"]}
    />
  );
}