"use client";
import ComingSoon from "@/components/ComingSoon";
import { Link } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="I5"
      nom="Blockchain Tracabilite Semences"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Link}
      prio="P4"
      bloc="Bloc I — Innovation et technologie"
      color="violet"
      auths={["SUPER_ADMIN"]}
    />
  );
}