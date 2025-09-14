# Estória: Criar Conexões Entre Nós

**Épico:** 5 - Menu de Adição Contextual e Conexões

**Como** um usuário,
**Eu quero** poder conectar os nós uns aos outros arrastando de um ponto de conexão para outro,
**Para que** eu possa definir a ordem e a lógica do meu fluxo de mensagens.

---

### Tarefas para o Agente de Código

1.  **Revise a função `onConnect` no `FlowCanvas.tsx`:**
    *   Use o `read_file` para ler o `FlowCanvas.tsx`.
    *   A lógica de `onConnect` do `ReactFlow` é responsável por criar novas arestas.

2.  **Garanta que as conexões são salvas no `zustand` store:**
    *   A função `onConnect` deve chamar a função `setEdges` do `useFlowStore` para adicionar a nova aresta ao estado.

3.  **Implemente a lógica de validação de conexão (opcional):**
    *   Você pode adicionar lógica para impedir conexões inválidas (ex: um nó não pode se conectar a si mesmo).

4.  **Verifique as alterações:**
    *   Confirme que é possível criar conexões entre os nós no canvas e que elas são salvas no estado.
