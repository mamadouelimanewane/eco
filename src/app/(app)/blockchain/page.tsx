"use client";
import { Link as LinkIcon, Shield, CheckCircle, Clock, Database, Globe } from "lucide-react";

const transactions = [
  { hash: "0x4f8a...9b2c", type: "Certification planting", commune: "Linguère", arbres: 12400, tCO2: 248, bloc: 18842201, timestamp: "10/06/2026 14:23:08", confirmations: 142 },
  { hash: "0x7d12...4e9f", type: "Transfert crédit carbone", commune: "Orange SN ↔ ASERGMV", arbres: null, tCO2: 312, bloc: 18841990, timestamp: "10/06/2026 11:05:44", confirmations: 198 },
  { hash: "0xa391...c7b8", type: "Certification survie", commune: "Ourossogui", arbres: 9800, tCO2: null, bloc: 18840122, timestamp: "09/06/2026 09:15:22", confirmations: 521 },
  { hash: "0x2b78...f012", type: "Don certifié", commune: "Mbane", arbres: 2000, tCO2: null, bloc: 18838765, timestamp: "08/06/2026 16:42:55", confirmations: 894 },
];

const stats = [
  { label: "Transactions vérifiées", value: "128 492", color: "text-emerald-400" },
  { label: "Crédits carbone tokenisés", value: "1 028 tCO₂", color: "text-teal-400" },
  { label: "Blocs validés", value: "18 842", color: "text-blue-400" },
  { label: "Nœuds du réseau", value: "24", color: "text-violet-400" },
];

export default function BlockchainPage() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-violet-700 rounded-2xl flex items-center justify-center shadow-lg">
              <LinkIcon size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-49 · Web3 · Traçabilité</p>
              <h1 className="text-2xl font-black text-white">Blockchain GMV</h1>
              <p className="text-slate-400 text-sm mt-1">Traçabilité immuable des plantations et crédits carbone</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {stats.map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center gap-2">
          <Database size={15} className="text-violet-500" />
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Explorateur de blocs — GMV Chain</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {transactions.map(tx => (
            <div key={tx.hash} className="px-5 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle size={14} className="text-violet-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <code className="text-[11px] font-mono text-violet-600 bg-violet-50 px-2 py-0.5 rounded">{tx.hash}</code>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{tx.type}</span>
                  </div>
                  <p className="text-xs text-slate-600">{tx.commune}{tx.arbres ? ` · ${tx.arbres.toLocaleString()} arbres` : ""}{tx.tCO2 ? ` · ${tx.tCO2} tCO₂` : ""}</p>
                  <div className="flex gap-4 text-[10px] text-slate-400 mt-1">
                    <span>Bloc #{tx.bloc.toLocaleString()}</span>
                    <span>{tx.timestamp}</span>
                    <span className="text-emerald-600 font-bold">{tx.confirmations} confirmations</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}