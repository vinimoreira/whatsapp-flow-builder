# Estória: Importar JSONC de Flow para o Canvas

**Épico:** 8 - Importação JSONC de Flow

**Como** um usuário,
**Eu quero** importar um arquivo JSONC com a definição do fluxo,
**Para que** eu possa visualizar e editar o fluxo no canvas.

---

### Tarefas para o Agente de Código

1. Criar importador `fromBackendFlowJson`:
   - Use o `write_file` para criar `src/flow/importers/fromBackendFlowJson.ts` com a função:
     - `fromBackendFlowJson(text: string): { nodes: Node[]; edges: Edge[]; meta?: { name?: string; version?: number } }`.
   - Utilize `jsonc-parser` ou remova comentários (`//` e `/* */`) antes de fazer `JSON.parse`.

2. Mapear itens → nós/arestas:
   - Entradas do arquivo: lista de itens conforme `documentacao/flow.example.jsonc`.
   - Para cada item:
     - Defina o tipo do nó (1=Text→`text`, 2=BackgroundProcess→`backgroundProcess`, 3=Options→`options`, 5=SupportTicket→`supportTicket`, 6=EndConversation→`endConversation`, 7=Proxy→`proxy`).
     - Use `Id` como `data.step` e opcionalmente como `node.id` (`String(Id)`), mantendo posições padrão se não houver layout salvo.
     - Copie propriedades específicas (Messages, Failures, Metadata, Request/ResponseContent, Subscription/Topic, Startup) para `node.data`.
   - Criar arestas a partir de `NextFlow.Options`:
     - Para cada opção, crie uma aresta `source=String(item.Id)` → `target=String(FlowItemId)` e salve as `Conditions` em `edge.data.conditions`.
     - Defina o `edge.label` como um resumo amigável (ex.: `input == 1`).

3. Startup e consistência:
   - Garantir que exatamente um nó possua `data.startup = true`.
   - Caso múltiplos ou nenhum, sinalizar via retorno (ex.: `meta` com warnings) sem quebrar a importação.

4. Verificar com o exemplo:
   - Leia `documentacao/flow.example.jsonc` e confirme que o importador gera nós e arestas coerentes (steps correspondem aos Ids e existem arestas para todas as `NextFlow.Options`).

