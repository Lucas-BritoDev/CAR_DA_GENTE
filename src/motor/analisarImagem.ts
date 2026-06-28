/**
 * Motor de Análise Visual de Imagem — SICAR DIGITAL 2.0
 * Camada de apoio visual: classifica o que a foto mostra e cruza
 * com as regras do Código Florestal (APP/RL).
 *
 * PRINCÍPIO INEGOCIÁVEL: Este motor NUNCA calcula valores legais.
 * Todo cálculo de faixa, percentual e déficit é feito pelo motor
 * determinístico em src/motor/laudo.ts.
 * Este módulo apenas descreve o que a imagem contém.
 *
 * ⚠️ VALIDAR: fonte_legal / equipe jurídica
 */

export type ClasseVisual =
  | "agua"
  | "vegetacao"
  | "pasto"
  | "cerca"
  | "construcao"
  | "solo_exposto"
  | "indefinida";

export type QualidadeImagem = "alta" | "media" | "baixa";

export type ContextoUpload = "cadastro" | "pendencia" | "retificacao";

export interface ResultadoQualidade {
  ok: boolean;
  qualidade: QualidadeImagem;
  motivo?: string; // exibido ao usuário quando ok === false
}

export interface ClasseDetectada {
  classe: ClasseVisual;
  confianca: number; // 0-100
  icone: string;
  label: string; // linguagem simples
  cor: string; // tailwind bg color para overlay
}

export interface AlertaLegal {
  tipo: "APP" | "RL" | "AVISO" | "OK";
  icone: string;
  mensagem: string; // linguagem simples (≤ 2 linhas)
  fonte_legal: string; // ⚠️ VALIDAR: fonte_legal / equipe jurídica
  cor: "azul" | "verde" | "amarelo" | "vermelho" | "cinza";
}

export interface ResultadoAnalise {
  qualidade: ResultadoQualidade;
  classes: ClasseDetectada[];
  alertas: AlertaLegal[];
  mensagemCurta: string; // exibida ao produtor (público de baixa escolaridade)
  mensagemAnalista: string; // exibida no painel do analista (técnico)
  precisaRevisaoHumana: boolean;
  contexto: ContextoUpload;
  timestamp: string;
  /** dataURL da imagem, armazenada em localStorage */
  imagemDataUrl?: string;
}

// ---------------------------------------------------------------------------
// Tabela de cenas — mock determinístico para demo
// Diferentes cenários são ativados pelo tamanho do arquivo (bytes)
// para garantir que o roteiro do vídeo 1:58 funcione de forma previsível.
// Em produção, substituir por chamada a modelo de visão (CLIP / mobilenet).
// ---------------------------------------------------------------------------

function _inferirCenaPorTamanho(tamanhoBytes: number): ClasseVisual[] {
  // Foto "boa" simulada com rio + vegetação (demo principal)
  if (tamanhoBytes < 200_000) return ["agua", "vegetacao"];
  // Foto com pasto e cerca
  if (tamanhoBytes < 500_000) return ["pasto", "cerca"];
  // Foto com construção e solo exposto
  if (tamanhoBytes < 1_000_000) return ["construcao", "solo_exposto"];
  // Foto muito grande → indefinida (como se estivesse tremida / baixa qualidade)
  return ["indefinida"];
}

function _inferirQualidade(tamanhoBytes: number, nome: string): ResultadoQualidade {
  const nomeMin = nome.toLowerCase();
  // Simula rejeição por nome de arquivo específico (para demo de fluxo de rejeição)
  if (nomeMin.includes("tremida") || nomeMin.includes("escura") || nomeMin.includes("ruim")) {
    return {
      ok: false,
      qualidade: "baixa",
      motivo: "Foto muito escura ou tremida. Por favor, tire uma nova foto em local iluminado.",
    };
  }
  if (tamanhoBytes > 1_000_000) {
    return { ok: false, qualidade: "baixa", motivo: "Foto muito distante. Chegue mais perto do elemento que quer mostrar." };
  }
  if (tamanhoBytes > 400_000) {
    return { ok: true, qualidade: "media" };
  }
  return { ok: true, qualidade: "alta" };
}

// ---------------------------------------------------------------------------
// Mapa de metadados visuais por classe
// ---------------------------------------------------------------------------

