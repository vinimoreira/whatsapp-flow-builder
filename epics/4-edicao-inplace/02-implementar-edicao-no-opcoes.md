# Estória: Implementar Edição In-place para Nó de Opções

**Épico:** 4 - Edição "In-place" de Propriedades

**Como** um usuário,
**Eu quero** poder editar as opções de um nó de "Opções" diretamente no canvas,
**Para que** eu possa adicionar, remover e renomear as opções de múltipla escolha.

---

### Tarefas para o Agente de Código

1.  **Modifique o componente `OptionsNode.tsx`:**
    *   Adicione um estado de `isEditing` para controlar o modo de edição.

2.  **Crie a visualização de edição:**
    *   Quando em modo de edição, permita que o usuário:
        *   Edite o texto de cada opção.
        *   Adicione novas opções.
        *   Remova opções existentes.

3.  **Salve as alterações no `zustand` store:**
    *   Ao sair do modo de edição, atualize os `data.options` do nó no `useFlowStore`.

4.  **Verifique as alterações:**
    *   Leia o `OptionsNode.tsx` para confirmar a implementação.
