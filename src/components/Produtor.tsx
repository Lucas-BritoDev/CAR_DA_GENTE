import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Toast from "./Toast";
import { analisar } from "../motor/laudo";
import { sitioBoaEsperancaInput } from "../fixtures/sitio_boa_esperanca";
import AnaliseImagemModal from "./AnaliseImagemModal";
import type { ResultadoAnalise } from "../motor/analisarImagem";
import SeloProcedencia from "./shared/SeloProcedencia";
import ResultadoAnaliseCard from "./shared/ResultadoAnaliseCard";

export default function Produtor() {
  const navigate = useNavigate();
  const imovelSelecionado = localStorage.getItem("imovelAtual") || "Sítio Boa Esperança";
  const [documentos, setDocumentos] = useState<any[]>([]);
  const [laudo, setLaudo] = useState<any>(null);
  const [minuta, setMinuta] = useState<string | null>(null);
  const [camadas, setCamadas] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"laudo" | "calc" | "selo" | "zap">(
    "laudo",
  );
  const [valorCredito, setValorCredito] = useState<number>(150000);
  const [toastMsg, setToastMsg] = useState("");
  const [showAnaliseModal, setShowAnaliseModal] = useState(false);
  const [analisePendencia, setAnalisePendencia] = useState<ResultadoAnalise | null>(null);

  const handleToast = (msg: string) => setToastMsg(msg);

  const baixarSeloPDF = async () => {
    try {
      handleToast("Gerando PDF, aguarde...");
      const element = document.getElementById("pdf-selo-template");
      if (!element) return;
      
      const { default: html2canvas } = await import("html2canvas");
      const { jsPDF } = await import("jspdf");
      
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Selo_CARimbo_Verde_${imovelSelecionado.replace(/ /g, "_")}.pdf`);
      
      handleToast("Selo baixado com sucesso! 🎉");
    } catch (err) {
      console.error(err);
      handleToast("Erro ao gerar o PDF do selo.");
    }
  };


  useEffect(() => {
    if (imovelSelecionado === "Fazenda CAR da Gente") {
      setDocumentos([
        { id: 2, titulo: "Cadastro aguardando análise", status: "em_analise", isCarDaGente: true, data: "2026-06-25" }
      ]);
    } else if (imovelSelecionado === "Fazenda Esperança") {
      setDocumentos([
        { id: 3, titulo: "Cadastro Aprovado", status: "aprovado", isEsperanca: true, data: "2026-05-10" }
      ]);
    } else {
      setDocumentos([
        { id: 1, imovel_id: "sitio_boa_esperanca_001", titulo: "Notificação de Regularização de APP e RL", status: "pendente", quero_entender: true, data: "2026-06-20" }
      ]);
    }
  }, [imovelSelecionado]);

  const handleQueroEntender = async () => {
    // Roda o motor determinístico localmente no frontend!
    const laudoData = analisar(sitioBoaEsperancaInput);
    setLaudo(laudoData);

    // Mock geo layers
    setCamadas({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: sitioBoaEsperancaInput.geometria.geometry,
          properties: { zona: "imovel" }
        }
      ]
    });
  };

  const handleGerarMinuta = async () => {
    // Simula a geração da minuta
    setMinuta("Eu, Raimundo, portador do CPF XXX, comprometo-me a recompor 15m de APP e compensar 4.2ha de RL via CRA conforme as leis estipuladas no laudo Cidadão.");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900">
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 flex flex-col md:flex-row gap-6">
        {/* Lista de Documentos */}
        <div className="w-full md:w-1/3">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
            Pendências
          </h2>
          <div className="flex flex-col gap-4">
            {documentos.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500"
              >
                <h3 className="font-bold text-gray-700">{doc.titulo}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Enviado em {doc.data}
                </p>
                                {doc.isCarDaGente && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg relative overflow-hidden">
                    <div className="flex gap-3 items-center relative z-10">
                      <div className="w-10 h-10 rounded-full border-2 border-blue-200 shrink-0 shadow-md overflow-hidden bg-white">
                        <img src="/carlinha.png" alt="CARlinha" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-900 font-bold mb-1">
                          "Ô compadre, ocê já fez sua parte! O cadastro tá todo certinho e agora tá com os analistas. Fica sossegado que qualquer novidade eu te dou um grito aqui, viu?"
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {doc.isEsperanca && (
                  <div className="mt-4">
                    <div className="bg-white border border-green-200 rounded-lg p-4 mx-auto max-w-sm shadow-sm relative z-10">
                      <div className="w-20 h-20 mx-auto rounded-full bg-green-100 border-4 border-green-500 flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined text-4xl text-green-700">verified</span>
                      </div>
                      <p className="text-lg text-center font-bold text-green-800">Selo Carimbo Verde</p>
                      <p className="text-xs text-center text-gray-500 uppercase tracking-wide">Fazenda Esperança</p>
                      <div className="mt-2 text-center">
                        <button 
                          onClick={() => {
                            handleQueroEntender();
                            setActiveTab("selo");
                          }}
                          className="inline-block bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 rounded shadow-sm transition"
                        >
                          VER SELO
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {doc.quero_entender && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-400 opacity-10 animate-pulse"></div>
                    <div className="flex gap-3 items-center relative z-10">
                      <div className="w-10 h-10 rounded-full border-2 border-blue-200 shrink-0 shadow-md overflow-hidden bg-white">
                        <img src="/carlinha.png" alt="CARlinha" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-blue-900 leading-tight mb-1">
                          Posso te ajudar a entender essas pendências, sô?
                        </p>
                        <p className="text-[10px] text-blue-800">
                          Eu sento na mesa da cozinha contigo e explico a lei de um jeito clarinho e tranquilo.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleQueroEntender}
                      className="mt-3 w-full bg-blue-600 text-white text-xs font-bold uppercase py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700 transition relative z-10 shadow"
                    >
                      <span className="material-symbols-outlined text-sm">
                        record_voice_over
                      </span>
                      Chamar a Carlinha
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowAnaliseModal(true)}
                      className="mt-2 w-full bg-green-600 text-white text-xs font-bold uppercase py-2 rounded flex items-center justify-center gap-2 hover:bg-green-700 transition relative z-10 shadow"
                    >
                      <span className="material-symbols-outlined text-sm">photo_camera</span>
                      {analisePendencia ? "Enviar outra foto" : "📷 Enviar foto como evidência"}
                    </button>
                    {analisePendencia && (
                      <ResultadoAnaliseCard
                        resultado={analisePendencia}
                        onEnviarOutra={() => setShowAnaliseModal(true)}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Workspace Central */}
        <div className="w-full md:w-2/3">
          {laudo ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full border border-gray-200">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
                {imovelSelecionado !== "Fazenda Esperança" && (
                  <>
                    <button
                      onClick={() => setActiveTab("laudo")}
                      className={`flex-1 min-w-max px-4 py-3 text-xs font-bold uppercase ${activeTab === "laudo" ? "bg-white text-blue-700 border-t-2 border-blue-700" : "text-gray-500 hover:bg-gray-100"}`}
                    >
                      Resumo Atual
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("calc")}
                      className={`flex-1 min-w-max px-4 py-3 text-xs font-bold uppercase ${activeTab === "calc" ? "bg-white text-blue-700 border-t-2 border-blue-700" : "text-gray-500 hover:bg-gray-100"}`}
                    >
                      💰 calculadora financeira
                    </button>
                  </>
                )}
                {imovelSelecionado === "Fazenda Esperança" && (
                  <button
                    onClick={() => setActiveTab("selo")}
                    className={`flex-1 min-w-max px-4 py-3 text-xs font-bold uppercase ${activeTab === "selo" ? "bg-white text-blue-700 border-t-2 border-blue-700" : "text-gray-500 hover:bg-gray-100"}`}
                  >
                    🏅 CARimbo Verde
                  </button>
                )}
              </div>

              {/* Tab Content */}
              <div className="p-6 flex-1 overflow-y-auto">
                {activeTab === "laudo" && (
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="w-12 h-12 rounded-full border-2 border-blue-200 shrink-0 shadow-md overflow-hidden bg-white">
                        <img src="/carlinha.png" alt="CARlinha" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-blue-900">
                          CARlinha explica:
                        </h3>
                        <p className="text-sm text-gray-700 mt-1">
                          Olá Raimundo! Traduzimos a sua notificação. Você
                          tem um{" "}
                          <strong>
                            déficit de Reserva Legal de {laudo.rl.deficit_ha} ha
                          </strong>
                          . A boa notícia é que, pelo tamanho do seu imóvel (
                          {laudo.modulos_fiscais} módulos fiscais), você tem
                          direito à "escadinha" e só precisa recompor{" "}
                          <strong>
                            {laudo.app.faixa_recomposicao_consolidada_m}m de APP
                          </strong>
                          , e não os {laudo.app.faixa_regra_geral_m}m da regra
                          geral!
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className="border rounded p-4 border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
                        onClick={() =>
                          handleToast("Status do imóvel em avaliação")
                        }
                      >
                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">
                          Status
                        </p>
                        <p className="text-xl font-bold text-red-600 uppercase">
                          Irregular
                        </p>
                      </div>
                      {laudo.cra.elegivel && (
                        <div
                          className="border rounded p-4 border-green-200 bg-green-50 cursor-pointer hover:bg-green-100 transition"
                          onClick={() => {
                            handleToast("Redirecionando para o MarCARtplace...");
                            setTimeout(() => navigate('/marketplace'), 1500);
                          }}
                        >
                          <p className="text-xs text-green-700 font-bold uppercase mb-1">
                            CRA (Art. 66)
                          </p>
                          <p className="text-sm font-bold text-green-900">
                            Compensar {laudo.rl.deficit_ha} ha de RL
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            Clique para buscar vizinhos
                          </p>
                        </div>
                      )}
                    </div>

                    {/* CARtas na manga (Upsell) */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 shadow-md mt-6 mb-6 relative overflow-hidden">
                      <div className="absolute -bottom-10 -right-10 text-9xl opacity-5">🃏</div>
                      <div className="flex items-start gap-4 relative z-10">
                        <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0 animate-pulse shadow-md">
                          <span className="material-symbols-outlined text-3xl">lightbulb</span>
                        </div>
                        <div className="text-left flex-1">
                          <h4 className="text-lg font-black text-blue-900 mb-1">Ei, Raimundo! Identificamos oportunidades.</h4>
                          <p className="text-sm text-blue-800 font-medium mb-3">Ver <span className="font-bold">CARtas na manga</span>:</p>
                          <div className="bg-white p-5 rounded-lg border border-blue-100 shadow-sm">
                            <p className="text-sm text-gray-700 mb-4">
                              Você possui <strong className="text-green-700 text-base">4,2 ha (42.000 m²)</strong> de terras excedentes que pode vender para compensação.
                            </p>
                            <p className="text-sm font-bold text-gray-800 mb-3">
                              Gostaria de pedir à CARlinha pra buscar vizinhos no MarCARtplace pra você compensar?
                            </p>
                            <div className="flex gap-3">
                              <button
                                onClick={() => { localStorage.setItem("novaCota", "true"); handleToast("Publicando no MarCARtplace com as informações e foto da simulação de Raimundo..."); setTimeout(() => navigate('/marketplace'), 2500); }}
                                className="bg-green-600 text-white font-bold py-2.5 px-6 rounded hover:bg-green-700 transition shadow flex-1 sm:flex-none text-center"
                              >
                                SIM
                              </button>
                              <button className="bg-gray-200 text-gray-700 font-bold py-2.5 px-6 rounded hover:bg-gray-300 transition shadow flex-1 sm:flex-none text-center">
                                NÃO
                              </button>
                            </div>
                            <div className="mt-4 bg-gray-50 border-l-4 border-blue-400 p-2 text-[11px] text-gray-600 flex items-center gap-2">
                              <span className="material-symbols-outlined text-blue-500 text-sm">auto_awesome</span>
                              A CARlinha pode ajudar no preenchimento e ele já está lá na plataforma.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-bold text-gray-800 mb-2">
                        Fundamentos Legais
                      </h4>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {laudo.citacoes.map((cit: any, i: number) => (
                          <li key={i} className="flex gap-2">
                            <span className="material-symbols-outlined text-sm text-blue-600">
                              gavel
                            </span>
                            <span>
                              <strong>{cit.artigo}:</strong>{" "}
                              {cit.descricao_simples}{" "}
                              <em className="text-gray-400">
                                ({cit.fonte_legal})
                              </em>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-6 border-t flex flex-col gap-3">
                      {!minuta ? (
                        <button
                          onClick={handleGerarMinuta}
                          className="bg-[#2EAD4B] text-white px-4 py-3 rounded font-bold uppercase text-xs w-full hover:bg-green-600 transition shadow"
                        >
                          Gerar Minuta do Termo de Compromisso (PRA)
                        </button>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <div className="bg-gray-100 p-4 rounded border text-sm font-mono text-gray-700">
                            {minuta}
                          </div>
                          <button
                            onClick={() =>
                              handleToast(
                                "Assinatura digital acionada via GOV.BR...",
                              )
                            }
                            className="bg-[#1351b4] text-white px-4 py-3 rounded font-bold uppercase text-xs w-full hover:bg-blue-800 transition shadow flex justify-center items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-sm">
                              edit_square
                            </span>
                            Assinar Digitalmente (gov.br)
                          </button>
                        </div>
                      )}

                      <div className="text-xs text-gray-600 italic text-center mt-2">
                        Deseja corrigir ou atualizar as informações do seu CAR
                        no portal oficial?
                      </div>
                      <button
                        onClick={() => navigate("/cadastrar-imovel?retificar=true")}
                        className="bg-yellow-500 text-gray-900 px-4 py-3 rounded font-bold uppercase text-xs w-full hover:bg-yellow-600 transition shadow flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined">
                          edit_document
                        </span>
                        Retificar CAR no CAR DA GENTE
                      </button>
                    </div>


                  </div>
                )}

                                {activeTab === "calc" && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
                      <p className="text-xs text-yellow-800 font-bold uppercase">
                        ⚠️ Simulador de Benefícios Financeiros
                      </p>
                      <p className="text-sm text-yellow-900 mt-1">
                        Veja o quanto você perde de dinheiro por não regularizar sua terra, e o quanto ganha botando a mão na consciência e ativando seu Selo CARimbo Verde!
                      </p>
                    </div>

                    <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Qual o valor do crédito rural (Pronaf) que você precisa, sô?</label>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-gray-500 font-bold">R$</span>
                        <input 
                          type="range" 
                          min="10000" 
                          max="300000" 
                          step="5000"
                          value={valorCredito} 
                          onChange={(e) => setValorCredito(Number(e.target.value))} 
                          className="flex-1 accent-green-600"
                        />
                        <span className="text-blue-700 font-bold w-24 text-right">
                          {valorCredito.toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* ANTES */}
                      <div className="border-2 border-red-200 bg-red-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-red-500">block</span>
                          <h4 className="text-sm font-bold text-red-700 uppercase">Imóvel Irregular</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Crédito (Pronaf)</span>
                            <span className="font-bold text-red-500">BLOQUEADO</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Taxa de Juros</span>
                            <span className="font-bold text-red-500">12,5% a.a.</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Juros Pago em 5 anos</span>
                            <span className="font-bold text-red-500">
                              R$ {((valorCredito * 0.125 * 5)).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* DEPOIS */}
                      <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-green-600">check_circle</span>
                          <h4 className="text-sm font-bold text-green-700 uppercase">Com Selo Verde</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Crédito (Pronaf ABC)</span>
                            <span className="font-bold text-green-600">LIBERADO</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Taxa de Juros Especial</span>
                            <span className="font-bold text-green-600">3,0% a.a.</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Juros Pago em 5 anos</span>
                            <span className="font-bold text-green-600">
                              R$ {((valorCredito * 0.03 * 5)).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-4 text-center shadow-lg">
                      <p className="text-xs uppercase font-bold opacity-80">Dinheiro que fica no seu bolso (Economia em 5 anos)</p>
                      <p className="text-3xl font-black mt-1 text-yellow-300">
                        R$ {((valorCredito * 0.125 * 5) - (valorCredito * 0.03 * 5)).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                      </p>
                      <p className="text-xs mt-2 opacity-90">E aí, compadre? Vai rasgar dinheiro até quando? Regularizar não é custo — é lucro garantido!</p>
                    </div>



                  </div>
                )}

                {activeTab === "selo" && (
                  <div className="space-y-4 animate-fade-in">
                    {/* Selo CARimbo Verde */}
                    <div className="bg-gradient-to-b from-green-50 to-white border-2 border-green-500 rounded-xl p-6 text-center space-y-4 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-50 -z-10"></div>
                      <div className="text-6xl animate-bounce">🏆</div>
                      <h3 className="text-2xl font-black text-green-800 uppercase tracking-tight">Pode ficar amostradin entre os vizins!</h3>
                      <p className="text-sm text-gray-700 max-w-md mx-auto font-medium">
                        Você tá com a <strong>{imovelSelecionado}</strong> 100% regular! Baixe aqui seu selo em PDF.
                      </p>

                      <div className="bg-white border border-green-200 rounded-lg p-4 mx-auto max-w-sm shadow-sm relative z-10">
                        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 border-4 border-green-500 flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-4xl text-green-700">verified</span>
                        </div>
                        <p className="text-lg font-bold text-green-800">{imovelSelecionado}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Seu Raimundo da Silva</p>
                        <div className="mt-2 inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          SELO ATIVO
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={baixarSeloPDF}
                            className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition shadow flex items-center justify-center gap-2 mx-auto"
                          >
                            <span className="material-symbols-outlined">download</span>
                            BAIXAR SELO EM PDF
                          </button>
                        </div>

                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col h-full overflow-hidden">
              <div className="p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6 border-b border-green-600 pb-2">
                  <h2 className="text-2xl font-normal text-gray-800">Página Inicial</h2>
                </div>

                <div className="flex flex-col xl:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    <h3 className="text-green-700 font-bold text-lg uppercase">
                      {imovelSelecionado === "Fazenda CAR da Gente" ? "FAZENDA CAR DA GENTE - (BARREIRAS/BA)" :
                       imovelSelecionado === "Fazenda Esperança" ? "FAZENDA ESPERANÇA - (RIO VERDE/GO)" :
                       "SÍTIO BOA ESPERANÇA - (FRONTEIRA/MG)"}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">MG-3126709-2FA0F208DAE241250A05195D6882FB7C</p>
                    <div className="flex flex-col gap-1 mt-2 text-sm">
                      <a href="#" onClick={(e) => { e.preventDefault(); navigate("/listar-imoveis"); }} className="text-green-700 underline cursor-pointer">Alterar Imóvel Selecionado</a>
                      <a href="#" className="text-green-700 underline">Complementar dados do Proprietário/Possuidor</a>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <button className="bg-[#4CAF50] text-white p-2 rounded text-[10px] w-20 flex flex-col items-center justify-center text-center gap-1 font-bold hover:bg-green-600">
                      <span className="material-symbols-outlined text-xl">cancel</span>
                      Solicitação de Cancelamento do CAR
                    </button>
                    <button className="bg-[#4CAF50] text-white p-2 rounded text-[10px] w-20 flex flex-col items-center justify-center text-center gap-1 font-bold hover:bg-green-600">
                      <span className="material-symbols-outlined text-xl">save</span>
                      Baixar o arquivo .RET
                    </button>
                    <button onClick={() => navigate("/cadastrar-imovel")} className="bg-[#4CAF50] text-white p-2 rounded text-[10px] w-20 flex flex-col items-center justify-center text-center gap-1 font-bold hover:bg-green-600">
                      <span className="material-symbols-outlined text-xl">description</span>
                      Ficha do Imóvel
                    </button>
                    <button className="bg-[#4CAF50] text-white p-2 rounded text-[10px] w-20 flex flex-col items-center justify-center text-center gap-1 font-bold hover:bg-green-600">
                      <span className="material-symbols-outlined text-xl">receipt</span>
                      Recibo de Inscrição
                    </button>
                    <button className="bg-[#4CAF50] text-white p-2 rounded text-[10px] w-20 flex flex-col items-center justify-center text-center gap-1 font-bold hover:bg-green-600">
                      <span className="material-symbols-outlined text-xl">download</span>
                      Baixar CAR OFF de AST
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded">
                  <div className="bg-gray-100 p-3 border-b border-gray-200 flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-700">Situação das Informações Declaradas no CAR</span>
                    <button className="bg-[#4CAF50] text-white p-1 rounded hover:bg-green-600"><span className="material-symbols-outlined text-sm">description</span></button>
                  </div>
                  <div className="p-4 text-xs space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1"><span className="text-gray-500">Situação do Cadastro:</span> <span className="bg-[#4CAF50] text-white font-bold px-2 py-0.5 rounded text-[10px]">Ativo</span></div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Condição Extrema:</span> 
                        <span className="font-bold text-gray-700">
                          {imovelSelecionado === "Fazenda Esperança" ? "-" : "Em análise"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-700 mb-2 border-b border-gray-200 pb-1">Dados do Imóvel Rural</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="flex justify-between"><span className="text-gray-500">Área do Imóvel Rural:</span> <span className="font-bold text-gray-700">50,0000 ha</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Módulos fiscais:</span> <span className="font-bold text-gray-700">2,09</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Município / UF:</span> <span className="font-bold text-gray-700">
                          {imovelSelecionado === "Fazenda CAR da Gente" ? "Barreiras(BA)" :
                           imovelSelecionado === "Fazenda Esperança" ? "Rio Verde(GO)" :
                           "Fronteira(MG)"}
                        </span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Coordenadas Geográficas do Centroide:</span> <span className="font-bold text-gray-700 text-right">Lat: 20°16'37.41" S<br />Long: 49°11'27.13" O</span></div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between"><span className="text-gray-500">Data da Inscrição:</span> <span className="font-bold text-gray-700">09/02/2020</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Data da Última Retificação:</span> <span className="font-bold text-gray-700">-</span></div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-700 mb-2 border-b border-gray-200 pb-1">Informações Gerais</h4>
                      <ol className="list-decimal pl-4 space-y-1 text-justify text-gray-600">
                        <li>Este documento apresenta a situação das informações declaradas no CAR relativas às Áreas de Preservação Permanente, de Reserva Legal e de Uso restrito, para os fins do disposto no inciso II do caput do art. 3º do Decreto nº 7.830, de 2012, do art. art. 51 da Instrução Normativa MMA nº 02, de 06 de maio de 2014, e da Resolução SFB nº 03, de 27 de agosto de 2018;</li>
                        <li>As informações prestadas no Cadastro Ambiental Rural são de caráter declaratório e estão sujeitas à análise pelo órgão competente;</li>
                        <li>As informações constantes neste documento são de natureza pública, nos termos do artigo 12 da Instrução Normativa MMA nº 02, de 06 de maio de 2014;</li>
                        <li>Este documento não será considerado título para fins de reconhecimento de direito de propriedade ou posse;</li>
                        <li>Este documento não substitui qualquer licença ou autorização ambiental para exploração florestal ou supressão de vegetação, como também não dispensa as autorizações necessárias ao exercício da atividade econômica no imóvel rural.</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-700 mb-2 border-b border-gray-200 pb-1">Cobertura do Solo</h4>
                      <div className="space-y-1 text-gray-600">
                        <div className="flex justify-between border-b border-dotted pb-1"><span>Área de Remanescente de Vegetação Nativa</span><span>-</span></div>
                        <div className="flex justify-between border-b border-dotted pb-1"><span>Área Rural Consolidada</span><span>-</span></div>
                        <div className="flex justify-between border-b border-dotted pb-1"><span>Área de Servidão Administrativa</span><span>-</span></div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-700 mb-2 border-b border-gray-200 pb-1">Reserva Legal</h4>
                      <div className="space-y-2 text-gray-600">
                        <div className="flex items-center gap-2"><span className="text-gray-500">Localização da Reserva Legal:</span> <span className="bg-gray-500 text-white font-bold px-2 py-0.5 rounded text-[10px]">Não Analisada</span></div>
                        <p className="font-bold text-gray-700 mt-2">Informação Documental</p>
                        <div className="flex justify-between border-b border-dotted pb-1"><span>Área de Reserva Legal Averbada, referente ao Art. 30 da Lei nº 12.651/2012</span><span>-</span></div>
                        <p className="font-bold text-gray-700 mt-2">Informação Georreferenciada</p>
                        <div className="flex justify-between border-b border-dotted pb-1"><span>Área de Reserva Legal Averbada</span><span>-</span></div>
                        <div className="flex justify-between border-b border-dotted pb-1"><span>Área de Reserva Legal Aprovada não Averbada</span><span>-</span></div>
                        <div className="flex justify-between border-b border-dotted pb-1"><span>Área de Reserva Legal Proposta</span><span>-</span></div>
                        <div className="flex justify-between border-b border-dotted pb-1"><span>Total de Reserva Legal Declarada pelo Proprietário/Possuidor</span><span>-</span></div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-700 mb-2 border-b border-gray-200 pb-1">Áreas de Preservação Permanente (APP)</h4>
                      <div className="space-y-1 text-gray-600">
                        <div className="flex justify-between border-b border-dotted pb-1"><span>APP</span><span>-</span></div>
                        <div className="flex justify-between border-b border-dotted pb-1"><span>APP em Área Rural Consolidada</span><span>-</span></div>
                        <div className="flex justify-between border-b border-dotted pb-1"><span>APP em Área de Remanescente de Vegetação Nativa</span><span>-</span></div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-700 mb-2 border-b border-gray-200 pb-1">Uso Restrito</h4>
                      <div className="space-y-1 text-gray-600">
                        <div className="flex justify-between border-b border-dotted pb-1"><span>Área de uso restrito</span><span>-</span></div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-700 mb-2 border-b border-gray-200 pb-1">Regularidade Ambiental</h4>
                      <p className="mb-2 text-gray-600 text-justify">O sistema adota o artigo 12 da Lei nº 12.651/2012 como referências para garantir a conformidade legal em relação à Reserva Legal nos imóveis não analisados.</p>
                      <div className="space-y-1 text-gray-600">
                        <div className="flex justify-between border-b border-dotted pb-1"><span>Passivo / Excedente de Reserva Legal</span><span className="font-bold text-gray-700">-4,2000 ha</span></div>
                        <div className="flex justify-between border-b border-dotted pb-1"><span>Área de Reserva Legal a recompor</span><span className="font-bold text-gray-700">4,2000 ha</span></div>
                        <div className="flex justify-between border-b border-dotted pb-1"><span>Área de preservação permanente a recompor</span><span>-</span></div>
                        <div className="flex justify-between border-b border-dotted pb-1"><span>Área de Uso Restrito a recompor</span><span>-</span></div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-700 mb-2 border-b border-gray-200 pb-1">Informações Adicionais</h4>
                      <div className="space-y-1 text-gray-600">
                        <div className="flex justify-between border-b border-dotted pb-1"><span>Sobreposições:</span><span>-</span></div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}

      {/* Modal de análise de imagem — Pendência */}
      {showAnaliseModal && (
        <AnaliseImagemModal
          contexto="pendencia"
          onClose={() => setShowAnaliseModal(false)}
          onAnalise={(res) => {
            setAnalisePendencia(res);
            setShowAnaliseModal(false);
            handleToast("Foto enviada como evidência! Um analista vai verificar.");
          }}
        />
      )}
      {/* Template Oculto para o PDF */}
      <div id="pdf-selo-template" style={{ position: "absolute", left: "-9999px", top: 0, width: "1123px", height: "794px", padding: "40px", backgroundColor: "#f0fdf4", color: "#111", fontFamily: "sans-serif", boxSizing: "border-box" }}>
        <div style={{ border: "10px solid #16a34a", padding: "30px", borderRadius: "24px", textAlign: "center", position: "relative", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#ffffff" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <img src="/logo.png" alt="CAR DA GENTE" style={{ height: "55px", objectFit: "contain" }} />
            <div style={{ fontFamily: "'Rawline', 'Raleway', sans-serif", fontSize: "36px", fontWeight: "900", letterSpacing: "-1px" }}>
              <span style={{ color: "#1351B4" }}>gov.</span><span style={{ color: "#168821" }}>b</span><span style={{ color: "#FFCC29" }}>r</span>
            </div>
          </div>
          
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div style={{ fontSize: "60px", marginBottom: "10px" }}>🏆</div>
            
            <h2 style={{ fontSize: "36px", color: "#166534", fontWeight: "900", marginBottom: "8px", textTransform: "uppercase" }}>Selo CARimbo Verde</h2>
            <p style={{ fontSize: "18px", color: "#4b5563", marginBottom: "25px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "2px" }}>Certificado de Regularidade Ambiental</p>
            
            <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#374151", maxWidth: "800px", margin: "0 auto 35px auto" }}>
              Certificamos e atestamos publicamente que o imóvel rural<br/>
              <strong style={{ fontSize: "22px", color: "#15803d" }}>{imovelSelecionado}</strong>,<br/>
              registrado sob responsabilidade de <strong style={{ fontSize: "20px" }}>Seu Raimundo da Silva</strong>,<br/>
              encontra-se em <strong>100% de conformidade</strong> com a legislação ambiental vigente (Código Florestal).
            </p>
            
            <div style={{ display: "inline-block", backgroundColor: "#dcfce7", border: "4px solid #22c55e", padding: "10px 35px", borderRadius: "50px", color: "#15803d", fontWeight: "900", fontSize: "24px", letterSpacing: "2px", marginTop: "10px" }}>
              STATUS: REGULAR ✅
            </div>
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px dashed #cbd5e1", paddingTop: "15px", textAlign: "left" }}>
            <div>
              <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 5px 0" }}>Data de Emissão</p>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#334155", margin: 0 }}>{new Date().toLocaleDateString('pt-BR')}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 5px 0" }}>Código de Autenticidade Único</p>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "#334155", margin: 0, fontFamily: "monospace" }}>CAR-VERDE-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
