# Estória: Criar Nó de Ticket de Suporte

**Épico:** 3 - Paleta de Nós e Nós Customizados (Estilo Bolha de Chat)

**Como** um usuário,
**Eu quero** ter um nó de "Ticket de Suporte",
**Para que** eu possa criar um ticket para atendimento humano.

---

### Tarefas para o Agente de Código

1.  **Crie um novo componente `SupportTicketNode.tsx` em `src/flow/nodes`:**
    *   Use o `write_file` para criar o arquivo.

2.  **Implemente o componente `SupportTicketNode`:**
    *   Este nó deve ter `Handles` de entrada e saída.
    *   Exiba o título e um ícone de "ticket" ou "suporte".

3.  **Registre o novo tipo de nó no `src/flow/NodeTypes.tsx`:**
    *   Importe o `SupportTicketNode` e adicione-o ao objeto `nodeTypes` com a chave `FlowType.SupportTicket`.

4.  **Verifique as alterações:**
    *   Leia os arquivos relevantes para confirmar a implementação.
