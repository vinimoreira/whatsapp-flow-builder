# Estória: Frontend – Salvar e Carregar Flow do Canvas

**Épico:** 7 - CRUD de Flow (Backend + Salvamento do Canvas)

**Como** um usuário,
**Eu quero** salvar o fluxo desenhado e carregá-lo depois,
**Para que** eu possa continuar a edição ou publicar quando estiver pronto.

---

### Tarefas para o Agente de Código

1.  Crie o cliente de API para flows:
    *   Use o `write_file` para criar `src/flow/api/flows.ts` com funções:
        - `createFlow(payload: CreateFlowRequest): Promise<FlowResponse>`
        - `updateFlow(id: number, payload: UpdateFlowRequest): Promise<FlowResponse>`
        - `getFlow(id: number): Promise<FlowResponse>`
        - `listFlows(params?): Promise<FlowSummary[]>`
        - `deleteFlow(id: number): Promise<void>`
        - `publishFlow(id: number): Promise<FlowResponse>` (opcional)

2.  Montagem do payload a partir do canvas:
    *   Leia `src/flow/FlowCanvasWrapper.tsx` e o store (`useFlowStore`) para obter `nodes` e `edges`.
    *   Reaproveite a lógica de `export` (veja `epics/6-exportacao-fluxo/01-implementar-funcao-exportacao.md`) para montar `items` no formato dos DTOs do backend.
    *   Garanta que um item `startup` esteja definido.

3.  Botão/ação de salvar:
    *   Integre com a barra de ações do topo (quando criada no épico da Interface Visual) para acionar `createFlow` ou `updateFlow`.
    *   Exiba feedback de sucesso/erro ao usuário.

4.  Carregamento para edição:
    *   Ao abrir um `Flow` existente, use `getFlow` para obter o JSON completo e converta para `nodes`/`edges` do React Flow.
    *   Mapeie os tipos dos nós para os componentes de nó customizados existentes.

5.  Validação antes de salvar:
    *   Leia `src/flow/validators/validateFlow.ts` e garanta que seja invocada antes de enviar o payload.

6.  Verifique as alterações:
    *   Leia `src/flow/api/flows.ts` e pontos de integração no canvas para confirmar chamadas e payloads.

