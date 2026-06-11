"use client";
import { useState } from "react";
import { Globe, Users, BookOpen, Handshake, ExternalLink, MapPin, TrendingUp } from "lucide-react";

const partenaires = [
  {
    pays: "Chine", drapeau: "🇨🇳", programme: "Trois-Nord (三北防护林)",
    superficie: "405 Mha", debut: 1978, fin: 2050, arbres: "66 milliards",
    co2: "3,2 Gt CO₂", budget: "100 Mrd USD", statut: "Actif",
    contact: "State Forestry and Grassland Administration (SFGA)",
    collaboration: ["Échange de semences adaptées zones arides", "Formation aux techniques de fixation dunaire", "Partage modèles ML survie végétaux", "Visite d'étude Désert de Gobi — délégation ASERGMV"],
    couleur: "bg-red-100 text-red-700", dot: "bg-red-500",
  },
  {
    pays: "Maroc", drapeau: "🇲🇦", programme: "Initiative Nationale pour le Développement Humain — Forêts",
    superficie: "1,3 Mha", debut: 2011, fin: 2030, arbres: "50 millions",
    co2: "120 Mt CO₂", budget: "8,5 Mrd MAD", statut: "Actif",
    contact: "Haut Commissariat aux Eaux et Forêts (HCEF)",
    collaboration: ["Accords de transfert de technologie pépinières", "Programme d'échange d'agents terrain", "Financement OCP Maroc (partenaire existant)", "Coopération Sud-Sud UICN Méditerranée"],
    couleur: "bg-green-100 text-green-700", dot: "bg-green-500",
  },
  {
    pays: "Niger", drapeau: "🇳🇪", programme: "Régénération Naturelle Assistée (FMNR)",
    superficie: "5 Mha", debut: 1980, fin: "continu", arbres: "200 millions",
    co2: "80 Mt CO₂", budget: "Coût minimal", statut: "Référence mondiale",
    contact: "Ministère de l'Environnement du Niger",
    collaboration: ["FMNR — méthode à intégrer aux pratiques GMV Sénégal", "Formation paysans à la régénération naturelle", "Partage base de données espèces sahéliennes", "Projet pilote Ranérou — méthodes combinées"],
    couleur: "bg-amber-100 text-amber-700", dot: "bg-amber-500",
  },
  {
    pays: "Éthiopie", drapeau: "🇪🇹", programme: "Green Legacy Initiative",
    superficie: "4 Mha", debut: 2019, fin: 2030, arbres: "20 milliards",
    co2: "500 Mt CO₂", budget: "1,2 Mrd USD", statut: "Actif",
    contact: "Ministry of Environment, Forest and Climate Change",
    collaboration: ["Record mondial plantation (350M arbres en 12h)", "Mobilisation citoyenne — modèle pour le Sénégal", "Application mobile terrain — partage code source", "Accord bilatéral UA — reforestation Afrique de l'Est-Ouest"],
    couleur: "bg-violet-100 text-violet-700", dot: "bg-violet-500",
  },
  {
    pays: "Inde", drapeau: "🇮🇳", programme: "Green India Mission (GIM)",
    superficie: "10 Mha", debut: 2014, fin: 2030, arbres: "2 milliards",
    co2: "50 Mt CO₂/an", budget: "14 Mrd USD", statut: "Actif",
    contact: "Ministry of Environment, Forest and Climate Change (MoEFCC)",
    collaboration: ["SIG forestier — technologie cartographie partagée", "Système certification carbone forestier", "Télédétection NDVI — modèles adaptés zones tropicales sèches", "Université agricole ICAR — semences améliorées Sahel"],
    couleur: "bg-orange-100 text-orange-700", dot: "bg-orange-500",
  },
  {
    pays: "Australie", drapeau: "🇦🇺", programme: "Australia's 1 Billion Trees",
    superficie: "2 Mha", debut: 2019, fin: 2030, arbres: "1 milliard",
    co2: "200 Mt CO₂", budget: "3 Mrd AUD", statut: "Actif",
    contact: "Department of Climate Change, Energy, Environment & Water",
    collaboration: ["Lidar aérien biomasse — expertise technologique", "Marchés carbone volontaires — accès ACCUs", "Monitoring satellite — partage protocoles CSIRO", "Modèles ML prédiction survie zones arides"],
    couleur: "bg-sky-100 text-sky-700", dot: "bg-sky-500",
  },
  {
    pays: "Brésil", drapeau: "🇧🇷", programme: "Pacto pela Restauração (PACTO)",
    superficie: "12 Mha", debut: 2009, fin: 2030, arbres: "3 milliards",
    co2: "1,4 Gt CO₂", budget: "25 Mrd BRL", statut: "Actif",
    contact: "Serviço Florestal Brasileiro (SFB)",
    collaboration: ["REDD+ crédits carbone — accès marchés VCS", "Banque de semences tropicales — espèces adaptables Sahel", "Plateforme MapBiomas — détection changements terrestres", "Accord BNDES — financement restauration Afrique"],
    couleur: "bg-lime-100 text-lime-700", dot: "bg-lime-600",
  },
  {
    pays: "Pan-Africain", drapeau: "🌍", programme: "GMV — 11 pays (UA / UNCCD)",
    superficie: "100 Mha", debut: 2007, fin: 2030, arbres: "Objectif UA",
    co2: "250 Mt CO₂", budget: "14,7 Mrd USD (G7)", statut: "En retard — 4% seulement",
    contact: "Union Africaine — Agence Pan-Africaine GMV (APGMV)",
    collaboration: ["Sénégal — leader continental (meilleur taux d'avancement)", "Base de données commune 11 pays", "Système d'alerte précoce feux partagé", "Financement conjoint G7 — Sénégal éligible en priorité"],
    couleur: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500",
  },
];

