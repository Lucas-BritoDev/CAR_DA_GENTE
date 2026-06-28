/**
 * ResultadoAnaliseCard — Exibe o resultado da análise de imagem da CARlinha
 * com impacto visual, alertas legais e orientação de próximo passo.
 *
 * Usado em CadastrarImovel (step GEO) e Produtor (pendências).
 */
import type { ResultadoAnalise } from "../../motor/analisarImagem";

interface ResultadoAnaliseCardProps {
  resultado: ResultadoAnalise;
  onEnviarOutra: () => void;
}

const COR_BORDA: Record<string, string> = {
  azul: "border-blue-400 bg-blue-50",
  verde: "border-green-400 bg-green-50",
  amarelo: "border-yellow-400 bg-yellow-50",
  vermelho: "border-red-400 bg-red-50",
  cinza: "border-gray-300 bg-gray-50",
};

const COR_TEXTO: Record<string, string> = {
  azul: "text-blue-900",
  verde: "text-green-900",
  amarelo: "text-yellow-900",
  vermelho: "text-red-900",
  cinza: "text-gray-700",
};

const COR_BADGE: Record<string, string> = {
  azul: "bg-blue-100 text-blue-800",
  verde: "bg-green-100 text-green-800",
  amarelo: "bg-yellow-100 text-yellow-800",
  vermelho: "bg-red-100 text-red-800",
  cinza: "bg-gray-100 text-gray-600",
};

const IMPACTO_CAR: Record<string, string> = {
  APP: "Isso afeta a sua APP — Área de Preservação Permanente.",
  RL: "Isso pode ajudar a regularizar sua Reserva Legal.",
  AVISO: "Isso pode precisar de ação no seu cadastro.",
  OK: "Nenhuma situação crítica identificada.",
};

export default function ResultadoAnaliseCard({
  resultado,
  onEnviarOutra,
}: ResultadoAnaliseCardProps) {
  const { classes, alertas, mensagemCurta, qualidade, imagemDataUrl } = resultado;

  return (
    <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 shadow-md animate-fade-in">

      {/* Header: CARlinha com mensagem curta */}
      <div className="flex items-start gap-3 bg-blue-50 border-b border-blue-100 p-3">
        <div className="w-8 h-8 rounded-full border-2 border-blue-200 shrink-0 overflow-hidden bg-white shadow">
          <img src="/carlinha.png" alt="CARlinha" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-blue-900 leading-tight">CARlinha analisou a foto:</p>
          <p className="text-xs text-blue-800 mt-0.5 leading-relaxed">{mensagemCurta}</p>
        </div>
        {/* Badge de qualidade */}
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
          qualidade.qualidade === "alta" ? "bg-green-100 text-green-700" :
          qualidade.qualidade === "media" ? "bg-yellow-100 text-yellow-700" :
          "bg-red-100 text-red-700"
        }`}>
          {qualidade.qualidade === "alta" ? "✅ Foto boa" : qualidade.qualidade === "media" ? "⚠️ Aceitável" : "❌ Baixa qualidade"}
        </span>
      </div>

      {/* Miniatura + classes detectadas lado a lado */}
      {imagemDataUrl && (
        <div className="flex gap-0">
          <img
            src={imagemDataUrl}
            alt="Foto enviada"
            className="w-24 h-24 object-cover shrink-0"
          />
          <div className="flex-1 p-2 bg-white flex flex-col justify-center gap-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Detectado na foto:</p>
            {classes.map((c) => (
              <div key={c.classe} className="flex items-center gap-1.5">
                <span className="text-base leading-none">{c.icone}</span>
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-gray-800 leading-tight">{c.label}</p>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mt-0.5">
                    <div
                      className={`h-full ${c.cor} rounded-full`}
                      style={{ width: `${c.confianca}%` }}
                    />
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0">{c.confianca}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Impacto legal — o coração do card */}
      <div className="bg-white p-3 border-t border-gray-100">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-2">
          O que isso significa para o seu CAR:
        </p>
        <div className="flex flex-col gap-1.5">
          {alertas.map((a, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 border-l-4 rounded-r-lg px-2 py-1.5 ${COR_BORDA[a.cor] ?? COR_BORDA.cinza}`}
            >
              <span className="text-lg leading-none shrink-0">{a.icone}</span>
              <div className="flex-1">
                <p className={`text-xs font-bold leading-snug ${COR_TEXTO[a.cor] ?? COR_TEXTO.cinza}`}>
                  {a.mensagem}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">{IMPACTO_CAR[a.tipo]}</p>
                <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-1 ${COR_BADGE[a.cor] ?? COR_BADGE.cinza}`}>
                  {a.fonte_legal}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* Ação de rodapé */}
      <div className="flex gap-2 p-2 bg-gray-50 border-t border-gray-100">
        <button
          type="button"
          onClick={onEnviarOutra}
          className="flex-1 text-xs border border-gray-300 text-gray-600 py-1.5 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">photo_camera</span>
          Enviar outra foto
        </button>
        <div className="flex-1 flex items-center justify-center gap-1 bg-green-50 border border-green-200 rounded-lg px-2">
          <span className="material-symbols-outlined text-green-600 text-sm">check_circle</span>
          <p className="text-[11px] text-green-800 font-bold">Registrada para auditoria</p>
        </div>
      </div>
    </div>
  );
}
