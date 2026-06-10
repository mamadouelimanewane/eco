"use client";
import ComingSoon from "@/components/ComingSoon";
import { Camera } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="F4"
      nom="ArbreStory — Storytelling Terrain"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={Camera}
      prio="P3"
      bloc="Bloc F — Tourisme et education"
      color="amber"
      auths={["AGENT", "ADMIN"]}
    />
  );
}