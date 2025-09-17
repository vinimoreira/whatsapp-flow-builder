# Estória: Ação de Exportar JSON no Formato do Backend

**Épico:** 9 - Exportação para Formato Backend

**Como** um usuário,
**Eu quero** baixar o JSON no formato de flow do backend,
**Para que** eu possa enviar o arquivo para o CRUD/integrações.

---

### Tarefas para o Agente de Código

1. Botão na TopBar:
   - No `src/flow/TopBar.tsx`, habilitar o botão `Exportar Backend JSON`.
   - Ao clicar, chamar `toBackendFlowJson(nodes, edges)` e baixar um arquivo `flow.export.json`.

2. Validação prévia:
   - Reutilizar `validateFlow` e, em caso de erros, exibir lista e bloquear exportação.

3. Telemetria simples (opcional):
   - Logar no console a quantidade de itens exportados e o passo inicial.

