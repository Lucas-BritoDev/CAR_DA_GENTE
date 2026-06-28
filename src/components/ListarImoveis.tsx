import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

export default function ListarImoveis() {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState("");
  const handleToast = (msg: string) => setToastMsg(msg);

  const imoveis = [
    {
      nome: "Sítio Boa Esperança",
      uf: "MG",
      municipio: "Fronteira",
      condicao: "Pré-preenchido",
      situacao: "Pendente",
    },
    {
      nome: "Fazenda CAR da Gente",
      uf: "BA",
      municipio: "Barreiras",
      condicao: "Preenchido",
      situacao: "Em análise",
    },
    {
      nome: "Fazenda Esperança",
      uf: "GO",
      municipio: "Rio Verde",
      condicao: "Preenchido",
      situacao: "Aprovado",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">


      <div className="flex-1 w-full mx-auto p-4 sm:p-6 max-w-6xl mt-4">
        <div className="flex items-center text-sm text-gray-500 mb-6 gap-2">
          <span className="material-symbols-outlined text-lg text-[#1351b4]">
            home
          </span>
          <span>&gt;</span>
          <span
            className="text-[#1351b4] cursor-pointer"
            onClick={() => navigate("/cadastro-pre-preenchido")}
          >
            Página inicial
          </span>
          <span>&gt;</span>
          <span>Listagem de imóveis</span>
        </div>

        <h1 className="text-xl font-bold text-gray-800 uppercase mb-6">
          Listar Imóveis
        </h1>

        <div className="relative w-full mb-8">
          <input
            type="text"
            placeholder="Pesquise pelo código do recibo ou nome do imóvel"
            className="w-full border border-gray-300 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#1351b4]"
          />
          <span className="material-symbols-outlined absolute right-4 top-3 text-[#1351b4] font-bold">
            search
          </span>
        </div>

        <h2 className="text-lg text-gray-700 mb-4">Listagem de imóveis</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {imoveis.map((imovel, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition flex flex-col"
            >
              <h3
                className="font-medium text-lg text-gray-900 mb-4 truncate"
                title={imovel.nome}
              >
                {imovel.nome}
              </h3>
              <div className="text-xs text-gray-600 space-y-1 mb-6 flex-1">
                <p>Em preenchimento</p>
                <p>
                  UF: <span className="font-medium">{imovel.uf}</span>
                </p>
                <p>
                  Município:{" "}
                  <span className="font-medium">{imovel.municipio}</span>
                </p>
                <p>
                  Condição:{" "}
                  <span className="font-medium">{imovel.condicao}</span>
                </p>
                <p>
                  Situação:{" "}
                  <span className="font-medium">{imovel.situacao}</span>
                </p>
              </div>
              <button
                onClick={() => {
                  localStorage.setItem("imovelAtual", imovel.nome);
                  navigate("/produtor");
                }}
                className="text-[#1351b4] font-bold flex items-center justify-center gap-2 border-t pt-4 hover:underline hover:text-blue-800 transition"
              >
                <span className="material-symbols-outlined text-sm">
                  {"login"}
                </span>
                {"Acessar Central do Produtor"}
              </button>
            </div>
          ))}
        </div>
      </div>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </div>
  );
}
