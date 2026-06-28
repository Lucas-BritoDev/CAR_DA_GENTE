import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingTour, { TourStep } from "./OnboardingTour";
import Toast from "./Toast";
import SeloProcedencia from "./shared/SeloProcedencia";
import SemaforoBadge from "./shared/SemaforoBadge";

export default function Home() {
  const navigate = useNavigate();
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("tourSkipped") !== "true") {
      setRunTour(true);
    }
  }, []);

  const tourSteps: TourStep[] = [
    {
      target: 'center',
      title: "Boas-vindas ao CAR DA GENTE!",
      content: "Eu sou a Carlinha, a nossa Inteligência Artificial do povo! Vou te mostrar como a nossa plataforma simplifica o Cadastro Ambiental Rural. Esta é a página inicial, de onde você acessa todos os módulos rapidim.",
      placement: "bottom"
    },
    {
      target: '[data-tour="header"]',
      title: "Avisos e Atalhos Rápidos",
      content: "Aqui ficam os atalhos mais importantes. Se houver alguma pendência urgente no seu imóvel, a gente te avisa logo de cara, sem susto!",
      placement: "bottom"
    },
    {
      target: '[data-tour="card-1"]',
      title: "Cadastro Pré-Preenchido",
      content: "Aqui você inicia a regularização do imóvel de forma facilitada. Os dados principais já vêm preenchidos para você não perder tempo!",
      placement: "bottom"
    },
    {
      target: '[data-tour="card-2"]',
      title: "Central do Proprietário / Possuidor",
      content: "Neste módulo, o coração bate mais aliviado. O Laudo Cidadão traduz as notificações sem juridiquês e a Calculadora Financeira mostra, direto no bolso, a vantagem real e o dinheiro que rende ao estar em dia com a natureza!",
      placement: "bottom"
    },

    {
      target: '[data-tour="card-5"]',
      title: "MarCARtplace",
      content: "É o match da prosperidade no campo! A gente une quem precisa compensar a sua área com quem tem mata sobrando para vender.",
      placement: "bottom"
    },
    {
      target: '[data-tour="card-4"]',
      title: "Projeto CARcantado",
      content: "O projeto CARcantado pulsando viva a nossa cultura! São paródias e músicas autorais que rodam nas rádios locais e vídeos no TikTok para engajar as roças do país.",
      placement: "bottom"
    }
  ];
  const [toastMsg, setToastMsg] = useState("");

  const handleToast = (msg: string) => setToastMsg(msg);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900 overflow-x-hidden relative">
      <OnboardingTour
        isOpen={runTour}
        onClose={() => {
          setRunTour(false);
          localStorage.setItem("tourSkipped", "true");
        }}
        steps={tourSteps}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 md:px-12 relative py-8 md:py-12 w-full max-w-6xl mx-auto">
        {/* Decorative Background Elements */}
        <div className="absolute -right-20 top-20 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50 z-0"></div>
        <div className="absolute -left-20 bottom-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 z-0"></div>

        {/* Shortcut Alert Banner */}
        <div data-tour="header" className="w-full z-10 mb-8 animate-fade-in">
          <div className="bg-white border-l-4 border-red-600 rounded-lg shadow-sm w-full p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="hidden sm:flex w-12 h-12 rounded-full bg-red-50 items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-red-600 text-2xl">assignment_late</span>
              </div>
              <div className="text-left flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Atenção Necessária</span>
                  <span className="bg-red-100 text-red-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Laudo Cidadão</span>
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  Sítio Boa Esperança possui déficit de <span className="text-red-600 font-bold">4,2 ha</span> de Reserva Legal.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 mt-2 md:mt-0">
              <button
                onClick={() => setRunTour(true)}
                className="flex-1 md:flex-none px-4 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Entender
              </button>
              <button
                onClick={() => navigate("/produtor")}
                className="flex-1 md:flex-none px-4 py-2 text-xs font-semibold text-white bg-[#2EAD4B] rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-1 shadow-sm"
              >
                Acessar Central
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl w-full z-10 mt-8">
          {/* Card 1: Pre-filled Module */}
          <div
            data-tour="card-1"
            onClick={() => navigate("/cadastro-pre-preenchido")}
            className="group cursor-pointer transform hover:-translate-y-1 transition-all"
          >
            <div className="h-48 bg-white border border-gray-200 shadow-lg flex items-center justify-center flex-col gap-3 relative group-hover:border-blue-500 hover:ring-4 hover:ring-blue-100 transition-all duration-300">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-green-200 shadow-sm">
                <img src="/images/cadastro.png" alt="Cadastro" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs text-center px-4 font-semibold text-gray-500 uppercase tracking-tight">
                Cadastro Pré-Preenchido
              </span>
            </div>
            <div className="bg-[#2EAD4B] text-white text-center py-2 text-xs font-bold uppercase">
              Acessar
            </div>
          </div>

          {/* Card 2: Official Portal Core */}
          <div
            data-tour="card-2"
            onClick={() => navigate("/produtor")}
            className="group cursor-pointer transform hover:-translate-y-1 transition-all"
          >
            <div className="h-48 bg-white border border-gray-200 shadow-lg flex items-center justify-center flex-col gap-3 relative group-hover:border-blue-500 hover:ring-4 hover:ring-blue-100 transition-all duration-300">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-200 shadow-sm">
                <img src="/images/produtor.png" alt="Produtor" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs text-center px-4 font-semibold text-gray-500 uppercase tracking-tight">
                Central do Proprietário / Possuidor
              </span>
            </div>
            <div className="bg-[#2EAD4B] text-white text-center py-2 text-xs font-bold uppercase">
              Entrar
            </div>
          </div>



          {/* Card 5: MarCARtplace */}
          <div
            data-tour="card-5"
            onClick={() => navigate("/marketplace")}
            className="group cursor-pointer transform hover:-translate-y-1 transition-all"
          >
            <div className="h-48 bg-white border border-gray-200 shadow-lg flex items-center justify-center flex-col gap-3 relative group-hover:border-green-500 hover:ring-4 hover:ring-green-100 transition-all duration-300">
              <div className="absolute top-2 right-2 bg-green-700 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">
                Novo
              </div>
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-green-300 shadow-sm">
                <img src="/images/marcartplace.png" alt="Marketplace" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs text-center px-4 font-semibold text-gray-500 uppercase tracking-tight">
                MarCARtplace
              </span>
            </div>
            <div className="bg-[#2E7D32] text-white text-center py-2 text-xs font-bold uppercase">
              Venda Aqui Sua Cota
            </div>
          </div>

          {/* Card 4: Extension Module - ComuniCAR */}
          <div
            data-tour="card-4"
            onClick={() => navigate("/comunidade")}
            className="group cursor-pointer transform hover:-translate-y-1 transition-all"
          >
            <div className="h-48 bg-white border border-gray-200 shadow-lg flex items-center justify-center flex-col gap-3 relative group-hover:border-blue-500 hover:ring-4 hover:ring-blue-100 transition-all duration-300">
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">
                Extensão
              </div>
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-orange-200 shadow-sm">
                <img src="/images/comunidade.png" alt="Comunidade" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs text-center px-4 font-semibold text-gray-500 uppercase tracking-tight">
                Projeto CARcantado
              </span>
            </div>
            <div className="bg-[#2EAD4B] text-white text-center py-2 text-xs font-bold uppercase">
              Radinho da Terra
            </div>
          </div>
        </div>

        {/* Banner Rotativo MarCARtplace */}
        <div className="mt-8 w-full max-w-6xl overflow-hidden rounded-lg bg-gradient-to-r from-green-700 to-green-900 shadow-md z-10">
          <div
            className="flex whitespace-nowrap py-2.5 px-4"
            style={{ animation: "marquee 20s linear infinite" }}
          >
            <span className="text-white text-sm font-medium mx-8">
              🌿 Ei, compadre! Tem mata sobrando pra vender? Divulga rapidim aqui no MarCARtplace!
            </span>
            <span className="text-white text-sm font-medium mx-8">
              💰 Transforme preservação em dinheiro no bolso — cadastre suas Cotas de Reserva Ambiental (CRA)! É o match da prosperidade no campo!
            </span>
            <span className="text-white text-sm font-medium mx-8">
              🌿 Ei, compadre! Tem mata sobrando pra vender? Divulga rapidim aqui no MarCARtplace!
            </span>
            <span className="text-white text-sm font-medium mx-8">
              💰 Transforme preservação em dinheiro no bolso — cadastre suas Cotas de Reserva Ambiental (CRA)! É o match da prosperidade no campo!
            </span>
          </div>
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </main>

      {/* Footer Gov.br */}
      <footer className="w-full bg-gray-50 border-t border-gray-200 px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap justify-center gap-4 text-[10px] text-gray-500 font-medium">

        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-gray-400 italic">
            Protótipo · haCARthon 2026
          </span>
          <div className="h-4 w-px bg-gray-300"></div>
          <div className="flex items-center gap-1 opacity-60">
            <div className="w-4 h-4 bg-blue-900 rounded-full"></div>
            <span className="text-[10px] font-bold text-blue-900">gov.br</span>
          </div>
        </div>
      </footer>

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </div>
  );
}
