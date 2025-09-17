# Estória: Migrar Opções/Condições para Arestas

**Épico:** 8 - Importação JSONC de Flow

**Como** um desenvolvedor,
**Eu quero** que as condições de próximo passo residam nas arestas,
**Para que** a exportação reflita `NextFlow.Options` do backend com fidelidade.

---

### Tarefas para o Agente de Código

1. Armazenar condições na aresta:
   - Atualize o store `useFlowStore` para incluir `updateEdgeData(edgeId, data)`.
   - Estruture `edge.data.conditions` como `Array<{ Source: string; Comparison: number; Values?: string[] }>`.

2. Ajustar `OptionsNode`:
   - Manter UI de rótulos, mas remover dependência das opções internas para determinar saída.
   - As transições/saídas serão determinadas pelas arestas e suas `conditions`.

3. Label amigável:
   - Em `EdgeLabelInline`, exibir um resumo das condições (ex.: `input == 1`, `ctx.question.3.id hasValue`).
   - Manter edição rápida do label como anotação, sem substituir `edge.data.conditions`.

