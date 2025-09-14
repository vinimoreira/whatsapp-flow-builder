# Estória: Criar Nó de Processo em Segundo Plano

**Épico:** 3 - Paleta de Nós e Nós Customizados (Estilo Bolha de Chat)

**Como** um usuário,
**Eu quero** ter um nó de "Processo em Segundo Plano",
**Para que** eu possa executar ações no sistema sem a interação do usuário.

---

### Tarefas para o Agente de Código

1.  **Crie um novo componente `BackgroundProcessNode.tsx` em `src/flow/nodes`:**
    *   Use o `write_file` para criar o arquivo.

2.  **Implemente o componente `BackgroundProcessNode`:**
    *   Este nó pode ter um design mais simples, pois não é visível para o usuário final.
    *   Ele deve ter `Handles` de entrada e saída.
    *   Exiba o título e um ícone de "engrenagem" ou "processamento".

3.  **Registre o novo tipo de nó no `src/flow/NodeTypes.tsx`:**
    *   Importe o `BackgroundProcessNode` e adicione-o ao objeto `nodeTypes` com a chave `FlowType.BackgroundProcess`.

4.  **Verifique as alterações:**
    *   Leia os arquivos relevantes para confirmar a implementação.
