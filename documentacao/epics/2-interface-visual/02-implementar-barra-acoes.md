# Estória: Implementar Barra de Ações Superior

**Épico:** 2 - Interface Visual e Canvas (Estilo Typebot)

**Como** um usuário,
**Eu quero** ter uma barra de ações no topo da tela,
**Para que** eu possa salvar, carregar e exportar meu fluxo.

---

### Tarefas para o Agente de Código

1.  **Crie um novo componente `TopBar.tsx` em `src/components`:**
    *   Use o `write_file` para criar o arquivo `src/components/TopBar.tsx`.
    *   Este componente conterá os botões de "Salvar", "Carregar" e "Exportar".

2.  **Mova a lógica dos botões do `App.tsx` para o `TopBar.tsx`:**
    *   Leia o `App.tsx` para encontrar a lógica de `saveFlow`, `loadFlow` e `onExport`.
    *   Use o `zustand` store para acessar as funções necessárias.

3.  **Adicione o `TopBar.tsx` ao `App.tsx`:**
    *   Use o `replace` para adicionar o novo componente no topo do layout do `App.tsx`.

4.  **Estilize a `TopBar` para ser limpa e funcional:**
    *   Use Tailwind CSS (se disponível) ou inline styles para estilizar a barra e os botões.

5.  **Verifique as alterações:**
    *   Leia os arquivos `App.tsx` e `src/components/TopBar.tsx` para confirmar que as alterações foram implementadas.
