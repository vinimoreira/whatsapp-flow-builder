# Estória: Criar Nó de Encerrar Conversa

**Épico:** 3 - Paleta de Nós e Nós Customizados (Estilo Bolha de Chat)

**Como** um usuário,
**Eu quero** ter um nó de "Encerrar Conversa",
**Para que** eu possa finalizar o fluxo de conversa.

---

### Tarefas para o Agente de Código

1.  **Crie um novo componente `EndConversationNode.tsx` em `src/flow/nodes`:**
    *   Use o `write_file` para criar o arquivo.

2.  **Implemente o componente `EndConversationNode`:**
    *   Este nó deve ter um `Handle` de entrada, mas não de saída.
    *   Exiba o título e um ícone de "bandeira de chegada" ou "parar".

3.  **Registre o novo tipo de nó no `src/flow/NodeTypes.tsx`:**
    *   Importe o `EndConversationNode` e adicione-o ao objeto `nodeTypes` com a chave `FlowType.EndConversation`.

4.  **Verifique as alterações:**
    *   Leia os arquivos relevantes para confirmar a implementação.
