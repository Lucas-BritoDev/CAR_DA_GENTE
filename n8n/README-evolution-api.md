# Integração Seu Mundinho (WhatsApp)

Este diretório contém o workflow para o n8n que conecta o WhatsApp do produtor rural (Seu Raimundo) ao motor determinístico do SICAR Digital 2.0.

## Componentes

- **n8n**: Plataforma de automação.
- **Evolution API**: API open-source para integração com o WhatsApp.
- **Dr. CARlei (LLM)**: Prompt Langchain restrito à **tradução semântica**.

## Configuração (Human-in-the-Loop)

Para a demonstração ou uso em ambiente controlado, você precisará expor as seguintes variáveis de ambiente no seu container/n8n:
- `EVOLUTION_API_URL`
- `EVOLUTION_INSTANCE`
- `EVOLUTION_TOKEN`

### Passos:
1. Importe o arquivo `workflow-seu-mundinho.json` no seu n8n.
2. Certifique-se de que a instância da Evolution API está conectada a um número de WhatsApp via QR Code.
3. Defina a URL do Webhook do n8n dentro das configurações da Evolution API para que as mensagens recebidas iniciem o fluxo.
4. **Human-in-the-Loop**: Nos cenários onde o produtor envia documentos mais complexos (como fotos de satélite ou de notificações que não sejam simples PDFs de texto estruturado), recomenda-se a inserção de um nó de aprovação humana no n8n antes do despacho final, ou um painel onde o Analista CAR possa conferir a extração antes da resposta automatizada ser liberada.

> **Importante:** O prompt do nó LLM proíbe estritamente a realização de cálculos. Ele recebe a resposta JSON determinística do endpoint `/api/analisar` e *apenas* traduz os valores para a linguagem do produtor (ex: "4.2 hectares de déficit" vira "faltam 4.2 hectares pra sua reserva").
