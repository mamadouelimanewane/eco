"use client";
import { useState } from "react";
import {
  Leaf, TreePine, Map, Users, BarChart3, Globe, Mail, Phone,
  ArrowRight, CheckCircle2, Sprout, Wind, Droplets, Shield,
  X, Send, Star, TrendingUp, Zap,
} from "lucide-react";

const stats = [
  { val: "850 km", label: "Bande reboisee" },
  { val: "131",    label: "Communes ciblees" },
  { val: "10M+",   label: "Arbres plantes" },
  { val: "8",      label: "Bailleurs actifs" },
];

const features = [
  { icon: Map,       title: "Carte Interactive",   desc: "Visualisez en temps reel l'avancement des reboisements sur les 850 km de la Grande Muraille Verte.", bg: "bg-emerald-50", color: "text-emerald-600", ring: "ring-emerald-100" },
  { icon: BarChart3, title: "Tableaux de bord",    desc: "Suivez les KPIs cles : arbres plantes, taux de survie, superficie reboisee, CO2 sequestre.",         bg: "bg-blue-50",    color: "text-blue-600",    ring: "ring-blue-100"    },
  { icon: Users,     title: "Volontariat citoyen", desc: "Rejoignez le reseau de volontaires et participez directement aux missions de reforestation.",           bg: "bg-violet-50",  color: "text-violet-600",  ring: "ring-violet-100"  },
  { icon: TreePine,  title: "Pepinieres locales",  desc: "Accedez aux donnees des pepinieres, disponibilites en plants et calendriers de reboisement.",           bg: "bg-teal-50",    color: "text-teal-600",    ring: "ring-teal-100"    },
  { icon: Shield,    title: "Signalement terrain", desc: "Signalez des problemes environnementaux — deforestation illegale, incendies, especes invasives.",        bg: "bg-rose-50",    color: "text-rose-600",    ring: "ring-rose-100"    },
  { icon: Droplets,  title: "Ressources en eau",   desc: "Suivi des nappes phreatiques et des systemes d'irrigation pour optimiser la survie des plants.",         bg: "bg-cyan-50",    color: "text-cyan-600",    ring: "ring-cyan-100"    },
];

const steps = [
  { n: "01", title: "Creez votre profil",      desc: "Inscrivez-vous en 2 min avec vos informations de base." },
  { n: "02", title: "Choisissez vos missions", desc: "Parcourez les missions disponibles dans votre commune." },
  { n: "03", title: "Participez activement",   desc: "Reboisez, signalez et rapportez via l'application mobile." },
];

const testimonials = [
  { name: "Aminata Diallo", role: "Volontaire, Louga",       quote: "Grace a ASERGMV j'ai plante plus de 400 arbres dans ma commune.", stars: 5 },
  { name: "Ibrahima Sow",   role: "Chef de projet, Matam",   quote: "La plateforme facilite enormement le suivi des parcelles et des equipes.", stars: 5 },
  { name: "Fatou Ndoye",    role: "Agent terrain, Linguere", quote: "Les outils de saisie terrain sont rapides et bien penses pour le terrain.", stars: 5 },
];

