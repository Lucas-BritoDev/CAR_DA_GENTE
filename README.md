<div align="center">
  <h1>🌿 CAR da Gente</h1>
  <p><strong>O CARinho para o povo rural de um jeito descomplicado e cantado</strong></p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![haCARthon](https://img.shields.io/badge/haCARthon_2026-Desafio_3-1B5E20?style=flat)](#)
</div>

---

## 📖 Visão Geral

O **CAR da Gente** é uma plataforma focada na simplificação da regularização ambiental rural no Brasil. Desenvolvida como um **Bem Público Digital e Open Source** para o *haCARthon 2026 (Desafio 3)*, o projeto utiliza uma arquitetura de IA orquestrada pela **"CARlinha"** para:

- Automatizar a triagem técnica e a análise de documentos do Cadastro Ambiental Rural (CAR).
- Traduzir o "juridiquês" ambiental em orientações claras para o pequeno produtor.
- Operar de forma **Mobile-First**, priorizando o acesso via WhatsApp e redes móveis de baixa velocidade.

## ✨ Principais Funcionalidades

- **📄 Laudo Cidadão**: Motor determinístico que ingere a geometria do CAR e gera um laudo personalizado em linguagem simples, explicando as exigências legais e os passos para regularização.
- **💬 Seu Mundinho (WhatsApp)**: Integração orquestrada por **n8n** onde o produtor envia fotos de notificações ou documentos e recebe explicações empáticas e humanizadas com o auxílio da IA.
- **💰 Simulador de Incentivos**: Interface integrada que calcula os ganhos financeiros (como desbloqueio de crédito verde) ao se regularizar.
- **🏅 Selo CARimbo Verde**: Gamificação e emissão de certificado digital que gera orgulho de pertencimento e prova social de adequação ambiental.
- **🎵 ComuniCAR (CarCantado)**: Conteúdo educativo gerado por IA no formato de vídeos curtos e paródias musicais, distribuído em massa via redes sociais e rádios comunitárias.
- **🌿 MarCARtplace**: Hub de negociação direta de Cotas de Reserva Ambiental (CRA) para conectar propriedades com excedente florestal a propriedades com déficit.

## 🛠️ Arquitetura e Tecnologias

O projeto foi construído para ser acessível, modular e de baixo custo operacional (modelo guerrilha/MVP):

- **Frontend:** React, TypeScript, Vite, CSS Vanilla (Mobile First).
- **Backend / Banco de Dados:** Supabase (PostgreSQL, Auth, RLS).
- **Automação e Integração (WhatsApp):** n8n Engine.
- **Inteligência Artificial:** LLMs focados em tradução semântica (Filtro Determinístico Anti-Alucinação para não inventar base legal).

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/en/) (v18+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Conta no [Supabase](https://supabase.com/) (para Banco de Dados)
- [n8n](https://n8n.io/) local ou Cloud (para fluxos de WhatsApp)

### Passos de Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/car-da-gente.git
   cd car-da-gente
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto e insira suas chaves do Supabase e n8n:
   ```env
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   VITE_N8N_WEBHOOK_URL=sua_url_do_webhook_n8n
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   O aplicativo estará disponível em `http://localhost:5173`.

### Importando os fluxos do n8n
Na pasta `n8n/`, você encontrará os arquivos `.json` exportados dos workflows de IA e WhatsApp (ex: `workflow-seu-mundinho.json`). Basta importá-los diretamente em sua instância do n8n para rodar as integrações de backend.

## 🛡️ Segurança: Filtro Anti-Alucinação
Este projeto trata de regularização ambiental governamental. Portanto, nossa **IA não toma decisões**. Ela apenas lê e traduz resultados gerados por nosso motor determinístico, garantindo **segurança jurídica e auditoria total** sem inventar regras (alucinações).

## 🤝 Como Contribuir

O **CAR da Gente** é 100% open source. Sua ajuda é fundamental para levarmos alfabetização tecnológica e ambiental aos pequenos produtores.

1. Faça um *Fork* do projeto.
2. Crie uma branch para a sua funcionalidade (`git checkout -b feature/MinhaNovaFeature`).
3. Faça *commit* das suas alterações (`git commit -m 'Add: Minha nova feature'`).
4. Faça um *push* da sua branch (`git push origin feature/MinhaNovaFeature`).
5. Abra um **Pull Request**.

## 📝 Licença

Este projeto é licenciado sob a licença **MIT** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
<p align="center">
  Feito com 💚 para o haCARthon 2026
</p>
