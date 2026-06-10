"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { CommuneGeo } from "@/types";

const statutColor: Record<string, string> = {
  EN_COURS:  "#2E8B57",
  PLANIFIE:  "#2196F3",
  TERMINE:   "#9C27B0",
  ABANDONNE: "#F44336",
};

const statutLabel: Record<string, string> = {
  EN_COURS:  "En cours",
  PLANIFIE:  "Planifié",
  TERMINE:   "Terminé",
  ABANDONNE: "Abandonné",
};

export default function CarteGMV() {
  const [communes, setCommunes] = useState<CommuneGeo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtre, setFiltre] = useState<string>("TOUS");

  useEffect(() => {
    fetch("/api/communes")
      .then((r) => r.json())
      .then((data) => { setCommunes(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filtre === "TOUS" ? communes : communes.filter((c) => c.statut === filtre);

  return (
    <div className="relative h-full w-full">
      {/* Légende & filtres */}
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-xl shadow-lg p-4 min-w-[180px]">
        <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Statut communes</p>
        {["TOUS", ...Object.keys(statutColor)].map((s) => (
          <button
            key={s}
            onClick={() => setFiltre(s)}
            className={`flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-lg text-xs transition-all mb-1 ${
              filtre === s ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
            }`}
          >
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: s === "TOUS" ? "#888" : statutColor[s] }}
            />
            {s === "TOUS" ? "Toutes" : statutLabel[s]}
            {s !== "TOUS" && (
              <span className="ml-auto text-gray-400">
                {communes.filter((c) => c.statut === s).length}
              </span>
            )}
          </button>
        ))}
        <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
          {filtered.length} commune(s) affichée(s)
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 z-[999] flex items-center justify-center bg-white/60">
          <div className="animate-spin w-8 h-8 border-4 border-[#2E8B57] border-t-transparent rounded-full" />
        </div>
      )}

      <MapContainer
        center={[14.4974, -14.4524]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filtered.map((commune) => (
          <CircleMarker
            key={commune.id}
            center={[commune.latitude, commune.longitude]}
            radius={8}
            pathOptions={{
              fillColor: statutColor[commune.statut] ?? "#888",
              fillOpacity: 0.85,
              color: "#fff",
              weight: 1.5,
            }}
          >
            <Popup>
              <div className="min-w-[180px]">
                <p className="font-bold text-gray-900 text-sm">{commune.nom}</p>
                <p className="text-xs text-gray-500 mb-2">{commune.region?.nom}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Statut</span>
                    <span
                      className="font-medium px-1.5 py-0.5 rounded text-white text-xs"
                      style={{ backgroundColor: statutColor[commune.statut] }}
                    >
                      {statutLabel[commune.statut]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Parcelles</span>
                    <span className="font-medium">{commune._count?.parcelles ?? 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Saisies terrain</span>
                    <span className="font-medium">{commune._count?.saisies ?? 0}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