const META_CLASSE: Record<ClasseVisual, Omit<ClasseDetectada, "confianca">> = {
  agua: {
    classe: "agua",
    icone: "💧",
    label: "Água (rio ou nascente)",
    cor: "bg-blue-400",
  },
  vegetacao: {
    classe: "vegetacao",
    icone: "🌳",
    label: "Vegetação / Mata",
    cor: "bg-green-500",
  },
  pasto: {
    classe: "pasto",
    icone: "🌾",
    label: "Pasto / Plantio",
    cor: "bg-yellow-400",
  },
  cerca: {
    classe: "cerca",
    icone: "🪧",
    label: "Cerca / Divisa",
    cor: "bg-orange-400",
  },
  construcao: {
    classe: "construcao",
    icone: "🏠",
    label: "Construção / Benfeitoria",
    cor: "bg-red-400",
  },
  solo_exposto: {
    classe: "solo_exposto",
    icone: "🟤",
    label: "Solo exposto",
    cor: "bg-amber-700",
  },
  indefinida: {
    classe: "indefinida",
    icone: "❓",
    label: "Elemento não identificado",
    cor: "bg-gray-400",
  },
};

// ---------------------------------------------------------------------------
// Regra de decisão: cruza classes visuais com legislação
// NUNCA recalcula valores do motor — apenas gera alertas descritivos.
// ⚠️ VALIDAR: fonte_legal / equipe jurídica
// ---------------------------------------------------------------------------

function _gerarAlertas(classes: ClasseVisual[]): AlertaLegal[] {
  const alertas: AlertaLegal[] = [];

  if (classes.includes("agua")) {
    alertas.push({
      tipo: "APP",
      icone: "💧",
      mensagem: "Rio ou nascente detectado — há uma faixa protegida (APP) nessa área. Não pode ser convertida.",
      fonte_legal: "Lei 12.651/2012, Art. 4º, I — ⚠️ VALIDAR",
      cor: "azul",
    });
  }

  if (classes.includes("vegetacao")) {
    alertas.push({
      tipo: "RL",
      icone: "🌳",
      mensagem: "Mata ou vegetação detectada — pode compor sua Reserva Legal. Boa notícia!",
      fonte_legal: "Lei 12.651/2012, Art. 12 — ⚠️ VALIDAR",
      cor: "verde",
    });
  }

  if (classes.includes("pasto") || classes.includes("solo_exposto")) {
    alertas.push({
      tipo: "AVISO",
      icone: "⚠️",
      mensagem: "Área de uso consolidado detectada. Pode precisar de recomposição ou compensação.",
      fonte_legal: "Lei 12.651/2012, Art. 61-A / Art. 66 — ⚠️ VALIDAR",
      cor: "amarelo",
    });
  }

  if (classes.includes("construcao")) {
    alertas.push({
      tipo: "AVISO",
      icone: "🏠",
      mensagem: "Construção ou benfeitoria detectada. Verifique se está fora das faixas de APP.",
      fonte_legal: "Lei 12.651/2012, Art. 65 — ⚠️ VALIDAR",
      cor: "amarelo",
    });
  }

  if (classes.includes("indefinida")) {
    alertas.push({
      tipo: "AVISO",
      icone: "🔍",
      mensagem: "Não consegui identificar o que tem nessa foto. Um técnico vai verificar.",
      fonte_legal: "Revisão humana necessária",
      cor: "cinza",
    });
  }

  if (alertas.length === 0) {
    alertas.push({
      tipo: "OK",
      icone: "✅",
      mensagem: "Foto analisada. Nenhuma situação crítica identificada.",
      fonte_legal: "—",
      cor: "verde",
    });
  }

  return alertas;
}