export default function PortailPage() {
  const [showSignal, setShowSignal]         = useState(false);
  const [showVolontaire, setShowVolontaire] = useState(false);
  const [vstep, setVstep]                   = useState(1);
  const [form, setForm]                     = useState({ nom: "", email: "", commune: "", message: "" });
  const [sf, setSf]                         = useState({ type: "", description: "", localisation: "" });
  const [sent, setSent]                     = useState(false);
  const [sigSent, setSigSent]               = useState(false);

  async function submitVol() {
    if (!form.nom || !form.email) return;
    await fetch("/api/inscription-volontaire", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.nom, email: form.email, commune: form.commune }) });
    setSent(true);
  }
  async function submitSig() {
    if (!sf.type || !sf.description) return;
    await fetch("/api/signalement", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(sf) });
    setSigSent(true);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center"><Leaf size={18} className="text-white" /></div>
            <div><p className="font-black text-slate-900 text-sm leading-none">ASERGMV</p><p className="text-[10px] text-slate-400 leading-none">Grande Muraille Verte</p></div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#programme" className="hover:text-emerald-600 transition-colors">Programme</a>
            <a href="#features" className="hover:text-emerald-600 transition-colors">Fonctionnalites</a>
            <a href="#rejoindre" className="hover:text-emerald-600 transition-colors">Rejoindre</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowSignal(true)} className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl hover:bg-slate-100 transition-all">Signaler</button>
            <button onClick={() => setShowVolontaire(true)} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all">Devenir Volontaire <ArrowRight size={15} /></button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-emerald-500/15 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-400/10 blur-[100px] rounded-full translate-y-1/3 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 md:py-36 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />Plateforme digitale officielle ASERGMV
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">
            GRANDE<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-400">MURAILLE VERTE</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            La plateforme numerique de reference pour piloter, monitorer et democratiser la reforestation du Senegal.
            {" "}<span className="text-emerald-400 font-semibold">850 km · 131 communes.</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <button onClick={() => setShowVolontaire(true)} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-black px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 text-base">Rejoindre le reseau <ArrowRight size={18} /></button>
            <button onClick={() => setShowSignal(true)} className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-2xl border border-white/10 transition-all text-base">Faire un signalement</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map(({ val, label }) => (
              <div key={label} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-3xl font-black text-white">{val}</p>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMME */}
      <section id="programme" className="py-24 bg-gradient-to-b from-slate-950 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-emerald-600 text-xs font-black uppercase tracking-widest mb-3">Le Programme</p>
              <h2 className="text-4xl font-black text-white tracking-tight mb-6 leading-tight">Une initiative nationale<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">pour reverdir le Sahel</span></h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">La Grande Muraille Verte est un projet panafricain. Au Senegal, l'ASERGMV coordonne le reboisement de 850 km a travers 131 communes.</p>
              {["Lutte contre la desertification","Sequestration de CO2 et attenuation climatique","Creation d'emplois verts","Preservation de la biodiversite au Sahel"].map(t => (
                <div key={t} className="flex items-start gap-3 mb-3"><CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" /><span className="text-slate-300 text-sm">{t}</span></div>
              ))}
            </div>
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[{Icon:TrendingUp,label:"Croissance",v:"+12%",c:"text-emerald-400"},{Icon:Wind,label:"CO2 sequestre",v:"2 400 t",c:"text-blue-400"},{Icon:Droplets,label:"Taux survie",v:"78%",c:"text-teal-400"},{Icon:Zap,label:"Projets actifs",v:"8",c:"text-amber-400"}].map(({Icon,label,v,c}) => (
                  <div key={label} className="bg-white/5 rounded-2xl p-4"><Icon size={16} className={c+" mb-2"} /><p className="text-xl font-black text-white">{v}</p><p className="text-[11px] text-slate-500 font-semibold mt-0.5">{label}</p></div>
                ))}
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3"><Leaf size={20} className="text-emerald-400 shrink-0" /><p className="text-sm text-emerald-300 font-semibold">Objectif 2030 : 100 millions d'hectares en Afrique</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-emerald-600 text-xs font-black uppercase tracking-widest mb-3">Fonctionnalites</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Une plateforme complete</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Tous les outils pour piloter la Grande Muraille Verte.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {features.map(({icon:Icon,title,desc,bg,color,ring}) => (
              <div key={title} className={"group bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-xl ring-1 "+ring+" hover:ring-2 transition-all duration-300 hover:-translate-y-1"}>
                <div className={"w-12 h-12 "+bg+" rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200"}><Icon size={22} className={color} /></div>
                <h3 className="text-base font-black text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section id="rejoindre" className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-emerald-600 text-xs font-black uppercase tracking-widest mb-3">Rejoindre</p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Devenez acteur du reboisement</h2>
          <p className="text-slate-500 text-lg mb-14">Participez en 3 etapes simples.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {steps.map(({n,title,desc}) => (
              <div key={n} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all">
                <div className="text-5xl font-black text-slate-100 mb-4">{n}</div>
                <h3 className="text-base font-black text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setShowVolontaire(true)} className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg px-10 py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all hover:scale-105"><Sprout size={20} /> Je veux participer</button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-emerald-600 text-xs font-black uppercase tracking-widest mb-3">Temoignages</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Ils parlent de nous</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map(({name,role,quote,stars}) => (
              <div key={name} className="bg-slate-50 border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-all">
                <div className="flex gap-0.5 mb-4">{Array.from({length:stars}).map((_,i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-xs font-black text-emerald-600">{name.split(" ").map((n:string) => n[0]).join("")}</div>
                  <div><p className="text-sm font-bold text-slate-900">{name}</p><p className="text-xs text-slate-400">{role}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4"><div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center"><Leaf size={18} className="text-white" /></div><div><p className="font-black text-white text-sm">ASERGMV</p><p className="text-[10px] text-slate-500">Agence Senegalaise pour la GMV</p></div></div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">Plateforme digitale officielle de l'ASERGMV. Monitoring, pilotage et citoyennete active.</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">Navigation</p>
            {["Programme","Fonctionnalites","Rejoindre","Connexion"].map(l => <p key={l}><a href="#" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors block mb-2">{l}</a></p>)}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">Contact</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2"><Mail size={14} className="text-emerald-500" />contact@asergmv.sn</div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-emerald-500" />+221 33 820 00 00</div>
              <div className="flex items-center gap-2"><Globe size={14} className="text-emerald-500" />www.grandmurailleverte.org</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-slate-800 flex items-center justify-between text-xs text-slate-600">
          <span>2026 ASERGMV</span><a href="/dashboard" className="text-emerald-500 hover:underline font-semibold">Acces plateforme</a>
        </div>
      </footer>

      {/* MODAL SIGNALEMENT */}
      {showSignal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowSignal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8" onClick={e => e.stopPropagation()}>
            {!sigSent ? (<>
              <div className="flex items-center justify-between mb-6">
                <div><h2 className="text-xl font-black text-slate-900">Signalement</h2><p className="text-sm text-slate-400 mt-0.5">Signalez un incident environnemental</p></div>
                <button onClick={() => setShowSignal(false)} className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center"><X size={16} className="text-slate-500" /></button>
              </div>
              <div className="space-y-4">
                <select value={sf.type} onChange={e => setSf(f => ({...f,type:e.target.value}))} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                  <option value="">Type d'incident *</option>
                  <option value="DEFORESTATION">Deforestation illegale</option>
                  <option value="INCENDIE">Incendie</option>
                  <option value="ESPECE_INVASIVE">Espece invasive</option>
                  <option value="EROSION">Erosion</option>
                  <option value="AUTRE">Autre</option>
                </select>
                <input placeholder="Localisation" value={sf.localisation} onChange={e => setSf(f => ({...f,localisation:e.target.value}))} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                <textarea rows={4} placeholder="Description *" value={sf.description} onChange={e => setSf(f => ({...f,description:e.target.value}))} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none" />
                <button onClick={submitSig} className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl"><Send size={16} /> Envoyer</button>
              </div>
            </>) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={32} className="text-emerald-600" /></div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Envoye !</h3>
                <p className="text-slate-500 text-sm mb-6">Notre equipe traitera votre signalement rapidement.</p>
                <button onClick={() => {setShowSignal(false);setSigSent(false);setSf({type:"",description:"",localisation:""});}} className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-700">Fermer</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL VOLONTAIRE */}
      {showVolontaire && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowVolontaire(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            {!sent ? (<>
              <div className="bg-slate-950 rounded-t-3xl p-7 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div><p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Etape {vstep}/3</p><h2 className="text-xl font-black text-white">{vstep===1?"Votre identite":vstep===2?"Votre commune":"Votre motivation"}</h2></div>
                  <button onClick={() => setShowVolontaire(false)} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center"><X size={16} className="text-white" /></button>
                </div>
                <div className="flex gap-2 mt-4">{[1,2,3].map(i => <div key={i} className={"h-1.5 rounded-full flex-1 transition-all "+(i<=vstep?"bg-emerald-400":"bg-white/10")} />)}</div>
              </div>
              <div className="p-7 space-y-4">
                {vstep===1 && <>
                  <input placeholder="Nom complet *" value={form.nom} onChange={e => setForm(f => ({...f,nom:e.target.value}))} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                  <input placeholder="Email *" type="email" value={form.email} onChange={e => setForm(f => ({...f,email:e.target.value}))} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                </>}
                {vstep===2 && <>
                  <input placeholder="Votre commune" value={form.commune} onChange={e => setForm(f => ({...f,commune:e.target.value}))} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                  <p className="text-xs text-slate-400">Indiquez la commune ou vous souhaitez participer.</p>
                </>}
                {vstep===3 && <>
                  <textarea rows={4} placeholder="Votre motivation (optionnel)" value={form.message} onChange={e => setForm(f => ({...f,message:e.target.value}))} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none" />
                  <div className="bg-emerald-50 rounded-xl p-4 flex items-start gap-3"><CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" /><p className="text-xs text-emerald-700">En vous inscrivant, vous rejoignez un reseau de citoyens engages pour la reforestation.</p></div>
                </>}
                <div className="flex gap-3 pt-2">
                  {vstep>1 && <button onClick={() => setVstep(s => s-1)} className="flex-1 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 text-sm">Retour</button>}
                  <button onClick={() => vstep<3?setVstep(s => s+1):submitVol()} disabled={vstep===1&&(!form.nom||!form.email)} className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold py-3 rounded-xl text-sm">
                    {vstep===3?<><Send size={15} /> Soumettre</>:<>Suivant <ArrowRight size={15} /></>}
                  </button>
                </div>
              </div>
            </>) : (
              <div className="text-center py-16 px-8">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5"><Sprout size={40} className="text-emerald-600" /></div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Bienvenue !</h3>
                <p className="text-slate-500 text-sm mb-8">Votre inscription est enregistree. Nous vous contacterons prochainement.</p>
                <button onClick={() => {setShowVolontaire(false);setSent(false);setVstep(1);setForm({nom:"",email:"",commune:"",message:""}); }} className="bg-emerald-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-emerald-700">Fermer</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}