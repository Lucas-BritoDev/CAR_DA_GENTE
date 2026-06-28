import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

export default function GerenciarCadastrante() {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState("");

  const handleToast = (msg: string) => setToastMsg(msg);

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
          <span>Gerenciar cadastrante</span>
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-6">
          Gerenciar cadastrante
        </h1>

        {/* Info Box */}
        <div className="bg-[#e6f7ef] border border-green-200 rounded-lg p-6 mb-8 text-sm text-gray-800 space-y-4">
          <p>
            O(A) cadastrante é uma pessoa habilitada a registrar novos imóveis
            rurais em nome de proprietários(as). Para garantir a segurança dos
            dados dos(as) proprietários(as), somente usuários(as) listados nesta
            tela poderão iniciar novos cadastros utilizando seus dados.
          </p>
          <p>
            Após o envio do cadastro, não será mais possível para o(a)
            cadastrante editar ou acessar seu cadastro. Se você desejar que essa
            pessoa continue tendo acesso ao seu CAR, será necessário cadastrá-la
            como representante, durante as etapas do cadastro ou retificação ou
            na Central do Proprietário/ Possuidor.
          </p>
          <p>
            Somente os(as) representantes têm acesso completo às mesmas
            informações e funcionalidades disponíveis ao proprietário/ possuidor
            após o envio do cadastro.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Editar cadastrante
          </h2>

          <div className="flex flex-wrap items-end gap-4 mb-6">
            <div className="flex flex-col flex-1 min-w-[150px]">
              <label className="text-sm text-gray-700 mb-1">
                CPF (Obrigatório)
              </label>
              <input
                type="text"
                defaultValue="287.016.154-91"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1351b4]"
              />
            </div>

            <div className="flex flex-col flex-1 min-w-[150px]">
              <label className="text-sm text-gray-700 mb-1">
                Data de Nascimento
                <br />
                (Obrigatório)
              </label>
              <input
                type="date"
                defaultValue="1980-01-01"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1351b4]"
              />
            </div>

            <div className="flex flex-col flex-[1.5] min-w-[200px]">
              <label className="text-sm text-gray-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                value="Maria Con*** de*** M"
                disabled
                className="border border-gray-200 bg-gray-50 text-gray-500 rounded px-3 py-2 cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col flex-[1.5] min-w-[200px]">
              <label className="text-sm text-gray-700 mb-1">Nome da Mãe</label>
              <input
                type="text"
                value="Joana de*** Med*** N"
                disabled
                className="border border-gray-200 bg-gray-50 text-gray-500 rounded px-3 py-2 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button className="px-6 py-2 rounded border border-[#1351b4] text-[#1351b4] font-medium hover:bg-blue-50 transition">
              Limpar
            </button>
            <button className="px-6 py-2 rounded border border-[#1351b4] text-[#1351b4] font-medium hover:bg-blue-50 transition">
              Cancelar edição
            </button>
            <button className="px-6 py-2 rounded bg-[#1351b4] text-white font-medium hover:bg-blue-700 transition">
              Finalizar edição
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Cadastrante(s) adicionado(s)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200 text-gray-600">
                  <th className="py-3 px-4 font-medium">CPF</th>
                  <th className="py-3 px-4 font-medium">Nome</th>
                  <th className="py-3 px-4 font-medium text-center w-24">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">024***.***-15</td>
                  <td className="py-3 px-4 text-gray-800">João Sil***</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="text-[#1351b4] mx-1"
                      title="Editar"
                      onClick={() => handleToast("Editar Cadastrante")}
                    >
                      <span className="material-symbols-outlined text-sm">
                        edit
                      </span>
                    </button>
                    <button
                      className="text-[#1351b4] mx-1"
                      title="Excluir"
                      onClick={() => handleToast("Excluir Cadastrante")}
                    >
                      <span className="material-symbols-outlined text-sm">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">107***.***-00</td>
                  <td className="py-3 px-4 text-gray-800">Lucas Per***</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="text-[#1351b4] mx-1"
                      title="Editar"
                      onClick={() => handleToast("Editar Cadastrante")}
                    >
                      <span className="material-symbols-outlined text-sm">
                        edit
                      </span>
                    </button>
                    <button
                      className="text-[#1351b4] mx-1"
                      title="Excluir"
                      onClick={() => handleToast("Excluir Cadastrante")}
                    >
                      <span className="material-symbols-outlined text-sm">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">287***.***-91</td>
                  <td className="py-3 px-4 text-gray-800">
                    Maria Con*** de*** Med*** Mel***
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="text-[#1351b4] mx-1"
                      title="Editar"
                      onClick={() => handleToast("Editar Cadastrante")}
                    >
                      <span className="material-symbols-outlined text-sm">
                        edit
                      </span>
                    </button>
                    <button
                      className="text-[#1351b4] mx-1"
                      title="Excluir"
                      onClick={() => handleToast("Excluir Cadastrante")}
                    >
                      <span className="material-symbols-outlined text-sm">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </div>
  );
}
