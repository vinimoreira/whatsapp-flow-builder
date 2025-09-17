# Estória: Exportar Mensagens, Falhas e Campos Assíncronos

**Épico:** 9 - Exportação para Formato Backend

**Como** um desenvolvedor,
**Eu quero** incluir `Messages`, `Failures`, `OutputActions` e campos assíncronos na exportação,
**Para que** o JSON fique completo e executável no backend.

---

### Tarefas para o Agente de Código

1. Mensagens (`Messages`):
   - Suportar itens `Text/Proxy/SupportTicket` que podem conter `Messages`.
   - Cada mensagem: `{ Order, Text, Type }` onde `Type` é `"text" | "template"`.

2. Falhas (`Failures`):
   - Estruturar conforme exemplo: `{ ErrorCode, ErrorMessage[], MaxRetries, ReturnToPreviousState, IgnoreErrorMessage, FlowItemWhenMaxRetriesExceeded }`.

3. Ações de saída (`OutputActions`):
   - Se utilizadas, exportar `{ Key, Conditions[], Parameter, Failure }`.

4. Campos assíncronos:
   - Para `BackgroundProcess/SupportTicket/Proxy`: exportar `RequestContent`, `ResponseContent`, `TopicName`, `SubscriptionName`, `SubscriptionTopicName`.

5. Integração:
   - Atualizar `src/flow/exporters/toBackendFlowJson.ts` para montar todas as seções acima a partir de `node.data`.

