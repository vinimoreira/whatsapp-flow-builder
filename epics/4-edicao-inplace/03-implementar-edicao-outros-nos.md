# Estória: Implementar Edição In-place para Outros Nós

**Épico:** 4 - Edição "In-place" de Propriedades

**Como** um usuário,
**Eu quero** poder editar as propriedades de outros tipos de nós (Proxy, Redirecionamento, etc.) diretamente no canvas,
**Para que** eu tenha uma experiência de edição consistente em todo o construtor de fluxo.

---

### Tarefas para o Agente de Código

1.  **Crie um componente genérico de edição ou aplique o padrão de edição in-place aos nós restantes:**
    *   Para cada um dos seguintes nós, implemente a funcionalidade de edição in-place:
        *   `BackgroundProcessNode.tsx`
        *   `RedirectNode.tsx`
        *   `SupportTicketNode.tsx`
        *   `ProxyNode.tsx`

2.  **Adapte os campos de edição para cada nó:**
    *   Cada nó terá propriedades diferentes para editar (ex: URL do proxy, ID do fluxo de redirecionamento).
    *   Renderize os campos de formulário apropriados para cada tipo de nó.

3.  **Salve as alterações no `zustand` store:**
    *   Garanta que as alterações feitas em cada nó sejam salvas no `useFlowStore`.

4.  **Verifique as alterações:**
    *   Leia os arquivos de cada nó para confirmar a implementação.
