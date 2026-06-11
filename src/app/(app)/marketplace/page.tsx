"use client";
import { ShoppingBag, Star, Package, MapPin, TrendingUp, Filter } from "lucide-react";

const produits = [
  { id: "MKT-001", nom: "Plants d'Acacia senegal certifiés", vendeur: "Pépinière Linguère", commune: "Linguère", prix: 250, stock: 12000, categorie: "Plants", note: 4.8, ventes: 4200 },
  { id: "MKT-002", nom: "Compost organique GMV", vendeur: "Coopérative Mbane", commune: "Mbane", prix: 1500, stock: 850, categorie: "Engrais", note: 4.6, ventes: 320 },
  { id: "MKT-003", nom: "Semences Balanites aegyptiaca", vendeur: "GrainBank Ranérou", commune: "Ranérou", prix: 800, stock: 5200, categorie: "Semences", note: 4.9, ventes: 1840 },
  { id: "MKT-004", nom: "Kit plantation 100 arbres", vendeur: "ASERGMV Store", commune: "Nationale", prix: 45000, stock: 200, categorie: "Kit", note: 5.0, ventes: 89 },
  { id: "MKT-005", nom: "Miel sauvage Grande Muraille", vendeur: "Apiculteurs Ferlo", commune: "Ourossogui", prix: 4500, stock: 140, categorie: "Produit local", note: 4.7, ventes: 67 },
  { id: "MKT-006", nom: "Artisanat bois durable", vendeur: "Artisans Sagatta", commune: "Sagatta", prix: 12000, stock: 45, categorie: "Artisanat", note: 4.5, ventes: 23 },
];

const catColor: Record<string,string> = {
  "Plants": "bg-emerald-100 text-emerald-700",
  "Engrais": "bg-lime-100 text-lime-700",
  "Semences": "bg-teal-100 text-teal-700",
  "Kit": "bg-blue-100 text-blue-700",
  "Produit local": "bg-amber-100 text-amber-700",
  "Artisanat": "bg-violet-100 text-violet-700",
};

export default function MarketplacePage() {
  const totalVentes = produits.reduce((s, p) => s + p.ventes, 0);
  const chiffre = produits.reduce((s, p) => s + p.ventes * p.prix, 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <ShoppingBag size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-24 · Commerce vert</p>
              <h1 className="text-2xl font-black text-white">Marketplace GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Produits durables de la Grande Muraille Verte</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Produits listés", value: produits.length, color: "text-teal-400" },
              { label: "Ventes totales", value: totalVentes.toLocaleString(), color: "text-emerald-400" },
              { label: "Chiffre d'affaires", value: (chiffre/1000000).toFixed(1)+"M FCFA", color: "text-amber-400" },
              { label: "Vendeurs actifs", value: produits.length, color: "text-blue-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {produits.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${catColor[p.categorie]}`}>{p.categorie}</span>
              <div className="flex items-center gap-1 text-[11px] text-amber-500">
                <Star size={11} className="fill-amber-400" /> {p.note}
              </div>
            </div>
            <p className="text-sm font-black text-slate-800 mt-2 mb-1">{p.nom}</p>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 mb-3"><MapPin size={10} />{p.vendeur} · {p.commune}</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-lg font-black text-teal-600">{p.prix.toLocaleString()} FCFA</p>
                <p className="text-[10px] text-slate-400">{p.stock.toLocaleString()} en stock · {p.ventes} vendus</p>
              </div>
              <button className="text-[11px] font-bold bg-teal-500 text-white px-3 py-1.5 rounded-lg hover:bg-teal-600 transition-colors">Acheter</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}