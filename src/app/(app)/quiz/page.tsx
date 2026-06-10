"use client";
import ComingSoon from "@/components/ComingSoon";
import { Trophy } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="F6"
      nom="Quiz Environnemental National"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Trophy}
      prio="P4"
      bloc="Bloc F — Tourisme et education"
      color="amber"
      auths={["PUBLIC", "CITOYEN"]}
    />
  );
}