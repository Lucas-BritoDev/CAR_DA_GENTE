import * as turf from "@turf/turf";

export const sitioBoaEsperancaInput = {
  id: "sitio_boa_esperanca_001",
  area_total_ha: 50.0,
  bioma: "Cerrado",
  dentro_amazonia_legal: false,
  modulo_fiscal_ha: 16.0,
  rl_existente_ha: 5.8,
  cursos_dagua: [{ largura_m: 8, consolidado: true }],
  // Synthetic geometry roughly 50ha (a square around 707x707m)
  geometria: turf.polygon([
    [
      [-47.92, -15.82],
      [-47.92, -15.8136],
      [-47.9134, -15.8136],
      [-47.9134, -15.82],
      [-47.92, -15.82],
    ],
  ]),
};
