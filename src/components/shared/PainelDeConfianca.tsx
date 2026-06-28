import React from "react";

interface PainelDeConfiancaProps {
  iaContent: React.ReactNode;
  motorContent: React.ReactNode;
}

export default function PainelDeConfianca({ iaContent, motorContent }: PainelDeConfiancaProps) {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-0 border border-[var(--rule)] rounded-xl overflow-hidden shadow-md">
      
      {/* Bloco IA (Tradução) */}
      <div className="flex-1 bg-[var(--ai-bg)] p-5 sm:p-6 flex flex-col relative border-b lg:border-b-0 lg:border-r border-[var(--rule)]">
        <div className="flex items-center gap-2 mb-4 opacity-80">
          <span className="material-symbols-outlined text-[16px] text-[#1351B4]">auto_awesome</span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#1351B4]">
            TRADUÇÃO — gerada por IA a partir do cálculo
          </span>
        </div>
        <div className="flex-1 text-gray-800">
          {iaContent}
        </div>
      </div>

      {/* Bloco Motor (Determinístico) */}
      <div className="flex-1 bg-[var(--trust-bg)] p-5 sm:p-6 flex flex-col relative">
        <div className="flex items-center gap-2 mb-4 opacity-80">
          <span className="material-symbols-outlined text-[16px] text-[var(--trust-ink)]">calculate</span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--trust-ink)]">
            CÁLCULO DETERMINÍSTICO &middot; com fonte legal
          </span>
        </div>
        <div className="flex-1 text-[var(--trust-ink)]">
          {motorContent}
        </div>
        
        <div className="mt-6 pt-4 border-t border-[var(--rule)]/50">
          <p className="text-[10px] text-[var(--trust-ink)]/70 uppercase font-semibold leading-relaxed">
            Estes números não foram gerados por IA. Foram calculados por regras do Código Florestal sobre a geometria do seu imóvel.
          </p>
        </div>
      </div>

    </div>
  );
}
