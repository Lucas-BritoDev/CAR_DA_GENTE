import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Toast from "./Toast";
import SemaforoBadge from "./shared/SemaforoBadge";
import SimplificadorBanner from "./SimplificadorBanner";

export default function CadastrarImovel() {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState("");
  const handleToast = (msg: string) => setToastMsg(msg);

  const [activeStep, setActiveStep] = useState(0);
  const [showGamification, setShowGamification] = useState(false);
  const [searchParams] = useSearchParams();
  const isRetificacao = searchParams.get("retificar") === "true";

  const steps = [
    { label: "IDENTIFICAÇÃO" },
    { label: "IMÓVEL" },
    { label: "DOCUMENTAÇÃO" },
    { label: "REPRESENTANTE" },
    { label: "GEO" },
    { label: "ALERTAS E PENDÊNCIAS" },
    { label: "RESUMO" },
  ];

  // IDENTIFICAÇÃO STATE
  const [owners, setOwners] = useState([
    { id: 1, type: "PF", cpf: "123***-00", name: "Raimundo da Silva" },
    { id: 2, type: "PF", cpf: "098***-72", name: "Mariana Rocha" },
    { id: 3, type: "PF", cpf: "107***-00", name: "Lucas Pereira" },
  ]);
  const [ownerForm, setOwnerForm] = useState({ cpf: "", birthDate: "", name: "", motherName: "" });

  const addOwner = () => {
    if (!ownerForm.cpf || !ownerForm.name) return;
    setOwners([...owners, { id: Date.now(), type: "PF", cpf: ownerForm.cpf, name: ownerForm.name }]);
    setOwnerForm({ cpf: "", birthDate: "", name: "", motherName: "" });
  };
  const removeOwner = (id: number) => setOwners(owners.filter((o) => o.id !== id));

  // IMÓVEL STATE
  const [imovelData, setImovelData] = useState({
    nome: "Sítio Boa Esperança",
    uf: "MG",
    municipio: "Fronteira",
    desmembramento: "Não",
    acesso: "Estrada de terra Km 12",
    zona: "Rural",
    cib: "",
    alteracaoArea: false,
    cep: "38102-000",
    endUf: "MG",
    endMunicipio: "Fronteira",
    logradouro: "Zona Rural",
    bairro: "Centro",
    numero: "S/N",
    complemento: "",
  });

  // REPRESENTANTE STATE
  const [reps, setReps] = useState<{id: number, cpf: string, name: string}[]>([]);
  const [repForm, setRepForm] = useState({ cpf: "", birthDate: "", name: "", motherName: "" });

  const addRep = () => {
    if (!repForm.cpf || !repForm.name) return;
    setReps([...reps, { id: Date.now(), cpf: repForm.cpf, name: repForm.name }]);
    setRepForm({ cpf: "", birthDate: "", name: "", motherName: "" });
  };
  const removeRep = (id: number) => setReps(reps.filter((r) => r.id !== id));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">


      <div className="flex-1 w-full mx-auto p-4 sm:p-6 max-w-6xl mt-4">
        <div className="flex items-center text-sm text-gray-500 mb-6 gap-2">
          <span className="material-symbols-outlined text-lg text-[#1351b4]">home</span>
          <span>&gt;</span>
          <span className="text-[#1351b4] cursor-pointer" onClick={() => navigate("/cadastro-pre-preenchido")}>Página inicial</span>
          <span>&gt;</span>
          <span>Novo imóvel</span>
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-6">{isRetificacao ? "Retificar Imóvel" : "Cadastrar novo imóvel"}</h1>

        {isRetificacao && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded shadow-sm animate-fade-in">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-red-500 mt-0.5">warning</span>
              <div>
                <h3 className="font-bold text-red-800 uppercase text-sm">Atenção Necessária - Laudo Cidadão</h3>
                <p className="text-red-700 text-sm mt-1">O <strong>Sítio Boa Esperança</strong> possui déficit de 4,2 ha de Reserva Legal. A CARlinha identificou que houve um erro no preenchimento original. Vá até a etapa <strong>GEO</strong> para retificar o polígono.</p>
              </div>
            </div>
          </div>
        )}

        {/* Stepper */}
        <div className="bg-[#FFF8E7] border border-yellow-200 rounded-lg p-4 sm:p-6 mb-6 flex justify-between items-center relative overflow-x-auto min-w-full gap-4">
          <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-gray-300 z-0 -translate-y-1/2"></div>
          {steps.map((step, i) => {
            const isActive = i === activeStep;
            const isCompleted = i < activeStep;
            return (
              <div key={i} className="flex flex-col items-center gap-2 bg-[#FFF8E7] px-2 z-10 relative cursor-pointer" onClick={() => setActiveStep(i)}>
                <div className={`w-4 h-4 rounded-full ${isActive || isCompleted ? "bg-[#1351b4]" : "bg-white border-2 border-gray-300"}`}></div>
                <span className={`text-xs font-bold ${isActive ? "text-gray-900" : "text-gray-600"}`}>{step.label}</span>
              </div>
            );
          })}
        </div>

        {activeStep === 0 && (
          <div className="animate-fade-in">
            <SimplificadorBanner step={0} />
            
            <div className="bg-white border border-gray-200 rounded p-6 shadow-sm">
              <h2 className="text-sm font-bold text-gray-700 uppercase mb-4 border-b pb-2">PROPRIETÁRIO(S)/POSSUIDOR(ES)</h2>
              
              <div className="mb-8">
                <h3 className="text-sm font-medium text-[#1351b4] mb-4">Adicione o proprietário/possuidor</h3>
                <div className="mb-4">
                  <span className="text-xs text-gray-600 block mb-2">Personalidade Jurídica do proprietário/possuidor</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="pj" defaultChecked /> Pessoa Física</label>
                    <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="pj" /> Pessoa Jurídica</label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">CPF *</label>
                    <input type="text" value={ownerForm.cpf} onChange={(e) => setOwnerForm({...ownerForm, cpf: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm" placeholder="000.000.000-00" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Data de Nascimento *</label>
                    <input type="text" value={ownerForm.birthDate} onChange={(e) => setOwnerForm({...ownerForm, birthDate: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm" placeholder="DD/MM/AAAA" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs text-gray-600 block mb-1">Nome</label>
                    <input type="text" value={ownerForm.name} onChange={(e) => setOwnerForm({...ownerForm, name: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm" placeholder="Nome do proprietário/possuidor" />
                  </div>
                  <div className="md:col-span-3">
                    <label className="text-xs text-gray-600 block mb-1">Nome da mãe</label>
                    <input type="text" value={ownerForm.motherName} onChange={(e) => setOwnerForm({...ownerForm, motherName: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm" placeholder="Nome da mãe" />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button className="px-4 py-1.5 border border-[#1351b4] text-[#1351b4] rounded-full text-sm font-bold" onClick={() => setOwnerForm({ cpf: "", birthDate: "", name: "", motherName: "" })}>Limpar</button>
                    <button className="px-4 py-1.5 bg-[#1351b4] text-white rounded-full text-sm font-bold opacity-70 hover:opacity-100" onClick={addOwner}>Adicionar</button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Proprietário(s) / possuidor(es) adicionados</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="py-2 px-4 font-medium">Tipo</th>
                        <th className="py-2 px-4 font-medium">CPF/CNPJ</th>
                        <th className="py-2 px-4 font-medium">Nome/Razão Social</th>
                        <th className="py-2 px-4 font-medium text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {owners.map(o => (
                        <tr key={o.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{o.type}</td>
                          <td className="py-3 px-4">{o.cpf}</td>
                          <td className="py-3 px-4">{o.name}</td>
                          <td className="py-3 px-4 text-right flex justify-end gap-3 text-[#1351b4]">
                            <span className="material-symbols-outlined cursor-pointer text-sm">edit</span>
                            <span className="material-symbols-outlined cursor-pointer text-sm text-red-500" onClick={() => removeOwner(o.id)}>delete</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 gap-4">
              <button className="px-6 py-2 border border-[#1351b4] text-[#1351b4] rounded-full text-sm font-bold" onClick={() => handleToast("Salvo!")}>Salvar</button>
              <button className="px-6 py-2 bg-[#1351b4] text-white rounded-full text-sm font-bold" onClick={() => setActiveStep(1)}>Próximo</button>
            </div>
          </div>
        )}

        {activeStep === 1 && (
          <div className="animate-fade-in">
            <SimplificadorBanner step={1} />

            <div className="bg-white border border-gray-200 rounded p-6 shadow-sm mb-6">
              <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-sm font-bold text-[#1351b4] uppercase">Associar ao SNCR/SIGEF</h2>
                <span className="text-xs text-[#1351b4] cursor-pointer flex items-center gap-1 hover:underline"><span className="material-symbols-outlined text-sm">refresh</span> Atualizar consulta ao SNCR/SIGEF</span>
              </div>
              <input type="text" className="w-full border rounded px-3 py-1.5 text-sm mb-6" placeholder="Pesquisar" />
              
              <h3 className="text-xs font-bold text-gray-700 mb-2">Cadastro nacional de imóveis rurais - SNCR</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="border-b">
                    <tr>
                      <th className="py-2 px-2">Nome</th>
                      <th className="py-2 px-2">Município/UF</th>
                      <th className="py-2 px-2">Código do imóvel (SNCR/INCRA)</th>
                      <th className="py-2 px-2">Área (ha)</th>
                      <th className="py-2 px-2 text-center">Documentação</th>
                      <th className="py-2 px-2 text-center">SIGEF associado</th>
                      <th className="py-2 px-2 text-center">Associar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">{imovelData.nome}</td>
                      <td className="py-3 px-2">{imovelData.municipio}/{imovelData.uf}</td>
                      <td className="py-3 px-2">1234567890123</td>
                      <td className="py-3 px-2">50,0000</td>
                      <td className="py-3 px-2 text-center"><button className="border border-[#1351b4] text-[#1351b4] px-3 py-1 rounded-full flex items-center justify-center gap-1 mx-auto w-32"><span className="material-symbols-outlined text-[10px]">visibility</span> Documentação</button></td>
                      <td className="py-3 px-2 text-center"><button className="border border-[#1351b4] text-[#1351b4] px-3 py-1 rounded-full flex items-center justify-center gap-1 mx-auto w-24"><span className="material-symbols-outlined text-[10px]">visibility</span> SIGEF</button></td>
                      <td className="py-3 px-2 text-center">
                        <div className="w-8 h-4 bg-gray-300 rounded-full mx-auto relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full border shadow absolute left-0"></div></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-right text-[10px] text-gray-500 mt-2">Página 1 de 1 - 1 resultados</div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6 shadow-sm">
              <h2 className="text-sm font-bold text-gray-700 uppercase mb-4 border-b pb-2">Dados do Imóvel</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                <div className="md:col-span-3">
                  <label className="text-xs text-gray-600 block mb-1">Nome do imóvel *</label>
                  <input type="text" value={imovelData.nome} onChange={(e) => setImovelData({...imovelData, nome: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm" />
                </div>
                <div className="md:col-span-1">
                  <label className="text-xs text-gray-600 block mb-1">UF *</label>
                  <select value={imovelData.uf} onChange={(e) => setImovelData({...imovelData, uf: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm"><option>MG</option></select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-600 block mb-1">Município *</label>
                  <select value={imovelData.municipio} onChange={(e) => setImovelData({...imovelData, municipio: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm"><option>Fronteira</option></select>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-xs text-gray-600 block mb-1">O imóvel rural foi objeto de desmembramento de imóvel já cadastrado no CAR? *</span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="desm" checked={imovelData.desmembramento==="Sim"} onChange={()=>setImovelData({...imovelData, desmembramento: "Sim"})} /> Sim</label>
                  <label className="flex items-center gap-1 text-sm text-gray-700"><input type="radio" name="desm" checked={imovelData.desmembramento==="Não"} onChange={()=>setImovelData({...imovelData, desmembramento: "Não"})} /> Não</label>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs text-gray-600 block mb-1">Descrição de acesso *</label>
                <textarea value={imovelData.acesso} onChange={(e) => setImovelData({...imovelData, acesso: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm h-16"></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Zona de localização *</label>
                  <select value={imovelData.zona} onChange={(e) => setImovelData({...imovelData, zona: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm"><option>Rural</option><option>Urbana</option></select>
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Código do Cadastro Imobiliário Brasileiro - CIB</label>
                  <input type="text" value={imovelData.cib} onChange={(e) => setImovelData({...imovelData, cib: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm" />
                </div>
              </div>

              <div className="mb-6 border-b pb-6">
                <label className="flex items-center gap-2 text-xs text-gray-700">
                  <input type="checkbox" checked={imovelData.alteracaoArea} onChange={(e) => setImovelData({...imovelData, alteracaoArea: e.target.checked})} />
                  Marque se houve alteração na área do imóvel após 22/07/2008
                </label>
              </div>

              <h2 className="text-sm font-bold text-gray-700 uppercase mb-4 border-b pb-2">Endereço de correspondência</h2>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-600 block mb-1">CEP *</label>
                  <input type="text" value={imovelData.cep} onChange={(e) => setImovelData({...imovelData, cep: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm" />
                </div>
                <div className="md:col-span-1">
                  <label className="text-xs text-gray-600 block mb-1">UF *</label>
                  <select value={imovelData.endUf} onChange={(e) => setImovelData({...imovelData, endUf: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm"><option>MG</option></select>
                </div>
                <div className="md:col-span-1">
                  <label className="text-xs text-gray-600 block mb-1">Município</label>
                  <select value={imovelData.endMunicipio} onChange={(e) => setImovelData({...imovelData, endMunicipio: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm"><option>Fronteira</option></select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-600 block mb-1">Logradouro *</label>
                  <input type="text" value={imovelData.logradouro} onChange={(e) => setImovelData({...imovelData, logradouro: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-600 block mb-1">Bairro *</label>
                  <input type="text" value={imovelData.bairro} onChange={(e) => setImovelData({...imovelData, bairro: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-600 block mb-1">Número *</label>
                  <input type="text" value={imovelData.numero} onChange={(e) => setImovelData({...imovelData, numero: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-600 block mb-1">Complemento</label>
                  <input type="text" value={imovelData.complemento} onChange={(e) => setImovelData({...imovelData, complemento: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm" />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button className="px-6 py-2 border border-[#1351b4] text-[#1351b4] rounded-full text-sm font-bold" onClick={() => handleToast("Salvo!")}>Salvar</button>
              <button className="px-6 py-2 border border-[#1351b4] text-[#1351b4] rounded-full text-sm font-bold" onClick={() => setActiveStep(0)}>Anterior</button>
              <button className="px-6 py-2 bg-[#1351b4] text-white rounded-full text-sm font-bold" onClick={() => setActiveStep(2)}>Próximo</button>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="animate-fade-in">
            <SimplificadorBanner step={2} />

            <div className="bg-white border border-gray-200 rounded p-6 shadow-sm mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Documentos oriundos do SNCR</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="py-2 px-4 font-medium">Situação jurídica</th>
                      <th className="py-2 px-4 font-medium">Data</th>
                      <th className="py-2 px-4 font-medium">Cartório</th>
                      <th className="py-2 px-4 font-medium">Matrícula</th>
                      <th className="py-2 px-4 font-medium">Número de registro</th>
                      <th className="py-2 px-4 font-medium">Área registrada (em hectares)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Área Registrada</td>
                      <td className="py-3 px-4">22/02/2023</td>
                      <td className="py-3 px-4">1º Cartório de Registro de Imóveis</td>
                      <td className="py-3 px-4">1000</td>
                      <td className="py-3 px-4">TR-2023-001</td>
                      <td className="py-3 px-4">50,0000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4 text-sm text-gray-700 flex items-center gap-2">
              <input type="checkbox" /> Marque se possui Reserva Legal Averbada e/ou Reserva Legal Aprovada não Averbada
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-6 text-sm text-gray-700 flex items-center gap-2">
              <input type="checkbox" /> Marque se a Reserva Legal do imóvel rural está submetida a legislação anterior à Lei 12.651/2012
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button className="px-6 py-2 border border-[#1351b4] text-[#1351b4] rounded-full text-sm font-bold" onClick={() => handleToast("Salvo!")}>Salvar</button>
              <button className="px-6 py-2 border border-[#1351b4] text-[#1351b4] rounded-full text-sm font-bold" onClick={() => setActiveStep(1)}>Anterior</button>
              <button className="px-6 py-2 bg-[#1351b4] text-white rounded-full text-sm font-bold" onClick={() => setActiveStep(3)}>Próximo</button>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="animate-fade-in">
            <SimplificadorBanner step={3} />
            
            <div className="bg-white border border-gray-200 rounded p-6 shadow-sm">
              <h2 className="text-sm font-bold text-gray-700 uppercase mb-4 border-b pb-2">ADICIONAR REPRESENTANTE</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-8">
                <div>
                  <label className="text-xs text-gray-600 block mb-1">CPF *</label>
                  <input type="text" value={repForm.cpf} onChange={(e) => setRepForm({...repForm, cpf: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm" placeholder="000.000.000-00" />
                </div>
                <div>
                  <label className="text-xs text-gray-600 block mb-1">Data de Nascimento *</label>
                  <input type="text" value={repForm.birthDate} onChange={(e) => setRepForm({...repForm, birthDate: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm" placeholder="DD/MM/AAAA" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-600 block mb-1">Nome</label>
                  <input type="text" value={repForm.name} onChange={(e) => setRepForm({...repForm, name: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm" placeholder="Nome do proprietário/possuidor" />
                </div>
                <div className="md:col-span-3">
                  <label className="text-xs text-gray-600 block mb-1">Nome da mãe</label>
                  <input type="text" value={repForm.motherName} onChange={(e) => setRepForm({...repForm, motherName: e.target.value})} className="w-full border rounded px-3 py-1.5 text-sm" placeholder="Nome da mãe" />
                </div>
                <div className="flex gap-2 justify-end">
                  <button className="px-4 py-1.5 border border-[#1351b4] text-[#1351b4] rounded-full text-sm font-bold" onClick={() => setRepForm({ cpf: "", birthDate: "", name: "", motherName: "" })}>Limpar</button>
                  <button className="px-4 py-1.5 bg-[#1351b4] text-white rounded-full text-sm font-bold opacity-70 hover:opacity-100" onClick={addRep}>Adicionar</button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Representante(s) adicionado(s)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="py-2 px-4 font-medium">CPF</th>
                        <th className="py-2 px-4 font-medium w-full">Nome</th>
                        <th className="py-2 px-4 font-medium text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reps.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="py-8 text-center text-gray-400">Nenhum representante adicionado</td>
                        </tr>
                      ) : (
                        reps.map(r => (
                          <tr key={r.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 whitespace-nowrap">{r.cpf}</td>
                            <td className="py-3 px-4">{r.name}</td>
                            <td className="py-3 px-4 text-right flex justify-end gap-3 text-[#1351b4]">
                              <span className="material-symbols-outlined cursor-pointer text-sm">edit</span>
                              <span className="material-symbols-outlined cursor-pointer text-sm text-red-500" onClick={() => removeRep(r.id)}>delete</span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 gap-4">
              <button className="px-6 py-2 border border-[#1351b4] text-[#1351b4] rounded-full text-sm font-bold" onClick={() => handleToast("Salvo!")}>Salvar</button>
              <button className="px-6 py-2 border border-[#1351b4] text-[#1351b4] rounded-full text-sm font-bold" onClick={() => setActiveStep(2)}>Anterior</button>
              <button className="px-6 py-2 bg-[#1351b4] text-white rounded-full text-sm font-bold" onClick={() => setActiveStep(4)}>Próximo</button>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="animate-fade-in">
            <SimplificadorBanner step={4} />

            <div className="flex gap-2 overflow-x-auto mb-6 hide-scrollbar border-b pb-2">
              <button className="flex items-center gap-1 bg-white border border-gray-200 text-[#1351b4] font-medium px-4 py-2 rounded shadow-sm">
                <span className="material-symbols-outlined text-sm">expand_more</span> IMÓVEL
              </button>
              <button className="flex items-center gap-1 bg-white border border-gray-200 text-gray-500 font-medium px-4 py-2 rounded shadow-sm opacity-70">
                <span className="material-symbols-outlined text-sm">chevron_right</span> COBERTURA DO SOLO
              </button>
              <button className="flex items-center gap-1 bg-white border border-gray-200 text-gray-500 font-medium px-4 py-2 rounded shadow-sm opacity-70">
                <span className="material-symbols-outlined text-sm">chevron_right</span> SERVIDÃO ADMINISTRATIVA
              </button>
              <button className="flex items-center gap-1 bg-white border border-gray-200 text-gray-500 font-medium px-4 py-2 rounded shadow-sm opacity-70">
                <span className="material-symbols-outlined text-sm">chevron_right</span> APP/USO RESTRITO
              </button>
              <button className="flex items-center gap-1 bg-white border border-gray-200 text-gray-500 font-medium px-4 py-2 rounded shadow-sm opacity-70">
                <span className="material-symbols-outlined text-sm">chevron_right</span> RESERVA LEGAL
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded p-6 shadow-sm min-h-[400px]">
              <h2 className="text-sm font-bold text-gray-700 uppercase mb-2">IMÓVEL</h2>
              <p className="text-xs text-gray-600 mb-6">Selecione uma camada para desenhar e processar.</p>

              <div className="flex flex-col gap-2 text-xs font-medium text-gray-800 mb-4">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-400"></div> Limite do Imóvel <span className="text-red-500">*</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-400 border border-red-500 flex items-center justify-center"><span className="text-[8px] text-red-500">★</span></div> Sede do Imóvel <span className="text-red-500">*</span></div>
              </div>

              <div className="mt-4 border border-gray-300 w-full h-[400px] bg-gray-100 flex items-center justify-center relative overflow-hidden group">
                <img src="/images/mapa_geo.png" alt="Mapa" className="w-full h-full object-cover" />
                
                {/* Controls */}
                <div className="absolute right-2 top-2 bg-white border border-gray-300 rounded shadow flex flex-col">
                  <button className="p-1 border-b text-gray-600 hover:bg-gray-50">+</button>
                  <button className="p-1 border-b text-gray-600 hover:bg-gray-50">-</button>
                  <button className="p-1 text-gray-600 hover:bg-gray-50"><span className="material-symbols-outlined text-[14px]">my_location</span></button>
                </div>
              </div>

              {isRetificacao && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded animate-fade-in">
                  <p className="text-sm font-bold text-yellow-800 mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">engineering</span> Ação necessária: Ajuste de Reserva Legal
                  </p>
                  <p className="text-xs text-yellow-700 mb-4">O sistema detectou que o polígono atual da Reserva Legal é menor do que o exigido. Arraste os vértices no mapa ou use a nossa IA para corrigir o traçado.</p>
                  <button 
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded text-xs font-bold shadow flex items-center gap-2" 
                    onClick={() => handleToast("Área de RL retificada com sucesso via Assistente da CARlinha!")}
                  >
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    Simular correção automática (CARlinha)
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button className="px-6 py-2 border border-[#1351b4] text-[#1351b4] rounded-full text-sm font-bold" onClick={() => setActiveStep(3)}>Anterior</button>
              <button className="px-6 py-2 bg-[#1351b4] text-white rounded-full text-sm font-bold" onClick={() => setActiveStep(5)}>Próximo</button>
            </div>
          </div>
        )}

        {activeStep === 5 && (
          <div className="animate-fade-in">
            <SimplificadorBanner step={5} />
            
            <div className="bg-white border border-gray-200 rounded shadow-sm mb-4">
              <div className="border-b p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                <span className="font-bold text-sm text-gray-800">Etapa "Imóvel"</span>
                <span className="material-symbols-outlined text-gray-500 text-sm">expand_less</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0"></div>
                  <p>A lista de proprietários/possuidores foi atualizada automaticamente com os dados do SNCR <span className="material-symbols-outlined text-[12px] text-[#1351b4] align-middle">open_in_new</span></p>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0"></div>
                  <p>A documentação foi atualizada automaticamente conforme os dados do SNCR <span className="material-symbols-outlined text-[12px] text-[#1351b4] align-middle">open_in_new</span></p>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0"></div>
                  <p>Informe o código CIB do imóvel. <span className="material-symbols-outlined text-[12px] text-[#1351b4] align-middle">open_in_new</span></p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded shadow-sm">
              <div className="border-b p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
                <span className="font-bold text-sm text-gray-800">Etapa "Representante"</span>
                <span className="material-symbols-outlined text-gray-500 text-sm">expand_less</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0"></div>
                  <p>Nenhum representante foi adicionado. <span className="material-symbols-outlined text-[12px] text-[#1351b4] align-middle">open_in_new</span></p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button className="px-6 py-2 border border-[#1351b4] text-[#1351b4] rounded-full text-sm font-bold" onClick={() => setActiveStep(4)}>Anterior</button>
              <button className="px-6 py-2 bg-[#1351b4] text-white rounded-full text-sm font-bold" onClick={() => setActiveStep(6)}>Próximo</button>
            </div>
          </div>
        )}

        {activeStep === 6 && (
          <div className="animate-fade-in">
            <SimplificadorBanner step={6} />
            
            <div className="bg-gray-50 border border-gray-200 rounded shadow-sm min-h-[300px] flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-bold text-sm text-gray-700 uppercase">SOBREPOSIÇÕES</h3>
              </div>
              <div className="flex-1 flex items-center justify-center p-8">
                <p className="text-sm text-gray-400 italic text-center">
                  Não foram identificadas sobreposições com áreas restritas ou outros imóveis rurais.
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button className="px-6 py-2 border border-[#1351b4] text-[#1351b4] rounded-full text-sm font-bold" onClick={() => handleToast("Salvo!")}>Salvar</button>
              <button className="px-6 py-2 border border-[#1351b4] text-[#1351b4] rounded-full text-sm font-bold" onClick={() => setActiveStep(5)}>Anterior</button>
              <button onClick={() => setShowGamification(true)} className="px-6 py-2 bg-[#2EAD4B] hover:bg-green-600 text-white rounded-full text-sm font-bold transition shadow">Finalizar e Receber Selo</button>
            </div>
          </div>
        )}

      </div>
      
      {showGamification && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative shadow-2xl overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-50 -z-10"></div>
             <div className="text-7xl animate-bounce mb-2">🏆</div>
             <h3 className="text-3xl font-black text-green-800 uppercase tracking-tight leading-none mb-3">Parabéns!</h3>
             <p className="text-green-700 font-bold text-lg mb-2">Você ganhou o Selo CARimbo Verde!</p>
             <p className="text-sm text-gray-600 mb-6">
                Cadastro pré-preenchido finalizado e revisado com sucesso. Você compreendeu todas as regras e seu imóvel está no caminho certo.
             </p>
             
             <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-6 text-left relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 text-9xl opacity-5">🃏</div>
                <div className="flex gap-3 relative z-10">
                   <span className="material-symbols-outlined text-blue-600 text-4xl shrink-0 animate-pulse">lightbulb</span>
                   <div>
                     <p className="font-bold text-blue-900">Ver CARtas na Manga</p>
                     <p className="text-xs text-blue-800 mt-1 mb-3">Você possui áreas excedentes que pode vender para compensação. Gostaria de publicar no nosso MarCARtplace?</p>
                     <button onClick={() => { localStorage.setItem("novaCota", "true"); handleToast("Publicando excedente no MarCARtplace..."); setTimeout(() => navigate('/marketplace'), 1500); }} className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase px-4 py-2 rounded shadow transition w-full">Sim, a CARlinha já preencheu pra mim!</button>
                   </div>
                </div>
             </div>

             <button onClick={() => { setShowGamification(false); navigate('/produtor'); }} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg w-full transition">Voltar para a Central</button>
          </div>
        </div>
      )}

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </div>
  );
}
