import React, { useState, useEffect } from "react";

export interface TourStep {
  target: string;
  title: string;
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
}

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  steps: TourStep[];
}

export default function OnboardingTour({ isOpen, onClose, steps }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const calculateRect = () => {
    if (!isOpen || !steps[currentStep]) return;
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    if (steps[currentStep].target === 'center') {
      setTargetRect(null);
      return;
    }

    const el = document.querySelector(steps[currentStep].target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      timeoutRef.current = setTimeout(() => {
        const rect = el.getBoundingClientRect();
        setTargetRect(rect);
      }, 400);
    } else {
      setTargetRect(null);
    }
  };

  useEffect(() => {
    calculateRect();
    window.addEventListener("resize", calculateRect);
    return () => {
      window.removeEventListener("resize", calculateRect);
    };
  }, [currentStep, isOpen]);

  // Reset to step 0 when reopened or closed
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setTargetRect(null);
    }
  }, [isOpen]);

  if (!isOpen) {
    if (currentStep !== 0) setCurrentStep(0);
    return null;
  }

  const step = steps[currentStep];
  if (!step) return null;

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    else onClose();
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const maskStyle: React.CSSProperties = targetRect
    ? {
        position: "fixed",
        top: targetRect.top - 8,
        left: targetRect.left - 8,
        width: targetRect.width + 16,
        height: targetRect.height + 16,
        boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.7)",
        borderRadius: "12px",
        pointerEvents: "none",
        zIndex: 50,
        transition: "all 0.3s ease-in-out",
      }
    : {
        position: "fixed",
        top: "50%",
        left: "50%",
        width: 0,
        height: 0,
        boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.7)",
        zIndex: 50,
        transition: "all 0.3s ease-in-out",
      };

  const isMobile = window.innerWidth < 768;
  const tooltipStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 60,
    width: "90%",
    maxWidth: "380px",
    transition: "all 0.3s ease-in-out",
  };

  if (targetRect) {
    if (isMobile) {
      tooltipStyle.bottom = "24px";
      tooltipStyle.left = "50%";
      tooltipStyle.transform = "translateX(-50%)";
    } else {
      const placement = step.placement || "bottom";
      // Simplified positioning with boundaries
      if (placement === "bottom") {
        tooltipStyle.top = Math.min(targetRect.bottom + 20, window.innerHeight - 340);
        tooltipStyle.left = Math.max(24, Math.min(targetRect.left, window.innerWidth - 400));
      } else if (placement === "top") {
        tooltipStyle.bottom = window.innerHeight - targetRect.top + 20;
        tooltipStyle.left = Math.max(24, Math.min(targetRect.left, window.innerWidth - 400));
      } else if (placement === "right") {
        tooltipStyle.top = Math.max(24, Math.min(targetRect.top, window.innerHeight - 340));
        tooltipStyle.left = targetRect.right + 20;
      } else if (placement === "left") {
        tooltipStyle.top = Math.max(24, Math.min(targetRect.top, window.innerHeight - 340));
        tooltipStyle.right = window.innerWidth - targetRect.left + 20;
      }
    }
  } else {
    tooltipStyle.top = "50%";
    tooltipStyle.left = "50%";
    tooltipStyle.transform = "translate(-50%, -50%)";
  }

  return (
    <>
      {/* Invisible backdrop prevents interactions */}
      <div className="fixed inset-0 z-[45]" onClick={(e) => e.stopPropagation()}></div>
      
      {/* Cutout Mask */}
      <div style={maskStyle}></div>

      {/* Popover */}
      <div style={tooltipStyle} className="bg-white rounded-xl shadow-2xl p-5 border-2 border-[#1351b4] flex flex-col gap-4 animate-fade-in">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 shrink-0 rounded-full border-2 border-[#1351b4] overflow-hidden bg-blue-50">
            <img src="/carlinha.png" alt="CARlinha" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-[#1351b4] text-lg leading-tight">{step.title}</h3>
            <p className="text-sm text-gray-700 mt-2 leading-relaxed">
              {step.content}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
          <button onClick={onClose} className="text-gray-400 text-xs font-bold hover:text-gray-600 uppercase transition">
            Pular Tour
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium mr-2">
              {currentStep + 1} / {steps.length}
            </span>
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`w-8 h-8 flex items-center justify-center rounded-full border transition ${currentStep === 0 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-[#1351b4] text-[#1351b4] hover:bg-blue-50'}`}
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button
              onClick={nextStep}
              className="px-5 py-2 bg-[#00d053] hover:bg-[#00b347] text-white text-xs font-bold uppercase rounded-full shadow-md transition"
            >
              {currentStep === steps.length - 1 ? "Concluir" : "Próximo"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
