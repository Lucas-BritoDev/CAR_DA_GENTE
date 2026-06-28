import { useState } from "react";
import Toast from "./Toast";
import { useNavigate, useLocation } from "react-router-dom";

export default function GovHeader() {
  const [toastMsg, setToastMsg] = useState("");
  const handleToast = (msg: string) => setToastMsg(msg);
  const navigate = useNavigate();
  const location = useLocation();

  // Optionally hide on some routes if needed, but the user wants it on all pages.
  
  return (
    <>
      <header className="w-full border-b border-gray-200 flex-shrink-0 z-50 bg-white">
        <div className="max-w-6xl w-full mx-auto flex justify-between items-center px-4 md:px-12 py-3 bg-white">
          <div className="flex items-center gap-4">
            <div 
              className="flex items-baseline cursor-pointer select-none font-black text-[26px] tracking-tighter" 
              onClick={() => navigate("/")}
              style={{ fontFamily: "'Rawline', 'Raleway', sans-serif" }}
            >
              <span className="text-[#1351B4]">gov.</span>
              <span className="text-[#168821]">b</span>
              <span className="text-[#FFCC29]">r</span>
            </div>
            <div className="h-6 w-px bg-gray-300 hidden md:block"></div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider hidden md:block">
              Ministério do Meio Ambiente e Mudança do Clima
            </span>
          </div>
          <nav className="hidden md:flex gap-4 text-[11px] font-medium text-blue-900 items-center">

            <img src="/logo.png" alt="CAR DA GENTE" className="h-10 w-auto object-contain cursor-pointer" onClick={() => navigate("/")} />

            <div className="flex items-center gap-1 ml-2 border-l pl-4 border-gray-300 cursor-pointer hover:opacity-80 transition" onClick={() => navigate("/perfil")}>
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">R</div>
              <span className="text-gray-600 text-sm">Raimundo</span>
            </div>
          </nav>
        </div>
      </header>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </>
  );
}
