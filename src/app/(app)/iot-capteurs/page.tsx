"use client";
import { useState } from "react";
import { Radio, Thermometer, Droplets, Wind, Camera } from "lucide-react";

const capteurs = [
  { id: "CAP-LNG-001", type: "Station meteo", lieu: "Linguere Centre", bat: 87, temp: 34.2, hum: 42, signal: "Bon", last: "2 min" },
  { id: "CAP-RAN-002", type: "Humidite sol", lieu: "Ranerou Ferlo", bat: 63, temp: 38.1, hum: 18, signal: "Bon", last: "5 min" },
  { id: "CAP-MAT-003", type: "Pluviometre", lieu: "Matam Est", bat: 91, temp: 31.7, hum: 56, signal: "Faible", last: "18 min" },
  { id: "CAP-POD-004", type: "Camera faune", lieu: "Podor Reserve", bat: 24, temp: 36.4, hum: 33, signal: "Critique", last: "2h" },
  { id: "CAP-DAG-005", type: "Dendrometrie", lieu: "Dagana Mangrove", bat: 78, temp: 29.8, hum: 71, signal: "Bon", last: "1 min" },
  { id: "CAP-LOU-006", type: "Station meteo", lieu: "Louga Sud", bat: 55, temp: 37.9, hum: 28, signal: "Moyen", last: "12 min" },
];

const gateways = [
  { nom: "GW-Linguere", protocole: "LoRaWAN SF10", capteurs: 24, uptime: "99.7%", lat: 15.12, lng: -15.12 },
  { nom: "GW-Ranerou", protocole: "LoRaWAN SF11", capteurs: 18, uptime: "98.2%", lat: 15.29, lng: -13.97 },
  { nom: "GW-Matam", protocole: "LoRaWAN SF10", capteurs: 31, uptime: "99.1%", lat: 15.66, lng: -13.25 },
  { nom: "GW-Bakel", protocole: "LoRaWAN SF12", capteurs: 12, uptime: "97.8%", lat: 14.90, lng: -12.45 },
];

const alertesCapteurs = [
  { capteur: "CAP-POD-004", type: "Batterie critique", valeur: "24%", priorite: "Haute" },
  { capteur: "CAP-MAT-003", type: "Signal faible", valeur: "-89 dBm", priorite: "Moyenne" },
  { capteur: "CAP-RAN-002", type: "Secheresse critique", valeur: "Humidite 18%", priorite: "Haute" },
];

export default function IotCapteursPage() {
  const [tab, setTab] = useState<"reseau" | "gateways" | "alertes">("reseau");
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden bg-slate-950 rounded-3xl p-8 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/8 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-cyan-700 rounded-2xl flex items-center justify-center">
              <Radio size={24} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">IA AVANCEE - IOT EDGE</p>
              <h1 className="text-2xl font-black text-white">IoT & Capteurs Edge</h1>
              <p className="text-slate-400 text-sm mt-1">Reseau LoRaWAN - Stations meteo - Cameras faune - Dendrometres - Edge computing</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Capteurs actifs", value: "247", color: "text-cyan-400" },
              { label: "Gateways LoRaWAN", value: "18", color: "text-emerald-400" },
              { label: "Alertes actives", value: "3", color: "text-red-400" },
              { label: "Donnees/heure", value: "12 400", color: "text-blue-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className={`text-xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {([["reseau","Reseau capteurs"],["gateways","Gateways LoRaWAN"],["alertes","Alertes IoT"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === id ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>{label}</button>
        ))}
      </div>
      {tab === "reseau" && (
        <div className="space-y-3">
          {capteurs.map(c => (
            <div key={c.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full shrink-0 ${c.signal === "Bon" ? "bg-emerald-500" : c.signal === "Moyen" ? "bg-amber-400" : c.signal === "Faible" ? "bg-orange-500" : "bg-red-500"}`} />
              <div className="w-28 shrink-0">
                <p className="text-xs font-black text-slate-900">{c.id}</p>
                <p className="text-[10px] text-slate-400">{c.type}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-700">{c.lieu}</p>
                <p className="text-xs text-slate-400">Derniere donnee : {c.last}</p>
              </div>
              <div className="flex gap-4 shrink-0">
                <div className="flex items-center gap-1 text-xs text-slate-600"><Thermometer size={12} className="text-red-400" />{c.temp}C</div>
                <div className="flex items-center gap-1 text-xs text-slate-600"><Droplets size={12} className="text-blue-400" />{c.hum}%</div>
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  <div className={`w-1.5 h-1.5 rounded-full ${c.bat > 50 ? "bg-emerald-500" : c.bat > 25 ? "bg-amber-400" : "bg-red-500"}`} />
                  {c.bat}%
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.signal === "Bon" ? "bg-emerald-100 text-emerald-700" : c.signal === "Moyen" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{c.signal}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "gateways" && (
        <div className="grid md:grid-cols-2 gap-4">
          {gateways.map(g => (
            <div key={g.nom} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-black text-slate-900">{g.nom}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{g.protocole}</p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">{g.uptime} uptime</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3"><p className="text-[10px] text-slate-400">Capteurs connectes</p><p className="text-lg font-black text-slate-900">{g.capteurs}</p></div>
                <div className="bg-slate-50 rounded-xl p-3"><p className="text-[10px] text-slate-400">Coordonnees GPS</p><p className="text-xs font-black text-slate-700">{g.lat}N {g.lng}W</p></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "alertes" && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5"><Radio size={20} className="text-red-600 mb-2" /><p className="text-2xl font-black text-red-700">3</p><p className="text-xs text-red-600">Alertes actives</p></div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5"><Wind size={20} className="text-amber-600 mb-2" /><p className="text-2xl font-black text-amber-700">247</p><p className="text-xs text-amber-600">Capteurs surveilles</p></div>
            <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5"><Camera size={20} className="text-cyan-600 mb-2" /><p className="text-2xl font-black text-cyan-700">38</p><p className="text-xs text-cyan-600">Cameras faune actives</p></div>
          </div>
          {alertesCapteurs.map(a => (
            <div key={a.capteur} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full shrink-0 ${a.priorite === "Haute" ? "bg-red-500" : "bg-amber-400"}`} />
              <div className="flex-1">
                <p className="text-sm font-black text-slate-900">{a.capteur} - {a.type}</p>
                <p className="text-xs text-slate-400">Valeur : {a.valeur}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${a.priorite === "Haute" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{a.priorite}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}