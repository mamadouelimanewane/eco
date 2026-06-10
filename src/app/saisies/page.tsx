"use client";
import { useEffect, useState } from "react";
import { Target, Search, Calendar, Plus, X, CheckCircle2 } from "lucide-react";

interface Saisie {
  id: string; type: string; nombrePlants: number | null; tauxSurvie: number | null;
  notes: string | null; synced: boolean; createdAt: string;
  user: { name: string | null }; commune: { nom: string } | null; projet: { nom: string } | null;
}
interface Commune { id: string; nom: string; }
interface Projet  { id: string; nom: string; }

const TYPES = ["PLANTATION","INVENTAIRE_SURVIE","SIGNALEMENT","PHOTO","PEPIN_STOCK","EAU_POINT"];
const typeLabel: Record<string,string> = {
  PLANTATION:"Plantation", INVENTAIRE_SURVIE:"Inventaire survie",
  SIGNALEMENT:"Signalement", PHOTO:"Photo", PEPIN_STOCK:"Stock pépinière", EAU_POINT:"Point d'eau",
};
const typeStyle: Record<string,string> = {
  PLANTATION:"bg-emerald-100 text-emerald-700", INVENTAIRE_SURVIE:"bg-blue-100 text-blue-700",
  SIGNALEMENT:"bg-amber-100 text-amber-700", PHOTO:"bg-violet-100 text-violet-700",
  PEPIN_STOCK:"bg-teal-100 text-teal-700", EAU_POINT:"bg-cyan-100 text-cyan-700",
};

const empty = { type:"PLANTATION", communeId:"", projetId:"", nombrePlants:"", tauxSurvie:"", notes:"" };

export default function SaisiesPage() {
  const [saisies, setSaisies] = useState<Saisie[]>([]);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [projets,  setProjets]  = useState<Projet[]>([]);
  const [search,   setSearch]   = useState("");
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState(false);
  const [form,     setForm]     = useState(empty);
  const [saving,   setSaving]   = useState(false);
  const [done,     setDone]     = useState(false);

  const load = () => {
    fetch("/api/saisies").then(r=>r.json()).then(d=>{ setSaisies(d); setLoading(false); });
  };

  useEffect(() => {
    load();
    fetch("/api/communes").then(r=>r.json()).then(setCommunes);
    fetch("/api/projets").then(r=>r.json()).then(setProjets);
  }, []);

  const openModal = () => { setForm(empty); setDone(false); setModal(true); };
  const closeModal = () => { setModal(false); setDone(false); };

  const submit = async () => {
    setSaving(true);
    const r = await fetch("/api/saisies", {
      method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form),
    });
    setSaving(false);
    if (r.ok) { setDone(true); load(); }
    else alert("Erreur lors de la saisie. Êtes-vous connecté ?");
  };

  const filtered = saisies.filter(s =>
    s.type.toLowerCase().includes(search.toLowerCase()) ||
    s.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.commune?.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Type, agent, commune…"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
        </div>
        <span className="text-xs text-gray-400 flex-1">{filtered.length} saisie(s)</span>
        <button onClick={openModal}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors shrink-0">
          <Plus size={15} /> Nouvelle saisie
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Type","Agent","Commune","Projet","Plants","Survie","Notes","Date"].map(h=>(
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? Array.from({length:6}).map((_,i)=>(
              <tr key={i}>{Array.from({length:8}).map((__,j)=>(
                <td key={j} className="px-4 py-3"><div className="h-3 bg-gray-100 rounded animate-pulse"/></td>
              ))}</tr>
            )) : filtered.map(s=>(
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${typeStyle[s.type]??"bg-gray-100 text-gray-600"}`}>
                    {typeLabel[s.type]??s.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700 text-xs">{s.user?.name??"—"}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{s.commune?.nom??"—"}</td>
                <td className="px-4 py-3 text-gray-500 text-xs max-w-[140px] truncate">{s.projet?.nom??"—"}</td>
                <td className="px-4 py-3 font-semibold text-gray-800 text-xs">{s.nombrePlants?.toLocaleString("fr-FR")??"—"}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{s.tauxSurvie!=null?`${(s.tauxSurvie*100).toFixed(0)}%`:"—"}</td>
                <td className="px-4 py-3 text-xs text-gray-500 max-w-[120px] truncate">{s.notes??"—"}</td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Calendar size={10}/>{new Date(s.createdAt).toLocaleDateString("fr-FR")}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && filtered.length===0 && (
          <div className="text-center py-12 text-gray-400">
            <Target size={28} className="mx-auto mb-2 opacity-30"/>
            <p className="text-sm">Aucune saisie trouvée</p>
          </div>
        )}
      </div>

      {/* Modal Nouvelle saisie */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={e=>e.target===e.currentTarget&&closeModal()}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Nouvelle saisie terrain</h2>
              <button onClick={closeModal} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"><X size={15}/></button>
            </div>

            {done ? (
              <div className="px-6 py-12 text-center">
                <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={28} className="text-emerald-500"/>
                </div>
                <p className="font-semibold text-gray-900 mb-1">Saisie enregistrée !</p>
                <p className="text-sm text-gray-400 mb-6">La donnée est synchronisée dans la base.</p>
                <div className="flex gap-3">
                  <button onClick={()=>{setDone(false);setForm(empty);}} className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50">Nouvelle saisie</button>
                  <button onClick={closeModal} className="flex-1 py-2.5 bg-black text-white rounded-xl text-sm hover:bg-slate-800">Fermer</button>
                </div>
              </div>
            ) : (
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Type de saisie *</label>
                  <select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                    {TYPES.map(t=><option key={t} value={t}>{typeLabel[t]}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Commune</label>
                    <select value={form.communeId} onChange={e=>setForm(f=>({...f,communeId:e.target.value}))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                      <option value="">— Aucune —</option>
                      {communes.map(c=><option key={c.id} value={c.id}>{c.nom}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Projet</label>
                    <select value={form.projetId} onChange={e=>setForm(f=>({...f,projetId:e.target.value}))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                      <option value="">— Aucun —</option>
                      {projets.map(p=><option key={p.id} value={p.id}>{p.nom}</option>)}
                    </select>
                  </div>
                </div>
                {(form.type==="PLANTATION"||form.type==="INVENTAIRE_SURVIE") && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Nbre plants</label>
                      <input type="number" value={form.nombrePlants} onChange={e=>setForm(f=>({...f,nombrePlants:e.target.value}))}
                        placeholder="ex: 500" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"/>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Taux survie (%)</label>
                      <input type="number" min="0" max="100" value={form.tauxSurvie} onChange={e=>setForm(f=>({...f,tauxSurvie:e.target.value}))}
                        placeholder="ex: 82" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"/>
                    </div>
                  </div>
                )}
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Notes</label>
                  <textarea value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}
                    rows={3} placeholder="Observations terrain, conditions, remarques…"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"/>
                </div>
                <button onClick={submit} disabled={saving}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 disabled:bg-gray-100 disabled:text-gray-400 text-white font-semibold rounded-xl text-sm transition-colors">
                  {saving ? "Enregistrement…" : "Enregistrer la saisie"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
