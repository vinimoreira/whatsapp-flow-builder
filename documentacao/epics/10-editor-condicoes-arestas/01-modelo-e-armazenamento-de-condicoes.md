# Estória: Modelo e Armazenamento de Condições nas Arestas

**Épico:** 10 - Editor de Condições nas Arestas

**Como** um desenvolvedor,
**Eu quero** padronizar o modelo de condições nas arestas e atualizar o store,
**Para que** o canvas represente fielmente `NextFlow.Options` do backend.

---

### Tarefas para o Agente de Código

1. Tipos e helpers:
   - Crie `src/types/conditions.ts` com:
     - `export type Condition = { Source: string; Comparison: number; Values?: string[] }`.
     - `export enum Comparison { HasValue=1, Equals=2, Always=3, Empty=4, Gte=10, Lte=11 /* etc. */ }`.
     - `summary(cond: Condition): string` para label amigável.

2. Store:
   - Em `src/store/useFlowStore.ts`, adicionar `updateEdgeData(edgeId: string, partial: Record<string, any>)`.
   - Persistir `edge.data.conditions?: Condition[]`.

3. Label:
   - Em `src/flow/EdgeLabelInline.tsx`, use `summary` quando existirem condições para exibir o label derivado.

