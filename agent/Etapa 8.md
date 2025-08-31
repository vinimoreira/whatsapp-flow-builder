# ETAPA 8 — Exportação do JSON de Execução

## 🎯 Objetivo
Transformar o estado atual do fluxo (`nodes` + `edges`) em um **JSON executável**, que poderá ser interpretado pelo backend para rodar o chatbot de WhatsApp.

---

## 1) Requisitos funcionais

### 1.1 Estrutura do JSON
- O JSON exportado deve conter:
  - `entry`: id do nó **Start**.
  - `steps`: lista de objetos representando cada nó.
- Cada `step` deve incluir:
  - `id`: id do nó.
  - `type`: tipo (`start`, `message`, `question`, `condition`, `delay`, `api`, `end`).
  - Dados específicos conforme o tipo.
  - `next` ou `transitions` (dependendo do tipo).

### 1.2 Mapeamento por tipo
- **Start**:
  ```json
  { "id": "start-1", "type": "start", "next": "msg-1" }
  ```
- **Message**:
  ```json
  { "id": "msg-1", "type": "message", "text": "Olá!", "mediaUrl": null, "next": "q-1" }
  ```
- **Question**:
  ```json
  {
    "id": "q-1",
    "type": "question",
    "prompt": "Deseja continuar?",
    "options": ["Sim", "Não"],
    "transitions": { "Sim": "api-1", "Não": "end-1" }
  }
  ```
- **Condition**:
  ```json
  {
    "id": "cond-1",
    "type": "condition",
    "expression": "ctx.last_api.allowed === true",
    "transitions": { "true": "msg-2", "false": "end-1" }
  }
  ```
- **Delay**:
  ```json
  { "id": "delay-1", "type": "delay", "ms": 2000, "next": "msg-3" }
  ```
- **API**:
  ```json
  {
    "id": "api-1",
    "type": "api",
    "request": {
      "method": "POST",
      "url": "https://example.com",
      "headers": { "Authorization": "Bearer ..." },
      "body": { "phone": "{{ctx.user.phone}}" }
    },
    "saveAs": "ctx.last_api",
    "next": "cond-1"
  }
  ```
- **End**:
  ```json
  { "id": "end-1", "type": "end" }
  ```

### 1.3 Geração do JSON
- Criar função `toExecutionJson(nodes, edges)`:
  - Encontrar o **Start** → definir como `entry`.
  - Para cada nó, montar `step` com base em seu tipo e dados.
  - Resolver `next` ou `transitions` usando `edges`:
    - **Message/Delay/API** → `next` = target da única aresta de saída.
    - **Question** → `transitions[label] = target`.
    - **Condition** → `transitions["true"] = targetTrue`, `transitions["false"] = targetFalse`.

### 1.4 Exportar
- Criar botão **“Exportar JSON”** no layout.
- Ao clicar:
  - Rodar `validateFlow()` (Etapa 9 cuidará das regras mais rígidas).
  - Gerar JSON.
  - Exibir em modal ou textarea para copiar.

---

## 2) Requisitos não funcionais
- O JSON deve ser **determinístico** (mesmo fluxo → mesmo resultado).
- Exportação deve ser rápida, independente do tamanho do fluxo.
- Deve lidar com ciclos (loops), mas não expandi-los indefinidamente.
- Preparar versão inicial para evoluções futuras (ex.: incluir `version: 1` no root).

---

## 3) Alterações esperadas por arquivo

### `src/flow/exporters/toExecutionJson.ts`
- Função principal `toExecutionJson(nodes, edges)`.
- Retorna objeto `{ entry, steps }`.

### `src/utils/graphHelpers.ts` (novo)
- Funções auxiliares:
  - `findStartNode(nodes)`
  - `getOutgoingEdges(edges, nodeId)`
  - `mapTransitions(nodeId, edges)`
  - `sortTopologically(nodes, edges)` (opcional, para ordenar `steps`).

### `src/app/Layout.tsx`
- Adicionar botão “Exportar JSON”.
- Abrir modal com o JSON gerado (`JSON.stringify(obj, null, 2)`).

---

## 4) Regras de negócio detalhadas
1. Deve existir exatamente **1 Start** → esse é o `entry`.
2. Se nó tiver mais de uma saída, tratar como `transitions` (Question/Condition).
3. Se nó tiver apenas uma saída, tratar como `next`.
4. Se nó não tiver saída (End), não incluir `next`/`transitions`.
5. Edge `label` define a chave em `transitions`.
6. `API` deve incluir campo `saveAs` fixo (ex.: `ctx.last_api`) para usar no fluxo.

---

## 5) Aceitação (testes manuais)
- Criar fluxo simples: Start → Message → End → Exportar → JSON correto.
- Criar fluxo com Question (Sim/Não) → Exportar → `transitions` corretos.
- Criar fluxo com Condition → Exportar → transições “true/false”.
- Criar fluxo com API → Exportar → request completo no JSON.
- Exportar fluxo vazio ou sem Start → deve falhar com erro claro.
- Recarregar e Exportar novamente → JSON consistente.

---

## 6) Critérios de Done (DoD)
- Função `toExecutionJson` implementada e testada.
- Botão “Exportar JSON” gera e exibe JSON.
- Estrutura `{ entry, steps }` respeitada.
- Transições baseadas em edges com labels corretos.
- Dados específicos de cada nó exportados.
- Fluxos inválidos resultam em erro amigável.

---
