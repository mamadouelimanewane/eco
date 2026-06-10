"use client";
import { useEffect, useState } from "react";
import { Users, Search, CheckCircle2, XCircle, Clock } from "lucide-react";

interface Volontaire {
  id: string; competences: string[]; disponible: boolean; zone: string | null;
  heuresBenev: number; createdAt: string;
  user: { name: string | null; email: string };
  missions: { id: string; titre: string; statut: string }[];
}

export default function VolontairesPage() {
  const [vols, setVols] = useState<Volontaire[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/volontaires").then(r => r.json()).then(d => { setVols(d); setLoading(false); });
  }, []);

  const filtered = vols.filter(v =>
    v.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    v.user?.email.toLowerCase().includes(search.toLowerCase()) ||
    v.zone?.toLowerCase().includes(search.toLowerCase()) ||
    v.competences.some(c => c.toLowerCase().includes(search.toLowerCase()))
  );

  const initials = (name: string | null, email: string) =>
    (name ?? email).split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="relative max-w-xs w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Nom, compétence, zone…"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><CheckCircle2 size={13} className="text-emerald-500" /> {vols.filter(v => v.disponible).length} disponibles</span>
          <span className="flex items-center gap-1"><XCircle size={13} className="text-gray-400" /> {vols.filter(v => !v.disponible).length} indisponibles</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading ? Array.from({length:3}).map((_,i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 h-44 animate-pulse" />
        )) : filtered.length === 0 ? (
          <div className="col-span-3 text-center py-16 text-gray-400">
            <Users size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Aucun volontaire trouvé</p>
          </div>
        ) : filtered.map(v => (
          <div key={v.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-xs font-bold text-emerald-100 shrink-0">
                {initials(v.user?.name, v.user?.email)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{v.user?.name ?? "—"}</p>
                <p className="text-xs text-gray-400 truncate">{v.user?.email}</p>
              </div>
              <div className={`ml-auto shrink-0 w-2 h-2 rounded-full ${v.disponible ? "bg-emerald-400" : "bg-gray-300"}`} />
            </div>

            {v.zone && (
              <p className="text-xs text-gray-500 mb-3">📍 {v.zone}</p>
            )}

            <div className="flex flex-wrap gap-1 mb-4">
              {v.competences.slice(0, 4).map(c => (
                <span key={c} className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-medium">{c}</span>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Clock size={11} /> {v.heuresBenev}h bénévolat
              </span>
              <span className="text-xs text-gray-400">{v.missions.length} mission(s)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
