# Estória: Configurar o Zustand Store

**Épico:** 1 - Configuração do Ambiente e Tipos de Dados

**Como** um desenvolvedor,
**Eu quero** ter o `zustand` store configurado para gerenciar o estado do fluxo,
**Para que** eu possa ter um local centralizado para armazenar e atualizar os nós, arestas e outras informações do fluxo.

---

### Tarefas para o Agente de Código

1.  **Leia o arquivo `src/store/useFlowStore.ts`:**
    *   Use o `read_file` para entender a estrutura atual do store.

2.  **Atualize o `useFlowStore.ts` para incluir os tipos de dados do `flow.ts`:**
    *   Importe os tipos `FlowNode` e `Edge` (do `reactflow`) e os tipos que você criou em `src/types/flow.ts`.
    *   Atualize a interface `FlowState` para usar esses tipos.

    ```typescript
    // Exemplo de como a store pode ser atualizada
    import { create } from 'zustand';
    import { persist } from 'zustand/middleware';
    import { Node, Edge } from 'reactflow';
    import { FlowNode } from '../types/flow'; // Supondo que os tipos estão em ../types/flow

    interface FlowState {
      nodes: FlowNode[];
      edges: Edge[];
      // ... outras propriedades do estado
      setNodes: (nodes: FlowNode[]) => void;
      setEdges: (edges: Edge[]) => void;
      // ... outras ações
    }

    export const useFlowStore = create<FlowState>()(
      persist(
        (set) => ({
          nodes: [],
          edges: [],
          // ... estado inicial
          setNodes: (nodes) => set({ nodes }),
          setEdges: (edges) => set({ edges }),
          // ... outras implementações de ações
        }),
        { name: 'flow-storage' }
      )
    );
    ```

3.  **Verifique se a atualização foi bem-sucedida:**
    *   Use o `read_file` para ler o conteúdo de `src/store/useFlowStore.ts` e confirmar que as alterações foram aplicadas.
