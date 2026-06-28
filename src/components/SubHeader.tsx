import { useLocation, useNavigate } from "react-router-dom";

export default function SubHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.toLowerCase();

  let title = "MÓDULOS DO SISTEMA";
  let mainTitle = "CAR DA GENTE";
  let showBackButton = path !== "/";

  if (path === "/") {
    title = "MÓDULOS DO SISTEMA";
  } else if (path.includes("/cadastro-pre-preenchido")) {
    title = "CADASTRO PRÉ-PREENCHIDO";
  } else if (path.includes("/listar-imoveis")) {
    title = "LISTA DE IMÓVEIS";
  } else if (path.includes("/cadastrar-imovel")) {
    title = "CADASTRAR NOVO IMÓVEL";
  } else if (path.includes("/gerenciar-cadastrante")) {
    title = "GERENCIAR CADASTRANTE";
  } else if (path.includes("/produtor/ficha")) {
    title = "FICHA DO IMÓVEL";
  } else if (path.includes("/produtor")) {
    title = "CENTRAL DO PROPRIETÁRIO / POSSUIDOR";
  } else if (path.includes("/analista")) {
    title = "CENTRAL DO ANALISTA";
  } else if (path.includes("/comunidade")) {
    title = "COMUNICAR - COMUNIDADE";
  } else if (path.includes("/marketplace")) {
    title = "MARCARTPLACE";
  }

  return (
    <div className="bg-white shadow z-[30] sticky top-0" data-tour="header">
      <div className="max-w-6xl w-full mx-auto px-4 py-3 flex justify-between items-center border-b">
        <div className="flex items-center gap-4 text-[#1351b4]">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="hover:bg-blue-50 p-1 rounded-full transition flex items-center justify-center -ml-2"
              title="Voltar"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          )}
          <div
            className={`flex items-center gap-2 ${showBackButton ? "cursor-pointer" : ""}`}
            onClick={() => {
              if (showBackButton) navigate("/");
            }}
          >
            <img src="/logo.png" alt="Logo" className="h-10 sm:h-12 w-auto object-contain" />
            <span className="text-xl sm:text-2xl font-medium tracking-tight mt-1">{mainTitle}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white overflow-hidden">
            <span className="material-symbols-outlined text-sm">person</span>
          </div>
        </div>
      </div>
      <div className="bg-[#00d053] text-white text-center py-1.5 font-bold text-sm tracking-wide uppercase">
        {title}
      </div>
    </div>
  );
}
