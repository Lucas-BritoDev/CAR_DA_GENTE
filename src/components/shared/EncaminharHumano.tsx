export default function EncaminharHumano() {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4 w-full shadow-sm">
      <div className="flex items-center gap-3 text-orange-900">
        <span className="material-symbols-outlined text-2xl text-orange-600">support_agent</span>
        <div>
          <p className="font-bold text-sm">Este caso precisa de análise humana</p>
          <p className="text-xs opacity-90 mt-0.5">Regra ambígua ou conflito de legislação detectado. A IA não toma decisão final.</p>
        </div>
      </div>
      <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-bold shadow-sm flex items-center gap-2 whitespace-nowrap transition-colors">
        <span className="material-symbols-outlined text-[18px]">chat</span>
        Falar com Analista
      </button>
    </div>
  );
}
