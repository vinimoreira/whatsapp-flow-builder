# Estória: Criar Nó Customizado de Opções

**Épico:** 3 - Paleta de Nós e Nós Customizados (Estilo Bolha de Chat)

**Como** um usuário,
**Eu quero** ter um nó de "Opções" para criar menus de múltipla escolha,
**Para que** eu possa guiar o usuário por diferentes caminhos no fluxo.

---

### Tarefas para o Agente de Código

1.  **Crie um novo componente `OptionsNode.tsx` em `src/flow/nodes`:**
    *   Use o `write_file` para criar o arquivo `src/flow/nodes/OptionsNode.tsx`.

2.  **Implemente o componente `OptionsNode`:**
    *   O nó deve ter um `Handle` de entrada (target) na parte superior.
    *   Para cada opção nos `data.options` do nó, renderize um `Handle` de saída (source) separado.
    *   Isso permitirá que cada opção tenha seu próprio caminho no fluxo.

    ```typescript
    // Exemplo de estrutura do OptionsNode.tsx
    import { Handle, Position } from 'reactflow';

    function OptionsNode({ data }) {
      return (
        <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: 8, padding: 10 }}>
          <Handle type="target" position={Position.Top} />
          <div>
            <strong>{data.title || 'Opções'}</strong>
          </div>
          {(data.options || []).map((option, index) => (
            <div key={index} style={{ position: 'relative', padding: '5px 0' }}>
              {option.label}
              <Handle type="source" position={Position.Right} id={option.id} style={{ top: '50%' }} />
            </div>
          ))}
        </div>
      );
    }

    export default OptionsNode;
    ```

3.  **Registre o novo tipo de nó no `src/flow/NodeTypes.tsx`:**
    *   Importe o `OptionsNode` e adicione-o ao objeto `nodeTypes` com a chave `FlowType.Options`.

4.  **Verifique as alterações:**
    *   Leia os arquivos `src/flow/nodes/OptionsNode.tsx` e `src/flow/NodeTypes.tsx` para confirmar a implementação.
