import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

export default function Analista() {
  const navigate = useNavigate();
  const [documentos, setDocumentos] = useState<any[]>([]);
  const [laudo, setLaudo] = useState<any>(null);
  const [minuta, setMinuta] = useState<string | null>(null);
  const [seloEmitido, setSeloEmitido] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleToast = (msg: string) => setToastMsg(msg);

  useEffect(() => {
    fetch("/api/db/documentos_analista")
      .then((res) => res.json())
      .then((data) => setDocumentos(data));
  }, []);

  const handleRodarSemaforo = async () => {
    const res = await fetch("/api/analisar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    setLaudo(data);

    // Gera minuta tecnica real baseada nos artigos
    let textoMinuta = `PARECER TÉCNICO - SÍTIO BOA ESPERANÇA\n\n`;
    textoMinuta += `1. RESERVA LEGAL:\nConforme ${data.citacoes[0].fonte_legal}, exige-se ${data.rl.percentual_exigido}%. O imóvel possui déficit de ${data.rl.deficit_ha} ha.\n\n`;
    textoMinuta += `2. ÁREA DE PRESERVAÇÃO PERMANENTE (APP):\nConforme ${data.citacoes[1].fonte_legal}, a regra geral exige faixa de ${data.app.faixa_regra_geral_m}m. Contudo, sendo área consolidada em imóvel até 4 módulos fiscais, aplica-se a recomposição de ${data.app.faixa_recomposicao_consolidada_m}m (Art. 61-A).\n\n`;
    textoMinuta += `3. ENQUADRAMENTO:\nO imóvel apresenta pendências (${data.enquadramento.toUpperCase()}). Recomenda-se adesão ao PRA e CRA.\n`;

    setMinuta(textoMinuta);
  };

  const handleCarimbar = () => {
    setSeloEmitido(true);
    // Em um cenario real, dispararia webhook para n8n aqui
    console.log(
      "Disparando webhook para n8n (WhatsApp) com o Selo CARimbo Verde",
    );
  };

  const getCorSemaforo = (status: string) => {
    if (status === "verde")
      return "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.7)]";
    if (status === "amarelo")
      return "bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.7)]";
    if (status === "vermelho")
      return "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)]";
    return "bg-gray-300";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900">
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 flex flex-col md:flex-row gap-6">
        {/* Painel Esquerdo: Semáforo dos Estudos */}
        <div className="w-full md:w-1/3">
          <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-lg font-bold text-blue-900 mb-4 border-b pb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">
                traffic
              </span>
              Semáforo dos Estudos
            </h2>
            <div className="text-xs text-gray-500 mb-4 italic">
              * Mock heurístico determinístico para a demo.
            </div>
            <div className="flex flex-col gap-4">
              {documentos.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 border rounded bg-gray-50 hover:bg-gray-100 transition"
                >
                  <span className="font-bold text-sm text-gray-700">
                    {doc.tipo}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full ${getCorSemaforo(doc.status)}`}
                  ></div>
                </div>
              ))}
            </div>

            <button
              onClick={handleRodarSemaforo}
              className="mt-6 w-full bg-blue-700 text-white font-bold uppercase py-3 rounded text-xs hover:bg-blue-800 transition shadow flex justify-center items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">
                troubleshoot
              </span>
              🚥 Rodar Semáforo dos Estudos
            </button>
          </div>
        </div>

        {/* Painel Direito: Minuta e Parecer */}
        <div className="w-full md:w-2/3">
          {laudo && minuta ? (
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4 border-b pb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Minuta Técnica Gerada
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Baseada em regras determinísticas cruzadas com geometria
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded text-xs font-bold uppercase ${laudo.enquadramento === "vermelho" ? "bg-red-100 text-red-700 border border-red-200" : "bg-green-100 text-green-700 border border-green-200"}`}
                >
                  {laudo.enquadramento}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded border border-gray-200 font-mono text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                {minuta}
              </div>

              <div className="mt-6 flex justify-end">
                {!seloEmitido ? (
                  <button
                    onClick={handleCarimbar}
                    className="bg-[#2EAD4B] text-white px-6 py-3 rounded font-black uppercase text-sm hover:bg-green-600 transition shadow-lg flex items-center gap-2 transform hover:scale-105"
                  >
                    <span className="material-symbols-outlined">verified</span>
                    CARimba que é Top!
                  </button>
                ) : (
                  <div className="flex items-center gap-3 bg-green-50 border border-green-200 px-4 py-3 rounded text-green-800">
                    <span className="material-symbols-outlined text-3xl text-green-600">
                      military_tech
                    </span>
                    <div>
                      <p className="font-black uppercase text-sm">
                        Selo CARimbo Verde Emitido!
                      </p>
                      <p className="text-xs">
                        Notificação enviada ao produtor (n8n/WhatsApp).
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 p-8 text-center">
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-400">
                  <span className="material-symbols-outlined text-3xl">
                    fact_check
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-700">
                  Aguardando Análise
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Clique em "Rodar Semáforo" para gerar a minuta determinística.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </div>
  );
}
