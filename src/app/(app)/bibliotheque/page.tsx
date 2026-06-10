"use client";
import ComingSoon from "@/components/ComingSoon";
import { BookOpen } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="F3"
      nom="Bibliotheque Verte Senegal"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={BookOpen}
      prio="P4"
      bloc="Bloc F — Tourisme et education"
      color="teal"
      auths={["PUBLIC"]}
    />
  );
}