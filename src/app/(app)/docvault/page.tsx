"use client";
import ComingSoon from "@/components/ComingSoon";
import { FolderLock } from "lucide-react";

export default function Page() {
  return (
    <ComingSoon
      id="G3"
      nom="DocVault ASERGMV"
      description="Fonctionnalite en cours de developpement dans le cadre de la feuille de route numerique ASERGMV."
      icon={FolderLock}
      prio="P4"
      bloc="Bloc G — Administration et RH"
      color="slate"
      auths={["ADMIN", "SUPER_ADMIN"]}
    />
  );
}