const accords = [
  { titre: "MOU SFGA Chine — ASERGMV", date: "À négocier", type: "Accord bilatéral", statut: "À initier" },
  { titre: "Convention HCEF Maroc — OCP déjà actif", date: "2024", type: "Partenariat technique", statut: "Actif" },
  { titre: "Accord APGMV — plateforme data mutualisée", date: "À négocier", type: "Multilatéral UA", statut: "À initier" },
  { titre: "Protocole CSIRO Australie — satellite", date: "À négocier", type: "Recherche appliquée", statut: "À initier" },
  { titre: "Partenariat FAO SEPAL — télédétection", date: "2025", type: "Accord technique", statut: "Actif" },
  { titre: "Convention UNCCD — rapport état GMV", date: "Annuel", type: "Rapport obligatoire", statut: "Actif" },
];

export default function PartenariatsIntlPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [onglet, setOnglet] = useState<"carte" | "accords">("carte");

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Globe size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">DIPLOMATIE VERTE · ASERGMV</p>
              <h1 className="text-2xl font-black text-white">Partenariats Internationaux GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Projets similaires · Accords bilatéraux · Coopération Sud-Sud · Transfert de technologie</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Programmes similaires", value: "8 pays", color: "text-blue-400" },
              { label: "Superficies restaurées (total)", value: ">540 Mha", color: "text-emerald-400" },
              { label: "Financement G7 GMV Afrique", value: "14,7 Mrd USD", color: "text-amber-400" },
              { label: "Sénégal — avancement GMV", value: "#1 Afrique", color: "text-violet-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex gap-2">
        {(["carte", "accords"] as const).map(id => (
          <button key={id} onClick={() => setOnglet(id)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${onglet === id ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>
            {id === "carte" ? "Programmes par pays" : "Accords & Conventions"}
          </button>
        ))}
      </div>

      {onglet === "carte" && (
        <div className="grid md:grid-cols-2 gap-4">
          {partenaires.map((p, idx) => (
            <div key={p.pays} className={`bg-white rounded-2xl border shadow-sm overflow-hidden cursor-pointer transition-all ${selected === idx ? "border-blue-300 shadow-blue-100" : "border-slate-100 hover:border-slate-200"}`} onClick={() => setSelected(selected === idx ? null : idx)}>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{p.drapeau}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-slate-900">{p.pays}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.couleur}`}>{p.statut}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{p.programme}</p>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-slate-300 mt-1 shrink-0" />
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: "Superficie", val: p.superficie },
                    { label: "CO₂ séquestré", val: p.co2 },
                    { label: "Arbres", val: p.arbres },
                  ].map(s => (
                    <div key={s.label} className="bg-slate-50 rounded-xl p-2.5 text-center">
                      <p className="text-[10px] text-slate-400">{s.label}</p>
                      <p className="text-xs font-black text-slate-700 mt-0.5">{s.val}</p>
                    </div>
                  ))}
                </div>
                {selected === idx && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Axes de collaboration ASERGMV</p>
                    <div className="space-y-1.5">
                      {p.collaboration.map(c => (
                        <div key={c} className="flex items-start gap-2 text-xs text-slate-600">
                          <div className={`w-1.5 h-1.5 rounded-full ${p.dot} mt-1 shrink-0`} />
                          {c}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="text-[10px] text-slate-400"><span className="font-bold">Contact :</span> {p.contact}</p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-bold"><MapPin size={9} className="inline mr-1" />Depuis {p.debut}</span>
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-lg font-bold"><TrendingUp size={9} className="inline mr-1" />Budget : {p.budget}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {onglet === "accords" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-base font-black text-slate-900">Accords, MOU & Conventions</h2>
              <p className="text-xs text-slate-400 mt-0.5">Instruments juridiques de coopération internationale ASERGMV</p>
            </div>
            <div className="divide-y divide-slate-50">
              {accords.map(a => (
                <div key={a.titre} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${a.statut === "Actif" ? "bg-emerald-500" : "bg-amber-400"}`} />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">{a.titre}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{a.type} · {a.date}</p>
                  </div>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${a.statut === "Actif" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{a.statut}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-900 to-slate-800 rounded-2xl p-6 text-white">
            <div className="flex items-start gap-4">
              <Handshake size={28} className="text-blue-300 shrink-0 mt-1" />
              <div>
                <h3 className="font-black text-lg mb-1">Le Sénégal — Meilleur taux d'avancement GMV en Afrique</h3>
                <p className="text-blue-200 text-sm">Avec 18% de la superficie GMV nationale restaurée, le Sénégal est le pays le plus avancé des 11 membres de la Grande Muraille Verte africaine. Cette plateforme digitale renforce ce leadership et positionne l'ASERGMV comme modèle exportable pour les 10 pays partenaires.</p>
                <div className="flex gap-3 mt-3 flex-wrap">
                  <span className="text-xs bg-white/15 px-3 py-1 rounded-lg">11 pays UA</span>
                  <span className="text-xs bg-white/15 px-3 py-1 rounded-lg">G7 Initiative 14,7 Mrd USD</span>
                  <span className="text-xs bg-white/15 px-3 py-1 rounded-lg">COP30 Brésil 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
