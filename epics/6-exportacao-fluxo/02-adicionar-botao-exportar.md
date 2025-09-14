# Estória: Adicionar Botão de Exportar

**Épico:** 6 - Exportação do Fluxo

**Como** um usuário,
**Eu quero** ter um botão de "Exportar" na barra de ações superior,
**Para que** eu possa facilmente baixar o arquivo JSON do meu fluxo.

---

### Tarefas para o Agente de Código

1.  **Modifique o componente `TopBar.tsx`:**
    *   Use o `read_file` para ler o conteúdo do arquivo `src/components/TopBar.tsx`.
    *   Adicione um botão de "Exportar" à barra de ações.

2.  **Conecte o botão à função de exportação:**
    *   Ao clicar no botão, a função `onExport` (que você moverá ou recriará no `TopBar.tsx` ou em um hook customizado) deve ser chamada.
    *   Esta função deve:
        1.  Chamar o `validateFlow`.
        2.  Se for válido, chamar o `toExecutionJson`.
        3.  Abrir um modal para exibir o JSON e oferecer as opções de copiar e baixar o arquivo (a lógica para isso já existe no `App.tsx` e pode ser reutilizada).

3.  **Verifique as alterações:**
    *   Confirme que o botão de "Exportar" está visível na `TopBar` e que ele aciona a funcionalidade de exportação.
