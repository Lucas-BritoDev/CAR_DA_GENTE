import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "Seu Raimundo",
    cpf: "123.456.789-00",
    telefone: "(34) 99999-9999",
    email: "raimundo.silva@email.com",
    endereco: "Sítio Boa Esperança, Zona Rural",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Dados atualizados com sucesso!");
  };

  return (
    <div className="flex-1 bg-gray-50 flex flex-col p-4 md:p-8 overflow-y-auto">
      <div className="max-w-3xl w-full mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          >
            <span className="material-symbols-outlined text-gray-600">arrow_back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              R
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{formData.nome}</h2>
              <p className="text-gray-500 text-sm">Produtor Rural</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2.5 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço Principal</label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Minhas Propriedades</h2>
          <div className="border border-gray-200 rounded-md p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer" onClick={() => navigate("/produtor/ficha")}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-600 text-3xl">real_estate_agent</span>
              <div>
                <h3 className="font-semibold text-gray-800">Sítio Boa Esperança</h3>
                <p className="text-xs text-gray-500">Município de Fronteira, MG - 120 ha</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </div>
        </div>

      </div>
    </div>
  );
}
