# Estória: Ação de Importar JSONC na Barra de Ações

**Épico:** 8 - Importação JSONC de Flow

**Como** um usuário,
**Eu quero** um botão para importar o arquivo JSONC de flow,
**Para que** eu carregue rapidamente um fluxo existente no canvas.

---

### Tarefas para o Agente de Código

1. Criar componente `TopBar` (ou estender o existente):
   - Use o `write_file` para criar `src/flow/TopBar.tsx` com botões: `Importar JSONC`, `Exportar Backend JSON` (desabilitado por enquanto) e `Salvar`.
   - Renderize `TopBar` no `FlowCanvasWrapper.tsx` acima do canvas.

2. Implementar importação:
   - No botão `Importar JSONC`, abra um `<input type="file" accept=".json,.jsonc"/>` e leia o conteúdo.
   - Chame `fromBackendFlowJson(text)` para obter `{ nodes, edges }` e aplique com `setNodes`/`setEdges` do `useFlowStore`.

3. Feedback e erros:
   - Exiba mensagens de erro amigáveis para JSON inválido e estatísticas simples (qtd. nós/arestas importados).

