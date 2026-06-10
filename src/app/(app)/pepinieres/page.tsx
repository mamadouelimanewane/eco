"use client";
import { useEffect, useState } from "react";
import { TreePine, Package, MapPin } from "lucide-react";

interface Pepiniere {
  id: string; nom: string; latitude: number; longitude: number; capacite: number;
  createdAt: string;
  stocks: { id: string; espece: string; quantite: number; stade: string }[];
  _count: { stocks: number };
}

const stadeStyle: Record<string, string> = {
  SEMENCE:         "bg-amber-100 text-amber-700",
  GERMINATION:     "bg-yellow-100 text-yellow-700",
  JEUNE_PLANT:     "bg-lime-100 text-lime-700",
  PRET_PLANTATION: "bg-emerald-100 text-emerald-700",
};
const stadeLabel: Record<string, string> = {
  SEMENCE: "Semence", GERMINATION: "Germination",
  JEUNE_PLANT: "Jeune plant", PRET_PLANTATION: "Prêt plantation",
};

export default function PepinierePage() {
  const [peps, setPeps] = useState<Pepiniere[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pepinieres").then(r => r.json()).then(d => { setPeps(d); setLoading(false); });
  }, []);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {loading ? Array.from({length:2}).map((_,i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 h-64 animate-pulse" />
        )) : peps.length === 0 ? (
          <div className="col-span-2 text-center py-16 text-gray-400">
            <TreePine size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Aucune pépinière enregistrée</p>
          </div>
        ) : peps.map(p => {
          const total = p.stocks.reduce((s, st) => s + st.quantite, 0);
          const pct = Math.min(Math.round((total / p.capacite) * 100), 100);
          return (
            <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center">
                    <TreePine size={18} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{p.nom}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin size={10} /> {p.latitude.toFixed(4)}, {p.longitude.toFixed(4)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{total.toLocaleString("fr-FR")}</p>
                  <p className="text-xs text-gray-400">/ {p.capacite.toLocaleString()} cap.</p>
                </div>
              </div>

              <div className="px-5 pt-3 pb-1">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500">Taux de remplissage</span>
                  <span className="font-semibold text-gray-700">{pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{width:`${pct}%`}} />
                </div>
              </div>

              <div className="px-5 py-4 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                  <Package size={11} /> Stocks par espèce
                </p>
                {p.stocks.length === 0 ? (
                  <p className="text-xs text-gray-400">Aucun stock enregistré</p>
                ) : p.stocks.map(s => (
                  <div key={s.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700 italic">{s.espece}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${stadeStyle[s.stade]}`}>
                        {stadeLabel[s.stade]}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{s.quantite.toLocaleString("fr-FR")}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
