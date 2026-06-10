import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding ASERGMV database...");

  // ─── RÉGIONS ───
  const regions = await Promise.all([
    prisma.region.upsert({ where: { code: "LG" }, update: {}, create: { nom: "Louga", code: "LG" } }),
    prisma.region.upsert({ where: { code: "MT" }, update: {}, create: { nom: "Matam", code: "MT" } }),
    prisma.region.upsert({ where: { code: "SL" }, update: {}, create: { nom: "Saint-Louis", code: "SL" } }),
    prisma.region.upsert({ where: { code: "KF" }, update: {}, create: { nom: "Kaffrine", code: "KF" } }),
    prisma.region.upsert({ where: { code: "KD" }, update: {}, create: { nom: "Kédougou", code: "KD" } }),
  ]);

  // ─── COMMUNES (échantillon GMV) ───
  const communesData = [
    { nom: "Linguère", code: "LG-LIN", lat: 15.3923, lng: -15.1178, regionIdx: 0, statut: "EN_COURS" as const },
    { nom: "Dahra", code: "LG-DAH", lat: 15.3477, lng: -15.4820, regionIdx: 0, statut: "EN_COURS" as const },
    { nom: "Kébémer", code: "LG-KEB", lat: 15.3714, lng: -16.4487, regionIdx: 0, statut: "PLANIFIE" as const },
    { nom: "Matam", code: "MT-MAT", lat: 15.6558, lng: -13.2554, regionIdx: 1, statut: "EN_COURS" as const },
    { nom: "Kanel", code: "MT-KAN", lat: 15.4929, lng: -13.1761, regionIdx: 1, statut: "EN_COURS" as const },
    { nom: "Ranérou", code: "MT-RAN", lat: 15.2997, lng: -13.9568, regionIdx: 1, statut: "PLANIFIE" as const },
    { nom: "Podor", code: "SL-POD", lat: 16.6518, lng: -14.9611, regionIdx: 2, statut: "EN_COURS" as const },
    { nom: "Dagana", code: "SL-DAG", lat: 16.5167, lng: -15.5000, regionIdx: 2, statut: "TERMINE" as const },
    { nom: "Kaffrine", code: "KF-KAF", lat: 14.1054, lng: -15.5511, regionIdx: 3, statut: "EN_COURS" as const },
    { nom: "Birkelane", code: "KF-BIR", lat: 14.0903, lng: -15.8561, regionIdx: 3, statut: "PLANIFIE" as const },
    { nom: "Kédougou", code: "KD-KED", lat: 12.5565, lng: -12.1747, regionIdx: 4, statut: "EN_COURS" as const },
    { nom: "Saraya", code: "KD-SAR", lat: 12.8372, lng: -11.7483, regionIdx: 4, statut: "PLANIFIE" as const },
  ];

  const communes = await Promise.all(
    communesData.map((c) =>
      prisma.commune.upsert({
        where: { code: c.code },
        update: {},
        create: {
          nom: c.nom, code: c.code,
          latitude: c.lat, longitude: c.lng,
          statut: c.statut,
          regionId: regions[c.regionIdx].id,
        },
      })
    )
  );

  // ─── PROJETS ASERGMV ───
  const projetsData = [
    {
      code: "RIPOSTES", nom: "RIPOSTES — Restauration des Paysages et Renforcement de la Résilience",
      bailleur: "Union Européenne / FAO / FEM", budget: 6000000, devise: "EUR",
      dateDebut: new Date("2022-01-01"), dateFin: new Date("2027-12-31"), statut: "EN_COURS" as const,
    },
    {
      code: "ABE-PNUD", nom: "AbE — Adaptation basée sur les Écosystèmes",
      bailleur: "PNUD / UICN", budget: 8900000, devise: "USD",
      dateDebut: new Date("2021-06-01"), dateFin: new Date("2026-05-31"), statut: "EN_COURS" as const,
    },
    {
      code: "PAREC-CC", nom: "PAREC-CC — Programme d'Appui à la Résilience Communautaire",
      bailleur: "Coopération Canadienne", budget: 25000000, devise: "CAD",
      dateDebut: new Date("2023-03-01"), dateFin: new Date("2028-02-28"), statut: "EN_COURS" as const,
    },
    {
      code: "PIGMV", nom: "PIGMV — Programme d'Investissement pour la GMV",
      bailleur: "Banque Mondiale", budget: 15000000, devise: "USD",
      dateDebut: new Date("2020-01-01"), dateFin: new Date("2025-12-31"), statut: "EN_COURS" as const,
    },
    {
      code: "JARDINS-SCO", nom: "Jardins Scolaires GMV",
      bailleur: "Ambassade d'Israël", budget: 500000, devise: "USD",
      dateDebut: new Date("2022-09-01"), dateFin: new Date("2026-08-31"), statut: "EN_COURS" as const,
    },
    {
      code: "OCP-GMV", nom: "Partenariat OCP Grande Muraille Verte",
      bailleur: "Fondation OCP / UM6P", budget: 2000000, devise: "EUR",
      dateDebut: new Date("2023-01-01"), dateFin: new Date("2026-12-31"), statut: "EN_COURS" as const,
    },
    {
      code: "FACI", nom: "FACI — Fermes Agricoles Communautaires Intégrées",
      bailleur: "Agence Brésilienne de Coopération", budget: 3500000, devise: "USD",
      dateDebut: new Date("2021-01-01"), dateFin: new Date("2025-12-31"), statut: "EN_COURS" as const,
    },
    {
      code: "TOLOU-KEUR", nom: "Tolou-Keur — Forêts Villageoises",
      bailleur: "ASERGMV / Budget National", budget: 1200000, devise: "EUR",
      dateDebut: new Date("2020-06-01"), dateFin: new Date("2026-05-31"), statut: "EN_COURS" as const,
    },
  ];

  const projets = await Promise.all(
    projetsData.map((p) =>
      prisma.projet.upsert({ where: { code: p.code }, update: {}, create: p })
    )
  );

  // ─── KPIs ───
  await Promise.all([
    prisma.kPI.create({ data: { projetId: projets[0].id, nom: "Hectares restaurés", valeur: 12400, cible: 50000, unite: "ha", periode: "2025" } }),
    prisma.kPI.create({ data: { projetId: projets[0].id, nom: "Taux de survie plants", valeur: 73.5, cible: 80, unite: "%", periode: "2025" } }),
    prisma.kPI.create({ data: { projetId: projets[0].id, nom: "Emplois verts créés", valeur: 2340, cible: 5000, unite: "emplois", periode: "2025" } }),
    prisma.kPI.create({ data: { projetId: projets[1].id, nom: "Ménages bénéficiaires", valeur: 8750, cible: 15000, unite: "ménages", periode: "2025" } }),
    prisma.kPI.create({ data: { projetId: projets[2].id, nom: "Femmes autonomisées", valeur: 3200, cible: 10000, unite: "femmes", periode: "2025" } }),
    prisma.kPI.create({ data: { projetId: projets[4].id, nom: "Écoles actives", valeur: 12, cible: 20, unite: "écoles", periode: "2025" } }),
  ]);

  // ─── PARCELLES ───
  const parcellesData = [
    { code: "P-LIN-001", lat: 15.3950, lng: -15.1200, sup: 45.5, espece: "Acacia senegal", plants: 18200, survie: 0.78, projetIdx: 0, communeIdx: 0 },
    { code: "P-LIN-002", lat: 15.3880, lng: -15.1320, sup: 32.0, espece: "Balanites aegyptiaca", plants: 12800, survie: 0.82, projetIdx: 0, communeIdx: 0 },
    { code: "P-MAT-001", lat: 15.6600, lng: -13.2600, sup: 67.3, espece: "Faidherbia albida", plants: 26900, survie: 0.71, projetIdx: 1, communeIdx: 3 },
    { code: "P-POD-001", lat: 16.6550, lng: -14.9650, sup: 28.8, espece: "Acacia tortilis", plants: 11520, survie: 0.85, projetIdx: 2, communeIdx: 6 },
    { code: "P-KAF-001", lat: 14.1090, lng: -15.5560, sup: 51.2, espece: "Prosopis africana", plants: 20480, survie: 0.69, projetIdx: 3, communeIdx: 8 },
    { code: "P-KED-001", lat: 12.5600, lng: -12.1800, sup: 38.4, espece: "Parkia biglobosa", plants: 15360, survie: 0.88, projetIdx: 6, communeIdx: 10 },
  ];

  await Promise.all(
    parcellesData.map((p) =>
      prisma.parcelle.upsert({
        where: { code: p.code },
        update: {},
        create: {
          code: p.code, latitude: p.lat, longitude: p.lng,
          superficie: p.sup, espece: p.espece,
          nombrePlants: p.plants, tauxSurvie: p.survie,
          datePlantation: new Date("2023-07-15"),
          statut: "EN_COURS",
          communeId: communes[p.communeIdx].id,
          projetId: projets[p.projetIdx].id,
        },
      })
    )
  );

  // ─── UTILISATEURS ───
  const hash = await bcrypt.hash("asergmv2026", 12);
  await prisma.user.upsert({
    where: { email: "admin@asergmv.sn" },
    update: {},
    create: { name: "Administrateur ASERGMV", email: "admin@asergmv.sn", password: hash, role: "SUPER_ADMIN" },
  });
  await prisma.user.upsert({
    where: { email: "agent@asergmv.sn" },
    update: {},
    create: { name: "Agent Terrain", email: "agent@asergmv.sn", password: hash, role: "AGENT_TERRAIN" },
  });
  await prisma.user.upsert({
    where: { email: "bailleur@ue.eu" },
    update: {},
    create: { name: "Représentant UE", email: "bailleur@ue.eu", password: hash, role: "BAILLEUR" },
  });

  console.log("Seed terminé avec succès.");
  console.log("Comptes créés :");
  console.log("  admin@asergmv.sn / asergmv2026 (SUPER_ADMIN)");
  console.log("  agent@asergmv.sn / asergmv2026 (AGENT_TERRAIN)");
  console.log("  bailleur@ue.eu   / asergmv2026 (BAILLEUR)");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
