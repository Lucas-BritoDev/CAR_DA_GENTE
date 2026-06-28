import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

export default function CadastroPrePreenchido() {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState("");

  const handleToast = (msg: string) => setToastMsg(msg);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">


      <div className="flex-1 w-full mx-auto p-4 sm:p-8 max-w-6xl mt-6">
        <div className="flex items-center text-sm text-[#1351b4] mb-8 gap-2">
          <span className="material-symbols-outlined text-lg">home</span>
          <span>&gt;</span>
          <span>Página Inicial</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden shrink-0">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
              alt="Illustration"
              className="w-full h-full object-cover mix-blend-multiply opacity-80"
            />
          </div>

          <div className="w-full">
            <h2 className="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wide">
              Escolha a opção com base no que deseja fazer.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate("/listar-imoveis")}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition flex flex-col items-center justify-center gap-4 h-32"
              >
                <span className="material-symbols-outlined text-3xl text-[#1351b4]">
                  map
                </span>
                <span className="text-sm font-medium text-gray-700 uppercase">
                  Listar Imóveis
                </span>
              </button>

              <button
                onClick={() => navigate("/cadastrar-imovel")}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition flex flex-col items-center justify-center gap-4 h-32"
              >
                <span className="material-symbols-outlined text-3xl text-[#1351b4]">
                  description
                </span>
                <span className="text-sm font-medium text-gray-700 uppercase">
                  Cadastrar Novo Imóvel
                </span>
              </button>

              <button
                onClick={() => navigate("/gerenciar-cadastrante")}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition flex flex-col items-center justify-center gap-4 h-32"
              >
                <span className="material-symbols-outlined text-3xl text-[#1351b4]">
                  group
                </span>
                <span className="text-sm font-medium text-gray-700 uppercase">
                  Gerenciar Cadastrante
                </span>
              </button>
            </div>

            <div
              className="mt-6 flex items-center gap-2 text-[#1351b4] text-sm cursor-pointer hover:underline"
              onClick={() => handleToast("Mais informações sobre o projeto...")}
            >
              <span className="material-symbols-outlined text-base">info</span>
              <span>Saiba mais sobre o projeto</span>
            </div>
          </div>
        </div>
      </div>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </div>
  );
}
