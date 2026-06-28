import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

export default function FichaImovel() {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState("");
  const handleToast = (msg: string) => setToastMsg(msg);
  const [activeTab, setActiveTab] = useState("ficha");
  const [activeSubTab, setActiveSubTab] = useState("imovel");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    propriedade: true,
    proprietarios: true,
  });

  const toggleExpand = (section: string) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const subTabs = [
    { id: "cadastrante", icon: "person", label: "Cadastrante" },
    { id: "imovel", icon: "home", label: "Imóvel" },
    { id: "dominio", icon: "group", label: "Domínio" },
    { id: "documentacao", icon: "description", label: "Documentação" },
    { id: "geo", icon: "public", label: "Geo" },
    { id: "informacoes", icon: "info", label: "Informações" },
    { id: "restricoes", icon: "lock", label: "Restrições" },
    { id: "origem", icon: "location_on", label: "Origem das Informações" },
    { id: "suspensao", icon: "remove_circle", label: "Suspensão" },
    { id: "cancelamento", icon: "cancel", label: "Cancelamento" },
    { id: "historico", icon: "history", label: "Histórico" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      <div className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 bg-white mt-4 shadow-sm border border-gray-200">
        <div className="mb-6">
          <h1 className="text-2xl text-[#1351b4] mb-1">Detalhes do Imóvel</h1>
          <p className="text-gray-700">
            Sítio Boa Esperança
            (MG-3126709-2FA0F208DAE241250A05195D6882FB7C)
          </p>
          <p className="text-gray-700">
            Fase do processo: Revisado, aguardando análise da equipe
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-6 text-sm overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
          <button
            className={`px-4 py-2 border-b-2 font-medium min-w-max ${activeTab === "ficha" ? "border-[#00d053] text-gray-800" : "border-transparent text-gray-500"}`}
            onClick={() => setActiveTab("ficha")}
          >
            Ficha do imóvel
          </button>
          <button
            className={`px-4 py-2 border-b-2 font-medium min-w-max ${activeTab === "comparar" ? "border-[#00d053] text-gray-800" : "border-transparent text-gray-500"}`}
            onClick={() => setActiveTab("comparar")}
          >
            Comparar Retificações
          </button>
          <button
            className={`px-4 py-2 border-b-2 font-medium min-w-max ${activeTab === "historico" ? "border-[#00d053] text-gray-800" : "border-transparent text-gray-500"}`}
            onClick={() => setActiveTab("historico")}
          >
            Histórico do Processo
          </button>
          <button
            className={`px-4 py-2 border-b-2 font-medium min-w-max ${activeTab === "mra" ? "border-[#00d053] text-gray-800" : "border-transparent text-gray-500"}`}
            onClick={() => setActiveTab("mra")}
          >
            Ficha do MRA
          </button>
        </div>

        {activeTab === "ficha" && (
          <div>
            {/* Sub Tabs */}
            <div className="flex border-b overflow-x-auto hide-scrollbar mb-6">
              {subTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`flex flex-col items-center min-w-[90px] p-2 text-xs transition ${activeSubTab === tab.id ? "text-[#00d053] font-medium" : "text-gray-500"}`}
                >
                  <span className="material-symbols-outlined mb-1">
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sub Tab Content */}
            <div className="px-2">
              {activeSubTab === "imovel" && (
                <div>
                  <div className="flex justify-between items-center text-[#00d053] font-medium border-b pb-2 mb-4">
                    Imóvel
                    <span className="material-symbols-outlined">
                      expand_circle_down
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div>
                      <p className="font-medium text-gray-800">
                        Nome do Imóvel
                      </p>
                      <p className="text-gray-600">
                        Sítio Boa Esperança
                      </p>
                      <input
                        type="text"
                        className="mt-1 w-full border border-gray-300 rounded px-2 py-1 bg-yellow-50 text-xs"
                        placeholder="Atualizar nome..."
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Zona de Localização
                      </p>
                      <p className="text-gray-600">Rural</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Tipo</p>
                      <p className="text-gray-600">Imóvel rural</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Módulos Fiscais
                      </p>
                      <p className="text-gray-600">2.09</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Município/UF</p>
                      <p className="text-gray-600">Fronteira / MG</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">CEP</p>
                      <p className="text-gray-600">-</p>
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === "informacoes" && (
                <div>
                  <div className="flex justify-between items-center text-[#00d053] font-medium border-b pb-2 mb-4">
                    Informações
                    <span className="material-symbols-outlined">
                      expand_circle_down
                    </span>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-gray-800">
                        Deseja aderir ao Programa de Regularização Ambiental -
                        PRA, caso o imóvel rural possua (uma das situações a
                        seguir, ocorrida até 22 de julho de 2008): necessidade
                        de recomposição de áreas de APP e de uso restrito;
                        déficit referente a Reserva Legal; autuação?
                      </p>
                      <div className="flex gap-4 mt-1">
                        <label className="flex items-center gap-1">
                          <input type="radio" name="pra" defaultChecked /> Sim
                          (Aderir ao PRA)
                        </label>
                        <label className="flex items-center gap-1">
                          <input type="radio" name="pra" /> Fora do Prazo
                        </label>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-800">
                        O imóvel rural possui área com déficit de vegetação
                        nativa para fins do cumprimento da Reserva Legal?
                      </p>
                      <p className="text-gray-600">
                        Resposta: Sim (Atualizado via CARlinha)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === "geo" && (
                <div>
                  <div className="flex justify-between items-center text-[#00d053] font-medium border-b pb-2 mb-4">
                    Geo
                    <span className="material-symbols-outlined">
                      expand_circle_down
                    </span>
                  </div>
                  <div className="w-full h-[400px] bg-gray-200 border relative overflow-hidden flex items-center justify-center group">
                    <img
                      src="/images/mapa_geo.png"
                      alt="Mapa Geo CAR DA GENTE"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {activeSubTab === "restricoes" && (
                <div>
                  <div className="flex justify-between items-center text-[#00d053] font-medium border-b pb-2 mb-4">
                    Restrições
                    <span className="material-symbols-outlined">
                      expand_circle_down
                    </span>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-800 mb-2">
                      Sobreposições com outros imóveis
                    </p>
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b text-gray-500">
                          <th className="py-2 font-normal">Código do Imóvel</th>
                          <th className="py-2 font-normal">Situação</th>
                          <th className="py-2 font-normal">Condição externa</th>
                          <th className="py-2 font-normal">Área (ha)</th>
                          <th className="py-2 font-normal">% Sobreposição</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 text-gray-800">
                            MG-3127008-4D8F...
                          </td>
                          <td className="py-3 text-gray-800">AT</td>
                          <td className="py-3 text-gray-800">
                            Analisado, em conformidade...
                          </td>
                          <td className="py-3 text-gray-800">62,59</td>
                          <td className="py-3 text-gray-800">100,00%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSubTab !== "imovel" &&
                activeSubTab !== "informacoes" &&
                activeSubTab !== "geo" &&
                activeSubTab !== "restricoes" && (
                  <div className="text-center text-gray-500 py-10">
                    Aba {activeSubTab} - Simulador do CAR DA GENTE
                  </div>
                )}
            </div>
          </div>
        )}

        {activeTab === "historico" && (
          <div>
            <div className="text-[#00d053] font-medium border-b pb-2 mb-4">
              Informações do Processo
            </div>
            <div className="flex flex-col gap-4 relative pl-4 border-l-2 border-[#00d053] ml-2">
              <div className="relative">
                <div className="absolute -left-6 top-1 w-3 h-3 bg-[#00d053] rounded-full border-2 border-white"></div>
                <p className="text-xs text-gray-500">03/03/2026 - 19:08</p>
                <p className="text-sm font-medium">
                  Testes Fundecc finalizou o preenchimento da retificação
                  dinamizada
                </p>
              </div>
              <div className="relative">
                <div className="absolute -left-6 top-1 w-3 h-3 bg-[#00d053] rounded-full border-2 border-white"></div>
                <p className="text-xs text-gray-500">03/03/2026 - 16:25</p>
                <p className="text-sm font-medium">
                  Classificação do processo realizada pelo sistema após
                  retificação
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 py-4 flex justify-center items-center gap-4 text-xs text-gray-500">
        <div className="text-center">
          <p>Sistema de Cadastro Ambiental Rural</p>
          <p>Módulo Ficha do imóvel v3.55.2</p>
        </div>
      </div>

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </div>
  );
}
