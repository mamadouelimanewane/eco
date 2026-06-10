"use client";
import ComingSoon from "@/components/ComingSoon";
import { FileText } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="G4"
      nom="MeetingMinutes Auto"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={FileText}
      prio="P4"
      bloc="Bloc G — Administration et RH"
      color="violet"
      auths={["ADMIN", "SUPER_ADMIN"]}
    />
  );
}