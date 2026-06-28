import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

const ofertasMock = [
  {
    id: 1,
    propriedade: "Fazenda Esperança Verde",
    municipio: "Alta Floresta",
    uf: "MT",
    bioma: "Amazônia",
    hectares: 120,
    precoHa: 8500,
    tipo: "Reserva Legal",
    status: "Disponível",
    imagem: "https://picsum.photos/id/28/500/300"
  },
  {
    id: 2,
    propriedade: "Sítio Mata Atlântica",
    municipio: "Ilhéus",
    uf: "BA",
    bioma: "Mata Atlântica",
    hectares: 45,
    precoHa: 12000,
    tipo: "Reserva Legal",
    status: "Disponível",
    imagem: "https://picsum.photos/id/10/500/300"
  },
  {
    id: 3,
    propriedade: "Rancho Cerrado Vivo",
    municipio: "Chapada dos Guimarães",
    uf: "MT",
    bioma: "Cerrado",
    hectares: 80,
    precoHa: 6200,
    tipo: "APP",
    status: "Disponível",
    imagem: "https://picsum.photos/id/13/500/300"
  },
  {
    id: 4,
    propriedade: "Fazenda Rio Claro",
    municipio: "Sinop",
    uf: "MT",
    bioma: "Amazônia",
    hectares: 200,
    precoHa: 7800,
    tipo: "Reserva Legal",
    status: "Negociando",
    imagem: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 5,
    propriedade: "Estância Pantaneira",
    municipio: "Corumbá",
    uf: "MS",
    bioma: "Pantanal",
    hectares: 350,
    precoHa: 5500,
    tipo: "Reserva Legal",
    status: "Disponível",
    imagem: "https://picsum.photos/id/29/500/300"
  },
  {
    id: 6,
    propriedade: "Sítio Caatinga Forte",
    municipio: "Juazeiro",
    uf: "BA",
    bioma: "Caatinga",
    hectares: 60,
    precoHa: 4000,
    tipo: "APP",
    status: "Disponível",
    imagem: "https://picsum.photos/id/46/500/300"
  },
];

