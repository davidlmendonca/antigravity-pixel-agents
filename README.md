<h1 align="center">
  <img src="webview-ui/public/banner.png" alt="Antigravity Pixel Agents">
</h1>

<h2 align="center">🎮 Antigravity Pixel Agents 🤖</h2>
<p align="center"><b>O escritório virtual em Pixel Art para o Google Antigravity Agentic IDE & Agentes de Negócio (CRM / Webhooks)</b></p>

<div align="center">

[![license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![platform](https://img.shields.io/badge/Platform-VS%20Code%20%7C%20Cursor%20%7C%20Web-purple.svg)](#)
[![engine](https://img.shields.io/badge/Engine-Google%20Antigravity-orange.svg)](#)

</div>

<br/>

> 📜 **Créditos ao Autor Original / Credits & Acknowledgments:**
> Este projeto é um fork e adaptação nativa para o **Google Antigravity Agentic IDE** baseado no incrível projeto open-source original [Pixel Agents](https://github.com/pixel-agents-hq/pixel-agents) criado por **Pablo de Lucca ([@pashpashpash](https://github.com/pashpashpash))**.
> Todos os créditos da arquitetura visual em PixiJS e artes dos avatares pertencem ao autor original e contribuidores.

---

## 🌟 O que é o Antigravity Pixel Agents?

O **Antigravity Pixel Agents** transforma o trabalho de desenvolvimento realizado pelo **Antigravity (Google DeepMind)** e pelos seus **Agentes de Negócio/CRM** em avatares animados em Pixel Art dentro de um escritório virtual expansível e customizável.

Ele funciona de duas formas complementares:

1. **Extensão do VS Code / Cursor (`.vsix`)**: Os avatares ganham vida diretamente no painel inferior do seu editor enquanto você programa.
2. **Servidor Web Standalone (`http://localhost:3000`)**: Um aplicativo Web completo que pode ser aberto em qualquer navegador, monitor secundário ou exibido em telas de dashboards.

---

## ✨ Funcionalidades Principais

- 🤖 **100% Nativo do Antigravity**: Monitora os arquivos de log JSONL do Antigravity em `~/.gemini/antigravity-ide/brain/` sem nenhuma dependência do Claude CLI.
- ⚡ **Rastreamento de Atividades em Tempo Real**:
  - **Escrevendo / Editando**: Quando o Antigravity modifica arquivos (`replace_file_content`, `write_to_file`).
  - **Pesquisando / Lendo**: Quando faz buscas no código (`grep_search`, `view_file`, `list_dir`).
  - **Terminal**: Quando executa comandos e testes (`run_command`).
  - **Subagentes**: Aparição automática de avatares assistentes quando dispara tarefas paralelas (`browser_subagent`, `invoke_subagent`).
- 📡 **Webhooks para Agentes do CRM / Lary 2.0**:
  - Endpoint HTTP POST `/api/agent-event` integrado.
  - Permite que a **Secretária IA Lary** (ou qualquer agente do seu sistema) envie notificações de atendimento no WhatsApp ou geração de contratos para aparecer no escritório virtual!
- 🏗️ **Editor de Layout do Escritório**:
  - Personalize o piso, paredes, mesas, computadores, plantas, sofás e adicione pets (gatinhos e cachorros).
- 🔊 **Efeitos Sonoros & Notificações Visuais**:
  - Som opcional de digitação, balões de fala e alertas quando um agente solicita sua atenção.

---

## 🚀 Como Instalar e Usar

### 1. Extensão para VS Code / Cursor

1. Baixe o pacote `.vsix` em `antigravity-pixel-agents-1.0.1.vsix`.
2. No VS Code, abra a aba de Extensões (`Ctrl + Shift + X`).
3. Clique nos três pontinhos (**`...`**) no canto superior e selecione **Instalar a partir de VSIX...** (*Install from VSIX...*).
4. Pressione `Ctrl + Shift + P`, digite **`Antigravity Pixel Agents: Show Panel`** e aperte Enter.

---

### 2. Rodar o Servidor Web Standalone (Navegador)

Você pode iniciar o escritório virtual em qualquer navegador acessando `http://localhost:3000`:

```bash
cd antigravity-pixel-agents
node dist/cli.js --port 3000
```

Abra no seu navegador: **[http://localhost:3000](http://localhost:3000)**

---

### 📡 3. Como integrar Agentes do seu CRM (Secretária Lary / Webhooks)

Você pode enviar eventos de agentes externos (ex: Supabase Edge Functions, Node.js, Webhooks do WhatsApp) para a rota `/api/agent-event`:

#### Exemplo cURL:
```bash
curl -X POST http://localhost:3000/api/agent-event \
  -H "Content-Type: application/json" \
  -d '{
    "agentName": "Secretária IA Lary",
    "status": "Atendendo cliente no WhatsApp (+55 11 99999-9999)",
    "action": "writing"
  }'
```

#### Exemplo em JavaScript / TypeScript (Node.js / Supabase):
```typescript
await fetch('http://localhost:3000/api/agent-event', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    agentName: 'Secretária IA Lary',
    status: 'Gerando Orçamento de Ensaio Fotográfico',
    action: 'writing'
  })
});
```

---

## 🛠️ Como Contribuir e Desenvolver Localmente

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/antigravity-pixel-agents.git
cd antigravity-pixel-agents

# Instalar dependências
npm install

# Rodar em modo de desenvolvimento
npm run dev

# Compilar pacote VSIX
npm run build && npx @vscode/vsce package --no-dependencies
```

---

## 📜 Licença

Distribuído sob a licença **MIT**. Veja [`LICENSE`](LICENSE) para mais detalhes.

---

<p align="center">Criado com ❤️ para a comunidade <b>Google Antigravity</b> & <b>Capture xCRM</b> | Baseado no <b>Pixel Agents original por Pablo de Lucca</b>.</p>
