"use client";
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from "lucide-react";

const stations = [
  { ville: "Linguère", temp: 41, tempMin: 28, pluie: 0, humidite: 14, vent: 18, pression: 1008, conditions: "Ensoleillé", prevision: "Chaud et sec" },
  { ville: "Ranérou", temp: 38, tempMin: 25, pluie: 2.4, humidite: 22, vent: 12, pression: 1010, conditions: "Nuageux", prevision: "Averses possibles" },
  { ville: "Ourossogui", temp: 36, tempMin: 24, pluie: 8.1, humidite: 35, vent: 8, pression: 1012, conditions: "Pluvieux", prevision: "Fortes pluies" },
  { ville: "Mbane", temp: 40, tempMin: 27, pluie: 0, humidite: 11, vent: 22, pression: 1007, conditions: "Ensoleillé", prevision: "Vent fort" },
  { ville: "Sagatta", temp: 33, tempMin: 22, pluie: 12.5, humidite: 48, vent: 6, pression: 1014, conditions: "Pluvieux", prevision: "Pluies modérées" },
  { ville: "Dodji", temp: 37, tempMin: 26, pluie: 0.5, humidite: 19, vent: 15, pression: 1009, conditions: "Partiellement nuageux", prevision: "Nuages puis soleil" },
];

const conditionIcon: Record<string, React.ElementType> = {
  "Ensoleillé": Sun,
  "Nuageux": Cloud,
  "Pluvieux": CloudRain,
  "Partiellement nuageux": Cloud,
};

const conditionBg: Record<string, string> = {
  "Ensoleillé": "from-amber-400/20 to-orange-400/20 border-amber-200",
  "Nuageux": "from-slate-200/40 to-slate-300/40 border-slate-200",
  "Pluvieux": "from-blue-400/20 to-cyan-400/20 border-blue-200",
  "Partiellement nuageux": "from-slate-200/30 to-blue-200/30 border-slate-200",
};

export default function MeteoPage() {
  const tempMoy = Math.round(stations.reduce((s, st) => s + st.temp, 0) / stations.length);
  const pluieTotale = stations.reduce((s, st) => s + st.pluie, 0).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Cloud size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">APP-19 · Météo</p>
              <h1 className="text-2xl font-black text-white">Météo Locale GMV</h1>
              <p className="text-slate-400 text-sm mt-1">10 juin 2026 — 6 stations actives</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Temp. moyenne", value: tempMoy + "°C", color: "text-orange-400" },
              { label: "Pluie cumulée", value: pluieTotale + " mm", color: "text-blue-400" },
              { label: "Stations actives", value: stations.length, color: "text-emerald-400" },
              { label: "Alertes météo", value: "1", color: "text-amber-400" },
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
        {stations.map(s => {
          const Icon = conditionIcon[s.conditions] ?? Sun;
          return (
            <div key={s.ville} className={`bg-gradient-to-br ${conditionBg[s.conditions] ?? "from-white to-slate-50 border-slate-200"} bg-white rounded-2xl border shadow-sm p-5`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-black text-slate-800">{s.ville}</p>
                  <p className="text-[10px] text-slate-400">{s.conditions}</p>
                </div>
                <Icon size={28} className={s.conditions === "Pluvieux" ? "text-blue-400" : s.conditions === "Ensoleillé" ? "text-amber-400" : "text-slate-400"} />
              </div>
              <p className="text-4xl font-black text-slate-900 mb-1">{s.temp}°</p>
              <p className="text-[11px] text-slate-400 mb-3">Min {s.tempMin}° · {s.prevision}</p>
              <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500">
                <div className="flex flex-col items-center gap-1 bg-white/60 rounded-lg p-1.5">
                  <CloudRain size={11} />
                  <span className="font-bold">{s.pluie}mm</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white/60 rounded-lg p-1.5">
                  <Droplets size={11} />
                  <span className="font-bold">{s.humidite}%</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white/60 rounded-lg p-1.5">
                  <Wind size={11} />
                  <span className="font-bold">{s.vent}km/h</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}