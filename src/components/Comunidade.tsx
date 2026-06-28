import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

export default function Comunidade() {
  const navigate = useNavigate();
  const [metas, setMetas] = useState<any>(null);
  const [toastMsg, setToastMsg] = useState("");

  const handleToast = (msg: string) => setToastMsg(msg);

  useEffect(() => {
    fetch("/api/db/metas_comunidade")
      .then((res) => res.json())
      .then((data) => setMetas(data));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900">
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Termômetro Verde (RF08) */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-orange-100">
            <h2 className="text-lg font-bold text-orange-900 mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-600">
                thermometer
              </span>
              Termômetro Verde
            </h2>
            <p className="text-xs text-gray-500 mb-6 italic">
              Dados agregados, proteção de privacidade ativa (nunca expõe o
              associado individual).
            </p>

            {metas ? (
              <div className="text-center">
                <p className="text-sm font-bold text-gray-700 uppercase mb-2">
                  Associação {metas.associacao}
                </p>
                <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#f3f4f6"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#E65100"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={`${metas.porcentagem_regular * 2.51} 251`}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-black text-orange-700">
                      {metas.porcentagem_regular}%
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase">
                      Regularizados
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-xs font-bold text-gray-600">
                  {metas.total_produtores} Produtores na base
                </p>
              </div>
            ) : (
              <div className="animate-pulse bg-gray-200 h-48 rounded"></div>
            )}
          </div>
        </div>

        {/* Kit Radinho da Terra (RF07) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#E65100]">
                radio
              </span>
              Kit Radinho da Terra
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded p-4 bg-orange-50 hover:bg-orange-100 transition cursor-pointer flex flex-col items-center justify-center text-center gap-2">
                <span className="material-symbols-outlined text-4xl text-orange-600">
                  music_note
                </span>
                <h3 className="font-bold text-orange-900 leading-tight">
                  Rádio Viola do Sertão
                </h3>
                <p className="text-[11px] text-orange-800 italic mt-1">
                  A rádio divulga o MP3 da paródia CARcantado e comemora mais 10 CARimbos verdes na avenida rural!
                </p>
                <button className="mt-2 text-xs font-bold uppercase bg-white border border-orange-200 text-orange-800 px-3 py-1 rounded">
                  <span className="material-symbols-outlined text-[14px] align-middle mr-1">
                    download
                  </span>
                  📻 Baixar para o Radinho da Terra
                </button>
              </div>

              <div className="border rounded p-4 bg-blue-50 hover:bg-blue-100 transition cursor-pointer flex flex-col items-center justify-center text-center gap-2">
                <span className="material-symbols-outlined text-4xl text-blue-600">
                  movie
                </span>
                <h3 className="font-bold text-blue-900">Vitrine TiCARtok</h3>
                <p className="text-[11px] text-blue-800 italic mt-1 px-2">
                  O próprio CAR DA GENTE coloca o vídeo no tiktok que divulga de forma interativa e completa a informação para que o usuário solicite seu serviço.
                </p>
                <button
                  className="mt-2 text-xs font-bold uppercase bg-white border border-blue-200 text-blue-800 px-3 py-1 rounded"
                  onClick={() => handleToast("Carregando vídeo...")}
                >
                  <span className="material-symbols-outlined text-[14px] align-middle mr-1">
                    play_arrow
                  </span>
                  Assistir
                </button>
              </div>
            </div>
          </div>

          {/* Histórias da Terra */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-50 -z-10"></div>

            <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-yellow-600">
                psychiatry
              </span>
              Histórias da Terra
            </h2>
            <p className="text-xs text-gray-600 mb-4">
              Envie seu relato (áudio, texto ou foto) e faça parte da nossa
              galeria de preservadores.
            </p>

            <div className="flex gap-2 mb-4">
              <button
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded text-xs font-bold flex items-center justify-center gap-1 transition"
                onClick={() =>
                  handleToast("Módulo de Gravação em desenvolvimento...")
                }
              >
                <span className="material-symbols-outlined text-sm">mic</span>{" "}
                🗣️ Contar minha História da Terra
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded p-4 mt-4">
              <p className="text-xs font-bold text-blue-800 uppercase mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  smart_toy
                </span>
                Stub Tecnológico
              </p>
              <p className="text-xs text-blue-700">
                Na versão completa, este módulo aciona um pipeline no n8n (com
                integração LLM/Vídeo) para converter as histórias em vídeos
                animados estilo TiCARtok, preservando a identidade visual sem
                expor diretamente o usuário, salvo consentimento.
              </p>
            </div>
          </div>
        </div>
      </main>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </div>
  );
}
