# Estória: Criar Layout Estilo Typebot

**Épico:** 2 - Interface Visual e Canvas (Estilo Typebot)

**Como** um usuário,
**Eu quero** uma interface limpa e centralizada, semelhante ao Typebot,
**Para que** eu possa me concentrar na construção do meu fluxo de conversa.

---

### Tarefas para o Agente de Código

1.  **Leia o arquivo `src/App.tsx`:**
    *   Use o `read_file` para entender a estrutura atual do layout.

2.  **Remova os componentes `LeftPalette` e `RightInspector` do `App.tsx`:**
    *   O layout estilo Typebot não tem painéis laterais fixos.
    *   Use o `replace` para remover as referências a esses componentes no `App.tsx`.

3.  **Atualize o estilo do `App.tsx` para ter um layout de coluna única:**
    *   O componente `FlowCanvasWrapper` deve ocupar a maior parte da tela.
    *   A barra de ações (que será criada em outra estória) ficará no topo.

    ```css
    /* Exemplo de CSS que pode ser aplicado via inline style ou em um arquivo .css */
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .main-content {
      flex: 1;
    }
    ```

4.  **Verifique as alterações:**
    *   Use o `read_file` para ler o `App.tsx` e confirmar que o layout foi simplificado.
