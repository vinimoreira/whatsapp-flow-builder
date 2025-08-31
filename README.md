# WhatsApp Flow Builder (POC)

Editor visual de fluxos para WhatsApp construído com React Flow. Permite criar, validar e exportar fluxos conversacionais por meio de arrastar‑e‑soltar, com edição de propriedades em um painel lateral e validações antes da exportação.

## ✨ Funcionalidades
- Arrastar e soltar blocos no canvas (Start, Message, Question, Condition, Delay, API, End)
- Edição de propriedades no Inspector (título, texto, opções, expressão, etc.)
- Edição inline de labels das conexões (com avisos de inconsistência)
- Validações de fluxo antes de exportar (Start único, opções/labels, true/false em Condition, etc.)
- Salvar e carregar o fluxo via `localStorage` (com auto‑save opcional)
- Exportação para JSON de execução determinístico

## 🧱 Stack
- React + TypeScript + Vite
- [React Flow](https://reactflow.dev/) para o canvas
- Zustand para estado global
- Zod para validações de dados
- (Dev) ESLint, Tailwind configurado

## 🚀 Rodando localmente
Pré‑requisitos: Node 18+ e npm.

```bash
npm install
npm run dev
```
Abra a aplicação no endereço informado pelo Vite (ex.: http://localhost:5173).

## 🌐 Demo (GitHub Pages)
- Link público: https://vinimoreira.github.io/whatsapp-flow-builder/
- O `vite.config.ts` já define `base: '/whatsapp-flow-builder/'` para funcionar em subcaminho do Pages.

## 📦 Publicação no GitHub Pages
- Opção 1 — GitHub Actions (recomendado):
  - Em GitHub → Settings → Pages: em Build and deployment, escolha “GitHub Actions”.
  - Use um workflow de deploy para publicar a pasta `dist` (build) no Pages.
- Opção 2 — Branch `gh-pages`:
  - Gere o build com `npm run build` e publique o conteúdo de `dist/` na branch `gh-pages`.
  - Em Settings → Pages, selecione a branch `gh-pages`.

## 🧭 Como usar
1) Arraste blocos da paleta (coluna esquerda) para o canvas.
2) Conecte os blocos; dê duplo‑clique no rótulo da conexão para editar o label.
3) Selecione um nó ou conexão para editar suas propriedades no Inspector (coluna direita).
4) Use os botões do topo para Salvar, Carregar e Exportar JSON.

Regras importantes:
- Deve haver exatamente 1 Start.
- Question: as opções em `data.options` precisam corresponder aos labels das arestas de saída.
- Condition: exige exatamente duas saídas rotuladas `true` e `false`.
- Delay: `ms` deve ser > 0.
- API: `url` válida e `method` ∈ {GET, POST, PUT, DELETE}.

## 🧩 Tipos de blocos
- Start: ponto de entrada do fluxo.
- Message: envia texto e opcionalmente `mediaUrl`.
- Question: mostra `prompt` e opções; transições mapeadas por label.
- Condition: avalia `expression` e direciona por `true`/`false`.
- Delay: aguarda `ms` antes de seguir para `next`.
- API: realiza requisição com `method`, `url`, `headers` e `bodyTemplate` (JSON).
- End: término do fluxo.

## 📤 Exportação (JSON de execução)
O botão “Exportar JSON” gera um objeto com `version`, `entry` (id do Start) e `steps` em ordem determinística. Exemplo simplificado:

```json
{
  "version": 1,
  "entry": "start-1",
  "steps": [
    { "id": "start-1", "type": "start", "next": "msg-1" },
    { "id": "msg-1", "type": "message", "text": "Olá!", "next": "q-1" },
    { "id": "q-1", "type": "question", "prompt": "Continuar?", "options": ["Sim", "Não"], "transitions": { "Sim": "end-ok", "Não": "end-nok" } },
    { "id": "end-ok", "type": "end" },
    { "id": "end-nok", "type": "end" }
  ]
}
```

Formato real implementado em `src/flow/exporters/toExecutionJson.ts`.

## 🗂️ Estrutura principal
- `src/App.tsx`: layout, ações de salvar/carregar/exportar e modais
- `src/flow/FlowCanvas.tsx`: canvas e interações (drag, connect, seleção)
- `src/flow/NodeTypes.tsx`: renderização de cada tipo de nó
- `src/flow/RightInspector.tsx`: painel lateral de propriedades e validação inline
- `src/flow/exporters/toExecutionJson.ts`: exportação para JSON
- `src/flow/validators/validateFlow.ts`: validações do fluxo
- `src/store/useFlowStore.ts`: estado global com Zustand
- `src/utils/schemas.ts`: schemas Zod (nós, edges e persistência)
- `src/utils/graphHelpers.ts`: utilitários de grafo (transições, alcance, etc.)

## 🧪 Validações e qualidade
- Validações rápidas no Inspector via Zod
- Validação completa antes da exportação: `validateFlow(nodes, edges)`
- Lint: `npm run lint`

## 💾 Persistência
- Botões: “💾 Salvar” e “📂 Carregar” no topo
- Auto‑save opcional a cada ~1s (habilitado por checkbox)
- Chave do `localStorage`: `flow-builder-state`

## 🛠️ Scripts
- `npm run dev`: ambiente de desenvolvimento
- `npm run build`: build de produção (Vite + TypeScript)
- `npm run preview`: servir build local
- `npm run lint`: checagem de lint
