"use client";
import { useState } from "react";
import {
  Leaf, Map, BarChart3, Users, BookOpen, Smartphone,
  TreePine, Shield, Droplets, Eye, Wheat, Calendar,
  Flame, Plane, Microscope, FlaskConical, Cloud, Activity,
  Globe, ShoppingBag, Gavel, Gift, Wallet, Zap,
  MessageSquare, GraduationCap, Heart, Radio, HelpCircle,
  Camera, Mic, Trophy,
  UserCog, Navigation, FolderLock, FileText, Package,
  Megaphone, TrendingUp, Bot, Timer, Newspaper,
  Cpu, Brain, Box, Code, Link,
  ChevronDown, Lock, Unlock, LogIn,
} from "lucide-react";

const AUTH = {
  PUBLIC:       { label: "Public",        color: "bg-emerald-100 text-emerald-700", icon: Unlock },
  CITOYEN:      { label: "Citoyen",       color: "bg-blue-100 text-blue-700",       icon: LogIn  },
  AGENT:        { label: "Agent terrain", color: "bg-amber-100 text-amber-700",     icon: LogIn  },
  ADMIN:        { label: "Admin",         color: "bg-violet-100 text-violet-700",   icon: Lock   },
  BAILLEUR:     { label: "Bailleur",      color: "bg-teal-100 text-teal-700",       icon: LogIn  },
  SUPER_ADMIN:  { label: "Super Admin",   color: "bg-red-100 text-red-700",         icon: Lock   },
};

const PRIO = {
  P1: { label: "Priorité 1", dot: "bg-red-500",    badge: "bg-red-50 text-red-600 border border-red-200"    },
  P2: { label: "Priorité 2", dot: "bg-amber-500",  badge: "bg-amber-50 text-amber-600 border border-amber-200" },
  P3: { label: "Priorité 3", dot: "bg-emerald-500",badge: "bg-emerald-50 text-emerald-600 border border-emerald-200" },
  P4: { label: "Selon financement", dot: "bg-slate-400", badge: "bg-slate-50 text-slate-500 border border-slate-200" },
};

type AuthKey = keyof typeof AUTH;
type PrioKey = keyof typeof PRIO;

interface App {
  id: string; nom: string; description: string; domaine?: string;
  auth: AuthKey[]; prio: PrioKey; icon: any;
}
interface Bloc {
  id: string; titre: string; soustitre: string;
  color: string; headerBg: string; apps: App[];
}

