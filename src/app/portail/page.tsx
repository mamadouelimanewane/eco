"use client";
import { useEffect, useState } from "react";
import { TreePine, MapPin, Leaf, Wind, Users, AlertTriangle, CheckCircle2, X, ChevronRight, ArrowRight } from "lucide-react";

interface Stats { arbresPlantes: number; communesActives: number; superficieHa: number; tauxSurvie: number; projetsActifs: number; co2Tonnes: number; }

const typeSignalement = ["Feu de brousse", "Coupe illicite", "Zone dégradée", "Point d'eau tari", "Espèces envahissantes", "Autre"];
const competencesList = ["Plantation", "Pépinière", "Suivi terrain", "Sensibilisation", "Cartographie", "Agriculture", "Élevage", "Formation"];
const communes = ["Linguère", "Ranérou", "Matam", "Kanel", "Bakel", "Goudiry", "Koumpentoum", "Tambacounda", "Vélingara", "Kolda", "Sédhiou", "Ziguinchor"];

type Modal = null | "signalement" | "volontaire";

export default function PortailCitoyen() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [modal, setModal] = useState<Modal>(null);
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState<Modal>(null);
  const [loading, setLoading] = useState(false);

  const [sig, setSig] = useState({ type: "", commune: "", description: "" });
  const [vol, setVol] = useState({ nom: "", email: "", telephone: "", zone: "", competences: [] as string[], motivation: "" });

  useEffect(() => {
    fetch("/api/stats").then(r => r.json()).then(setStats);
  }, []);

  const openModal = (m: Modal) => { setModal(m); setStep(0); setSuccess(null); };
  const closeModal = () => { setModal(null); setStep(0); };

  const submitSignalement = async () => {
    setLoading(true);
    await fetch("/api/signalement", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(sig) });
    setLoading(false);
    setSuccess("signalement");
  };

  const submitVolontaire = async () => {
    setLoading(true);
    const r = await fetch("/api/inscription-volontaire", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(vol) });
    setLoading(false);
    if (r.ok) setSuccess("volontaire");
    else { const d = await r.json(); alert(d.error); }
  };

  const toggleComp = (c: string) =>
    setVol(v => ({ ...v, competences: v.competences.includes(c) ? v.competences.filter(x => x !== c) : [...v.competences, c] }));

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-black border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-tight">ASERGMV</p>
              <p className="text-[10px] text-slate-400 leading-tight">Portail Citoyen</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => openModal("signalement")} className="text-sm text-slate-300 hover:text-white transition-colors">Signaler</button>
            <button onClick={() => openModal("volontaire")} className="px-4 py-1.5 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-500 transition-colors font-medium">Devenir volontaire</button>
            <a href="/login" className="px-3 py-1.5 border border-slate-700 text-slate-300 text-sm rounded-lg hover:border-slate-500 hover:text-white transition-colors">Connexion agent</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-emerald-400 tracking-widest uppercase mb-4">Grande Muraille Verte · Sénégal</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Ensemble, nous reboisonsle Sahel
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              850 km de forêt vivante le long de la frontière nord du Sénégal. Rejoignez des milliers de citoyens qui protègent la Grande Muraille Verte.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => openModal("volontaire")} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors">
                <Users size={18} /> Devenir volontaire <ArrowRight size={16} />
              </button>
              <button onClick={() => openModal("signalement")} className="flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-slate-500 text-white font-medium rounded-xl transition-colors">
                <AlertTriangle size={18} /> Faire un signalement
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-emerald-700 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-white text-center">
          {[
            { label: "Arbres plantés", value: stats?.arbresPlantes?.toLocaleString("fr-FR") ?? "…", icon: "🌳" },
            { label: "Communes actives", value: `${stats?.communesActives ?? "…"}/131`, icon: "🏘️" },
            { label: "Superficie (ha)", value: stats?.superficieHa?.toFixed(0) ?? "…", icon: "🌿" },
            { label: "Taux de survie", value: stats ? `${stats.tauxSurvie}%` : "…", icon: "💧" },
            { label: "Projets actifs", value: stats?.projetsActifs ?? "…", icon: "📋" },
            { label: "CO₂ séquestré (t/an)", value: stats?.co2Tonnes?.toLocaleString("fr-FR") ?? "…", icon: "🌬️" },
          ].map(({ label, value, icon }) => (
            <div key={label}>
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-xs text-emerald-200 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cards CTA */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            titre: "Faire un signalement", icon: AlertTriangle, color: "bg-amber-50 text-amber-600 border-amber-100",
            desc: "Signalez un feu de brousse, une coupe illégale ou une zone dégradée. Votre alerte est transmise directement aux agents ASERGMV.",
            btn: "Signaler maintenant", action: () => openModal("signalement"), btnClass: "bg-amber-600 hover:bg-amber-500",
          },
          {
            titre: "Devenir volontaire", icon: Users, color: "bg-emerald-50 text-emerald-600 border-emerald-100",
            desc: "Participez aux campagnes de plantation, au suivi des parcelles ou à la sensibilisation des communautés locales.",
            btn: "S'inscrire gratuitement", action: () => openModal("volontaire"), btnClass: "bg-emerald-700 hover:bg-emerald-600",
          },
          {
            titre: "Suivre les projets", icon: TreePine, color: "bg-blue-50 text-blue-600 border-blue-100",
            desc: "Consultez l'avancement des 8 projets ASERGMV en cours, les parcelles reboisées et les indicateurs de performance.",
            btn: "Voir la carte GMV", action: () => window.location.href = "/dashboard", btnClass: "bg-blue-700 hover:bg-blue-600",
          },
        ].map(({ titre, icon: Icon, color, desc, btn, action, btnClass }) => (
          <div key={titre} className={`rounded-2xl border p-6 ${color.split(" ").slice(2).join(" ")}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color.split(" ").slice(0, 2).join(" ")}`}>
              <Icon size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">{titre}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">{desc}</p>
            <button onClick={action} className={`w-full py-2.5 rounded-xl text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${btnClass}`}>
              {btn} <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-black text-slate-500 text-center py-8 text-sm">
        <p>© 2026 ASERGMV · Agence Sénégalaise de la Grande Muraille Verte</p>
        <p className="mt-1 text-xs">
          <a href="/login" className="text-slate-400 hover:text-white transition-colors">Espace agents</a>
          {" · "}
          <a href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Tableau de bord</a>
        </p>
      </footer>

      {/* Modal Signalement */}
      {modal === "signalement" && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="font-bold text-gray-900">Faire un signalement</h2>
                <p className="text-xs text-gray-400">Votre signalement sera traité par nos agents</p>
              </div>
              <button onClick={closeModal} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"><X size={16} /></button>
            </div>

            {success === "signalement" ? (
              <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-emerald-500" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Signalement envoyé !</h3>
                <p className="text-gray-500 text-sm mb-6">Merci. Nos agents terrain vont traiter votre signalement dans les plus brefs délais.</p>
                <button onClick={closeModal} className="px-6 py-2.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors">Fermer</button>
              </div>
            ) : (
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Type de signalement *</label>
                  <select value={sig.type} onChange={e => setSig(s => ({ ...s, type: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                    <option value="">Sélectionner…</option>
                    {typeSignalement.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Commune concernée</label>
                  <select value={sig.commune} onChange={e => setSig(s => ({ ...s, commune: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                    <option value="">Sélectionner…</option>
                    {communes.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Description *</label>
                  <textarea value={sig.description} onChange={e => setSig(s => ({ ...s, description: e.target.value }))}
                    rows={4} placeholder="Décrivez ce que vous avez observé…"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
                </div>
                <button onClick={submitSignalement} disabled={!sig.type || !sig.description || loading}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                  {loading ? "Envoi en cours…" : <><AlertTriangle size={16} /> Envoyer le signalement</>}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Volontaire */}
      {modal === "volontaire" && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
              <div>
                <h2 className="font-bold text-gray-900">Inscription volontaire GMV</h2>
                <div className="flex items-center gap-2 mt-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className={`h-1 rounded-full transition-all ${i <= step ? "w-8 bg-emerald-500" : "w-4 bg-gray-200"}`} />
                  ))}
                  <span className="text-xs text-gray-400">Étape {step + 1}/3</span>
                </div>
              </div>
              <button onClick={closeModal} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"><X size={16} /></button>
            </div>

            {success === "volontaire" ? (
              <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-emerald-500" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Bienvenue dans l'équipe !</h3>
                <p className="text-gray-500 text-sm mb-2">Votre inscription est confirmée. Vous pouvez vous connecter avec :</p>
                <div className="bg-gray-50 rounded-xl p-4 text-sm font-mono text-gray-700 mb-6">
                  <p>Email : {vol.email}</p>
                  <p>Mot de passe : <span className="text-emerald-600">volontaire2026</span></p>
                </div>
                <a href="/login" className="inline-block px-6 py-2.5 bg-emerald-700 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors">
                  Se connecter maintenant
                </a>
              </div>
            ) : step === 0 ? (
              <div className="px-6 py-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-700">Vos informations personnelles</h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { label: "Nom complet *", key: "nom", placeholder: "Prénom Nom" },
                    { label: "Email *", key: "email", placeholder: "vous@exemple.com" },
                    { label: "Téléphone", key: "telephone", placeholder: "+221 7X XXX XX XX" },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">{label}</label>
                      <input value={(vol as any)[key]} onChange={e => setVol(v => ({ ...v, [key]: e.target.value }))}
                        placeholder={placeholder} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(1)} disabled={!vol.nom || !vol.email}
                  className="w-full py-3 bg-black hover:bg-slate-800 disabled:bg-gray-100 disabled:text-gray-400 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                  Continuer <ArrowRight size={16} />
                </button>
              </div>
            ) : step === 1 ? (
              <div className="px-6 py-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-700">Vos compétences & zone d'intervention</h3>
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">Zone géographique</label>
                  <select value={vol.zone} onChange={e => setVol(v => ({ ...v, zone: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                    <option value="">Sélectionner…</option>
                    {communes.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">Compétences (plusieurs possibles)</label>
                  <div className="flex flex-wrap gap-2">
                    {competencesList.map(c => (
                      <button key={c} onClick={() => toggleComp(c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${vol.competences.includes(c) ? "bg-emerald-600 border-emerald-600 text-white" : "border-gray-200 text-gray-600 hover:border-emerald-300"}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="flex-1 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl text-sm hover:bg-gray-50 transition-colors">Retour</button>
                  <button onClick={() => setStep(2)} className="flex-1 py-3 bg-black hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                    Continuer <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-6 py-5 space-y-4">
                <h3 className="text-sm font-semibold text-gray-700">Votre motivation</h3>
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Pourquoi souhaitez-vous rejoindre la GMV ?</label>
                  <textarea value={vol.motivation} onChange={e => setVol(v => ({ ...v, motivation: e.target.value }))}
                    rows={5} placeholder="Partagez vos motivations, expériences ou engagements…"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-xs text-emerald-800">
                  <p className="font-semibold mb-1">Récapitulatif</p>
                  <p>{vol.nom} · {vol.email}</p>
                  {vol.zone && <p>Zone : {vol.zone}</p>}
                  {vol.competences.length > 0 && <p>Compétences : {vol.competences.join(", ")}</p>}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl text-sm hover:bg-gray-50 transition-colors">Retour</button>
                  <button onClick={submitVolontaire} disabled={loading}
                    className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-600 disabled:bg-gray-100 disabled:text-gray-400 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                    {loading ? "Inscription…" : <><CheckCircle2 size={16} /> Confirmer</>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
