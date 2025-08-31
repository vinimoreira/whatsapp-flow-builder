# ETAPA 9 — Validações

## 🎯 Objetivo
Garantir que o fluxo criado pelo usuário seja **consistente e válido** antes da exportação ou execução.  
As validações devem prevenir erros comuns (ex.: múltiplos Start, Question sem opções, Condition sem transições).

---

## 1) Requisitos funcionais

### 1.1 Tipos de validações
- **Start único**:
  - Deve existir exatamente **1 nó Start**.
- **End alcançável**:
  - Pelo menos um nó End deve ser alcançável a partir do Start.
- **Question**:
  - Deve ter **>= 1 option** em `data.options`.
  - Cada opção deve ter **uma aresta de saída correspondente**.
- **Condition**:
  - Deve ter exatamente **2 transições** (`true` e `false`).
- **Delay**:
  - Valor `ms` deve ser positivo (> 0).
- **API**:
  - `url` obrigatório e válido.
  - `method` deve ser um dos [GET, POST, PUT, DELETE].
  - Se `method` = POST/PUT → `bodyTemplate` deve ser objeto válido (JSON).
- **Edges**:
  - Todas as arestas devem ter `label` não vazio.
  - Labels de Question devem estar contidos nas `options`.
  - Labels de Condition devem ser apenas `true` ou `false`.
- **Ciclos**:
  - Ciclos são permitidos, mas emitir **warning** se não houver Delay em pelo menos um nó do ciclo (para evitar loops infinitos).

### 1.2 Resultado da validação
- Retornar objeto:
  ```ts
  {
    valid: boolean,
    errors: string[],
    warnings: string[]
  }
  ```
- **Exportar JSON** só permitido se `valid = true`.
- Warnings não bloqueiam exportação, apenas informam.

---

## 2) Requisitos não funcionais
- Validações devem rodar em tempo O(N+E) (linear no número de nós e arestas).
- Mensagens de erro devem ser claras e direcionar o usuário (ex.: “Pergunta Q-1 tem opção sem aresta de saída”).

---

## 3) Alterações esperadas por arquivo

### `src/flow/validators/validateFlow.ts`
- Criar função `validateFlow(nodes, edges)`.
- Implementar regras descritas em **1.1**.
- Retornar objeto `{ valid, errors, warnings }`.

### `src/app/Layout.tsx`
- Integrar validação ao botão **Exportar JSON**:
  - Rodar `validateFlow()` antes de chamar `toExecutionJson()`.
  - Se inválido → exibir lista de erros e **bloquear exportação**.
  - Se válido → exportar normalmente.
  - Mostrar warnings (mas permitir continuar).

### `src/utils/graphHelpers.ts`
- Adicionar função `findReachableNodes(startId, edges)` para checar se End é alcançável.

---

## 4) Regras de negócio detalhadas
1. O usuário **não pode exportar** sem pelo menos um Start e um End alcançável.
2. **Question** precisa ter arestas compatíveis com todas as opções → caso contrário, erro.
3. **Condition** precisa ter exatamente duas transições, rotuladas `true` e `false` → caso contrário, erro.
4. **API** com `url` vazio → erro; com método inválido → erro; body inválido → erro.
5. **Ciclos** sem Delay → warning (sugerir adicionar Delay para evitar spam).

---

## 5) Aceitação (testes manuais)
- Criar fluxo **válido** com Start → Message → End → Exportar → funciona.
- Criar fluxo sem Start → erro: “Fluxo precisa de exatamente 1 Start”.
- Criar fluxo com 2 Starts → erro: “Fluxo deve ter apenas 1 Start”.
- Criar fluxo sem End → erro: “Pelo menos 1 End deve ser alcançável”.
- Criar Question sem opções → erro: “Question Q-1 não possui opções”.
- Criar Question com opções mas sem arestas ligadas → erro indicando opção sem saída.
- Criar Condition sem saída `false` → erro: “Condition cond-1 precisa de transição false”.
- Criar API sem URL → erro: “API api-1 sem URL válida”.
- Criar ciclo entre dois nós sem Delay → warning: “Ciclo detectado sem Delay”.

---

## 6) Critérios de Done (DoD)
- Função `validateFlow` implementada.
- Exportação bloqueada se `valid = false`.
- Mensagens de erro exibidas claramente ao usuário.
- Warnings informados mas não bloqueiam exportação.
- Cobertura de todos os casos descritos em **1.1** confirmada em testes manuais.

---
