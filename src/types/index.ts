export type Role =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "AGENT_TERRAIN"
  | "BAILLEUR"
  | "VOLONTAIRE"
  | "COMMUNITY";

export type StatutZone = "PLANIFIE" | "EN_COURS" | "TERMINE" | "ABANDONNE";
export type StatutProjet = "PLANIFIE" | "EN_COURS" | "SUSPENDU" | "TERMINE";

export interface CommuneGeo {
  id: string;
  nom: string;
  code: string;
  latitude: number;
  longitude: number;
  statut: StatutZone;
  region: { nom: string };
  _count: { parcelles: number; saisies: number };
}

export interface ProjetCard {
  id: string;
  code: string;
  nom: string;
  bailleur: string;
  budget: number;
  devise: string;
  statut: StatutProjet;
  dateDebut: string;
  dateFin: string;
  _count: { parcelles: number; saisies: number };
}

export interface StatsDashboard {
  totalArbres: number;
  totalCommunes: number;
  totalHectares: number;
  tauxSurvieGlobal: number;
  totalProjets: number;
  co2Sequestre: number;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  roles?: Role[];
}
