# Estória: Componente Condition Builder para Arestas

**Épico:** 10 - Editor de Condições nas Arestas

**Como** um usuário,
**Eu quero** editar as condições de transição diretamente na aresta,
**Para que** eu consiga configurar regras como "input == 1" sem sair do canvas.

---

### Tarefas para o Agente de Código

1. Criar `ConditionBuilder`:
   - Use o `write_file` para criar `src/flow/edges/ConditionBuilder.tsx`.
   - Props: `{ edgeId: string; conditions?: Condition[]; onChange: (conds: Condition[]) => void }`.
   - UI: lista de condições com campos `Source`, `Comparison` (select com enum), `Values` (chips ou texto separado por vírgula).

2. Integração com o label:
   - Em `EdgeLabelInline.tsx`, adicionar um botão "⚙" para abrir o `ConditionBuilder` (popover simples) e salvar em `edge.data.conditions` via store.

3. Validações básicas:
   - Requerer `Source` não vazio; quando `Comparison` exigir valores, garantir ao menos 1 valor.

