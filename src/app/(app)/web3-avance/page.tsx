"use client";
import { useState } from "react";
import { Link, Coins, Users, FileText, TrendingUp } from "lucide-react";

const arbresNFT = [
  { id: "NFT-ACsen-00234", espece: "Acacia senegal", lieu: "Linguere", age: 3, co2: 4.2, prix: 28, acheteur: "Carbon Corp Berlin", statut: "Vendu" },
  { id: "NFT-FAalb-00891", espece: "Faidherbia albida", lieu: "Matam", age: 5, co2: 19.4, prix: 85, acheteur: "GreenFund Paris", statut: "Vendu" },
  { id: "NFT-KHsen-00044", espece: "Khaya senegalensis", lieu: "Bakel", age: 6, co2: 49.2, prix: 142, acheteur: "Disponible", statut: "En vente" },
  { id: "NFT-BAaeg-00156", espece: "Balanites aegyptiaca", lieu: "Ranerou", age: 2, co2: 3.6, prix: 22, acheteur: "Disponible", statut: "En vente" },
];

const votes = [
  { titre: "Extension pepiniere Matam - 50 000 plants", pour: 847, contre: 124, abstention: 89, statut: "Adopte", date: "2026-01-05" },
  { titre: "Nouveau partenaire ONG TOSTAN - convention 3 ans", pour: 654, contre: 201, abstention: 145, statut: "Adopte", date: "2025-12-15" },
  { titre: "Achat equipement drone supplementaire x4", pour: 412, contre: 388, abstention: 200, statut: "Rejete", date: "2025-12-01" },
  { titre: "Budget communication COP31 2026", pour: 789, contre: 98, abstention: 113, statut: "Vote en cours", date: "2026-01-10" },
];

const contrats = [
  { nom: "GMVToken (GMVT)", type: "ERC-20 Carbone", adresse: "0x4a3b...8f2e", reseau: "Polygon", transactions: 1247, tvl: "284 000 USD" },
  { nom: "TreeNFT Collection", type: "ERC-721 Arbre", adresse: "0x7c1d...3a9f", reseau: "Polygon", transactions: 384, tvl: "47 800 USD" },
  { nom: "GMV DAO Governor", type: "Gouvernance", adresse: "0x2e8a...1b4c", reseau: "Polygon", transactions: 89, tvl: "-" },
  { nom: "CarbonPool Liquidity", type: "DeFi AMM", adresse: "0x9f4e...7d2a", reseau: "Polygon", transactions: 2341, tvl: "521 000 USD" },
];

export default function Web3AvancePage() {
  const [tab, setTab] = useState<"nft" | "dao" | "contrats" | "defi">("nft");
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-700 rounded-2xl flex items-center justify-center">
              <Link size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">IA AVANCEE - WEB3 BLOCKCHAIN</p>
              <h1 className="text-2xl font-black text-white">Blockchain & Web3 avance</h1>
              <p className="text-slate-400 text-sm mt-1">NFT arbres - DAO gouvernance - DeFi carbone - Smart contracts Polygon</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Arbres tokenises", value: "12 847", color: "text-purple-400" },
              { label: "TVL total", value: "853 k USD", color: "text-emerald-400" },
              { label: "Membres DAO", value: "1 240", color: "text-blue-400" },
              { label: "CO2 tokens emis", value: "2 847 t", color: "text-amber-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {([["nft","NFT Arbres"],["dao","DAO Gouvernance"],["contrats","Smart Contracts"],["defi","DeFi Carbone"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === id ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>{label}</button>
        ))}
      </div>
      {tab === "nft" && (
        <div className="grid md:grid-cols-2 gap-4">
          {arbresNFT.map(n => (
            <div key={n.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 font-mono">{n.id}</p>
                  <h3 className="text-sm font-black text-slate-900 mt-0.5">{n.espece}</h3>
                  <p className="text-xs text-slate-400">{n.lieu} - Age {n.age} ans</p>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${n.statut === "Vendu" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>{n.statut}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-50 rounded-xl p-2.5 text-center"><p className="text-[10px] text-slate-400">CO2 seq.</p><p className="text-sm font-black text-slate-700">{n.co2} t</p></div>
                <div className="bg-slate-50 rounded-xl p-2.5 text-center"><p className="text-[10px] text-slate-400">Prix</p><p className="text-sm font-black text-emerald-600">{n.prix} USD</p></div>
                <div className="bg-slate-50 rounded-xl p-2.5 text-center"><p className="text-[10px] text-slate-400">Acheteur</p><p className="text-[10px] font-bold text-slate-700">{n.acheteur}</p></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "dao" && (
        <div className="space-y-3">
          {votes.map(v => (
            <div key={v.titre} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <p className="text-sm font-black text-slate-900">{v.titre}</p>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${v.statut === "Adopte" ? "bg-emerald-100 text-emerald-700" : v.statut === "Rejete" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>{v.statut}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{v.date}</p>
                  <div className="flex gap-2 text-xs">
                    <span className="text-emerald-600 font-bold">Pour : {v.pour}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-red-500 font-bold">Contre : {v.contre}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-400">Abstention : {v.abstention}</span>
                  </div>
                  <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-emerald-500" style={{ width: `${(v.pour / (v.pour + v.contre + v.abstention)) * 100}%` }} />
                    <div className="h-full bg-red-400" style={{ width: `${(v.contre / (v.pour + v.contre + v.abstention)) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "contrats" && (
        <div className="space-y-3">
          {contrats.map(c => (
            <div key={c.nom} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
              <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center shrink-0"><Coins size={14} className="text-purple-600" /></div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-black text-slate-900">{c.nom}</p>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{c.type}</span>
                </div>
                <p className="text-xs font-mono text-slate-400 mt-0.5">{c.adresse} - {c.reseau}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-black text-slate-900">{c.tvl}</p>
                <p className="text-xs text-slate-400">{c.transactions} txns</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "defi" && (
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { titre: "Carbon AMM Pool", desc: "Marche automatise GMVToken/USDC. Liquidite provenue de bailleurs et fonds carbone. APY 8.4%.", tvl: "521 000 USD", apy: "8.4%" },
            { titre: "Staking Restauration", desc: "Staker des GMVToken pour financer nouvelles plantations. Rendement indexe sur taux survie reel des plants.", tvl: "180 000 USD", apy: "12.1%" },
            { titre: "Carbon Credits Lending", desc: "Preter des credits carbone VCS contre collateral. Interets verses en GMVToken aux communautes.", tvl: "152 000 USD", apy: "6.7%" },
            { titre: "NFT Fractionne", desc: "Fractionner les NFT grands arbres (haute valeur) en parts ERC-20 accessibles aux petits investisseurs.", tvl: "0 USD", apy: "TBD" },
          ].map(d => (
            <div key={d.titre} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-black text-slate-900">{d.titre}</h3>
                <span className="text-sm font-black text-emerald-600">{d.apy}</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">{d.desc}</p>
              <div className="flex items-center gap-2">
                <TrendingUp size={12} className="text-emerald-500" />
                <span className="text-xs font-bold text-slate-600">TVL : {d.tvl}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}