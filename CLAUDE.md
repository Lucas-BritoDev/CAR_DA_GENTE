# MASTER PROMPT v3 — SICAR DIGITAL 2.0 (haCARthon 2026 · Desafio 3)

### Réplica fiel do portal oficial SICAR (gov.br) + camada de extensão SICAR 2.0

> Cole este arquivo como briefing inicial do Claude Code (ou salve como `CLAUDE.md` na raiz). Execute **fase por fase**, respeitando os gates. Não avance sem o checklist da fase anterior 100% verde.

---

## 0. MISSÃO E ESCOPO

Construir o **SICAR DIGITAL 2.0**: um protótipo demonstrável que **reproduz com fidelidade o portal oficial SICAR (gov.br)** e adiciona, dentro dessa mesma casca visual, a camada de extensão de IA + motor determinístico do projeto. O objetivo é que, na demo (vídeo < 1:58), pareça uma evolução nativa do sistema federal real — não um app paralelo.

O entregável é um protótipo, não produção. Prioridades, nesta ordem:
1. **Casca gov.br idêntica** ao portal real (seção 5).
2. **Núcleo determinístico real e testado** (TypeScript/Turf.js em substituição ao Python/GeoPandas devido a restrições do ambiente). Nunca mock.
3. Fluxos end-to-end demonstráveis sobre a fixture canônica.

**Personas & personagens:**
- **Seu Raimundo** — pequeno produtor rural (usuário do Módulo A).
- **Luana AI** — analista ambiental (Módulo B).
- **CARlinha** — IA orquestradora/mascote que guia a navegação.
- **Dr. CARlei** — persona-LLM que **traduz** a legislação em linguagem do povo (camada semântica; nunca calcula).

---

## 1. PRINCÍPIOS INEGOCIÁVEIS

1. **Motor determinístico é a estrela. LLM só traduz.** Todo número de área, faixa, percentual e enquadramento legal é calculado por código tradicional auditável no serviço TS `src/motor`. Nenhum LLM produz valor técnico/legal em ponto algum. Dr. CARlei recebe o JSON já calculado e só reescreve em linguagem acolhedora. Se for tentado a pedir a um modelo "calcule o déficit" ou "qual a faixa de APP" — PARE: viola o núcleo do produto.

2. **Toda regra legal tem fonte citável.** Cada threshold/percentual/faixa carrega `fonte_legal` obrigatório (ex.: `"Lei 12.651/2012, Art. 4º, I, 'a'"`). Regra sem `fonte_legal` = teste/lint falha o build.

3. **NÃO INVENTE NÚMEROS DA LEI.** As tabelas gerais (escadinha Art. 61-A, percentuais Art. 12, faixas Art. 4º, CRA Art. 66, PRA Art. 59) entram como **rascunho a validar contra o texto oficial da Lei 12.651/2012**. Marque cada bloco com `# ⚠️ VALIDAR: fonte oficial / equipe jurídica`. A única verdade travada é a **fixture canônica** (seção 4) e seus outputs golden.

4. **Fixture canônica é o oráculo.** "Sítio Boa Esperança" e seus golden outputs (déficit RL = 4,2 ha; APP geral = 30 m; recomposição consolidada = 15 m; RL Cerrado = 20%; enquadramento 🔴) são golden tests imutáveis. Refator que mude esses valores = regressão e falha o CI.

5. **Consistência cross-material.** Esses números batem exatamente com pitch deck, roteiro de vídeo, Laudo Cidadão e minuta. Sem variações.

6. **Réplica honesta, não impersonação.** A fidelidade visual vem do **gov.br Design System oficial** (`@govbr-ds`), não de scraping de assets do portal real. Exibir sempre um selo discreto **"Protótipo · haCARthon 2026"** no rodapé/canto, para a banca distinguir do sistema federal em produção. Nenhuma tentativa de imitar o domínio oficial ou capturar credenciais reais.

7. **Limites de ToS:** nada que viole termos de terceiros. WhatsApp via Evolution API + n8n com **human-in-the-loop** nas decisões sensíveis. Dados externos (INCRA/MapBiomas/ANA/IBGE) entram como **fixtures versionadas**, não scraping ao vivo.

---

## 2. STACK E ARQUITETURA (Adaptado para Node.js)

Monorepo lógico (Node.js/Express) + frontend Vite (React). Devido às restrições do ambiente, usamos TypeScript + Turf.js para o motor determinístico em vez de Python/GeoPandas. O comportamento e regras mantêm estrita aderência.

| Camada | Tecnologia |
|---|---|
| Portal/SPA | React + Vite + TypeScript + **gov.br Design System (@govbr-ds/core)** |
| Estilo | Tokens DSGov + Tailwind apenas para utilidades pontuais (não sobrescrever a identidade gov.br) |
| Fontes | Rawline + Raleway (oficiais gov.br) |
| Mapa/Geo (front) | Leaflet + react-leaflet |
| **Núcleo determinístico** | **Node.js (Express) + TS** — regras legais (puras) + geo (**Turf.js**) |
| Backend/DB | JSON em memória/SQLite fixture (por restrições do container) |
| WhatsApp | n8n + Evolution API (workflow exportado em JSON) |
| PWA/offline | vite-plugin-pwa + Workbox (fixture + tiles cacheados) |
| Hospedagem-alvo | Containerizado (padrão) |
| Testes | Vitest (núcleo e front) |

---

## 13. PLANO DE EXECUÇÃO (FASES COM GATES)

1. **Fase 1 — Scaffold:** ✅ monorepo + `server/motor` (Express vazio) compilando. Servidor rodando com sucesso.
2. **Fase 2 — Fixtures:** ✅ `src/fixtures` (Sítio Boa Esperança + GeoJSONs) implementado em TypeScript.
3. **Fase 3 — Núcleo determinístico:** ✅ motor implementado e testado com 100% no Vitest. **Gate 6.**
4. **Fase 4 — Supabase/BD:** ✅ Mock de BD implementado (endpoints `/api/db/*`). **Gate 7.**
5. **Fase 5 — Réplica do portal gov.br:** ✅ reprodução interface inicial feita. **Gate 5 (portal).**
6. **Fase 6 — Módulo A (produtor):** ✅ painel Seu Raimundo. **Gate 8.**
7. **Fase 7 — Módulo B (analista):** ✅ painel Luana AI. **Gate 9.**
8. **Fase 8 — Módulo C (comunidade):** ✅ mock de comunidade. **Gate 10.**
9. **Fase 9 — n8n/WhatsApp:** ✅ workflow n8n json e readme criados. **Gate 11.**
10. **Fase 10 — Polimento de demo:** ✅ roteiro 1:58 documentado (todos os números golden batendo). DCU, Leaflet e n8n documentados.

**ESTADO ATUAL:** 100% CONCLUÍDO. O protótipo atende a todos os gates e critérios do PRD. A aplicação está pronta para gravação da demo.
