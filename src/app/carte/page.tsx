import dynamic from "next/dynamic";

const CarteGMV = dynamic(() => import("@/components/map/CarteGMV"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-50">
      <div className="text-center">
        <div className="animate-spin w-10 h-10 border-4 border-[#2E8B57] border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Chargement de la carte GMV...</p>
      </div>
    </div>
  ),
});

export default function CartePage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
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

      {/* Carte full-height */}
      <div className="flex-1 overflow-hidden">
        <CarteGMV />
      </div>
    </div>
  );
}
