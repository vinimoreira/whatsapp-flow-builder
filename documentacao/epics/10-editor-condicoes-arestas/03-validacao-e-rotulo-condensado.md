# Estória: Validação de Condições e Rótulo Condensado

**Épico:** 10 - Editor de Condições nas Arestas

**Como** um mantenedor,
**Eu quero** validar condições e exibir um rótulo condensado,
**Para que** fique claro e consistente o que será exportado para o backend.

---

### Tarefas para o Agente de Código

1. Validador:
   - Estender `src/flow/validators/validateFlow.ts` para checar `edge.data.conditions`:
     - `Source` obrigatório, `Comparison` válido, `Values` presentes quando necessário.
     - Alvos (`edge.target`) devem existir; proibir self-loop se não fizer sentido.

2. Rótulo condensado:
   - Se existirem condições, gerar label a partir delas (ex.: `input == 1`).
   - Manter o label manual como fallback quando não houver condições.

3. Avisos:
   - Sinalizar (warning) quando não houver condições em arestas que saem de `options`.

