# CARlinha no WhatsApp — Workflow n8n (Seu Mundinho)

Este diretório contém o workflow **`workflow-seu-mundinho.json`**, que coloca a **CARlinha** (a "doutora das leis com a linguagem do povo") para atender os produtores rurais pelo **WhatsApp**, via **Evolution API + n8n**.

A CARlinha entende mensagens de **texto, áudio e imagem** e responde ajudando o produtor a **preencher o CAR** e a **entender o Código Florestal** (Lei 12.651/2012), no mesmo tom regional do app.

> ⚠️ **Protótipo · haCARthon 2026.** Os números técnicos/legais são ilustrativos (fixture "Sítio Boa Esperança"). A IA **traduz** e orienta — ela **não calcula** valores legais.

---

## 🔒 Segurança (leia antes de tudo)

Este arquivo é um **export limpo**, seguro para versionar:

- **Não contém nenhum segredo.** Não há apikey, token ou senha embutidos.
- A `apikey`, a `server_url` e o `instancia` da Evolution são lidos **em tempo de execução** do próprio payload do webhook (a Evolution envia esses campos em cada evento) — veja o nó **Dados**.
- As **credenciais** (OpenAI e Evolution API) **não vão no export** do n8n: elas ficam só no seu n8n e são associadas **depois de importar**.
- O `webhookId` específico da sua instância foi removido — o n8n gera um novo ao importar.

Ou seja: pode commitar tranquilo. Os segredos vivem apenas dentro do seu n8n.

---

## 🧩 Arquitetura do fluxo

```
Webhook (mundinho_zap)
  → Dados                         (normaliza o payload da Evolution)
  → Ignora Própria CARlinha       (filtro: só messages.upsert, sem fromMe, só conversa individual)
  → Tipo de Mensagem (Switch)
        ├─ áudio  → Baixa base64 → Converte → Whisper (transcreve)  → pergunta
        ├─ imagem → Baixa base64 → Converte → GPT-4o Visão (analisa) → pergunta
        └─ texto  → pergunta (texto direto)
  → Junta as Entradas
  → CARlinha (IA)                 (GPT-4o-mini + Memória por número)
  → Enviar texto (Evolution API)  (resposta no WhatsApp)
```

### O que cada parte faz
- **Dados**: extrai do webhook → `instancia`, `remotejid`, `fromme`, `pushname`, `conversation`, `messagetype`, `server_url`, `apikey`, `event`.
- **Ignora Própria CARlinha** (anti-loop): só passa quando `event = messages.upsert`, `fromme ≠ true` e `remotejid` contém `@s.whatsapp.net` (ignora status, grupos e as próprias mensagens da CARlinha).
- **Áudio**: baixa o áudio em base64 (`/chat/getBase64FromMediaMessage`), converte em arquivo e transcreve com **Whisper**.
- **Imagem**: mesmo download, e analisa com **GPT-4o Visão** — lê tanto fotos da propriedade quanto **prints da tela do CAR** (transcreve os campos).
- **CARlinha (IA)**: agente com a persona da CARlinha, memória de conversa por número, base legal e exemplo já calculado (Sítio Boa Esperança).
- **Enviar texto**: nó nativo da **Evolution API** que responde no WhatsApp.

---

## ⚙️ Como configurar (passo a passo)

### 1. Pré-requisitos
- **n8n** rodando (cloud ou self-hosted).
- **Evolution API** com uma instância conectada a um número de WhatsApp (via QR Code).
- Node community **`n8n-nodes-evolution-api`** instalado no n8n (Settings → Community Nodes).
- Uma **chave da OpenAI**.

### 2. Importar o workflow
1. No n8n: **Workflows → Import from File** → selecione `workflow-seu-mundinho.json`.

### 3. Criar/associar as credenciais (feito só no n8n, nunca no arquivo)
- **OpenAI** (`openAiApi`): associe nos nós **GPT (OpenAI)**, **Transcreve Áudio (Whisper)** e **Analisa Imagem (Visão)**.
- **Evolution API** (`evolutionApi`): associe no nó **Enviar texto** (informe a URL base e a apikey da sua Evolution na credencial).

> Os nós **Baixa Áudio/Imagem** **não precisam de credencial**: eles usam a `apikey` que vem no próprio webhook.

### 4. Apontar o webhook da Evolution para o n8n
1. Copie a URL de produção do nó **Recebe Mensagem (mundinho_zap)** (algo como `https://SEU-N8N/webhook/mundinho_zap`).
2. Na Evolution, configure o **Webhook** da instância para essa URL e **habilite o evento `messages.upsert`** (Webhook by Events).
3. **Ative** o workflow no n8n.

### 5. Testar
- Mande **texto** (ex.: "Quanto de Reserva Legal eu preciso no Cerrado?").
- Mande um **áudio** com uma dúvida.
- Mande uma **foto** da propriedade ou um **print** da tela do CAR.

A CARlinha deve responder orientando o cadastro e explicando a lei.

---

## 🛠️ Solução de problemas

| Sintoma | Causa provável | Como resolver |
|---|---|---|
| `404 - instance does not exist` | nome da instância errado | A `instancia` vem do webhook (`body.instance`). Confirme o nome no painel da Evolution. |
| `400 - Invalid format` | mensagem de status/grupo (sem número válido) | O filtro já ignora isso (`@s.whatsapp.net`). Garanta que só `messages.upsert` está habilitado. |
| CARlinha responde sozinha (loop) | webhook recebendo `fromMe` | O filtro `fromme ≠ true` resolve. Confirme que o nó **Ignora Própria CARlinha** está ligado. |
| `Referenced node doesn't exist` | expressão apontando para nó que não existe | Os nós se chamam **Dados**, **CARlinha (IA)** etc. Mantenha os nomes ao editar. |
| Áudio/imagem não entendidos | credencial OpenAI faltando ou base64 vazio | Associe a credencial OpenAI; confira a resposta de `getBase64FromMediaMessage`. |

---

## 🔌 Variáveis e campos úteis (vindos do webhook)
A Evolution envia, em cada evento, campos como: `instance`, `server_url`, `apikey`, `event`, `data.key.remoteJid`, `data.key.fromMe`, `data.pushName`, `data.messageType`, `data.message.conversation`. O nó **Dados** mapeia tudo isso para uso no fluxo.

> **Human-in-the-Loop:** para casos sensíveis (documentos complexos, decisões legais), recomenda-se inserir um nó de aprovação humana antes do envio automático — o Analista CAR confere a orientação antes de liberar.
