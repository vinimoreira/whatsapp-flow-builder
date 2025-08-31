# ETAPA 6 — Inspector (Painel de Propriedades)

## 🎯 Objetivo
Implementar um **painel lateral (Inspector)** que permite editar as propriedades dos nós e arestas selecionados.  
Esse painel deve exibir diferentes campos conforme o tipo do item selecionado (**node** ou **edge**) e atualizar o estado global em tempo real.

---

## 1) Requisitos funcionais

### 1.1 Exibição
- O painel deve aparecer sempre visível na lateral direita do app (layout em 3 colunas: Paleta | Canvas | Inspector).
- Mostrar conteúdo **somente quando há seleção**:
  - **Node selecionado** → formulário com campos específicos do tipo.
  - **Edge selecionada** → campo para editar o `label`.
  - Nenhuma seleção → exibir placeholder “Selecione um nó ou conexão”.

### 1.2 Edição de propriedades
- **Start**: apenas `title`.
- **Message**: `title`, `text`, `mediaUrl`.
- **Question**: 
  - `title`
  - `prompt`
  - `options[]`: lista editável (add/remover/reordenar).
- **Condition**: 
  - `title`
  - `expression` (string).
- **Delay**:
  - `title`
  - `ms` (número em milissegundos).
- **API**:
  - `title`
  - `url`
  - `method` (GET/POST/PUT/DELETE)
  - `headers` (key/value list)
  - `bodyTemplate` (JSON simples)
- **End**: apenas `title`.
- **Edge**: 
  - `label` (string).

### 1.3 Validação
- Usar **zod** para validar os campos antes de salvar no estado:
  - `ms` deve ser número positivo.
  - `url` deve ser URL válida.
  - `options[]` em Question não pode estar vazio.
  - `expression` não pode ser string vazia.
- Mostrar mensagem de erro inline quando houver validação falha.

### 1.4 Atualização de estado
- As alterações devem ser aplicadas **em tempo real** ao `nodes` ou `edges` no Zustand.
- Estratégia:
  - `updateNodeData(nodeId, newData)`
  - `updateEdgeLabel(edgeId, newLabel)`

---

## 2) Requisitos não funcionais
- Inputs devem ser leves e responsivos.
- Usar componentes básicos (input, textarea, select).
- Evitar re-render global (usar `useCallback`/`memo` quando necessário).
- Preparar o layout para futuras extensões (mais campos).

---

## 3) Alterações esperadas por arquivo

### `src/flow/RightInspector.tsx`
- Criar componente principal do painel.
- Detectar o item selecionado (node ou edge).
- Renderizar o formulário adequado.
- Exibir erros de validação quando necessário.
- Placeholder “Selecione um nó ou conexão” se nada estiver selecionado.

### `src/store/useFlowStore.ts`
- Adicionar:
  - `selectedId: string | null`
  - `setSelected(id: string | null)`
  - `updateNodeData(nodeId: string, data: object)`
- Já existe `updateEdgeLabel` (definido na Etapa 5).

### `src/utils/schemas.ts`
- Criar esquemas de validação `zod` para cada tipo de nó.
  - `messageSchema`, `questionSchema`, `conditionSchema`, etc.

### `src/utils/inspectorHelpers.ts` (opcional)
- Funções auxiliares para transformar dados do store em props para os formulários.

---

## 4) Regras de negócio detalhadas
1. **Start** deve ser único → não permitir alteração que crie mais de um.
2. **Question**:
   - Sempre deve ter ao menos uma opção.
   - Labels das opções devem estar coerentes com edges (será validado na Etapa 9).
3. **Condition**:
   - Expressão obrigatória.
   - A transição deve prever `true`/`false` (validado depois).
4. **API**:
   - URL obrigatória e válida.
   - Se método for `POST/PUT`, `bodyTemplate` pode ser obrigatório (dependendo da regra futura).
5. **Edge**:
   - Label obrigatório (não pode ser vazio).

---

## 5) Aceitação (testes manuais)
- Selecionar um **Message** → editar texto → ver mudança no canvas em tempo real.
- Selecionar um **Question** → adicionar/remover opções → refletir no nó.
- Selecionar um **Condition** → alterar expressão → salvar corretamente.
- Selecionar um **API** → mudar `method` para POST → editar bodyTemplate → salvar.
- Selecionar uma **Edge** → alterar label no painel → refletir no canvas.
- Selecionar nada → painel mostra “Selecione um nó ou conexão”.
- Validar campo com erro (ex.: URL inválida) → exibir mensagem clara.
- Atualizar e salvar fluxo → dados consistentes no JSON de export (Etapa 8).

---

## 6) Critérios de Done (DoD)
- Painel lateral aparece e mostra formulário específico por tipo.
- Edição atualiza os dados no estado global em tempo real.
- Validações básicas aplicadas e erros exibidos.
- Edge label editável pelo Inspector.
- Placeholder aparece quando nada está selecionado.
- Alterações persistem em salvar/carregar (localStorage) e export.

---
