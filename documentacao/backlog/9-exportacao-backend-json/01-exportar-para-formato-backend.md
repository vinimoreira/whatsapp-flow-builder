# Estória: Exportar para Formato de Flow do Backend

**Épico:** 9 - Exportação para Formato Backend

**Como** um usuário,
**Eu quero** exportar o fluxo do canvas no formato consumido pelo backend,
**Para que** eu possa salvar/executar o fluxo na plataforma.

---

### Tarefas para o Agente de Código

1. Criar exportador `toBackendFlowJson`:
   - Use o `write_file` para criar `src/flow/exporters/toBackendFlowJson.ts` com a função:
     - `toBackendFlowJson(nodes, edges): any[]` que retorna uma lista de itens como em `documentacao/flow.example.jsonc`.

2. Mapeamentos obrigatórios:
   - `node.data.step` (ou `Number(node.id)`) → `Id`.
   - Tipo do nó → `Type` numérico (1,2,3,5,6,7).
   - `data.startup` → `Startup` (boolean).
   - `edge.data.conditions` → `NextFlow.Options[].Conditions` (preservar `Source`, `Comparison`, `Values`).
   - `edge.target` → `NextFlow.Options[].FlowItemId` (numérico).

3. Ordens e consistência:
   - Ordene as saídas por `Id` crescente.
   - Garanta exatamente 1 `Startup = true` (falhe com erro claro se inválido).

4. Testar com o canvas atual:
   - Gere o JSON e compare manualmente com o `flow.example.jsonc` (diferenças justificáveis: formatação/ordem de propriedades).

