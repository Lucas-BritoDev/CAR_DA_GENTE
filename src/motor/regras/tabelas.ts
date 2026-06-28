// ⚠️ VALIDAR: confirmar todos os valores no texto oficial da Lei 12.651/2012
export const ESCADINHA_APP_CONSOLIDADA = [
  {
    mf_min: 0,
    mf_max: 1,
    recompor_m: 5,
    fonte_legal: "Lei 12.651/2012, Art. 61-A, §1º",
  },
  {
    mf_min: 1,
    mf_max: 2,
    recompor_m: 8,
    fonte_legal: "Lei 12.651/2012, Art. 61-A, §2º",
  },
  {
    mf_min: 2,
    mf_max: 4,
    recompor_m: 15,
    fonte_legal: "Lei 12.651/2012, Art. 61-A, §3º",
  },
  // > 4 MF: faixa variável conforme PRA / largura do curso - VALIDAR
];

export const RL_PERCENTUAL = [
  {
    regiao: "amazonia_legal_floresta",
    pct: 80,
    fonte_legal: "Lei 12.651/2012, Art. 12, I, 'a'",
  },
  {
    regiao: "amazonia_legal_cerrado",
    pct: 35,
    fonte_legal: "Lei 12.651/2012, Art. 12, I, 'b'",
  },
  {
    regiao: "demais_regioes",
    pct: 20,
    fonte_legal: "Lei 12.651/2012, Art. 12, V",
  },
];

export const APP_CURSO_DAGUA = [
  {
    largura_max_m: 10,
    faixa_m: 30,
    fonte_legal: "Lei 12.651/2012, Art. 4º, I, 'a'",
  },
  // ... demais faixas — VALIDAR
];

export const CRA_COMPENSACAO = {
  permite_compensacao_deficit_rl: true,
  fonte_legal: "Lei 12.651/2012, Art. 66, §5º",
};

export const PRA_TERMO = {
  base: "Programa de Regularização Ambiental",
  fonte_legal: "Lei 12.651/2012, Art. 59",
};
