"use client";
import { useState } from "react";
import { Satellite, Wifi, Zap, AlertTriangle, CheckCircle, Radio, Globe, TrendingUp } from "lucide-react";

const terminaux = [
  { commune: "Linguère", region: "Louga", lat: "15.12°N", lon: "15.12°W", statut: "actif", latence: 28, debit: 187, uptime: 99.2, usage: "HQ ASERGMV + IoT terrain", mode: "Standard" },
  { commune: "Ranérou", region: "Matam", lat: "15.30°N", lon: "13.96°W", statut: "actif", latence: 31, debit: 162, uptime: 98.7, usage: "Agents terrain + capteurs sol", mode: "Standard" },
  { commune: "Matam", region: "Matam", lat: "15.65°N", lon: "13.26°W", statut: "actif", latence: 24, debit: 210, uptime: 99.8, usage: "Bureau régional + pépinière", mode: "Priority" },
  { commune: "Podor", region: "Saint-Louis", lat: "16.66°N", lon: "14.96°W", statut: "actif", latence: 29, debit: 175, uptime: 97.9, usage: "Station météo + drones", mode: "Standard" },
  { commune: "Dagana", region: "Saint-Louis", lat: "16.51°N", lon: "15.50°W", statut: "dégradé", latence: 52, debit: 89, uptime: 91.3, usage: "Agents terrain", mode: "Standard" },
  { commune: "Louga", region: "Louga", lat: "15.61°N", lon: "16.23°W", statut: "actif", latence: 26, debit: 198, uptime: 99.5, usage: "Coordination zone ouest", mode: "Priority" },
  { commune: "Kébémer", region: "Louga", lat: "15.37°N", lon: "16.45°W", statut: "planifié", latence: 0, debit: 0, uptime: 0, usage: "Déploiement sept. 2026", mode: "Standard" },
  { commune: "Bakel", region: "Tambacounda", lat: "14.90°N", lon: "12.46°W", statut: "planifié", latence: 0, debit: 0, uptime: 0, usage: "Déploiement oct. 2026", mode: "Standard" },
];

const fluxDonnees = [
  { source: "Capteurs sol LoRaWAN → Starlink", volume: "2,4 GB/jour", frequence: "Toutes les 15 min", priorite: "haute" },
  { source: "Images drone terrain → Cloud", volume: "18 GB/mission", frequence: "Après chaque mission", priorite: "haute" },
  { source: "Saisies agents terrain", volume: "180 MB/jour", frequence: "Temps réel", priorite: "haute" },
  { source: "Flux NDVI Sentinel-2", volume: "4,2 GB/semaine", frequence: "Hebdomadaire", priorite: "normale" },
  { source: "Backup base de données", volume: "12 GB/semaine", frequence: "Chaque dimanche 2h", priorite: "normale" },
  { source: "Visioconférences équipes terrain", volume: "Variable", frequence: "À la demande", priorite: "basse" },
  { source: "Mises à jour application mobile", volume: "450 MB/version", frequence: "Mensuelle", priorite: "basse" },
  { source: "Streaming médias & formation", volume: "6 GB/semaine", frequence: "Continu", priorite: "basse" },
];

const alertes = [
  { type: "warning", msg: "Dagana — latence élevée (52ms) depuis 3 jours · Vérifier orientation antenne", date: "09/06/2026" },
  { type: "info", msg: "Mise à jour firmware terminaux Starlink v3.2.1 disponible — 6 terminaux concernés", date: "08/06/2026" },
  { type: "success", msg: "Terminal Matam — passage en mode Priority validé · Débit +30%", date: "05/06/2026" },
  { type: "info", msg: "Kébémer — commande matériel confirmée · Livraison prévue 20 sept. 2026", date: "03/06/2026" },
];

const statutStyle: Record<string, string> = {
  actif: "bg-emerald-100 text-emerald-700",
  dégradé: "bg-amber-100 text-amber-700",
  planifié: "bg-slate-100 text-slate-500",
};

