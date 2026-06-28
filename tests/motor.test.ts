import { describe, it, expect } from 'vitest';
import { analisar } from '../src/motor/laudo';
import { sitioBoaEsperancaInput } from '../src/fixtures/sitio_boa_esperanca';

describe('Motor determinístico', () => {
    it('Sítio Boa Esperança deve bater com os outputs golden', () => {
        const laudo = analisar(sitioBoaEsperancaInput);

        // Déficit de RL: 4,2 ha
        expect(laudo.rl.deficit_ha).toBe(4.2);
        
        // APP geral: 30 m
        expect(laudo.app.faixa_regra_geral_m).toBe(30);
        
        // Recomposição consolidada: 15 m
        expect(laudo.app.faixa_recomposicao_consolidada_m).toBe(15);
        
        // RL Cerrado = 20%
        expect(laudo.rl.percentual_exigido).toBe(20);
        
        // Enquadramento 🔴
        expect(laudo.enquadramento).toBe('vermelho');

        // CRA Elegível
        expect(laudo.cra.elegivel).toBe(true);

        // Verifica fontes legais
        expect(laudo.citacoes.length).toBeGreaterThan(0);
        laudo.citacoes.forEach(c => {
            expect(c.fonte_legal).toBeTruthy();
        });
    });
});
