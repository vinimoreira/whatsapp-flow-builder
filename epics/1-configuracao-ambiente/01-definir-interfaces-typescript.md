# Estória: Definir Interfaces TypeScript

**Épico:** 1 - Configuração do Ambiente e Tipos de Dados

**Como** um desenvolvedor,
**Eu quero** ter interfaces TypeScript que espelhem os modelos de dados do backend,
**Para que** eu possa garantir a consistência e a segurança dos tipos de dados em todo o frontend.

---

### Tarefas para o Agente de Código

1.  **Crie o arquivo `src/types/flow.ts`:**
    *   Use o `write_file` para criar um novo arquivo em `src/types/flow.ts`.

2.  **Defina e exporte as seguintes interfaces e enums no arquivo `src/types/flow.ts`:**

    ```typescript
    // src/types/flow.ts

    export enum FlowType {
      Text = 'Text',
      BackgroundProcess = 'BackgroundProcess',
      Options = 'Options',
      Redirect = 'Redirect',
      SupportTicket = 'SupportTicket',
      EndConversation = 'EndConversation',
      Proxy = 'Proxy',
    }

    export enum MessageTypes {
      Text = 'Text',
      Template = 'Template',
    }

    export interface Message {
      order: number;
      text: string;
      type: MessageTypes;
    }

    export interface Action {
      key: string;
      conditions: string[];
      parameter: string | null;
      // A interface Failure precisa ser definida se for usada
      // failure: Failure;
    }

    export interface FlowItemData {
      title?: string;
      description?: string;
      // Outras propriedades específicas de cada tipo de nó
      [key: string]: any;
    }

    // Esta é a estrutura de um nó do ReactFlow
    export interface FlowNode {
      id: string;
      type: FlowType;
      position: { x: number; y: number };
      data: FlowItemData;
    }
    ```

3.  **Verifique se o arquivo foi criado e se o conteúdo está correto:**
    *   Use o `read_file` para ler o conteúdo de `src/types/flow.ts` e confirmar que as interfaces foram criadas corretamente.
