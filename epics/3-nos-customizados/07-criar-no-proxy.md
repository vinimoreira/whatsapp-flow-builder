# Estória: Criar Nó de Proxy

**Épico:** 3 - Paleta de Nós e Nós Customizados (Estilo Bolha de Chat)

**Como** um usuário,
**Eu quero** ter um nó de "Proxy",
**Para que** eu possa conectar com serviços externos para buscar ou enviar informações.

---

### Tarefas para o Agente de Código

1.  **Crie um novo componente `ProxyNode.tsx` em `src/flow/nodes`:**
    *   Use o `write_file` para criar o arquivo.

2.  **Implemente o componente `ProxyNode`:**
    *   Este nó deve ter `Handles` de entrada e saída.
    *   Exiba o título e um ícone de "nuvem" ou "API".

3.  **Registre o novo tipo de nó no `src/flow/NodeTypes.tsx`:**
    *   Importe o `ProxyNode` e adicione-o ao objeto `nodeTypes` com a chave `FlowType.Proxy`.

4.  **Verifique as alterações:**
    *   Leia os arquivos relevantes para confirmar a implementação.
