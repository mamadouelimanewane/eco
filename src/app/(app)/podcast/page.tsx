"use client";
import ComingSoon from "@/components/ComingSoon";
import { Mic } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="F5"
      nom="ASERGMV Podcast Platform"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Mic}
      prio="P4"
      bloc="Bloc F — Tourisme et education"
      color="rose"
      auths={["PUBLIC"]}
    />
  );
}