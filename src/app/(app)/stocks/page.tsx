"use client";
import { useEffect, useState } from "react";
import { FlaskConical } from "lucide-react";

interface StockItem {
  id: string; espece: string; quantite: number; stade: string;
  pepiniere: { nom: string };
}

const stadeStyle: Record<string, string> = {
  SEMENCE: "bg-amber-100 text-amber-700", GERMINATION: "bg-yellow-100 text-yellow-700",
  JEUNE_PLANT: "bg-lime-100 text-lime-700", PRET_PLANTATION: "bg-emerald-100 text-emerald-700",
};
const stadeLabel: Record<string, string> = {
  SEMENCE: "Semence", GERMINATION: "Germination",
  JEUNE_PLANT: "Jeune plant", PRET_PLANTATION: "Prêt plantation",
};

export default function StocksPage() {
  const [peps, setPeps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pepinieres").then(r => r.json()).then(d => { setPeps(d); setLoading(false); });
  }, []);

  const allStocks: StockItem[] = peps.flatMap(p =>
    p.stocks.map((s: any) => ({ ...s, pepiniere: { nom: p.nom } }))
  );

  const byStade = (stade: string) => allStocks.filter(s => s.stade === stade);
  const total = allStocks.reduce((s, st) => s + st.quantite, 0);

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {["SEMENCE", "GERMINATION", "JEUNE_PLANT", "PRET_PLANTATION"].map(stade => {
          const items = byStade(stade);
          const qty = items.reduce((s, i) => s + i.quantite, 0);
          return (
            <div key={stade} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${stadeStyle[stade]}`}>
                {stadeLabel[stade]}
              </span>
              <p className="text-2xl font-bold text-gray-900 mt-3">{qty.toLocaleString("fr-FR")}</p>
              <p className="text-xs text-gray-400 mt-0.5">{items.length} référence(s)</p>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-800">Inventaire complet</h2>
          <span className="text-xs text-gray-400">Total : {total.toLocaleString("fr-FR")} plants</span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Pépinière", "Espèce", "Stade", "Quantité"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? Array.from({length:6}).map((_,i) => (
              <tr key={i}>{Array.from({length:4}).map((__,j) => (
                <td key={j} className="px-4 py-3"><div className="h-3 bg-gray-100 rounded animate-pulse" /></td>
              ))}</tr>
            )) : allStocks.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-12 text-gray-400">
                <FlaskConical size={28} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Aucun stock enregistré</p>
              </td></tr>
            ) : allStocks.map(s => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-700 font-medium text-xs">{s.pepiniere.nom}</td>
                <td className="px-4 py-3 text-gray-700 italic">{s.espece}</td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${stadeStyle[s.stade]}`}>
                    {stadeLabel[s.stade]}
                  </span>
                </td>
                <td className="px-4 py-3 font-bold text-gray-900">{s.quantite.toLocaleString("fr-FR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
