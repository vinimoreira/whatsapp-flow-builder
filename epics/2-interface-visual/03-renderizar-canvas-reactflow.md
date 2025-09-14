# Estória: Renderizar o Canvas do ReactFlow

**Épico:** 2 - Interface Visual e Canvas (Estilo Typebot)

**Como** um usuário,
**Eu quero** ver uma área de desenho (canvas) onde eu possa construir meu fluxo,
**Para que** eu possa visualizar e organizar os nós do meu fluxo de mensagens.

---

### Tarefas para o Agente de Código

1.  **Leia o arquivo `src/flow/FlowCanvas.tsx`:**
    *   Use o `read_file` para entender a implementação atual do canvas.

2.  **Garanta que o `ReactFlow` ocupe todo o espaço disponível:**
    *   O componente `ReactFlow` deve ser renderizado dentro do `FlowCanvasWrapper` e ocupar 100% da altura e largura do seu contêiner.

3.  **Remova a funcionalidade de `onDrop` da `LeftPalette`:**
    *   A adição de nós será feita por um menu contextual, então o `onDrop` não é mais necessário no canvas.
    *   Use o `replace` para remover a lógica de `onDrop` e `onDragOver` do `FlowCanvas.tsx`.

4.  **Conecte o `ReactFlow` ao `zustand` store:**
    *   Garanta que os `nodes` e `edges` do `useFlowStore` estão sendo passados como props para o componente `ReactFlow`.

5.  **Verifique as alterações:**
    *   Leia o `src/flow/FlowCanvas.tsx` para confirmar que a lógica de `onDrop` foi removida e que o canvas está corretamente conectado ao store.
