import React, { useState, useRef, useCallback } from "react";
import {
  analisarImagem,
  type ResultadoAnalise,
  type ContextoUpload,
} from "../motor/analisarImagem";

interface AnaliseImagemModalProps {
  contexto: ContextoUpload;
  onClose: () => void;
  /** Chamado quando a análise é concluída — útil para o componente pai registrar o resultado */
  onAnalise?: (resultado: ResultadoAnalise) => void;
}

type Tela = "orientacao" | "upload" | "triagem" | "classificacao" | "resultado";

const LABELS_CONTEXTO: Record<ContextoUpload, string> = {
  cadastro: "Cadastro do Imóvel",
  pendencia: "Evidência de Pendência",
  retificacao: "Retificação de Dados",
};

export default function AnaliseImagemModal({
  contexto,
  onClose,
  onAnalise,
}: AnaliseImagemModalProps) {
  const [tela, setTela] = useState<Tela>("orientacao");
  const [resultado, setResultado] = useState<ResultadoAnalise | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // ── Perguntas de orientação (tela 1) ──────────────────────────────────────
  const [respostas, setRespostas] = useState<Record<string, boolean>>({});
  const perguntas = [
    { id: "rio", icone: "💧", label: "Tem rio?" },
    { id: "mata", icone: "🌳", label: "Tem mata?" },
    { id: "plantio", icone: "🌾", label: "Tem plantio?" },
    { id: "casa", icone: "🏠", label: "Tem casa?" },
    { id: "cerca", icone: "🪧", label: "Tem cerca?" },
  ];

  // ── Handlers de arquivo ───────────────────────────────────────────────────
  const processarArquivo = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setErro("Por favor, envie apenas fotos (JPG, PNG, HEIC).");
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setTela("triagem");
      setCarregando(true);
      setErro(null);

      try {
        // Simula latência de análise para tornar a demo mais realista
        await new Promise((r) => setTimeout(r, 1800));
        const res = await analisarImagem(file, contexto);
        setResultado(res);
        onAnalise?.(res);

        if (!res.qualidade.ok) {
          setTela("triagem");
        } else {
          setTela("classificacao");
        }
      } catch {
        setErro("Erro ao analisar a foto. Tente novamente.");
      } finally {
        setCarregando(false);
      }
    },
    [contexto, onAnalise],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processarArquivo(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processarArquivo(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const corAlerta = (cor: string) => {
    const map: Record<string, string> = {
      azul: "bg-blue-50 border-blue-300 text-blue-900",
      verde: "bg-green-50 border-green-300 text-green-900",
      amarelo: "bg-yellow-50 border-yellow-300 text-yellow-900",
      vermelho: "bg-red-50 border-red-300 text-red-900",
      cinza: "bg-gray-50 border-gray-300 text-gray-900",
    };
    return map[cor] ?? map.cinza;
  };

  // ── Renders por tela ──────────────────────────────────────────────────────

  const renderOrientacao = () => (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* CARlinha */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <div className="w-12 h-12 rounded-full border-2 border-blue-200 shrink-0 overflow-hidden bg-white shadow">
          <img src="/carlinha.png" alt="CARlinha" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-sm font-bold text-blue-900 leading-tight">
            Seu Raimundo, vamos tirar uma foto do seu imóvel!
          </p>
          <p className="text-xs text-blue-700 mt-1 leading-relaxed">
            Isso me ajuda a entender melhor o que tem no seu terreno e te orientar sobre as regras do Código Florestal.
          </p>
        </div>
      </div>

      {/* Perguntas de pré-orientação */}
      <div>
        <p className="text-sm font-bold text-gray-700 mb-3">
          O que tem no seu imóvel? (toque para marcar)
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {perguntas.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() =>
                setRespostas((prev) => ({ ...prev, [p.id]: !prev[p.id] }))
              }
              aria-pressed={respostas[p.id]}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center min-h-[80px] ${
                respostas[p.id]
                  ? "border-[#1351b4] bg-blue-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-3xl" role="img" aria-label={p.label}>
                {p.icone}
              </span>
              <span className="text-xs font-bold text-gray-700">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-col gap-3 mt-2">
        <button
          type="button"
          onClick={() => setTela("upload")}
          className="w-full flex items-center justify-center gap-2 bg-[#1351b4] text-white py-4 rounded-xl text-base font-bold shadow-lg hover:bg-blue-800 transition active:scale-95 min-h-[56px]"
        >
          <span className="material-symbols-outlined">photo_camera</span>
          TIRAR FOTO AGORA
        </button>
        <button
          type="button"
          onClick={() => setTela("upload")}
          className="w-full flex items-center justify-center gap-2 border-2 border-[#1351b4] text-[#1351b4] py-3 rounded-xl text-sm font-bold hover:bg-blue-50 transition active:scale-95 min-h-[48px]"
        >
          <span className="material-symbols-outlined">photo_library</span>
          Escolher da galeria
        </button>
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="flex flex-col gap-4 animate-fade-in">
      <p className="text-sm font-bold text-gray-700">
        📷 Envie a foto do seu imóvel
      </p>
      <p className="text-xs text-gray-500">
        Tire uma foto clara, em área iluminada. Quanto mais próximo do elemento (água, mata, cerca), melhor!
      </p>

      {/* Drop zone */}
      <div
        ref={dropZoneRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all min-h-[220px] ${
          isDragging
            ? "border-[#1351b4] bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:border-gray-400"
        }`}
      >
        <span className="material-symbols-outlined text-5xl text-gray-400">
          upload_file
        </span>
        <p className="text-sm text-gray-600 text-center">
          Arraste a foto aqui ou{" "}
          <span className="text-[#1351b4] font-bold underline">clique para selecionar</span>
        </p>
        <p className="text-xs text-gray-400">JPG, PNG, HEIC — até 10MB</p>
      </div>

      {/* Input real (captura câmera em mobile) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
        id="car-foto-input"
        aria-label="Selecionar foto do imóvel"
      />

      {erro && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          ⚠️ {erro}
        </div>
      )}

      <button
        type="button"
        onClick={() => setTela("orientacao")}
        className="text-sm text-gray-500 hover:text-gray-700 underline self-start"
      >
        ← Voltar
      </button>
    </div>
  );

  const renderTriagem = () => (
    <div className="flex flex-col gap-4 animate-fade-in">
      {/* Preview da imagem */}
      {previewUrl && (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 max-h-[280px]">
          <img
            src={previewUrl}
            alt="Foto enviada"
            className="w-full h-[280px] object-cover"
          />
          {carregando && (
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
              <p className="text-white text-sm font-bold">Analisando foto...</p>
            </div>
          )}
        </div>
      )}

      {/* Resultado da triagem */}
      {!carregando && resultado && (
        <>
          {resultado.qualidade.ok ? (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
              <span className="text-2xl">✅</span>
              <div>
                <p className="text-sm font-bold text-green-900">Foto aprovada!</p>
                <p className="text-xs text-green-700">
                  Qualidade {resultado.qualidade.qualidade} — analisando o que tem na imagem...
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
              <span className="text-2xl">❌</span>
              <div>
                <p className="text-sm font-bold text-red-900">Foto não aprovada</p>
                <p className="text-xs text-red-700">{resultado.qualidade.motivo}</p>
              </div>
            </div>
          )}

          {!resultado.qualidade.ok && (
            <button
              type="button"
              onClick={() => {
                setTela("upload");
                setPreviewUrl(null);
                setResultado(null);
              }}
              className="w-full bg-[#1351b4] text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-800 transition"
            >
              📷 Tirar outra foto
            </button>
          )}

          {resultado.qualidade.ok && (
            <button
              type="button"
              onClick={() => setTela("classificacao")}
              className="w-full bg-[#1351b4] text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-800 transition"
            >
              Ver o que foi encontrado →
            </button>
          )}
        </>
      )}
    </div>
  );

  const renderClassificacao = () => (
    <div className="flex flex-col gap-4 animate-fade-in">
      {/* Imagem com overlay visual */}
      <div className="relative rounded-xl overflow-hidden border border-gray-200">
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Foto analisada"
            className="w-full max-h-[260px] object-cover"
          />
        )}
        {/* Chips de classes detectadas sobrepostos */}
        {resultado && (
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
            {resultado.classes.map((c) => (
              <span
                key={c.classe}
                className={`inline-flex items-center gap-1 ${c.cor} bg-opacity-90 text-white text-xs font-bold px-2 py-1 rounded-full shadow`}
              >
                {c.icone} {c.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <p className="text-sm font-bold text-gray-700">
        🔍 O que a CARlinha encontrou na foto:
      </p>

      {resultado?.classes.map((c) => (
        <div
          key={c.classe}
          className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 shadow-sm"
        >
          <span className="text-2xl">{c.icone}</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-800">{c.label}</p>
            <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${c.cor} rounded-full transition-all`}
                style={{ width: `${c.confianca}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Confiança: {c.confianca}%
            </p>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => setTela("resultado")}
        className="w-full bg-[#1351b4] text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-800 transition mt-2"
      >
        Ver o que isso significa →
      </button>
    </div>
  );

  const renderResultado = () => (
    <div className="flex flex-col gap-4 animate-fade-in">
      {/* Mensagem CARlinha */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <div className="w-10 h-10 rounded-full border-2 border-blue-200 shrink-0 overflow-hidden bg-white shadow">
          <img src="/carlinha.png" alt="CARlinha" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-sm font-bold text-blue-900">CARlinha diz:</p>
          <p className="text-sm text-blue-800 mt-1 leading-relaxed">
            {resultado?.mensagemCurta}
          </p>
        </div>
      </div>

      {/* Alertas legais */}
      <div className="flex flex-col gap-3">
        {resultado?.alertas.map((a, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 border rounded-xl p-3 ${corAlerta(a.cor)}`}
          >
            <span className="text-2xl shrink-0">{a.icone}</span>
            <div>
              <p className="text-sm font-bold leading-tight">{a.mensagem}</p>
              <p className="text-xs opacity-60 mt-1">{a.fonte_legal}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Flag de revisão humana */}
      {resultado?.precisaRevisaoHumana && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 flex items-start gap-2">
          <span className="material-symbols-outlined text-purple-600 text-lg mt-0.5">
            support_agent
          </span>
          <p className="text-xs text-purple-800">
            <strong>Análise técnica necessária.</strong> Um analista ambiental vai revisar essa foto para garantir a orientação correta.
          </p>
        </div>
      )}

      {/* Registro de auditoria */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-2">
        <span className="material-symbols-outlined text-gray-400 text-sm">
          check_circle
        </span>
        <p className="text-xs text-gray-500">
          Foto registrada para auditoria em{" "}
          {resultado?.timestamp
            ? new Date(resultado.timestamp).toLocaleString("pt-BR")
            : "—"}
        </p>
      </div>

      {/* Ações */}
      <div className="flex flex-col gap-2 mt-2">
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-[#2EAD4B] text-white py-3 rounded-xl text-sm font-bold hover:bg-green-600 transition shadow"
        >
          ✅ Entendido! Fechar
        </button>
        <button
          type="button"
          onClick={() => {
            setTela("orientacao");
            setResultado(null);
            setPreviewUrl(null);
            setRespostas({});
          }}
          className="w-full border border-gray-300 text-gray-600 py-2 rounded-xl text-sm hover:bg-gray-50 transition"
        >
          📷 Enviar outra foto
        </button>
      </div>
    </div>
  );

  // ── Progresso visual ──────────────────────────────────────────────────────
  const TELAS: Tela[] = ["orientacao", "upload", "triagem", "classificacao", "resultado"];
  const progresso = ((TELAS.indexOf(tela) + 1) / TELAS.length) * 100;

  const titulos: Record<Tela, string> = {
    orientacao: "Tire uma foto do imóvel",
    upload: "Enviar foto",
    triagem: "Verificando foto...",
    classificacao: "O que foi encontrado",
    resultado: "Resultado da análise",
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Análise de imagem do imóvel"
    >
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-gray-100 shrink-0">
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wide">
              {LABELS_CONTEXTO[contexto]}
            </p>
            <h2 className="text-base font-bold text-gray-800">{titulos[tela]}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Barra de progresso */}
        <div className="h-1 bg-gray-100 shrink-0">
          <div
            className="h-1 bg-[#1351b4] transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4">
          {tela === "orientacao" && renderOrientacao()}
          {tela === "upload" && renderUpload()}
          {tela === "triagem" && renderTriagem()}
          {tela === "classificacao" && renderClassificacao()}
          {tela === "resultado" && renderResultado()}
        </div>
      </div>
    </div>
  );
}
