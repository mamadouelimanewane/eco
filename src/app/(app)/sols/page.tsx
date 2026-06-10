"use client";
import ComingSoon from "@/components/ComingSoon";
import { FlaskConical } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="C2"
      nom="SolSain — Qualite des Sols"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={FlaskConical}
      prio="P3"
      bloc="Bloc C — Donnees et environnement"
      color="amber"
      auths={["AGENT", "ADMIN"]}
    />
  );
}