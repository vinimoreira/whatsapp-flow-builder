# ETAPA 5 — Conexões e Labels (React Flow)

## 🎯 Objetivo
Padronizar a criação de conexões (edges) entre nós, definir rótulos (labels) significativos e permitir edição desses labels (inline ou via Inspector), mantendo coerência com os tipos de nós **Question** e **Condition**.

---

## 1) Requisitos funcionais

### 1.1 Criação de aresta (onConnect)
- Ao conectar dois nós, criar uma **edge** com:
  - `label`: `"next"` (valor padrão)
  - `markerEnd`: seta (`ArrowClosed`)
  - `type`: `"smoothstep"`
- Utilizar `addEdge(connection, currentEdges)` do React Flow.
- Adicionar via `setEdges((eds) => addEdge(...))`.

### 1.2 Edição do label
- **Inline (canvas)**: duplo clique no label → abre input editável → confirmar com Enter/blur, cancelar com Esc.
- **Inspector (painel lateral)**: campo “Label” para edição quando a aresta estiver selecionada.
- Não permitir string vazia; se vazio, manter valor anterior.

### 1.3 Coerência com tipos de nó
- **Question**:
  - Labels das arestas devem refletir `data.options[].label` do nó.
  - Se houver label inválido → sinalizar como **warning**.
- **Condition**:
  - Aceitar apenas labels `"true"` e `"false"`.
  - Qualquer outro → sinalizar como **warning**.

### 1.4 Restrições mínimas
- **Start** → apenas saída.
- **End** → apenas entrada.
- **Question** → múltiplas saídas permitidas (um por opção).

---

## 2) Requisitos não funcionais
- Edição de label deve ser leve (evitar re-render excessivo).
- Atualizações sempre via store global (Zustand).
- Labels devem ser preservados em salvar/carregar (localStorage) e exportar JSON.

---

## 3) Alterações esperadas por arquivo

### `src/flow/FlowCanvas.tsx`
- Garantir `onConnect` criando edge com `label: "next"` e seta.
- Manter `onEdgesChange` usando `applyEdgeChanges`.

### `src/store/useFlowStore.ts`
- Adicionar função `updateEdgeLabel(edgeId: string, newLabel: string)`.

### `src/flow/EdgeLabelInline.tsx` (novo)
- Componente para edição inline do label (click/dblclick → input).

### `src/flow/RightInspector.tsx`
- Campo “Label” para edição quando a seleção atual for uma aresta.

### `src/utils/edgeHelpers.ts` (novo, opcional)
- Funções utilitárias:
  - `isFromQuestion(nodes, edge)`
  - `isFromCondition(nodes, edge)`
  - `labelMatchesQuestionOptions(label, options)`
  - `labelIsBoolean(label)`

---

## 4) Regras de negócio detalhadas
1. Labels default sempre `"next"`.
2. Inline edit com confirmação Enter/blur, cancelamento Esc.
3. Question → labels devem bater com opções (`data.options`).
4. Condition → labels devem ser apenas `"true"`/`"false"`.
5. Warnings devem ser sinalizados visualmente, mas não bloquear export (isso ficará para a Etapa 9).

---

## 5) Aceitação (testes manuais)
- Conectar dois nós → aresta com `"next"` e seta.
- Duplo clique no label → editar para “Sim” → atualizado.
- Selecionar aresta no Inspector → alterar para “Não” → atualizado.
- Question com opções “Sim/Não” → labels coerentes → ok; label inválido → warning.
- Condition → labels `true/false` → ok; qualquer outro → warning.
- Salvar e recarregar → labels preservados.
- Export JSON → labels aparecem corretamente em `edges`.

---

## 6) Critérios de Done (DoD)
- Criação de arestas com padrão correto.
- Edição de labels funcionando inline e no Inspector.
- Sinalização de inconsistências em Question/Condition.
- Labels persistem em salvar/carregar e aparecem no export.

---