export default function StarlinkPage() {
  const [onglet, setOnglet] = useState<"terminaux" | "flux" | "alertes" | "integration">("terminaux");
  const actifsCount = terminaux.filter(t => t.statut === "actif").length;
  const avgLatence = Math.round(terminaux.filter(t => t.latence > 0).reduce((s, t) => s + t.latence, 0) / actifsCount);
  const avgDebit = Math.round(terminaux.filter(t => t.debit > 0).reduce((s, t) => s + t.debit, 0) / actifsCount);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-cyan-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Satellite size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">CONNECTIVITÉ SPATIALE · GMV</p>
              <h1 className="text-2xl font-black text-white">Réseau Starlink GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Haut débit satellitaire · Zones rurales isolées · IoT terrain · Synchronisation temps réel</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Terminaux actifs", value: `${actifsCount}/8`, color: "text-emerald-400" },
              { label: "Latence moyenne", value: `${avgLatence} ms`, color: "text-cyan-400" },
              { label: "Débit moyen", value: `${avgDebit} Mbps`, color: "text-blue-400" },
              { label: "Couverture GMV", value: "72% corridor", color: "text-violet-400" },
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
      <div className="flex gap-2 flex-wrap">
        {(["terminaux", "flux", "alertes", "integration"] as const).map(id => (
          <button key={id} onClick={() => setOnglet(id)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${onglet === id ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"}`}>
            {id === "terminaux" ? "Terminaux & couverture" : id === "flux" ? "Flux de données" : id === "alertes" ? "Alertes réseau" : "Intégrations SI"}
          </button>
        ))}
      </div>

      {onglet === "terminaux" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {["Commune", "Région", "Statut", "Latence", "Débit", "Uptime", "Usage", "Mode"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-black text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {terminaux.map(t => (
                  <tr key={t.commune} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">{t.commune}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{t.region}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statutStyle[t.statut]}`}>{t.statut}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-sm">
                      {t.latence > 0 ? <span className={t.latence > 45 ? "text-amber-600" : "text-emerald-600"}>{t.latence} ms</span> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-4 py-3 font-mono text-sm">
                      {t.debit > 0 ? <span className="text-blue-600">{t.debit} Mbps</span> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {t.uptime > 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${t.uptime > 98 ? "bg-emerald-500" : t.uptime > 94 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${t.uptime}%` }} />
                          </div>
                          <span className="text-xs text-slate-500">{t.uptime}%</span>
                        </div>
                      ) : <span className="text-slate-300 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 max-w-[160px]">{t.usage}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${t.mode === "Priority" ? "bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-500"}`}>{t.mode}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Progression déploiement */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-sm font-black text-slate-900 mb-4">Plan de déploiement — 131 communes GMV</h3>
            <div className="space-y-3">
              {[
                { phase: "Phase 1 — HQ régionaux (actuel)", nb: 6, total: 6, couleur: "bg-emerald-500" },
                { phase: "Phase 2 — Communes prioritaires (2026)", nb: 0, total: 22, couleur: "bg-blue-500" },
                { phase: "Phase 3 — Zones intermédiaires (2027)", nb: 0, total: 48, couleur: "bg-violet-500" },
                { phase: "Phase 4 — Couverture totale (2028)", nb: 0, total: 55, couleur: "bg-amber-500" },
              ].map(p => (
                <div key={p.phase}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-slate-700">{p.phase}</span>
                    <span className="text-slate-400">{p.nb}/{p.total} terminaux</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${p.couleur} rounded-full`} style={{ width: p.total > 0 ? `${(p.nb / p.total) * 100}%` : "0%" }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">Coût estimé par terminal Starlink Standard : ~500 USD matériel + 60 USD/mois abonnement</p>
          </div>
        </div>
      )}

      {onglet === "flux" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-base font-black text-slate-900">Flux de données via réseau Starlink</h2>
            <p className="text-xs text-slate-400 mt-0.5">Priorisation QoS configurée selon criticité opérationnelle</p>
          </div>
          <div className="divide-y divide-slate-50">
            {fluxDonnees.map(f => (
              <div key={f.source} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                <div className={`w-2 h-2 rounded-full shrink-0 ${f.priorite === "haute" ? "bg-red-500" : f.priorite === "normale" ? "bg-amber-400" : "bg-slate-300"}`} />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{f.source}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{f.frequence}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-black text-slate-700">{f.volume}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${f.priorite === "haute" ? "bg-red-100 text-red-700" : f.priorite === "normale" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
                    Priorité {f.priorite}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 bg-slate-50 border-t border-slate-100">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-slate-700">Volume total estimé</span>
              <span className="font-black text-slate-900">~42 GB/semaine · ~168 GB/mois</span>
            </div>
          </div>
        </div>
      )}

      {onglet === "alertes" && (
        <div className="space-y-3">
          {alertes.map((a, i) => (
            <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl border ${a.type === "warning" ? "bg-amber-50 border-amber-100" : a.type === "success" ? "bg-emerald-50 border-emerald-100" : "bg-blue-50 border-blue-100"}`}>
              {a.type === "warning" ? <AlertTriangle size={18} className="text-amber-500 mt-0.5 shrink-0" /> : a.type === "success" ? <CheckCircle size={18} className="text-emerald-500 mt-0.5 shrink-0" /> : <Radio size={18} className="text-blue-500 mt-0.5 shrink-0" />}
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">{a.msg}</p>
                <p className="text-xs text-slate-400 mt-0.5">{a.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {onglet === "integration" && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Wifi, titre: "IoT LoRaWAN → Starlink → Cloud", desc: "Les capteurs sol (LoRaWAN) transmettent leurs données au gateway Starlink le plus proche. Latence totale < 2 minutes. Aucun câblage réseau nécessaire en zone rurale.", tag: "Actif", col: "bg-emerald-50 border-emerald-200" },
              { icon: Satellite, titre: "Drones → Starlink → Plateforme", desc: "Après chaque mission, les images drone (18 GB/vol) sont transférées via Starlink vers le stockage cloud pour traitement IA automatique. Vitesse upload moyenne 12 MB/s.", tag: "Actif", col: "bg-emerald-50 border-emerald-200" },
              { icon: Globe, titre: "Connexion Sentinel-2 / NASA FIRMS", desc: "Téléchargement automatique des données satellite (NDVI, feux) programmé la nuit (heure creuse) pour optimiser la bande passante disponible pour les agents terrain.", tag: "Configuré", col: "bg-blue-50 border-blue-200" },
              { icon: Zap, titre: "Saisies terrain hors-ligne → sync", desc: "L'application mobile stocke les saisies en local quand hors couverture. À portée du terminal Starlink le plus proche, synchronisation automatique en arrière-plan.", tag: "Actif", col: "bg-emerald-50 border-emerald-200" },
              { icon: TrendingUp, titre: "Visioconférence terrain → Dakar", desc: "Les superviseurs régionaux peuvent tenir des réunions vidéo avec l'équipe Dakar depuis n'importe quel point de couverture Starlink. Qualité HD garantie.", tag: "Actif", col: "bg-emerald-50 border-emerald-200" },
              { icon: Radio, titre: "Backup 4G Orange/Free", desc: "Chaque terminal Starlink est couplé à un routeur 4G en failover automatique. En cas de panne Starlink (météo), basculement transparent en < 30 secondes.", tag: "Planifié", col: "bg-amber-50 border-amber-200" },
            ].map(c => (
              <div key={c.titre} className={`rounded-2xl border p-5 ${c.col}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <c.icon size={18} className="text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{c.titre}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.tag === "Actif" ? "bg-emerald-100 text-emerald-700" : c.tag === "Planifié" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{c.tag}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-slate-900 to-cyan-900 rounded-2xl p-6 text-white">
            <div className="flex items-start gap-4">
              <Satellite size={28} className="text-cyan-300 shrink-0 mt-1" />
              <div>
                <h3 className="font-black text-lg mb-1">Starlink for Africa — Programme Gouvernemental</h3>
                <p className="text-cyan-200 text-sm">SpaceX propose un programme tarifaire préférentiel pour les gouvernements africains et les ONGs environnementales. L'ASERGMV est éligible à ce programme. Latence LEO (Low Earth Orbit) : 20–40ms contre 600ms pour les satellites géostationnaires traditionnels — une révolution pour les zones rurales sénégalaises.</p>
                <div className="flex gap-3 mt-3 flex-wrap">
                  <span className="text-xs bg-white/15 px-3 py-1 rounded-lg">LEO — 550 km altitude</span>
                  <span className="text-xs bg-white/15 px-3 py-1 rounded-lg">6 000+ satellites actifs</span>
                  <span className="text-xs bg-white/15 px-3 py-1 rounded-lg">Couverture globale</span>
                  <span className="text-xs bg-white/15 px-3 py-1 rounded-lg">Uptime 99,9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
