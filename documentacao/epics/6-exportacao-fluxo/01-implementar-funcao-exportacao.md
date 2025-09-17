# Estória: Implementar Função de Exportação

**Épico:** 6 - Exportação do Fluxo

**Como** um usuário,
**Eu quero** poder exportar meu fluxo de mensagens em um formato JSON compatível com o backend,
**Para que** eu possa salvar e executar o fluxo que eu criei.

---

### Tarefas para o Agente de Código

1.  **Leia o arquivo `src/flow/exporters/toExecutionJson.ts`:**
    *   Use o `read_file` para entender a implementação atual da função de exportação.

2.  **Adapte a função `toExecutionJson` para o novo modelo de dados:**
    *   A função deve receber os `nodes` e `edges` do `useFlowStore`.
    *   Ela deve iterar sobre os nós e arestas e construir um objeto JSON que corresponda à estrutura esperada pelo backend C#.
    *   Preste atenção especial em como as `Actions` (conexões) são representadas no JSON.

3.  **Implemente a lógica de validação:**
    *   Antes de exportar, a função `validateFlow` (em `src/flow/validators/validateFlow.ts`) deve ser chamada para verificar se o fluxo é válido.
    *   Se houver erros de validação, a exportação deve ser interrompida e uma mensagem de erro deve ser exibida.

4.  **Verifique as alterações:**
    *   Confirme que a função `toExecutionJson` gera um JSON no formato correto.
