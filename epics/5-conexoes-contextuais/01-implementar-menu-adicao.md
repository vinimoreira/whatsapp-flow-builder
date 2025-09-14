# Estória: Implementar Menu de Adição Contextual

**Épico:** 5 - Menu de Adição Contextual e Conexões

**Como** um usuário,
**Eu quero** ver um botão de "+" no fluxo para adicionar novos nós,
**Para que** eu possa construir meu fluxo de forma mais rápida e contextual.

---

### Tarefas para o Agente de Código

1.  **Crie um componente `AddNodeMenu.tsx`:**
    *   Este componente será um menu flutuante que aparece ao clicar em um botão de "+".
    *   Ele deve listar todos os tipos de nós disponíveis (`FlowType`).

2.  **Renderize o botão de "+" nas arestas (edges) do `ReactFlow`:**
    *   O `ReactFlow` permite customizar a renderização das arestas.
    *   Crie uma aresta customizada que inclua um botão de "+" no meio dela.
    *   Ao clicar no botão, o `AddNodeMenu` deve aparecer.

3.  **Implemente a lógica de adição de nó:**
    *   Ao selecionar um tipo de nó no `AddNodeMenu`, um novo nó desse tipo deve ser inserido no canvas, entre os dois nós que a aresta conectava.
    *   As arestas antigas devem ser removidas e novas arestas devem ser criadas para conectar o novo nó.

4.  **Verifique as alterações:**
    *   Confirme que o menu de adição aparece e que a adição de nós funciona como esperado.
