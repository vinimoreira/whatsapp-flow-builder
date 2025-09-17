# Estória: Criar Nó de Redirecionamento

**Épico:** 3 - Paleta de Nós e Nós Customizados (Estilo Bolha de Chat)

**Como** um usuário,
**Eu quero** ter um nó de "Redirecionamento",
**Para que** eu possa enviar o usuário para outro fluxo de conversa.

---

### Tarefas para o Agente de Código

1.  **Crie um novo componente `RedirectNode.tsx` em `src/flow/nodes`:**
    *   Use o `write_file` para criar o arquivo.

2.  **Implemente o componente `RedirectNode`:**
    *   Este nó deve ter um `Handle` de entrada, mas não necessariamente um de saída, pois ele redireciona para outro fluxo.
    *   Exiba o título e um ícone de "seta de redirecionamento".

3.  **Registre o novo tipo de nó no `src/flow/NodeTypes.tsx`:**
    *   Importe o `RedirectNode` e adicione-o ao objeto `nodeTypes` com a chave `FlowType.Redirect`.

4.  **Verifique as alterações:**
    *   Leia os arquivos relevantes para confirmar a implementação.