const blocs: Bloc[] = [
  {
    id: "A", titre: "BLOC A", soustitre: "Déjà dans les CDC — 6 applications socles",
    color: "border-emerald-200", headerBg: "bg-emerald-700",
    apps: [
      { id:"A1", nom:"GéoForêt — Plateforme Cartographique",     description:"Monitoring territorial des zones reboisées, suivi parcelle par parcelle sur carte interactive.",                        domaine:"Monitoring territorial",    auth:["AGENT","ADMIN"],         prio:"P1", icon:Map         },
      { id:"A2", nom:"Registre Carbone & Portail RSE",           description:"Certification carbone, suivi des crédits, interface pour entreprises souhaitant compenser leur empreinte CO₂.",     domaine:"Finance verte",             auth:["ADMIN","BAILLEUR"],      prio:"P1", icon:BarChart3   },
      { id:"A3", nom:"Mon Arbre — App Mobile Citoyenne",         description:"Engagement communautaire : suivre son arbre parrainé, signaler, partager, gamification.",                            domaine:"Engagement communautaire",  auth:["PUBLIC","CITOYEN"],      prio:"P1", icon:Smartphone  },
      { id:"A4", nom:"Portail Volontaires & Ambassadeurs",       description:"Gestion RH bénévoles : inscription, affectation aux missions, suivi des heures, badges.",                            domaine:"RH bénévoles",              auth:["CITOYEN","ADMIN"],       prio:"P1", icon:Users       },
      { id:"A5", nom:"Dashboard Bailleurs Suivi-Évaluation",     description:"Reporting en temps réel pour bailleurs : KPIs, taux de décaissement, indicateurs contractuels.",                    domaine:"Reporting",                 auth:["BAILLEUR","SUPER_ADMIN"],prio:"P1", icon:BarChart3   },
      { id:"A6", nom:"E-learning Éco-Citoyenneté",              description:"Modules de formation en ligne pour agents terrain, volontaires et communautés.",                                      domaine:"Éducation",                 auth:["PUBLIC","AGENT"],        prio:"P1", icon:BookOpen    },
    ],
  },
  {
    id: "B", titre: "BLOC B", soustitre: "Opérations terrain & gestion forestière",
    color: "border-lime-200", headerBg: "bg-lime-700",
    apps: [
      { id:"B1", nom:"Pépinière Manager",                        description:"Gestion stocks plants : espèces, quantités, stades de croissance, commandes inter-sites, traçabilité semences → terrain.",  auth:["AGENT","ADMIN"],        prio:"P1", icon:TreePine    },
      { id:"B2", nom:"ForêtPatrol — Anti-Déforestation",         description:"Signalement géolocalisé d'abattages illicites, feux de brousse, pâturage excessif ; alerte push temps réel.",              auth:["PUBLIC","AGENT"],       prio:"P1", icon:Shield      },
      { id:"B3", nom:"WaterPoint Tracker",                       description:"Suivi des points d'eau, puits, retenues collinaires et systèmes d'irrigation liés aux FACI.",                               auth:["AGENT","ADMIN"],        prio:"P2", icon:Droplets    },
      { id:"B4", nom:"Taux de Survie Intelligent",               description:"Inventaire périodique : comptage assisté photo + IA, calcul automatique du taux de survie par parcelle et espèce.",         auth:["AGENT","ADMIN"],        prio:"P1", icon:Eye         },
      { id:"B5", nom:"GrainBank — Banque de Semences",           description:"Registre numérique semences locales collectées, stockées, distribuées ; traçabilité variétés endémiques menacées.",         auth:["AGENT","ADMIN"],        prio:"P4", icon:Wheat       },
      { id:"B6", nom:"Calendrier Agricole Intelligent",          description:"Recommandations de plantation par zone, espèce et prévisions météo ; alertes personnalisées SMS/push.",                     auth:["AGENT","PUBLIC"],       prio:"P2", icon:Calendar    },
      { id:"B7", nom:"Feu de Brousse — Alerte Précoce",          description:"Intégration NASA FIRMS (feux satellites), alertes géolocalisées, carte des risques incendie temps réel.",                  auth:["PUBLIC","AGENT"],       prio:"P2", icon:Flame       },
      { id:"B8", nom:"Drone Survey Manager",                     description:"Planification missions de survol drone, gestion photos, ortho-mosaïques, comparaison avant/après.",                         auth:["ADMIN","SUPER_ADMIN"],  prio:"P4", icon:Plane       },
    ],
  },
  {
    id: "C", titre: "BLOC C", soustitre: "Données, science & environnement",
    color: "border-teal-200", headerBg: "bg-teal-700",
    apps: [
      { id:"C1", nom:"BiodiversitéSN — Faune & Flore",           description:"Bio-monitoring : identification d'espèces par photo (API iNaturalist), inventaires participatifs, carte biodiversité GMV.",  auth:["PUBLIC","AGENT"],       prio:"P2", icon:Microscope  },
      { id:"C2", nom:"SolSain — Qualité des Sols",               description:"Analyses de sol par parcelle, suivi fertilité, recommandations compostage et fertilisation organique.",                       auth:["AGENT","ADMIN"],        prio:"P3", icon:FlaskConical},
      { id:"C3", nom:"ClimLocal — Station Météo Communautaire",  description:"Réseau de mini-stations météo connectées, dashboard temps réel (T°, pluie, humidité, vent), données open.",                  auth:["PUBLIC","ADMIN"],       prio:"P2", icon:Cloud       },
      { id:"C4", nom:"Carbon Science Lab",                       description:"Modélisation avancée séquestration carbone, scénarios GIEC, publication données pour UCAD/ISRA.",                            auth:["ADMIN","SUPER_ADMIN"],  prio:"P3", icon:Activity    },
      { id:"C5", nom:"Érosion Watch",                            description:"Suivi érosion par comparaison images satellite Sentinel-2, indicateurs dégradation terres, alertes.",                        auth:["ADMIN"],                prio:"P4", icon:Globe       },
      { id:"C6", nom:"Aquifer Monitor",                          description:"Suivi recharge nappes phréatiques dans les zones reboisées — argument scientifique pour l'impact hydrique GMV.",               auth:["ADMIN","SUPER_ADMIN"],  prio:"P4", icon:Droplets    },
    ],
  },
  {
    id: "D", titre: "BLOC D", soustitre: "Finance, revenus & partenariats",
    color: "border-amber-200", headerBg: "bg-amber-600",
    apps: [
      { id:"D1", nom:"ASERGMV Crowdfunding",                     description:"Financement participatif : parrainage d'arbres, pépinières, projets communautaires ; paiement Wave/OM/carte.",                auth:["PUBLIC","CITOYEN"],    prio:"P1", icon:Gift        },
      { id:"D2", nom:"MarketPlace Produits Forestiers",          description:"Marketplace B2B/B2C FACI : vente miel, gomme arabique, moringa, karité, néré produits sur sites ASERGMV.",                   auth:["PUBLIC","CITOYEN"],    prio:"P2", icon:ShoppingBag },
      { id:"D3", nom:"GreenTender — Appels d'Offres Verts",      description:"Mise en relation fournisseurs locaux × projets ASERGMV : semences, équipements, transport.",                                  auth:["ADMIN","SUPER_ADMIN"], prio:"P4", icon:Gavel       },
      { id:"D4", nom:"Portail Dons & Mécénat",                   description:"Interface simplifiée dons individuels/entreprises avec reçus fiscaux automatiques et suivi de l'impact.",                     auth:["PUBLIC"],              prio:"P4", icon:Heart       },
      { id:"D5", nom:"Budget Tracker Projets",                   description:"Suivi budgétaire interne multi-projets : engagement/décaissement/solde par ligne, alertes de dépassement.",                   auth:["ADMIN","SUPER_ADMIN"], prio:"P2", icon:Wallet      },
      { id:"D6", nom:"Compensation Carbone Événementielle",      description:"Outil marque blanche : calcul empreinte carbone d'un événement + compensation via ASERGMV (FESMAN, SIAM, CAN...).",          auth:["PUBLIC","ADMIN"],      prio:"P3", icon:Zap         },
    ],
  },
  {
    id: "E", titre: "BLOC E", soustitre: "Communautés & social",
    color: "border-pink-200", headerBg: "bg-pink-700",
    apps: [
      { id:"E1", nom:"ASERGMV Social — Réseau des Défenseurs",   description:"Réseau social dédié : fil d'actualités, groupes par région/projet, photos terrain, messagerie, événements.",                 auth:["CITOYEN","AGENT"],     prio:"P2", icon:MessageSquare},
      { id:"E2", nom:"FemmeVerte — Autonomisation",              description:"Espace femmes FACI/PAREC-CC : formations, accès microfinance, réseau d'entraide, suivi indicateurs genre.",                  auth:["CITOYEN","ADMIN"],     prio:"P2", icon:Heart       },
      { id:"E3", nom:"JeunesGMV — Engagement Scolaire",          description:"App lycées : jardins scolaires numériques, défis entre établissements, concours photo, club environnement.",                  auth:["PUBLIC","CITOYEN"],    prio:"P4", icon:GraduationCap},
      { id:"E4", nom:"Tostan Digital",                           description:"Modules sensibilisation communautaire en langues nationales : droits environnementaux, foncier, gouvernance.",                 auth:["PUBLIC"],              prio:"P4", icon:Radio       },
      { id:"E5", nom:"Village Connect",                          description:"Communication hyper-locale : annonces par commune, alertes terrain, calendriers, offline-capable par SMS fallback.",           auth:["PUBLIC","CITOYEN"],    prio:"P2", icon:Globe       },
    ],
  },
  {
    id: "F", titre: "BLOC F", soustitre: "Tourisme, éducation & sensibilisation",
    color: "border-cyan-200", headerBg: "bg-cyan-700",
    apps: [
      { id:"F1", nom:"EcoTour GMV",                              description:"Réservation éco-tours GMV : disponibilités, guides locaux, paiement, avis, impact CO₂ compensé automatiquement.",            auth:["PUBLIC","CITOYEN"],    prio:"P2", icon:Globe       },
      { id:"F2", nom:"Musée Virtuel de la GMV",                  description:"Expérience immersive (web/VR) : histoire désertification, témoignages communautaires, galerie chronologique.",               auth:["PUBLIC"],              prio:"P3", icon:Eye         },
      { id:"F3", nom:"Bibliothèque Verte Sénégal",               description:"Bibliothèque numérique open-access : rapports, études d'impact, publications ASERGMV, thèses sur la GMV.",                  auth:["PUBLIC"],              prio:"P4", icon:BookOpen    },
      { id:"F4", nom:"ArbreStory — Storytelling Terrain",        description:"Micro-récits terrain : photos + voix + géo → articles auto-générés pour site web et réseaux sociaux.",                      auth:["AGENT","ADMIN"],       prio:"P3", icon:Camera      },
      { id:"F5", nom:"ASERGMV Podcast Platform",                 description:"Podcasts en langues nationales : interviews communautés, experts, bailleurs ; téléchargeable hors-ligne.",                   auth:["PUBLIC"],              prio:"P4", icon:Mic         },
      { id:"F6", nom:"Quiz Environnemental National",            description:"Quiz annuel lycéens du Sénégal, compétition nationale primée — notoriété + ancrage Éducation Nationale.",                   auth:["PUBLIC","CITOYEN"],    prio:"P4", icon:Trophy      },
    ],
  },
  {
    id: "G", titre: "BLOC G", soustitre: "Administration & ressources humaines",
    color: "border-slate-200", headerBg: "bg-slate-700",
    apps: [
      { id:"G1", nom:"ASERGMV HR — Gestion du Personnel",        description:"Agents : fiches, contrats, congés, affectations terrain, paie, évaluations — intégré avec les projets.",                   auth:["SUPER_ADMIN","ADMIN"],  prio:"P2", icon:UserCog     },
      { id:"G2", nom:"Mission Manager",                          description:"Planification et suivi missions terrain : ordres de mission, indemnités, rapports, kilométrage, reçus photos.",              auth:["AGENT","ADMIN"],       prio:"P2", icon:Navigation  },
      { id:"G3", nom:"DocVault ASERGMV",                         description:"GED sécurisée : contrats, conventions, rapports archivés, versionnés, searchables, droits d'accès granulaires.",            auth:["ADMIN","SUPER_ADMIN"], prio:"P4", icon:FolderLock  },
      { id:"G4", nom:"MeetingMinutes Auto",                      description:"Enregistrement et transcription réunions français/wolof → procès-verbal structuré généré par IA.",                          auth:["ADMIN","SUPER_ADMIN"], prio:"P4", icon:FileText    },
      { id:"G5", nom:"Procurement & Stocks",                     description:"Achats et stocks matériels : plants, équipements, véhicules, consommables ; alertes rupture, historique fournisseurs.",     auth:["ADMIN","SUPER_ADMIN"], prio:"P4", icon:Package     },
    ],
  },
  {
    id: "H", titre: "BLOC H", soustitre: "Communication & plaidoyer",
    color: "border-rose-200", headerBg: "bg-rose-700",
    apps: [
      { id:"H1", nom:"ASERGMV Media Hub",                        description:"CMS centralisé : photos, vidéos, infographies terrain → publication multi-canaux (site, Facebook, Instagram, WhatsApp).",    auth:["ADMIN","SUPER_ADMIN"], prio:"P2", icon:Megaphone   },
      { id:"H2", nom:"Impact Report Generator",                  description:"Génération automatique de rapports d'impact annuels illustrés (PDF/Web) pour communication publique.",                      auth:["ADMIN","SUPER_ADMIN"], prio:"P4", icon:TrendingUp  },
      { id:"H3", nom:"Chatbot GMV",                              description:"Assistant conversationnel (site + WhatsApp) en français et wolof : FAQ, orientation services, collecte contacts.",            auth:["PUBLIC"],              prio:"P3", icon:Bot         },
      { id:"H4", nom:"Live Counter — Mur Vert en Temps Réel",    description:"Widget public embarquable : compteur animé arbres, communes, CO₂, mis à jour en temps réel — viral et engageant.",         auth:["PUBLIC"],              prio:"P2", icon:Timer       },
      { id:"H5", nom:"Press Kit Digital",                        description:"Espace presse : dossiers, photos HD, biographies dirigeants, chiffres clés, accréditation journalistes.",                   auth:["PUBLIC","ADMIN"],      prio:"P4", icon:Newspaper   },
    ],
  },
  {
    id: "I", titre: "BLOC I", soustitre: "Innovation & technologie avancée",
    color: "border-violet-200", headerBg: "bg-violet-700",
    apps: [
      { id:"I1", nom:"IA Identification d'Espèces",              description:"Photo → identification automatique de l'espèce (modèle entraîné sur la flore sahélienne sénégalaise).",                     auth:["AGENT","PUBLIC"],      prio:"P3", icon:Cpu         },
      { id:"I2", nom:"Prédiction de Mortalité des Plants",       description:"Modèle ML : espèce + sol + météo + historique → prédit risque mortalité et recommande actions préventives.",                auth:["AGENT","ADMIN"],       prio:"P3", icon:Brain       },
      { id:"I3", nom:"Digital Twin de la GMV",                   description:"Jumeau numérique GMV : simulation évolution 10/20/50 ans selon scénarios climatiques GIEC.",                               auth:["SUPER_ADMIN","ADMIN"], prio:"P3", icon:Box         },
      { id:"I4", nom:"API Ouverte ASERGMV",                      description:"API publique documentée : données reboisement anonymisées pour chercheurs, journalistes, startups tierces.",                auth:["PUBLIC","ADMIN"],      prio:"P3", icon:Code        },
      { id:"I5", nom:"Blockchain Traçabilité Semences",          description:"Traçabilité bout-en-bout : graine → pépinière → plant → parcelle → survie 5 ans, immuable et vérifiable.",                auth:["SUPER_ADMIN"],         prio:"P4", icon:Link        },
    ],
  },
];

