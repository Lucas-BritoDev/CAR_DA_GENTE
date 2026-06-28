/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Produtor from "./components/Produtor";
import Analista from "./components/Analista";
import Comunidade from "./components/Comunidade";

import FichaImovel from "./components/FichaImovel";
import CadastroPrePreenchido from "./components/CadastroPrePreenchido";
import ListarImoveis from "./components/ListarImoveis";
import Perfil from "./components/Perfil";
import GovHeader from "./components/GovHeader";
import CadastrarImovel from "./components/CadastrarImovel";
import GerenciarCadastrante from "./components/GerenciarCadastrante";
import MarCARtplace from "./components/MarCARtplace";
import { AccessibilityWidget } from "./accessibility/AccessibilityWidget";
import { InstallPWAButton } from "./components/InstallPWAButton";
import ChatbotModal from "./components/ChatbotModal";
import { MobileWidgetToggle } from "./components/MobileWidgetToggle";

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <GovHeader />
        <div className="flex-1 flex flex-col relative">
          <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/produtor" element={<Produtor />} />
        <Route path="/produtor/ficha" element={<FichaImovel />} />
        <Route path="/analista" element={<Analista />} />
        <Route path="/comunidade" element={<Comunidade />} />
        <Route
          path="/cadastro-pre-preenchido"
          element={<CadastroPrePreenchido />}
        />
        <Route path="/listar-imoveis" element={<ListarImoveis />} />
        <Route path="/cadastrar-imovel" element={<CadastrarImovel />} />
        <Route
          path="/gerenciar-cadastrante"
          element={<GerenciarCadastrante />}
        />
        <Route path="/marketplace" element={<MarCARtplace />} />
        <Route path="/Marketplace" element={<MarCARtplace />} />
      </Routes>
      </div>
        <InstallPWAButton />
      </div>
      <AccessibilityWidget />
      <MobileWidgetToggle />

      {/* Floating Assistant CARlinha */}
      <div
        onClick={() => setIsChatOpen(true)}
        className="carlinha-widget fixed bottom-6 right-6 md:bottom-10 md:right-6 flex items-center gap-3 group cursor-pointer z-50"
      >
        <div className="text-sm font-bold text-gray-700 bg-white/80 px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-sm">
          Olá, posso ajudar?
        </div>
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-2 border-green-500 bg-[#e6f7ef]">
          <img
            src="/carlinha.png"
            alt="Carlinha"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {isChatOpen && <ChatbotModal onClose={() => setIsChatOpen(false)} />}
    </Router>
  );
}
