# Estória: Criar Nó Customizado de Texto

**Épico:** 3 - Paleta de Nós e Nós Customizados (Estilo Bolha de Chat)

**Como** um usuário,
**Eu quero** ter um nó de "Texto" que se pareça com uma bolha de chat,
**Para que** eu possa adicionar mensagens de texto ao meu fluxo de forma intuitiva.

---

### Tarefas para o Agente de Código

1.  **Crie um novo componente `TextNode.tsx` em `src/flow/nodes`:**
    *   Use o `write_file` para criar o arquivo `src/flow/nodes/TextNode.tsx`.

2.  **Implemente o componente `TextNode`:**
    *   O componente deve receber as propriedades de um nó do `ReactFlow` (`id`, `data`, etc.).
    *   Ele deve renderizar uma "bolha de chat" com o título do nó e um ícone de mensagem.
    *   Adicione `Handles` (pontos de conexão) de entrada e saída para o nó.

    ```typescript
    // Exemplo de estrutura do TextNode.tsx
    import { Handle, Position } from 'reactflow';

    function TextNode({ data }) {
      return (
        <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: 8, padding: 10 }}>
          <Handle type="target" position={Position.Top} />
          <div>
            <strong>{data.title || 'Texto'}</strong>
          </div>
          <p>{data.description || 'Envie uma mensagem'}</p>
          <Handle type="source" position={Position.Bottom} />
        </div>
      );
    }

    export default TextNode;
    ```

3.  **Registre o novo tipo de nó no `src/flow/NodeTypes.tsx`:**
    *   Leia o arquivo `src/flow/NodeTypes.tsx`.
    *   Importe o `TextNode` e adicione-o ao objeto `nodeTypes` com a chave `FlowType.Text`.

4.  **Verifique as alterações:**
    *   Leia os arquivos `src/flow/nodes/TextNode.tsx` and `src/flow/NodeTypes.tsx` para confirmar a implementação.
