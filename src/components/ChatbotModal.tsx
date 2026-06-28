import { useState, useRef, useEffect } from "react";

interface ChatbotModalProps {
  onClose: () => void;
}

export default function ChatbotModal({ onClose }: ChatbotModalProps) {
  const [messages, setMessages] = useState<any[]>([
    {
      sender: "carlinha",
      type: "text",
      text: "Olá, Seu Raimundo! Sou a CARlinha, sua assistente virtual. Como posso ajudar com seu Cadastro Ambiental Rural hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", type: "text", text }]);
    setInput("");

    // Redirect to WhatsApp
    if (text === "Falar no WhatsApp com a CARlinha") {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "carlinha",
            type: "text",
            text: "Estou te redirecionando para o WhatsApp da CARlinha! Um instante...",
          },
        ]);
        setTimeout(
          () =>
            window.open(
              "https://wa.me/5571999500774?text=Olá, CARlinha! Tenho dúvidas sobre o CAR.",
              "_blank"
            ),
          1500
        );
      }, 500);
      return;
    }

    // Simulate Agent Responses based on PRD
    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();

      if (lower.includes("lei") || lower.includes("entender")) {
        reply =
          'Calma, Raimundinho! Você já verificou a lei número 12.651 (Código Florestal)? A "Escadinha" Automática para Pequenos Produtores traz regras mais brandas de recomposição de APP para quem tem pequenas propriedades.';
      } else if (
        lower.includes("pendência") ||
        lower.includes("passivo") ||
        lower.includes("cartas") ||
        lower.includes("carta")
      ) {
        reply =
          "Você ficou com essas pendências, mas que tal ver as CARtas na manga? A sua atualização indica que você pode compensar via Cota de Reserva Legal com uma propriedade vizinha (Art. 66).";
      } else if (
        lower.includes("selo") ||
        lower.includes("aprovado") ||
        lower.includes("regularizado")
      ) {
        reply =
          "Uhul! Se o Brasil vai ser hexa, esperamos, mas você bateu um bolão na regularização. Emita seu selo Carimbo Verde! Compartilhe nas redes sociais, conte sua historia em 30 segundos, mande sua foto e veja nossa IA fazendo uma animação muito boa para ser inspiração no seu bairro.";
      } else {
        reply =
          "Eu sou a doutora das leis com a linguagem do povo e te prometo que tu vai entender facin! Me pergunte sobre o seu Laudo Cidadão, sobre as suas pendências ou sobre o Selo Carimbo Verde.";
      }

      setMessages((prev) => [
        ...prev,
        { sender: "carlinha", type: "text", text: reply },
      ]);
    }, 1000);
  };

  const handleSendAudio = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      setMessages((prev) => [
        ...prev,
        { sender: "user", type: "audio", text: "Áudio" },
      ]);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "carlinha",
            type: "text",
            text: "Ouvi o seu áudio! Parece que você está com dúvida sobre a regularização da sua propriedade. Posso te explicar as regras da escadinha do Código Florestal, o que acha?",
          },
        ]);
      }, 2000);
    }
  };

  const handleSendImage = () => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        type: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=300",
        text: "Foto da propriedade",
      },
    ]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "carlinha",
          type: "text",
          text: "Recebi a foto! A nossa IA de imagem analisou e identificou a área do seu Sítio. Posso atualizar seu Laudo Cidadão com essas informações automatizadas?",
        },
      ]);
    }, 2500);
  };

  const handleSendSticker = () => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", type: "sticker", text: "👍" },
    ]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "carlinha", type: "sticker", text: "🌱" },
      ]);
    }, 1000);
  };

  const suggestions = [
    "Quero entender o meu Laudo",
    "Ver CARtas na manga para minhas pendências",
    "Quero emitir meu Selo Carimbo Verde",
    "Falar no WhatsApp com a CARlinha",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col h-[750px] max-h-[95vh] border border-green-100">
        {/* Header */}
        <div className="bg-[#075E54] p-3 flex items-center justify-between text-white border-b shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
              <img
                src="/carlinha.png"
                alt="CARlinha"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm leading-tight flex items-center gap-1">
                CARlinha
                <span className="material-symbols-outlined text-[12px] text-green-300">
                  verified
                </span>
              </h3>
              <p className="text-[11px] text-[#dcf8c6]">online</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => window.open('https://wa.me/5571999500774', '_blank')}
              className="hover:bg-white/10 p-2 rounded-full transition text-white"
              title="Falar no WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 fill-[#25D366]">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="hover:bg-white/10 p-2 rounded-full transition text-white"
              title="Fechar"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div
          className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 relative"
          style={{
            backgroundImage:
              "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
            backgroundRepeat: "repeat",
            backgroundColor: "#e5ddd5",
          }}
        >
          {/* Encryption notice */}
          <div className="flex justify-center mb-2">
            <div className="bg-[#FEF5C3] text-[#8C7654] text-[10px] px-3 py-1.5 rounded-lg shadow-sm text-center max-w-[90%]">
              <span className="material-symbols-outlined text-[10px] align-middle mr-1">
                lock
              </span>
              As mensagens são processadas pela IA Multiagente e protegidas pelo
              Filtro Determinístico.
            </div>
          </div>

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm shadow-sm relative ${
                  msg.type === "sticker"
                    ? "bg-transparent shadow-none"
                    : msg.sender === "user"
                    ? "bg-[#dcf8c6] text-[#303030] rounded-tr-none"
                    : "bg-white text-[#303030] rounded-tl-none"
                }`}
              >
                {/* Arrow decorations */}
                {msg.type !== "sticker" && (
                  <div
                    className={`absolute top-0 w-0 h-0 border-[6px] border-solid border-transparent ${
                      msg.sender === "user"
                        ? "-right-[6px] border-t-[#dcf8c6] border-l-[#dcf8c6]"
                        : "-left-[6px] border-t-white border-r-white"
                    }`}
                  ></div>
                )}

                {msg.sender === "carlinha" && msg.type !== "sticker" && (
                  <div className="text-[10px] text-[#075E54] font-bold mb-1">
                    CARlinha
                  </div>
                )}

                {/* Render Audio */}
                {msg.type === "audio" && (
                  <div className="flex items-center gap-3 w-48 py-1">
                    <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center shrink-0 cursor-pointer">
                      <span className="material-symbols-outlined text-[#075E54]">
                        play_arrow
                      </span>
                    </div>
                    <div className="flex-1 h-1 bg-gray-300 rounded-full relative">
                      <div className="absolute left-0 top-0 h-full w-1/3 bg-[#075E54] rounded-full"></div>
                    </div>
                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                      {msg.sender === "user" ? (
                        <div className="w-full h-full bg-green-500 text-white flex items-center justify-center font-bold text-xs">
                          R
                        </div>
                      ) : (
                        <img
                          src="/carlinha.png"
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Render Image */}
                {msg.type === "image" && (
                  <div className="flex flex-col gap-1 p-1">
                    <img
                      src={msg.mediaUrl}
                      alt="Anexo"
                      className="w-64 h-48 object-cover rounded-md cursor-pointer"
                    />
                  </div>
                )}

                {/* Render Sticker */}
                {msg.type === "sticker" && (
                  <div className="text-7xl drop-shadow-md animate-bounce-once">
                    {msg.text}
                  </div>
                )}

                {/* Render Text */}
                {(!msg.type || msg.type === "text") && (
                  <div className="leading-relaxed">{msg.text}</div>
                )}

                {msg.type !== "sticker" && (
                  <div className="text-[9px] text-gray-500 text-right mt-1 flex justify-end items-center gap-1">
                    10:45{" "}
                    {msg.sender === "user" && (
                      <span className="material-symbols-outlined text-[11px] text-[#4FC3F7]">
                        done_all
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions / Quick Actions */}
        <div className="px-3 py-2 bg-[#f0f0f0] flex flex-nowrap overflow-x-auto gap-2 hide-scrollbar">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSend(s)}
              className="text-[11px] font-medium border border-gray-300 bg-white text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-50 transition shrink-0 whitespace-nowrap shadow-sm"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-2 bg-[#f0f0f0] flex items-center gap-2 relative">
          {isRecording && (
            <div className="absolute top-0 left-0 w-full h-full bg-[#f0f0f0] z-10 flex items-center px-4 justify-between animate-fade-in">
              <div className="flex items-center gap-2 text-red-500 animate-pulse">
                <span className="material-symbols-outlined text-[20px]">
                  mic
                </span>
                <span className="font-mono text-sm">Gravando... Clique no botão para enviar</span>
              </div>
              <button
                onClick={handleSendAudio}
                className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm shrink-0 hover:bg-green-600 transition"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          )}

          <label
            className="text-gray-500 hover:text-gray-600 p-2 transition cursor-pointer flex items-center justify-center"
            title="Enviar Imagem"
          >
            <span className="material-symbols-outlined">attach_file</span>
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleSendImage} />
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Mensagem"
            className="flex-1 bg-white border-none rounded-full px-4 py-2.5 text-sm focus:outline-none shadow-sm text-gray-700"
          />
          {input.trim() ? (
            <button
              onClick={() => handleSend(input)}
              className="w-10 h-10 rounded-full bg-[#00A884] text-white flex items-center justify-center hover:bg-[#008f6f] transition shadow-sm shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">
                send
              </span>
            </button>
          ) : (
            <button
              onClick={handleSendAudio}
              className="w-10 h-10 rounded-full text-gray-500 flex items-center justify-center shrink-0 hover:text-green-600 transition"
              title="Gravar Áudio"
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