const prioSummary = [
  { key:"P1", emoji:"🔴", label:"Priorité 1 — Impact immédiat & finançable maintenant", ids:"A1 · A2 · A3 · A4 · A5 · A6 · B1 · B4 · B2 · D1" },
  { key:"P2", emoji:"🟡", label:"Priorité 2 — Croissance & structuration (12–24 mois)", ids:"B3 · B6 · B7 · C1 · D2 · D5 · E1 · E2 · F1 · G1 · G2 · H1 · H4" },
  { key:"P3", emoji:"🟢", label:"Priorité 3 — Innovation & différenciation (24–36 mois)", ids:"C2 · C3 · C4 · I1 · I2 · I3 · I4 · F2 · F4 · H3 · D6" },
  { key:"P4", emoji:"⚪", label:"Valeur ajoutée — Selon opportunités de financement", ids:"B5 · B8 · C5 · C6 · D3 · D4 · E3 · E4 · F3 · F5 · F6 · G3 · G4 · G5 · H2 · H5 · I5" },
];

export default function RoadmapPage() {
  const [open, setOpen] = useState<Record<string, boolean>>(
    Object.fromEntries(blocs.map(b => [b.id, true]))
  );
  const [filterPrio, setFilterPrio] = useState<PrioKey | "ALL">("ALL");

  const toggle = (id: string) => setOpen(s => ({ ...s, [id]: !s[id] }));
  const totalApps = blocs.reduce((s, b) => s + b.apps.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── PAGE DE GARDE ─────────────────────────────────── */}
      <div className="bg-black text-white min-h-screen flex flex-col">
        {/* Nav */}
        <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Leaf size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm">ASERGMV</p>
              <p className="text-[10px] text-slate-400">Plateforme Digitale</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <a href="/portail" className="text-slate-400 hover:text-white transition-colors">Portail Citoyen</a>
            <a href="/login" className="px-4 py-1.5 border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:border-slate-500 transition-colors">Connexion</a>
          </div>
        </nav>

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-24 text-center">
          <span className="inline-block px-4 py-1.5 bg-emerald-900 text-emerald-300 text-xs font-semibold rounded-full tracking-widest uppercase mb-8">
            Document stratégique · Confidentiel
          </span>

          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6">
            ASERGMV<br />
            <span className="text-emerald-400">Digital</span> Platform
          </h1>

          <p className="text-slate-400 text-xl max-w-2xl leading-relaxed mb-4">
            Feuille de route complète des applications numériques de l'Agence Sénégalaise pour la Grande Muraille Verte
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 mb-12">
            <span><span className="text-white font-bold">{totalApps}</span> applications planifiées</span>
            <span>·</span>
            <span><span className="text-white font-bold">9</span> blocs thématiques</span>
            <span>·</span>
            <span><span className="text-white font-bold">4</span> niveaux de priorité</span>
            <span>·</span>
            <span><span className="text-white font-bold">850 km</span> de muraille verte</span>
          </div>

          {/* Priority pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {prioSummary.map(p => (
              <div key={p.key} className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-xs">
                <span>{p.emoji}</span>
                <span className="text-slate-300">{p.label.split("—")[0].trim()}</span>
              </div>
            ))}
          </div>

          <a href="#blocs" className="flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors animate-bounce">
            <span className="text-xs tracking-widest uppercase">Voir les blocs</span>
            <ChevronDown size={20} />
          </a>
        </div>

        {/* Stats bar */}
        <div className="border-t border-slate-800 grid grid-cols-3 md:grid-cols-9 divide-x divide-slate-800 text-center py-0">
          {blocs.map(b => (
            <a key={b.id} href={`#bloc-${b.id}`} className="py-4 hover:bg-slate-900 transition-colors group">
              <p className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{b.apps.length}</p>
              <p className="text-[10px] text-slate-500 font-semibold">Bloc {b.id}</p>
            </a>
          ))}
        </div>
      </div>

      {/* ── BLOCS ─────────────────────────────────────────── */}
      <div id="blocs" className="max-w-7xl mx-auto px-6 py-12 space-y-8">

        {/* Filtre priorité */}
        <div className="flex flex-wrap items-center gap-3 pb-4">
          <span className="text-sm font-semibold text-gray-600">Filtrer par priorité :</span>
          {[
            { key: "ALL" as const, label: "Toutes", badge: "bg-gray-900 text-white" },
            { key: "P1"  as const, label: "🔴 Priorité 1", badge: "bg-red-600 text-white" },
            { key: "P2"  as const, label: "🟡 Priorité 2", badge: "bg-amber-500 text-white" },
            { key: "P3"  as const, label: "🟢 Priorité 3", badge: "bg-emerald-600 text-white" },
            { key: "P4"  as const, label: "⚪ Selon financement", badge: "bg-slate-400 text-white" },
          ].map(({ key, label, badge }) => (
            <button key={key} onClick={() => setFilterPrio(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filterPrio === key ? badge : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Blocs */}
        {blocs.map(bloc => {
          const visibleApps = filterPrio === "ALL" ? bloc.apps : bloc.apps.filter(a => a.prio === filterPrio);
          if (visibleApps.length === 0) return null;

          return (
            <div key={bloc.id} id={`bloc-${bloc.id}`} className={`bg-white rounded-2xl border-2 ${bloc.color} shadow-sm overflow-hidden`}>
              {/* Header */}
              <button onClick={() => toggle(bloc.id)}
                className={`w-full flex items-center justify-between px-6 py-5 ${bloc.headerBg} text-white text-left`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center text-xl font-black">
                    {bloc.id}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white/60 uppercase tracking-widest">{bloc.titre}</p>
                    <p className="text-lg font-bold leading-tight">{bloc.soustitre}</p>
                  </div>
                  <span className="ml-4 px-3 py-1 bg-white/15 rounded-full text-xs font-semibold">
                    {visibleApps.length} app{visibleApps.length > 1 ? "s" : ""}
                  </span>
                </div>
                <ChevronDown size={20} className={`transition-transform duration-200 ${open[bloc.id] ? "rotate-180" : ""}`} />
              </button>

              {/* Apps grid */}
              {open[bloc.id] && (
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {visibleApps.map(app => {
                    const p = PRIO[app.prio];
                    const Icon = app.icon;
                    return (
                      <div key={app.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow bg-white group">
                        {/* Card header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center shrink-0 group-hover:border-gray-200 transition-colors">
                              <Icon size={17} className="text-gray-500" />
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-gray-400">{app.id}</span>
                              <p className="text-sm font-semibold text-gray-900 leading-snug">{app.nom}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <div className={`w-2 h-2 rounded-full ${p.dot}`} />
                          </div>
                        </div>

                        {/* Domaine */}
                        {app.domaine && (
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">{app.domaine}</p>
                        )}

                        {/* Description */}
                        <p className="text-xs text-gray-500 leading-relaxed mb-3">{app.description}</p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                          {/* Auth badges */}
                          <div className="flex flex-wrap gap-1">
                            {app.auth.map(a => {
                              const auth = AUTH[a];
                              const AuthIcon = auth.icon;
                              return (
                                <span key={a} className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${auth.color}`}>
                                  <AuthIcon size={9} />
                                  {auth.label}
                                </span>
                              );
                            })}
                          </div>
                          {/* Priority */}
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.badge}`}>
                            {p.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Récapitulatif priorités */}
        <div className="bg-black rounded-2xl p-8 text-white">
          <h2 className="text-xl font-bold mb-6 text-center">Récapitulatif par priorité</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prioSummary.map(p => (
              <div key={p.key} className="bg-slate-900 rounded-xl p-5 border border-slate-800">
                <p className="text-sm font-bold mb-2">{p.emoji} {p.label}</p>
                <p className="text-xs text-slate-400 font-mono leading-loose">{p.ids}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-xs mt-8">
            © 2026 ASERGMV · Document stratégique · {totalApps} applications · 9 blocs
          </p>
        </div>
      </div>
    </div>
  );
}
