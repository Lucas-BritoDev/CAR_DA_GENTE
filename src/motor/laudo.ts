import {
  calcularPercentualRL,
  calcularFaixaAPP,
  calcularEscadinhaAPP,
} from "./regras/codigo_florestal";
import { CRA_COMPENSACAO, PRA_TERMO } from "./regras/tabelas";

export interface CursoDagua {
  largura_m: number;
  consolidado: boolean;
}

export interface ImovelInput {
  id?: string;
  area_total_ha: number;
  bioma: string;
  dentro_amazonia_legal: boolean;
  modulo_fiscal_ha: number;
  rl_existente_ha: number;
  cursos_dagua: CursoDagua[];
  geometria?: any;
}

export function analisar(input: ImovelInput) {
  const modulosFiscais = input.area_total_ha / input.modulo_fiscal_ha;

  // Reserva Legal
  const regraRL = calcularPercentualRL(
    input.bioma,
    input.dentro_amazonia_legal,
  );
  if (!regraRL.fonte_legal) throw new Error("Falta fonte_legal na RL");

  const rlExigida = input.area_total_ha * (regraRL.pct / 100);
  const rlDeficitRaw = Math.max(0, rlExigida - input.rl_existente_ha);
  const rlDeficit = Math.round(rlDeficitRaw * 10) / 10; // Resolve precisão de ponto flutuante (e.g. 4.2)

  // APP (simplificado para o primeiro curso na demo)
  const curso = input.cursos_dagua[0];
  const regraAPP = calcularFaixaAPP(curso.largura_m);
  if (!regraAPP.fonte_legal) throw new Error("Falta fonte_legal na APP");

  let recomporM = regraAPP.faixa_m;
  let fonteLegalRecompor = regraAPP.fonte_legal;

  if (curso.consolidado) {
    const regraRecompor = calcularEscadinhaAPP(modulosFiscais);
    if (!regraRecompor.fonte_legal)
      throw new Error("Falta fonte_legal na Escadinha APP");
    recomporM = regraRecompor.recompor_m;
    fonteLegalRecompor = regraRecompor.fonte_legal;
  }

  const citacoes = [
    {
      artigo: "Reserva Legal",
      descricao_simples: `Exigência de ${regraRL.pct}% para a sua região.`,
      fonte_legal: regraRL.fonte_legal,
    },
    {
      artigo: "APP Regra Geral",
      descricao_simples: `Faixa de ${regraAPP.faixa_m}m para curso d'água de até ${curso.largura_m}m.`,
      fonte_legal: regraAPP.fonte_legal,
    },
  ];

  if (curso.consolidado) {
    citacoes.push({
      artigo: "APP Consolidada (Escadinha)",
      descricao_simples: `Por ter entre 2 e 4 módulos fiscais, a recomposição cai para ${recomporM}m.`,
      fonte_legal: fonteLegalRecompor,
    });
  }

  const elegivelCra = rlDeficit > 0;
  if (elegivelCra) {
    if (!CRA_COMPENSACAO.fonte_legal)
      throw new Error("Falta fonte_legal na CRA");
    citacoes.push({
      artigo: "Compensação CRA",
      descricao_simples: "Permite compensar o déficit de RL com cotas.",
      fonte_legal: CRA_COMPENSACAO.fonte_legal,
    });
  }

  if (!PRA_TERMO.fonte_legal) throw new Error("Falta fonte_legal no PRA");
  citacoes.push({
    artigo: "Termo PRA",
    descricao_simples: "Programa de Regularização Ambiental.",
    fonte_legal: PRA_TERMO.fonte_legal,
  });

  const enquadramento =
    rlDeficit > 0 ? "vermelho" : recomporM > 0 ? "amarelo" : "verde";

  return {
    modulos_fiscais: Number(modulosFiscais.toFixed(2)),
    rl: {
      percentual_exigido: regraRL.pct,
      exigida_ha: rlExigida,
      existente_ha: input.rl_existente_ha,
      deficit_ha: rlDeficit,
    },
    app: {
      faixa_regra_geral_m: regraAPP.faixa_m,
      faixa_recomposicao_consolidada_m: curso.consolidado ? recomporM : 0,
    },
    cra: {
      deficit_compensavel_ha: rlDeficit,
      elegivel: elegivelCra,
      fonte_legal: CRA_COMPENSACAO.fonte_legal,
    },
    pra: {
      termo_disponivel: true,
      itens: ["Assinar Termo de Compromisso", "Aderir ao PRA"],
    },
    enquadramento,
    passos: [
      "Recompor APP ou aderir ao PRA",
      "Compensar Reserva Legal via CRA",
    ],
    citacoes,
  };
}