export default function MarCARtplace() {
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState("");
  const [ofertas, setOfertas] = useState(ofertasMock);
  const [filtro, setFiltro] = useState({ bioma: "", uf: "", tipo: "" });
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [ofertaSelecionada, setOfertaSelecionada] = useState<any>(null);

  const handleToast = (msg: string) => setToastMsg(msg);

  useEffect(() => {
    if (localStorage.getItem("novaCota") === "true") {
      const novaOferta = {
        id: 99,
        propriedade: "Sítio Boa Esperança",
        municipio: "Fronteira",
        uf: "MG",
        bioma: "Cerrado",
        hectares: 4.2,
        precoHa: 8500,
        tipo: "Reserva Legal",
        status: "Novo!",
        imagem: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
      };
      
      setOfertas(prev => {
        if (!prev.find(o => o.id === 99)) {
          return [novaOferta, ...prev];
        }
        return prev;
      });
    }
  }, []);

  const biomasUnicos = [...new Set(ofertas.map((o) => o.bioma))];
  const ufsUnicas = [...new Set(ofertas.map((o) => o.uf))];
  const tiposUnicos = [...new Set(ofertas.map((o) => o.tipo))];

  const ofertasFiltradas = ofertas.filter((o) => {
    if (filtro.bioma && o.bioma !== filtro.bioma) return false;
    if (filtro.uf && o.uf !== filtro.uf) return false;
    if (filtro.tipo && o.tipo !== filtro.tipo) return false;
    if (searchTerm && !o.propriedade.toLowerCase().includes(searchTerm.toLowerCase()) && !o.municipio.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* CONTROLES E-COMMERCE (Search & Anunciar) */}
      <div className="w-full bg-[#1351b4] py-3 px-4 shadow-sm z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
          {/* Search Bar */}
          <div className="flex-1 w-full max-w-2xl relative">
            <input
              type="text"
              placeholder="Buscar por fazenda, município ou bioma..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-gray-800 py-2.5 pl-4 pr-12 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-800 bg-white border-l border-gray-200 rounded-r-sm flex items-center justify-center">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowCadastroModal(true)}
              className="bg-[#00d053] hover:bg-[#00b347] text-white text-sm font-bold py-2 px-6 rounded transition shadow-sm flex items-center gap-2 uppercase tracking-wide"
            >
              <span className="material-symbols-outlined text-base">sell</span>
              Anunciar Cota
            </button>
          </div>
        </div>
      </div>

      {/* SUB-HEADER CATEGORIAS */}
      <div className="bg-white border-b border-gray-200 shadow-sm hidden md:block">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-6 py-2 text-sm text-gray-600 font-semibold">
          <button className="hover:text-[#1351b4] transition">Todas as Cotas</button>
          <button onClick={() => setFiltro({ ...filtro, tipo: 'Reserva Legal' })} className="hover:text-[#1351b4] transition">Reserva Legal</button>
          <button onClick={() => setFiltro({ ...filtro, tipo: 'APP' })} className="hover:text-[#1351b4] transition">APP</button>
          <button className="hover:text-[#00b347] transition text-[#00d053] flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">verified</span>
            Anúncios Verificados
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR (Filtros) */}
        <aside className="w-full md:w-64 flex-shrink-0 hidden md:block">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{ofertasFiltradas.length} resultados</h2>
          
          <div className="space-y-6">
            {/* Tipo Filter */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Tipo de Cota</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <button onClick={() => setFiltro({...filtro, tipo: ""})} className={`hover:text-blue-600 ${filtro.tipo === "" ? 'font-bold text-blue-600' : ''}`}>Todos os tipos</button>
                </li>
                {tiposUnicos.map(t => (
                  <li key={t}>
                    <button onClick={() => setFiltro({...filtro, tipo: t})} className={`hover:text-blue-600 ${filtro.tipo === t ? 'font-bold text-blue-600' : ''}`}>{t}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bioma Filter */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Bioma</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <button onClick={() => setFiltro({...filtro, bioma: ""})} className={`hover:text-blue-600 ${filtro.bioma === "" ? 'font-bold text-blue-600' : ''}`}>Qualquer bioma</button>
                </li>
                {biomasUnicos.map(b => (
                  <li key={b}>
                    <button onClick={() => setFiltro({...filtro, bioma: b})} className={`hover:text-blue-600 ${filtro.bioma === b ? 'font-bold text-blue-600' : ''}`}>{b}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Estado Filter */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Localização (UF)</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <button onClick={() => setFiltro({...filtro, uf: ""})} className={`hover:text-blue-600 ${filtro.uf === "" ? 'font-bold text-blue-600' : ''}`}>Brasil</button>
                </li>
                {ufsUnicas.map(u => (
                  <li key={u}>
                    <button onClick={() => setFiltro({...filtro, uf: u})} className={`hover:text-blue-600 ${filtro.uf === u ? 'font-bold text-blue-600' : ''}`}>{u}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* LISTINGS (Grid) */}
        <div className="flex-1">
          {ofertasFiltradas.length === 0 ? (
            <div className="bg-white rounded-md p-10 text-center shadow-sm">
              <span className="material-symbols-outlined text-5xl text-gray-300 mb-3">search_off</span>
              <h3 className="text-xl font-semibold text-gray-700">Nenhum anúncio encontrado</h3>
              <p className="text-gray-500 mt-2">Tente buscar por outras palavras-chave ou limpe os filtros.</p>
              <button 
                onClick={() => {setFiltro({bioma:"", uf:"", tipo:""}); setSearchTerm("")}} 
                className="mt-4 text-blue-600 font-bold hover:underline"
              >
                Limpar todos os filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ofertasFiltradas.map((oferta) => (
                <div
                  key={oferta.id}
                  onClick={() => setOfertaSelecionada(oferta)}
                  className="bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col group cursor-pointer border border-transparent hover:border-gray-200"
                >
                  {/* Imagem do Anúncio */}
                  <div className="h-48 w-full bg-gray-200 relative overflow-hidden">
                    <img 
                      src={oferta.imagem} 
                      alt={oferta.propriedade}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute top-2 left-2 backdrop-blur text-xs font-bold px-2 py-1 rounded shadow-sm uppercase ${oferta.status === 'Novo!' ? 'bg-green-500 text-white' : 'bg-white/90 text-gray-700'}`}>
                      {oferta.status === 'Novo!' ? 'Novo!' : oferta.tipo}
                    </div>
                  </div>

                  {/* Informações */}
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-2xl font-normal text-gray-900 mb-1">
                      R$ {oferta.precoHa.toLocaleString("pt-BR")} <span className="text-sm text-gray-500">/ ha</span>
                    </p>
                    <p className="text-[#00d053] text-sm font-semibold mb-2 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      Garantido pelo CAR da Gente
                    </p>

                    <h3 className="text-sm font-normal text-gray-700 mb-2 line-clamp-2 h-10">
                      Cota de {oferta.tipo} na {oferta.propriedade} ({oferta.bioma})
                    </h3>

                    <div className="mt-auto space-y-1">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">aspect_ratio</span>
                        {oferta.hectares} hectares disponíveis
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">location_on</span>
                        {oferta.municipio} - {oferta.uf}
                      </p>
                    </div>
                  </div>

                  {/* Botão Ação */}
                  <div className="border-t border-gray-100 p-3 bg-gray-50 group-hover:bg-blue-50 transition-colors">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOfertaSelecionada(oferta);
                      }}
                      className="w-full text-[#1351b4] text-sm font-semibold py-1 rounded transition flex items-center justify-center gap-1"
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* MODAL "ANUNCIAR COTA" (Estilo ML) */}
      {showCadastroModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-[#1351b4] text-white rounded-t-lg">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">sell</span>
                Anunciar Cota de Reserva Ambiental
              </h2>
              <button 
                onClick={() => setShowCadastroModal(false)}
                className="text-white hover:text-gray-200 transition"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm mb-6 flex gap-2 items-start">
                <span className="material-symbols-outlined text-blue-600">info</span>
                <p>
                  As informações cadastradas serão submetidas à verificação automática do <strong>Semáforo Legal do CAR DA GENTE</strong> antes do anúncio ser publicado.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Título do Anúncio</label>
                  <input type="text" placeholder="Ex: Cota de Reserva Legal 50ha - Fazenda São Jorge" className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">UF</label>
                  <select className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option>Selecione</option>
                    <option>MT</option><option>BA</option><option>MS</option><option>PA</option><option>GO</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Município</label>
                  <input type="text" placeholder="Digite o município" className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Bioma</label>
                  <select className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option>Selecione</option>
                    <option>Amazônia</option><option>Cerrado</option><option>Mata Atlântica</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Hectares Disponíveis</label>
                  <input type="number" placeholder="Ex: 50" className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Tipo de Cota</label>
                  <select className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option>Reserva Legal</option>
                    <option>APP</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Preço por ha (R$)</label>
                  <input type="number" placeholder="Ex: 8000" className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-200 bg-gray-50 rounded-b-lg flex justify-end gap-3">
              <button 
                onClick={() => setShowCadastroModal(false)}
                className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowCadastroModal(false);
                  handleToast("✅ Anúncio enviado! Nossa IA fará a triagem e publicará em breve.");
                }}
                className="px-6 py-2.5 bg-[#00d053] hover:bg-[#00b347] text-white text-sm font-bold rounded shadow transition"
              >
                Publicar Anúncio Grátis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETALHES DA OFERTA (Estilo ML / OLX) */}
      {ofertaSelecionada && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl my-4 flex flex-col relative animate-fade-in">
            {/* Fechar */}
            <button 
              onClick={() => setOfertaSelecionada(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 bg-white rounded-full p-1 shadow-sm z-10 transition"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="flex flex-col md:flex-row min-h-[400px]">
              {/* Esquerda: Imagem e Descrição */}
              <div className="md:w-3/5 border-r border-gray-200 flex flex-col">
                <div className="h-[250px] w-full bg-gray-100 relative">
                  <img src={ofertaSelecionada.imagem} alt={ofertaSelecionada.propriedade} className="w-full h-full object-cover" />
                  <div className={`absolute top-3 left-3 backdrop-blur text-xs font-bold px-2 py-1 rounded shadow-sm uppercase ${ofertaSelecionada.status === 'Novo!' ? 'bg-green-500 text-white' : 'bg-white/90 text-gray-700'}`}>
                    {ofertaSelecionada.status === 'Novo!' ? 'Novo!' : ofertaSelecionada.tipo}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Descrição do Anúncio</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Excelente oportunidade de compensação ambiental na <strong>{ofertaSelecionada.propriedade}</strong>. 
                    Área preservada no bioma <strong>{ofertaSelecionada.bioma}</strong>, com documentação rigorosamente em dia 
                    e verificada pelo sistema CAR DA GENTE. Ideal para produtores que precisam regularizar passivos ambientais.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    <li><strong className="text-gray-800">Bioma:</strong> {ofertaSelecionada.bioma}</li>
                    <li><strong className="text-gray-800">Localização:</strong> {ofertaSelecionada.municipio} - {ofertaSelecionada.uf}</li>
                    <li><strong className="text-gray-800">Tipo de Área:</strong> {ofertaSelecionada.tipo}</li>
                  </ul>
                  
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded flex gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-lg">verified_user</span>
                    <div>
                      <h4 className="font-bold text-blue-900 text-xs">Transação Segura</h4>
                      <p className="text-[11px] text-blue-800 mt-0.5 leading-tight">
                        O CAR da Gente garante que os dados deste imóvel batem certinho com o SICAR, sem embargos ou sobreposições. Pode confiar, sô!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direita: Preço, Vendedor e Ações */}
              <div className="md:w-2/5 p-5 flex flex-col bg-gray-50 rounded-r-lg">
                <div className="mb-1 text-[10px] text-gray-500 uppercase font-bold tracking-wide">
                  {ofertaSelecionada.hectares} hectares disponíveis
                </div>
                
                <h1 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  Cota de {ofertaSelecionada.tipo} na {ofertaSelecionada.propriedade}
                </h1>
                
                <div className="flex items-center gap-1 text-[#00d053] text-xs font-bold mb-4 bg-green-50 w-fit px-2 py-0.5 rounded border border-green-200">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Garantido pelo CAR da Gente
                </div>
                
                <div className="mb-5">
                  <span className="text-4xl font-light text-gray-900">
                    R$ {ofertaSelecionada.precoHa.toLocaleString("pt-BR")}
                  </span>
                  <span className="text-lg text-gray-500 font-normal"> / ha</span>
                  <p className="text-xs text-gray-500 mt-1">Valor total estimado: R$ {(ofertaSelecionada.precoHa * ofertaSelecionada.hectares).toLocaleString("pt-BR")}</p>
                </div>

                {/* Box Vendedor */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-5 shadow-sm">
                  <h3 className="text-xs font-bold text-gray-800 mb-3">Informações do Vendedor</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-lg uppercase shrink-0">
                      {ofertaSelecionada.id === 99 ? 'RS' : ofertaSelecionada.propriedade.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{ofertaSelecionada.id === 99 ? 'Raimundo da Silva' : 'Proprietário Verificado'}</p>
                      <p className="text-[10px] text-gray-500">Na plataforma desde 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <span className="material-symbols-outlined text-green-600 text-base">how_to_reg</span>
                    Identidade confirmada via GOV.BR
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  <button 
                    onClick={() => window.open('https://wa.me/5571999500774', '_blank')}
                    className="w-full bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold py-2.5 px-3 text-sm rounded flex items-center justify-center gap-2 transition shadow-sm"
                  >
                    <span className="material-symbols-outlined text-lg">chat</span>
                    Mandar um "Zap" direto
                  </button>
                  <button 
                    onClick={() => window.location.href = 'tel:71999500774'}
                    className="w-full bg-white border-2 border-[#1351b4] text-[#1351b4] hover:bg-blue-50 font-bold py-2 px-3 text-sm rounded flex items-center justify-center gap-2 transition shadow-sm"
                  >
                    <span className="material-symbols-outlined text-lg">call</span>
                    Ligar rapidim
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-xs">security</span>
                    Fica sossegado, sua compra está protegida pelo CAR da Gente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </div>
  );
}
