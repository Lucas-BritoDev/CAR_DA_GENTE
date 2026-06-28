import { useState, useEffect } from "react";

interface SimplificadorBannerProps {
  step: number;
}

export default function SimplificadorBanner({ step }: SimplificadorBannerProps) {
  const [explainLaw, setExplainLaw] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel(); // Parar se já tiver algo tocando
      const textToSpeak = contents[step]?.traducao || contents[0].traducao;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "pt-BR";
      utterance.rate = 1.05; // Levemente mais rápido e dinâmico
      utterance.pitch = 1.1; // Levemente mais agudo (voz mais feminina/animada)
      
      const voices = window.speechSynthesis.getVoices();
      const ptVoices = voices.filter(v => v.lang.includes("pt-BR") || v.lang.includes("pt-PT"));
      const femaleVoice = ptVoices.find(v => v.name.toLowerCase().includes("maria") || v.name.toLowerCase().includes("luciana") || v.name.toLowerCase().includes("female") || v.name.includes("Google português do Brasil"));
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      } else if (ptVoices.length > 0) {
        utterance.voice = ptVoices[0];
      }
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const contents = [
    {
      title: "Identificação",
      text: "Nesta etapa, informe quem são os responsáveis pela área. A CARlinha já pré-preencheu com base no seu CPF. Entenda os próximos passos com nosso simplificador para não ter dor de cabeça com multas futuras!",
      lei: "O proprietário ou possuidor rural deve ser plenamente identificado nos termos do Art. 29 da Lei 12.651/2012 para efeito de regularização ambiental.",
      traducao: "Pensa no CAR como a Certidão de Nascimento do seu terreno! Assim como um filho precisa estar no nome de alguém, o sítio precisa saber quem é o dono dele pra você conseguir os benefícios (como crédito mais barato no banco). Já puxei os dados do seu CPF pra te poupar tempo!",
      audioLen: "0:24",
    },
    {
      title: "Imóvel",
      text: "Nesta etapa pode ser realizada a associação do imóvel aos dados fundiários dos sistemas do INCRA.",
      lei: "A inscrição no CAR, obrigatória para todas as propriedades rurais, exige a identificação do perímetro do imóvel rural (Lei 12.651, Art. 29).",
      traducao: "É aqui que você diz onde fica e qual o tamanho da sua terra. Lembra que a gente já cruzou os dados com o INCRA? A CARlinha já puxou quase tudo pra você, é só dar uma olhadinha e confirmar. Assim ninguém diz que um pedaço de terra é de outro dono!",
      audioLen: "0:21",
    },
    {
      title: "Documentação",
      text: "Nesta etapa, são exibidas as informações dos documentos do imóvel cadastrados na base de dados do SNCR.",
      lei: "Para o registro, deve ser apresentada a comprovação de propriedade ou posse, conforme Art. 29, parágrafo 1º da Lei 12.651/2012.",
      traducao: "Papelada chata, né? Mas é ela que garante que a terra é sua. Como você já tem registro no cartório, a gente já puxou a matrícula. Só marque se você tem Reserva Legal antiga aprovada, pra gente não perder os seus direitos já garantidos!",
      audioLen: "0:18",
    },
    {
      title: "Representante",
      text: "No âmbito do CAR DA GENTE, o representante é a pessoa autorizada a agir em nome do proprietário ou possuidor do imóvel rural.",
      lei: "O proprietário pode ser representado por terceiros desde que devidamente autorizado mediante procuração.",
      traducao: "Você não precisa fazer tudo sozinho. Se você quer que seu filho, um despachante ou um advogado cuidem disso pra você, é aqui que você avisa pro sistema quem eles são.",
      audioLen: "0:12",
    },
    {
      title: "Geo",
      text: "Nesta etapa, você deverá delimitar os limites do imóvel rural e indicar as áreas ambientais exigidas pela legislação.",
      lei: "O cadastro exige a identificação de remanescentes de vegetação nativa, Áreas de Preservação Permanente (APP) e Reserva Legal (RL).",
      traducao: "Chegou a hora do mapa! Aqui é onde a gente diz onde tem rio e onde tem mata. A CARlinha ajuda a fazer isso cruzando com o satélite. Isso garante que você está preservando o que a natureza precisa e usando a terra de forma inteligente.",
      audioLen: "0:15",
    },
    {
      title: "Alertas e Pendências",
      text: "Nesta etapa são exibidos os alertas e pendências identificados no cadastro.",
      lei: "A verificação de sobreposições e inconsistências é de competência do órgão estadual ou distrital responsável (Art. 29, §2º).",
      traducao: "Pensa nisso como um semáforo. Se deu verde, tá tudo certo! Se tem alguma pendência, o sistema já avisa agora pra você não ter uma surpresa desagradável com a fiscalização lá no futuro.",
      audioLen: "0:14",
    },
    {
      title: "Resumo",
      text: "Nesta etapa é apresentado um resumo das informações consolidadas do cadastro.",
      lei: "Cumpridas as exigências do cadastro, será emitido o recibo de inscrição no CAR, garantindo o direito à regularização ambiental.",
      traducao: "Pronto! Tudo conferido e sem sobreposições de terras. É só salvar e receber seu selo verde. Você está de parabéns por cuidar do seu pedaço de Brasil!",
      audioLen: "0:10",
    },
  ];

  const content = contents[step] || contents[0];

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-gray-800 flex gap-4 relative shadow-sm">
      <div className="absolute inset-0 bg-blue-400 opacity-10 animate-pulse pointer-events-none rounded-lg"></div>
      <div className="w-12 h-12 rounded-full border-2 border-blue-200 shrink-0 relative z-10 shadow-md overflow-hidden bg-white">
        <img src="/carlinha.png" alt="CARlinha" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 flex-1">
        <p className="font-bold text-blue-900 text-base">Simplificador de Lei ({content.title})</p>
        <p className="text-blue-800 text-xs mt-1 leading-relaxed">{content.text}</p>
        
        <div className="mt-3 flex gap-2">
          <button 
            onClick={() => setExplainLaw(!explainLaw)} 
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 transition shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">g_translate</span> 
            {explainLaw ? "Esconder Tradução" : "Traduzir Juridiquês"}
          </button>
        </div>

        {explainLaw && (
          <div className="mt-4 bg-white border border-blue-100 p-4 rounded-lg shadow-sm animate-fade-in flex gap-3 relative">
            <img src="/carlinha.png" alt="CARlinha" className="w-10 h-10 rounded-full border-2 border-blue-200 shrink-0 bg-blue-50" />
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">O que a lei diz:</p>
              <p className="text-sm text-gray-600 italic border-l-2 border-gray-300 pl-2 mb-3">"{content.lei}"</p>
              
              <p className="text-xs text-green-700 font-bold uppercase tracking-wider mb-1">Na linguagem da CARlinha:</p>
              <p className="text-sm text-gray-800 font-medium leading-relaxed">"{content.traducao}"</p>
              
              <div className="mt-4 bg-gray-50 rounded-full h-8 flex items-center px-3 gap-2 w-full max-w-[280px] border border-gray-200">
                <button onClick={toggleAudio} className="text-blue-600 hover:text-blue-800 focus:outline-none">
                  <span className="material-symbols-outlined text-xl">
                    {isPlaying ? "pause_circle" : "play_circle"}
                  </span>
                </button>
                <div className="h-1.5 bg-gray-200 flex-1 rounded-full overflow-hidden relative">
                  <div className={`absolute left-0 top-0 bottom-0 bg-blue-600 rounded-full transition-all duration-[3000ms] ${isPlaying ? 'w-[95%] opacity-80' : 'w-0'}`}></div>
                </div>
                <span className="text-[10px] text-gray-500 font-bold">0:00 / {content.audioLen}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
