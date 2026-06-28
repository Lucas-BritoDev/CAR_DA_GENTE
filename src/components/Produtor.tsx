import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Toast from "./Toast";

export default function Produtor() {
  const navigate = useNavigate();
  const [documentos, setDocumentos] = useState<any[]>([]);
  const [laudo, setLaudo] = useState<any>(null);
  const [minuta, setMinuta] = useState<string | null>(null);
  const [camadas, setCamadas] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"laudo" | "mapa" | "calc" | "selo" | "zap">(
    "laudo",
  );
  const [toastMsg, setToastMsg] = useState("");

  const handleToast = (msg: string) => setToastMsg(msg);

  useEffect(() => {
    fetch("/api/db/documentos_pendentes")
      .then((res) => res.json())
      .then((data) => setDocumentos(data));
  }, []);

  const handleQueroEntender = async () => {
    const res = await fetch("/api/analisar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    setLaudo(data);

    // Fetch geo layers
    const resGeo = await fetch("/api/geo/camadas/sitio_boa_esperanca_001");
    const dataGeo = await resGeo.json();
    setCamadas(dataGeo);
  };

  const handleGerarMinuta = async () => {
    const res = await fetch("/api/pra/minuta", { method: "POST" });
    const data = await res.json();
    setMinuta(data.minuta);
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
                {doc.quero_entender && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-400 opacity-10 animate-pulse"></div>
                    <div className="flex gap-3 items-center relative z-10">
                      <div className="w-10 h-10 rounded-full border-2 border-blue-200 shrink-0 shadow-md overflow-hidden bg-white">
                        <img src="/carlinha.png" alt="CARlinha" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-blue-900 leading-tight mb-1">
                          Você gostaria de acionar nosso simplificador?
                        </p>
                        <p className="text-[10px] text-blue-800">
                          Entenda suas pendências e saiba o que fazer a seguir de forma simples.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleQueroEntender}
                      className="mt-3 w-full bg-blue-600 text-white text-xs font-bold uppercase py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700 transition relative z-10 shadow"
                    >
                      <span className="material-symbols-outlined text-sm">
                        gavel
                      </span>
                      Acionar Simplificador de Lei
                    </button>
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
                <button
                  onClick={() => setActiveTab("laudo")}
                  className={`flex-1 min-w-max px-4 py-3 text-xs font-bold uppercase ${activeTab === "laudo" ? "bg-white text-blue-700 border-t-2 border-blue-700" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  Laudo Cidadão
                </button>
                <button
                  onClick={() => setActiveTab("mapa")}
                  className={`flex-1 min-w-max px-4 py-3 text-xs font-bold uppercase ${activeTab === "mapa" ? "bg-white text-blue-700 border-t-2 border-blue-700" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  Ver no Chão da Terra
                </button>
                <button
                  onClick={() => setActiveTab("calc")}
                  className={`flex-1 min-w-max px-4 py-3 text-xs font-bold uppercase ${activeTab === "calc" ? "bg-white text-blue-700 border-t-2 border-blue-700" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  💰 Destravar meu Crédito Verde
                </button>
                <button
                  onClick={() => setActiveTab("selo")}
                  className={`flex-1 min-w-max px-4 py-3 text-xs font-bold uppercase ${activeTab === "selo" ? "bg-white text-blue-700 border-t-2 border-blue-700" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  🏅 CARimbo Verde
                </button>
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

                {activeTab === "mapa" && (
                  <div className="flex flex-col h-full">
                    <p className="text-gray-600 text-sm mb-4">
                      Veja as áreas de preservação calculadas pelo motor
                      determinístico no seu imóvel.
                    </p>
                    <div className="w-full flex-1 min-h-[400px] bg-gray-200 rounded-lg relative overflow-hidden border border-gray-300">
                      {camadas ? (
                        <MapContainer
                          bounds={[
                            [-15.825, -47.925],
                            [-15.81, -47.91],
                          ]}
                          zoom={15}
                          style={{ height: "100%", width: "100%" }}
                        >
                          <TileLayer
                            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                          />
                          <GeoJSON
                            data={camadas}
                            style={(feature: any) => {
                              switch (feature?.properties?.zona) {
                                case "imovel":
                                  return {
                                    color: "#eab308", // Yellow like official CAR
                                    weight: 3,
                                    fillOpacity: 0.1,
                                  };
                                case "app":
                                  return {
                                    color: "#10b981",
                                    weight: 0,
                                    fillOpacity: 0.4,
                                  };
                                case "reserva_legal":
                                  return {
                                    color: "#22c55e",
                                    weight: 0,
                                    fillOpacity: 0.4,
                                  };
                                case "passivo":
                                  return {
                                    color: "#ef4444",
                                    weight: 0,
                                    fillOpacity: 0.5,
                                  };
                                default:
                                  return { color: "#9ca3af" };
                              }
                            }}
                            onEachFeature={(feature, layer) => {
                              if (
                                feature.properties &&
                                feature.properties.zona
                              ) {
                                let popupContent = "";
                                if (feature.properties.zona === "app") {
                                  popupContent = `<strong>Área de Preservação Permanente (APP)</strong><br/>Desta cerca até a margem do rio é APP — para o tamanho do seu imóvel (Art. 61-A) recomponha 15 m de nativas.`;
                                } else if (
                                  feature.properties.zona === "passivo"
                                ) {
                                  popupContent = `<strong>Passivo Ambiental</strong><br/>Área com déficit de vegetação nativa.`;
                                } else {
                                  popupContent = `<strong>Zona: ${feature.properties.zona}</strong>`;
                                }
                                layer.bindPopup(popupContent);
                              }
                            }}
                          />
                        </MapContainer>
                      ) : (
                        <div className="flex items-center justify-center h-full text-center p-4">
                          <span className="font-bold text-gray-500">
                            Nenhum dado geográfico carregado.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "calc" && (
                  <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
                      <p className="text-xs text-yellow-800 font-bold uppercase">
                        ⚠️ Simulação Ilustrativa — Calculadora Financeira (RF03)
                      </p>
                      <p className="text-sm text-yellow-900 mt-1">
                        Demonstra ao produtor o impacto financeiro real: o quanto perde por não regularizar vs. o quanto ganha com o Selo CARimbo Verde.
                      </p>
                    </div>

                    {/* Antes vs Depois */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* ANTES */}
                      <div className="border-2 border-red-200 bg-red-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-red-500">block</span>
                          <h4 className="text-sm font-bold text-red-700 uppercase">Antes — Situação Irregular</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Crédito Rural (Pronaf)</span>
                            <span className="font-bold text-red-500">BLOQUEADO</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Taxa de juros</span>
                            <span className="font-bold text-red-500">12,5% a.a.</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Pronaf ABC Verde</span>
                            <span className="font-bold text-red-500">Inelegível</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Seguro Agrícola</span>
                            <span className="font-bold text-red-500">Negado</span>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-bold text-gray-700">Valor disponível</span>
                              <span className="text-xl font-bold text-red-500">R$ 0,00</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* DEPOIS */}
                      <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-green-600">check_circle</span>
                          <h4 className="text-sm font-bold text-green-700 uppercase">Depois — Regularizado + PRA</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Crédito Rural (Pronaf)</span>
                            <span className="font-bold text-green-600">LIBERADO</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Taxa de juros</span>
                            <span className="font-bold text-green-600">3,0% a.a.</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Pronaf ABC Verde</span>
                            <span className="font-bold text-green-600">Elegível</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Seguro Agrícola</span>
                            <span className="font-bold text-green-600">Aprovado</span>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-bold text-gray-700">Valor disponível</span>
                              <span className="text-xl font-bold text-green-600">R$ 150.000,00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Economia total */}
                    <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-4 text-center">
                      <p className="text-xs uppercase font-bold opacity-80">Economia estimada em juros (5 anos)</p>
                      <p className="text-3xl font-bold mt-1">R$ 47.500,00</p>
                      <p className="text-xs mt-2 opacity-70">Regularizar não é custo — é investimento.</p>
                    </div>

                    <button
                      onClick={() => setActiveTab("laudo")}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">description</span>
                      Ver meu Laudo Cidadão para regularizar
                    </button>
                  </div>
                )}

                {activeTab === "selo" && (
                  <div className="space-y-4 animate-fade-in">
                    {/* Selo CARimbo Verde */}
                    <div className="bg-gradient-to-b from-green-50 to-white border-2 border-green-500 rounded-xl p-6 text-center space-y-4 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-50 -z-10"></div>
                      <div className="text-6xl animate-bounce">🏆</div>
                      <h3 className="text-2xl font-black text-green-800 uppercase tracking-tight">Parabéns! Você ganhou o<br />Selo CARimbo Verde!</h3>
                      <p className="text-sm text-gray-700 max-w-md mx-auto font-medium">
                        Você completou todas as etapas e compreendeu suas pendências. Seu imóvel está no caminho certo para a regularização 100%.
                      </p>

                      <div className="bg-white border border-green-200 rounded-lg p-4 mx-auto max-w-sm shadow-sm relative z-10">
                        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 border-4 border-green-500 flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-4xl text-green-700">verified</span>
                        </div>
                        <p className="text-lg font-bold text-green-800">Sítio Boa Esperança</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Seu Raimundo da Silva</p>
                        <div className="mt-2 inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          SELO ATIVO
                        </div>
                      </div>
                    </div>

                    {/* CARtas na manga (Upsell) */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 shadow-md mt-6 relative overflow-hidden">
                      <div className="absolute -bottom-10 -right-10 text-9xl opacity-5">🃏</div>
                      <div className="flex items-start gap-4 relative z-10">
                        <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0 animate-pulse shadow-md">
                          <span className="material-symbols-outlined text-3xl">lightbulb</span>
                        </div>
                        <div className="text-left flex-1">
                          <h4 className="text-lg font-black text-blue-900 mb-1">Ei, Raimundo! Identificamos oportunidades.</h4>
                          <p className="text-sm text-blue-800 font-medium mb-3">Ver <span className="font-bold underline decoration-wavy decoration-blue-500">CARtas na manga</span>:</p>
                          <div className="bg-white p-5 rounded-lg border border-blue-100 shadow-sm">
                            <p className="text-sm text-gray-700 mb-4">
                              Você possui <strong className="text-green-700 text-base">4,2 ha (42.000 m²)</strong> de terras excedentes que pode vender para compensação.
                            </p>
                            <p className="text-sm font-bold text-gray-800 mb-3">
                              Gostaria de publicar no nosso MarCARtplace?
                            </p>
                            <div className="flex gap-3">
                              <button
                                onClick={() => { handleToast("A IA já preencheu seus dados. Redirecionando..."); setTimeout(() => navigate('/marketplace'), 2500); }}
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
                              A IA pode ajudar no preenchimento e ele já está lá na plataforma.
                            </div>
                          </div>
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
                    <h3 className="text-green-700 font-bold text-lg uppercase">SÍTIO BOA ESPERANÇA - (Fronteira/MG)</h3>
                    <p className="text-xs text-gray-500 mt-1">MG-3126709-2FA0F208DAE241250A05195D6882FB7C</p>
                    <div className="flex flex-col gap-1 mt-2 text-sm">
                      <a href="#" className="text-green-700 underline">Alterar Imóvel Selecionado</a>
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
                    <span className="text-sm font-bold text-gray-700">Demonstrativo da Situação das Informações Declaradas no CAR</span>
                    <button className="bg-[#4CAF50] text-white p-1 rounded hover:bg-green-600"><span className="material-symbols-outlined text-sm">description</span></button>
                  </div>
                  <div className="p-4 text-xs space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1"><span className="text-gray-500">Situação do Cadastro:</span> <span className="bg-[#4CAF50] text-white font-bold px-2 py-0.5 rounded text-[10px]">Ativo</span></div>
                      <div className="flex items-center gap-2"><span className="text-gray-500">Condição Extrema:</span> <span className="font-bold text-gray-700">Em análise</span></div>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-700 mb-2 border-b border-gray-200 pb-1">Dados do Imóvel Rural</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="flex justify-between"><span className="text-gray-500">Área do Imóvel Rural:</span> <span className="font-bold text-gray-700">50,0000 ha</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Módulos fiscais:</span> <span className="font-bold text-gray-700">2,09</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Município / UF:</span> <span className="font-bold text-gray-700">Fronteira(MG)</span></div>
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
    </div>
  );
}
