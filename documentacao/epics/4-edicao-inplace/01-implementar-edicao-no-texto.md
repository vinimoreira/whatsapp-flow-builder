# Estória: Implementar Edição In-place para Nó de Texto

**Épico:** 4 - Edição "In-place" de Propriedades

**Como** um usuário,
**Eu quero** poder clicar em um nó de "Texto" e editar suas propriedades diretamente no canvas,
**Para que** eu possa configurar as mensagens de forma rápida e visual.

---

### Tarefas para o Agente de Código

1.  **Modifique o componente `TextNode.tsx`:**
    *   Use o `read_file` para ler o conteúdo do arquivo.
    *   Adicione um estado local (ex: `isEditing`) para controlar se o nó está em modo de edição.
    *   Ao clicar no nó, altere `isEditing` para `true`.

2.  **Crie a visualização de edição:**
    *   Quando `isEditing` for `true`, renderize campos de formulário (`<input>`, `<textarea>`) para editar as propriedades do nó (título, descrição, mensagens, etc.).
    *   Quando `isEditing` for `false`, renderize a visualização normal do nó (a "bolha de chat").

3.  **Salve as alterações no `zustand` store:**
    *   Ao sair do modo de edição (ex: ao clicar fora do nó), chame uma função do `useFlowStore` para atualizar os dados do nó com as novas informações.

4.  **Verifique as alterações:**
    *   Leia o `TextNode.tsx` para confirmar que a lógica de edição in-place foi implementada.