function _gerarMensagens(
  classes: ClasseVisual[],
  alertas: AlertaLegal[],
): { curta: string; analista: string } {
  const temAgua = classes.includes("agua");
  const temVegetacao = classes.includes("vegetacao");
  const temIndefinida = classes.includes("indefinida");

  let curta = "📸 Foto analisada pela CARlinha!";
  if (temIndefinida) {
    curta = "🔍 Não consegui enxergar bem essa foto. Tente tirar outra em local mais claro.";
  } else if (temAgua && temVegetacao) {
    curta = "💧🌳 Tem água E mata nessa foto! São áreas protegidas pelo Código Florestal. Quer saber o que fazer?";
  } else if (temAgua) {
    curta = "💧 Tem água nessa foto! Pode ser uma APP (área protegida). Quer entender melhor?";
  } else if (temVegetacao) {
    curta = "🌳 Tem mata nessa foto! Ela pode compor sua Reserva Legal. Boa notícia!";
  }

  const tiposAlerta = alertas.map((a) => a.tipo).join(", ");
  const analista = `Classificação IA (mock): ${classes.join(", ")} | Alertas: ${tiposAlerta} | Revisão humana: ${classes.includes("indefinida") ? "Sim" : "Não"}`;

  return { curta, analista };
}

// ---------------------------------------------------------------------------
// API pública
// ---------------------------------------------------------------------------

/**
 * Converte um File para dataURL e armazena em localStorage.
 * Chave: `car_imagem_${contexto}_${timestamp}`
 */
export async function armazenarImagemLocal(
  file: File,
  contexto: ContextoUpload,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const chave = `car_imagem_${contexto}_${Date.now()}`;
      try {
        localStorage.setItem(chave, dataUrl);
        // Também armazena índice de imagens
        const indice: string[] = JSON.parse(localStorage.getItem("car_imagens_index") || "[]");
        indice.push(chave);
        localStorage.setItem("car_imagens_index", JSON.stringify(indice));
      } catch {
        // localStorage cheio — silencia para não bloquear o fluxo demo
        console.warn("localStorage cheio — imagem não persistida.");
      }
      resolve(dataUrl);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Recupera todas as imagens armazenadas como { chave, dataUrl, contexto, ts }
 */
export function listarImagensLocais(): Array<{
  chave: string;
  dataUrl: string;
  contexto: ContextoUpload;
  ts: number;
}> {
  const indice: string[] = JSON.parse(localStorage.getItem("car_imagens_index") || "[]");
  return indice
    .map((chave) => {
      const dataUrl = localStorage.getItem(chave) || "";
      const partes = chave.split("_"); // car_imagem_{contexto}_{ts}
      const ts = Number(partes[partes.length - 1]);
      const contexto = partes[2] as ContextoUpload;
      return { chave, dataUrl, contexto, ts };
    })
    .filter((i) => i.dataUrl);
}

/**
 * Analisa um arquivo de imagem e retorna a classificação visual + alertas legais.
 * Esta função é síncrona após o pré-processamento assíncrono da imagem.
 */
export async function analisarImagem(
  file: File,
  contexto: ContextoUpload,
): Promise<ResultadoAnalise> {
  const qualidade = _inferirQualidade(file.size, file.name);
  const timestamp = new Date().toISOString();

  if (!qualidade.ok) {
    const imagemDataUrl = await armazenarImagemLocal(file, contexto);
    return {
      qualidade,
      classes: [{ classe: "indefinida", confianca: 0, ...META_CLASSE.indefinida }],
      alertas: [
        {
          tipo: "AVISO",
          icone: "🔄",
          mensagem: qualidade.motivo || "Foto inadequada. Tente novamente.",
          fonte_legal: "Revisão necessária",
          cor: "amarelo",
        },
      ],
      mensagemCurta: `📷 ${qualidade.motivo}`,
      mensagemAnalista: `Imagem rejeitada na triagem. Motivo: ${qualidade.motivo}`,
      precisaRevisaoHumana: true,
      contexto,
      timestamp,
      imagemDataUrl,
    };
  }

  const cenasRaw = _inferirCenaPorTamanho(file.size);
  const classes: ClasseDetectada[] = cenasRaw.map((c, i) => ({
    ...META_CLASSE[c],
    confianca: 85 - i * 10,
  }));

  const alertas = _gerarAlertas(cenasRaw);
  const { curta, analista } = _gerarMensagens(cenasRaw, alertas);
  const precisaRevisaoHumana = cenasRaw.includes("indefinida") || alertas.some((a) => a.tipo === "APP");

  const imagemDataUrl = await armazenarImagemLocal(file, contexto);

  return {
    qualidade,
    classes,
    alertas,
    mensagemCurta: curta,
    mensagemAnalista: analista,
    precisaRevisaoHumana,
    contexto,
    timestamp,
    imagemDataUrl,
  };
}
