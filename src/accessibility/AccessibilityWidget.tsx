import React, { useState, useEffect, useRef } from "react";
import { useAccessibility } from "./useAccessibility";
import { profiles, ProfileName } from "./profiles";
import { ReadingMask } from "./tools/ReadingMask";
import { ReadingGuide } from "./tools/ReadingGuide";
import { BigCursor } from "./tools/BigCursor";
import {
  Accessibility,
  X,
  RefreshCw,
  Type,
  Contrast,
  MousePointer,
  Search,
  Eye,
  Settings,
  Play,
} from "lucide-react";

export const AccessibilityWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSetting, setProfile, resetSettings } =
    useAccessibility();
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap and Escape key handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Basic focus trap - focus first element
      const firstInput = panelRef.current?.querySelector(
        'button, input, [tabindex]:not([tabindex="-1"])',
      ) as HTMLElement;
      if (firstInput) firstInput.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const togglePanel = () => setIsOpen(!isOpen);

  // Announce changes to screen readers (simple simulation)
  const announce = (message: string) => {
    const liveRegion = document.querySelector('[aria-live="polite"]');
    if (liveRegion) liveRegion.textContent = message;
  };

  const handleProfileClick = (profileName: ProfileName, label: string) => {
    if (settings.profile === profileName) {
      setProfile(null);
      announce(`Perfil ${label} desativado`);
    } else {
      setProfile(profileName);
      announce(`Perfil ${label} ativado`);
    }
  };

  const handleReset = () => {
    resetSettings();
    announce("Configurações de acessibilidade restauradas");
  };

  const ButtonToggle = ({ label, active, onClick, icon: Icon }: any) => (
    <button
      onClick={() => {
        onClick();
        announce(`${label} ${active ? "desativado" : "ativado"}`);
      }}
      className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all w-full text-left font-medium
        ${active ? "border-blue-500 bg-blue-50 text-blue-800" : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"}`}
      aria-pressed={active}
    >
      <Icon size={20} className={active ? "text-blue-600" : "text-gray-500"} />
      <span className="flex-1">{label}</span>
      <div
        className={`w-10 h-5 rounded-full p-1 flex items-center transition-colors ${active ? "bg-blue-500" : "bg-gray-300"}`}
      >
        <div
          className={`w-3 h-3 rounded-full bg-white transition-transform ${active ? "translate-x-5" : "translate-x-0"}`}
        />
      </div>
    </button>
  );

  const Stepper = ({
    label,
    value,
    min,
    max,
    step,
    displayValue,
    onChange,
  }: any) => (
    <div className="flex flex-col gap-2 p-3 bg-white rounded-xl border border-gray-200">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            const nv = Math.max(min, value - step);
            onChange(nv);
            announce(`${label} diminuído para ${nv}`);
          }}
          disabled={value <= min}
          className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-800"
          aria-label={`Diminuir ${label}`}
        >
          -
        </button>
        <span className="font-mono text-sm">{displayValue}</span>
        <button
          onClick={() => {
            const nv = Math.min(max, value + step);
            onChange(nv);
            announce(`${label} aumentado para ${nv}`);
          }}
          disabled={value >= max}
          className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-800"
          aria-label={`Aumentar ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <>
      <ReadingMask />
      <ReadingGuide />
      <BigCursor />

      {/* Floating Button - Positioned on right, below VLibras */}
      <button
        onClick={togglePanel}
        aria-label="Abrir menu de acessibilidade"
        aria-expanded={isOpen}
        className="accessibility-widget fixed top-[calc(50%+4rem)] right-6 z-[9998] w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 focus-visible:ring-offset-2 transition-transform hover:scale-105"
      >
        <Accessibility size={24} />
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div
            ref={panelRef}
            className="relative w-full max-w-md md:max-w-3xl h-full bg-gray-50 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right"
            role="dialog"
            aria-label="Configurações de Acessibilidade"
          >
            {/* Header */}
            <div className="bg-white px-4 py-4 border-b border-gray-200 flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center gap-2">
                <Accessibility className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold text-gray-800">
                  Acessibilidade
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition"
                  aria-label="Restaurar configurações"
                >
                  <RefreshCw size={16} />
                  <span className="hidden sm:inline">Restaurar</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
                  aria-label="Fechar painel"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profiles Column */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                  <Eye size={18} /> Perfis de Acessibilidade
                </h3>
                <div className="space-y-2">
                  <ButtonToggle
                    label="Leitor de Tela"
                    active={settings.profile === "screenReader"}
                    onClick={() =>
                      handleProfileClick("screenReader", "Leitor de Tela")
                    }
                    icon={Settings}
                  />
                  <ButtonToggle
                    label="Baixa Visão"
                    active={settings.profile === "lowVision"}
                    onClick={() =>
                      handleProfileClick("lowVision", "Baixa Visão")
                    }
                    icon={Eye}
                  />
                  <ButtonToggle
                    label="Distúrbio Motor"
                    active={settings.profile === "motor"}
                    onClick={() =>
                      handleProfileClick("motor", "Distúrbio Motor")
                    }
                    icon={MousePointer}
                  />
                  <ButtonToggle
                    label="Daltonismo"
                    active={settings.profile === "colorBlind"}
                    onClick={() =>
                      handleProfileClick("colorBlind", "Daltonismo")
                    }
                    icon={Contrast}
                  />
                  <ButtonToggle
                    label="Epilepsia"
                    active={settings.profile === "epilepsy"}
                    onClick={() => handleProfileClick("epilepsy", "Epilepsia")}
                    icon={Play}
                  />
                  <ButtonToggle
                    label="TDAH"
                    active={settings.profile === "adhd"}
                    onClick={() => handleProfileClick("adhd", "TDAH")}
                    icon={Search}
                  />
                  <ButtonToggle
                    label="Dislexia"
                    active={settings.profile === "dyslexia"}
                    onClick={() => handleProfileClick("dyslexia", "Dislexia")}
                    icon={Type}
                  />
                </div>
              </div>

              {/* Granular Adjustments Column */}
              <div className="space-y-6">
                {/* Text Adjustments */}
                <section className="space-y-3">
                  <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <Type size={18} /> Ajustes de Texto
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Stepper
                      label="Tamanho da Fonte"
                      value={settings.fontScale}
                      min={1}
                      max={2}
                      step={0.1}
                      displayValue={`${Math.round(settings.fontScale * 100)}%`}
                      onChange={(v: number) => updateSetting("fontScale", v)}
                    />
                    <Stepper
                      label="Espaçamento Letras"
                      value={settings.letterSpacing}
                      min={0}
                      max={5}
                      step={1}
                      displayValue={`${settings.letterSpacing}px`}
                      onChange={(v: number) =>
                        updateSetting("letterSpacing", v)
                      }
                    />
                  </div>
                  <ButtonToggle
                    label="Fonte para Dislexia"
                    active={settings.dyslexicFont}
                    onClick={() =>
                      updateSetting("dyslexicFont", !settings.dyslexicFont)
                    }
                    icon={Type}
                  />
                  <ButtonToggle
                    label="Fonte Legível (Sans-serif)"
                    active={settings.readableFont}
                    onClick={() =>
                      updateSetting("readableFont", !settings.readableFont)
                    }
                    icon={Type}
                  />
                </section>

                {/* Display Adjustments */}
                <section className="space-y-3">
                  <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <Contrast size={18} /> Visualização
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className={`p-2 border rounded font-medium text-sm ${settings.contrast === "high" ? "bg-black text-yellow-400 border-yellow-400" : "bg-white text-black"}`}
                      onClick={() =>
                        updateSetting(
                          "contrast",
                          settings.contrast === "high" ? "normal" : "high",
                        )
                      }
                    >
                      Alto Contraste
                    </button>
                    <button
                      className={`p-2 border rounded font-medium text-sm ${settings.contrast === "dark" ? "bg-gray-900 text-white border-white" : "bg-white text-black"}`}
                      onClick={() =>
                        updateSetting(
                          "contrast",
                          settings.contrast === "dark" ? "normal" : "dark",
                        )
                      }
                    >
                      Modo Escuro
                    </button>
                    <button
                      className={`p-2 border rounded font-medium text-sm ${settings.saturation === "monochrome" ? "bg-gray-200 text-gray-800 border-gray-400" : "bg-white text-black"}`}
                      onClick={() =>
                        updateSetting(
                          "saturation",
                          settings.saturation === "monochrome"
                            ? "normal"
                            : "monochrome",
                        )
                      }
                    >
                      Monocromático
                    </button>
                    <button
                      className={`p-2 border rounded font-medium text-sm ${settings.invertColors ? "bg-blue-100 border-blue-500" : "bg-white text-black"}`}
                      onClick={() =>
                        updateSetting("invertColors", !settings.invertColors)
                      }
                    >
                      Inverter Cores
                    </button>
                  </div>

                  <ButtonToggle
                    label="Destacar Links"
                    active={settings.highlightLinks}
                    onClick={() =>
                      updateSetting("highlightLinks", !settings.highlightLinks)
                    }
                    icon={MousePointer}
                  />
                  <ButtonToggle
                    label="Destacar Títulos"
                    active={settings.highlightTitles}
                    onClick={() =>
                      updateSetting(
                        "highlightTitles",
                        !settings.highlightTitles,
                      )
                    }
                    icon={Type}
                  />
                </section>

                {/* Navigation Tools */}
                <section className="space-y-3">
                  <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <Search size={18} /> Ferramentas de Foco
                  </h3>
                  <ButtonToggle
                    label="Máscara de Leitura"
                    active={settings.readingMask}
                    onClick={() =>
                      updateSetting("readingMask", !settings.readingMask)
                    }
                    icon={Eye}
                  />
                  <ButtonToggle
                    label="Guia de Leitura"
                    active={settings.readingGuide}
                    onClick={() =>
                      updateSetting("readingGuide", !settings.readingGuide)
                    }
                    icon={Search}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className={`p-2 border rounded font-medium text-sm ${settings.bigCursor === "black" ? "bg-blue-100 border-blue-500" : "bg-white"}`}
                      onClick={() =>
                        updateSetting(
                          "bigCursor",
                          settings.bigCursor === "black" ? "normal" : "black",
                        )
                      }
                    >
                      Cursor Grande
                    </button>
                    <button
                      className={`p-2 border rounded font-medium text-sm ${settings.pauseAnimations ? "bg-blue-100 border-blue-500" : "bg-white"}`}
                      onClick={() =>
                        updateSetting(
                          "pauseAnimations",
                          !settings.pauseAnimations,
                        )
                      }
                    >
                      Pausar Animações
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
