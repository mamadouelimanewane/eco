"use client";
import { Globe, Users, MapPin, Wifi, Radio, Building2 } from "lucide-react";

const villages = [
  { nom: "Dahra", commune: "Linguère", population: 12400, acces: "Fibre", groupeWhatsapp: true, radio: true, formations: 8, arbres: 15000, coordinateur: "El Hadji Sow" },
  { nom: "Barkedji", commune: "Linguère", population: 4200, acces: "3G", groupeWhatsapp: true, radio: false, formations: 5, arbres: 6800, coordinateur: "Adja Diallo" },
  { nom: "Ranérou", commune: "Ranérou", population: 8900, acces: "4G", groupeWhatsapp: true, radio: true, formations: 12, arbres: 11200, coordinateur: "Samba Gueye" },
  { nom: "Oudalaye", commune: "Matam", population: 2100, acces: "2G", groupeWhatsapp: false, radio: false, formations: 2, arbres: 2800, coordinateur: "Khalidou Bâ" },
  { nom: "Tessekéré", commune: "Ferlo", population: 650, acces: "Aucun", groupeWhatsapp: false, radio: false, formations: 1, arbres: 900, coordinateur: "Penda Diaw" },
];

const accesColor: Record<string,string> = {
  "Fibre": "bg-emerald-100 text-emerald-700",
  "4G": "bg-blue-100 text-blue-700",
  "3G": "bg-amber-100 text-amber-700",
  "2G": "bg-orange-100 text-orange-700",
  "Aucun": "bg-red-100 text-red-700",
};

export default function VillagesPage() {
  const totalPop = villages.reduce((s, v) => s + v.population, 0);
  const connectes = villages.filter(v => v.acces !== "Aucun").length;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Globe size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-33 · Ruralité</p>
              <h1 className="text-2xl font-black text-white">Village Connect GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Connexion numérique des villages de la Grande Muraille</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Villages connectés", value: connectes + "/" + villages.length, color: "text-cyan-400" },
              { label: "Population GMV", value: (totalPop/1000).toFixed(0)+"k", color: "text-emerald-400" },
              { label: "Groupes WhatsApp", value: villages.filter(v=>v.groupeWhatsapp).length, color: "text-green-400" },
              { label: "Formations dispensées", value: villages.reduce((s,v)=>s+v.formations,0), color: "text-amber-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-2xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {villages.map(v => (
          <div key={v.nom} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-black text-slate-800">{v.nom}</p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1"><MapPin size={10} />{v.commune}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${accesColor[v.acces]}`}>{v.acces}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] mb-3">
              <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-slate-400">Population</p>
                <p className="font-black text-slate-700">{v.population.toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-slate-400">Arbres</p>
                <p className="font-black text-emerald-600">{v.arbres.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex gap-3 text-[10px] text-slate-500 mb-2">
              <span className={v.groupeWhatsapp ? "text-green-600 font-bold" : "text-slate-400"}>✓ WhatsApp</span>
              <span className={v.radio ? "text-blue-600 font-bold" : "text-slate-400"}>✓ Radio locale</span>
            </div>
            <p className="text-[10px] text-slate-400">Coord: {v.coordinateur}</p>
          </div>
        ))}
      </div>
    </div>
  );
}