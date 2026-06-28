import {
  ESCADINHA_APP_CONSOLIDADA,
  RL_PERCENTUAL,
  APP_CURSO_DAGUA,
} from "./tabelas";

export function calcularPercentualRL(
  bioma: string,
  dentroAmazoniaLegal: boolean,
) {
  if (dentroAmazoniaLegal) {
    if (bioma.toLowerCase() === "floresta") {
      return RL_PERCENTUAL.find((r) => r.regiao === "amazonia_legal_floresta")!;
    } else {
      return RL_PERCENTUAL.find((r) => r.regiao === "amazonia_legal_cerrado")!;
    }
  }
  return RL_PERCENTUAL.find((r) => r.regiao === "demais_regioes")!;
}

export function calcularFaixaAPP(larguraRio_m: number) {
  const regra = APP_CURSO_DAGUA.find((r) => larguraRio_m <= r.largura_max_m);
  if (regra) return regra;
  // Fallback fictício para demonstração (> 10m)
  return { faixa_m: 50, fonte_legal: "Lei 12.651/2012, Art. 4º, I, 'b'" };
}

export function calcularEscadinhaAPP(modulosFiscais: number) {
  const regra = ESCADINHA_APP_CONSOLIDADA.find(
    (r) => modulosFiscais > r.mf_min && modulosFiscais <= r.mf_max,
  );
  if (regra) return regra;
  // fallback > 4 MF (simplificado)
  return { recompor_m: 30, fonte_legal: "Lei 12.651/2012, Art. 61-A, §4º" };
}
