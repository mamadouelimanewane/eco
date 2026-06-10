"use client";
import { useEffect, useState } from "react";
import { BarChart3, TreePine, Leaf, Droplets, Wind } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const plantationData = [
  { mois: "Jan", plants: 8200 }, { mois: "Fév", plants: 9400 }, { mois: "Mar", plants: 15600 },
  { mois: "Avr", plants: 22000 }, { mois: "Mai", plants: 18900 }, { mois: "Jun", plants: 12400 },
  { mois: "Jul", plants: 6800 },  { mois: "Aoû", plants: 4200 },  { mois: "Sep", plants: 8900 },
  { mois: "Oct", plants: 11200 }, { mois: "Nov", plants: 13400 }, { mois: "Déc", plants: 7600 },
];

const survieData = [
  { annee: "2021", taux: 62 }, { annee: "2022", taux: 71 }, { annee: "2023", taux: 75 },
  { annee: "2024", taux: 79 }, { annee: "2025", taux: 82 }, { annee: "2026", taux: 86 },
];

const especesData = [
  { nom: "Acacia senegal", valeur: 38 },
  { nom: "Balanites aegyptiaca", valeur: 22 },
  { nom: "Prosopis africana", valeur: 17 },
  { nom: "Ziziphus mauritiana", valeur: 13 },
  { nom: "Autres", valeur: 10 },
];

const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#94a3b8"];

export default function RapportsPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/stats").then(r => r.json()).then(setStats);
  }, []);

  const kpis = [
    { label: "Arbres plantés",     value: stats?.arbresPlantes?.toLocaleString("fr-FR") ?? "…", icon: TreePine, color: "text-emerald-600 bg-emerald-50" },
    { label: "Superficie (ha)",    value: stats?.superficieHa?.toFixed(1) ?? "…",                icon: Leaf,     color: "text-teal-600 bg-teal-50" },
    { label: "Taux de survie",     value: stats ? `${stats.tauxSurvie}%` : "…",                  icon: Droplets, color: "text-blue-600 bg-blue-50" },
    { label: "CO₂ séquestré (t)", value: stats?.co2Tonnes?.toLocaleString("fr-FR") ?? "…",       icon: Wind,     color: "text-rose-600 bg-rose-50" },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${color.split(" ")[1]}`}>
              <Icon size={18} className={color.split(" ")[0]} />
            </div>
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Bar chart */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">Plants par mois — 2026</h2>
          <p className="text-xs text-gray-400 mb-4">Volume de plantation mensuel</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={plantationData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="mois" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any) => [Number(v).toLocaleString("fr-FR"), "Plants"]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />
              <Bar dataKey="plants" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">Répartition des espèces</h2>
          <p className="text-xs text-gray-400 mb-4">Top 5 espèces plantées</p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={especesData} dataKey="valeur" nameKey="nom" cx="50%" cy="50%" outerRadius={65} innerRadius={35}>
                {especesData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v: any) => [`${v}%`, ""]} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1.5">
            {especesData.map((e, i) => (
              <div key={e.nom} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                <span className="text-gray-600 truncate">{e.nom}</span>
                <span className="ml-auto font-semibold text-gray-800">{e.valeur}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Line chart */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-1">Évolution du taux de survie</h2>
        <p className="text-xs text-gray-400 mb-4">Amélioration des techniques de plantation 2021–2026</p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={survieData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="annee" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis domain={[55, 95]} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip formatter={(v: any) => [`${v}%`, "Taux de survie"]} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />
            <Line type="monotone" dataKey="taux" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: "#10b981" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
