"use client";
import ComingSoon from "@/components/ComingSoon";
import { Bot } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="H3"
      nom="Chatbot GMV"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Bot}
      prio="P3"
      bloc="Bloc H — Communication et plaidoyer"
      color="teal"
      auths={["PUBLIC"]}
    />
  );
}