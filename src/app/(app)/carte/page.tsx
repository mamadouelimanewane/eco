"use client";
import dynamic from "next/dynamic";
import { Map } from "lucide-react";

const CarteGMV = dynamic(() => import("@/components/map/CarteGMV"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <div className="text-center">
        <Map size={40} className="mx-auto mb-3 text-gray-300" />
        <p className="text-gray-400 text-sm">Chargement de la carte GMV...</p>
      </div>
    </div>
  ),
});

export default function CartePage() {
  return (
    <div className="flex flex-col" style={{ height: "calc(100vh)" }}>
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Carte de la Grande Muraille Verte</h1>
          <p className="text-sm text-gray-500">850 km · 131 communes · Sénégal</p>
        </div>
        <a
          href="/api/communes"
          target="_blank"
          className="text-xs px-3 py-1.5 bg-[#2E8B57] text-white rounded-lg hover:bg-[#1A6B3A] transition-colors"
        >
          Exporter données
        </a>
      </div>
      <div className="flex-1 overflow-hidden">
        <CarteGMV />
      </div>
    </div>
  );
}
