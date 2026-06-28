import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

export default function Comunidade() {
  const navigate = useNavigate();
  const [metas, setMetas] = useState<any>(null);
  const [toastMsg, setToastMsg] = useState("");
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [historias, setHistorias] = useState([
    { id: 1, nome: "Seu José da Silva", local: "Fazenda Rio Pardo (BA)", duration: "0:45", text: "Eu tava enrolado com esse negócio de reserva legal. Achava que ia perder minhas terras, mas o CAR da Gente me mostrou que eu tava certinho. Já tenho o selo carimbo verde e o juros lá no banco ficou uma beleza! Bom demais da conta sô!" },
    { id: 2, nome: "Dona Maria", local: "Sítio Alegria (MG)", duration: "1:12", text: "Nossa, eu fiquei com tanto medo quando falaram de Cadastro Ambiental Rural. Mas aí eu entrei no sistema, a Carlinha me ajudou pelo áudio e vi que o meu Sítio Alegria tá cem porcento regular. Uma maravilha esse aplicativo." }
  ]);

  const handleToast = (msg: string) => setToastMsg(msg);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    handleToast("História enviada com sucesso! Vai pro CARCantado.");
    setHistorias([{ id: Date.now(), nome: "Sua História", local: "Sítio Boa Esperança", duration: formatTime(recordingTime), text: "História gravada por você. Este é apenas um áudio de demonstração simulado com inteligência artificial para representar o seu áudio gravado." }, ...historias]);
    setRecordingTime(0);
  };

  const handleTrackPlay = (e: any) => {
    document.querySelectorAll('audio').forEach(audio => {
      if (audio !== e.target) audio.pause();
    });
  };

  const handlePlayAudio = (historia: any) => {
    handleToast(`Reproduzindo relato de ${historia.nome}...`);
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(historia.text);
    utterance.lang = 'pt-BR';
    utterance.pitch = 1.1;
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    fetch("/api/db/metas_comunidade")
      .then((res) => res.json())
      .then((data) => setMetas(data));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900">
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 max-w-4xl gap-6 md:gap-8">
        {/* Projeto CARCANTADO */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#E65100]">
                radio
              </span>
              Projeto CARCANTADO
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded p-4 bg-orange-50 hover:bg-orange-100 transition cursor-pointer flex flex-col items-center justify-center text-center gap-2">
                <span className="material-symbols-outlined text-4xl text-orange-600">
                  music_note
                </span>
                <h3 className="font-bold text-orange-900 leading-tight">
                  Rádio Viola do Sertão
                </h3>
                <p className="text-[11px] text-orange-800 italic mt-1">
                  A rádio divulga o MP3 da paródia CARcantado e comemora mais 10 CARimbos verdes na avenida rural!
                </p>
                <div className="w-full flex flex-col gap-3 mt-2">
                  <div className="flex flex-col items-center w-full bg-white p-2 rounded border border-orange-200">
                    <span className="text-xs font-bold text-orange-900 mb-1 w-full text-left flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">music_note</span> Faixa 1</span>
                    <audio controls onPlay={handleTrackPlay} className="w-full h-8" src="/1.mp4">Seu navegador não suporta áudio.</audio>
                  </div>
                  <div className="flex flex-col items-center w-full bg-white p-2 rounded border border-orange-200">
                    <span className="text-xs font-bold text-orange-900 mb-1 w-full text-left flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">music_note</span> Faixa 2</span>
                    <audio controls onPlay={handleTrackPlay} className="w-full h-8" src="/2.mp4">Seu navegador não suporta áudio.</audio>
                  </div>
                  <div className="flex flex-col items-center w-full bg-white p-2 rounded border border-orange-200">
                    <span className="text-xs font-bold text-orange-900 mb-1 w-full text-left flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">music_note</span> Faixa 3</span>
                    <audio controls onPlay={handleTrackPlay} className="w-full h-8" src="/3.mp4">Seu navegador não suporta áudio.</audio>
                  </div>
                </div>
              </div>

              <div 
                className="border rounded p-4 bg-blue-50 transition cursor-pointer flex flex-col items-center justify-center text-center gap-2 relative overflow-hidden group"
                style={{ backgroundImage: "url('/tiktok.png')", backgroundSize: "cover", backgroundPosition: "center top" }}
              >
                <div className="absolute inset-0 bg-blue-50/80 group-hover:bg-blue-100/80 transition-colors z-0"></div>
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-4xl text-blue-600">
                    movie
                  </span>
                  <h3 className="font-bold text-blue-900">Vitrine TiCARtok</h3>
                  <p className="text-[11px] text-blue-800 italic mt-1 px-2 font-medium">
                    O próprio CAR DA GENTE coloca o vídeo no tiktok que divulga de forma interativa e completa a informação para que o usuário solicite seu serviço.
                  </p>
                  <button
                    className="mt-2 text-xs font-bold uppercase bg-white border border-blue-200 text-blue-800 px-3 py-1 rounded shadow-sm hover:shadow transition"
                    onClick={() => window.open("https://www.tiktok.com/@cardagente", "_blank")}
                  >
                    <span className="material-symbols-outlined text-[14px] align-middle mr-1">
                      play_arrow
                    </span>
                    Assistir
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Histórias da Terra */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-50 -z-10"></div>

            <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-yellow-600">
                psychiatry
              </span>
              Histórias da Terra
            </h2>
            <p className="text-xs text-gray-600 mb-4">
              Ei, produtor, envie seu relato resumido (áudio, texto ou foto) e faça parte do nosso próximo case do CARCantado!
            </p>

            {isRecording ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6 flex flex-col items-center justify-center shadow-inner">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
                  <span className="text-red-700 font-bold text-lg">Gravando... {formatTime(recordingTime)}</span>
                </div>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-8 rounded-full font-bold transition flex items-center gap-2 shadow-md"
                  onClick={handleStopRecording}
                >
                  <span className="material-symbols-outlined text-lg">stop_circle</span>
                  Parar e Enviar
                </button>
              </div>
            ) : (
              <div className="flex gap-2 mb-6">
                <button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition shadow-md"
                  onClick={() => setIsRecording(true)}
                >
                  <span className="material-symbols-outlined">mic</span>{" "}
                  🗣️ Contar minha História da Terra
                </button>
              </div>
            )}

            <div className="space-y-3 mb-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase mt-2 border-b pb-1">Relatos da Comunidade</h3>
              {historias.map(historia => (
                <div key={historia.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50 flex items-center justify-between shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 border border-green-200">
                      <span className="material-symbols-outlined text-[20px]">person</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{historia.nome}</p>
                      <p className="text-[10px] font-semibold text-gray-500 uppercase">{historia.local}</p>
                    </div>
                  </div>
                  <button 
                    className="flex items-center gap-1 bg-white border border-gray-300 px-3 py-1.5 rounded-full hover:bg-green-50 hover:text-green-700 transition"
                    onClick={() => handlePlayAudio(historia)}
                  >
                    <span className="material-symbols-outlined text-green-600 text-[18px]">play_arrow</span>
                    <span className="text-xs font-bold text-gray-700">{historia.duration}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </div>
  );
}
