"use client";
import ComingSoon from "@/components/ComingSoon";
import { Eye } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="F2"
      nom="Musee Virtuel de la GMV"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Eye}
      prio="P3"
      bloc="Bloc F — Tourisme et education"
      color="violet"
      auths={["PUBLIC"]}
    />
  );
}