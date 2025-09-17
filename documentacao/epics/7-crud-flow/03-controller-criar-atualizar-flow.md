# Estória: Criar Controller e Endpoints de Criação/Atualização de Flow

**Épico:** 7 - CRUD de Flow (Backend + Salvamento do Canvas)

**Como** um usuário interno,
**Eu quero** criar e atualizar um fluxo a partir do canvas,
**Para que** eu consiga salvar as alterações diretamente na plataforma.

---

### Tarefas para o Agente de Código

1.  Crie o `FlowController` no backend:
    *   Use o `write_file` para criar `backend/src/Threeo.Chatbot.Application/Features/Flows/FlowController.cs`.
    *   Use `[Route("flows")]` e `[Authorize(Policy = PolicyConstant.InternalUsers)]` seguindo o padrão de `ConversationController`.

2.  Endpoint `POST /chatbots/flows` (criação):
    *   Action recebe `CreateFlowRequest` do namespace `Features/Flows/Contracts`.
    *   Validações básicas: nome, versão > 0, ao menos 1 item, 1 item `startup`.
    *   Mapeia itens do request para entidades concretas (`Question`, `BackgroundProcess`, `FlowOption`, `Redirect`, `SupportTicket`, `EndConversation`, `Proxy`).
    *   Usa `IUnitOfWork` para salvar `Flow`, `FlowItem` e `FlowItemOption` em transação.
    *   Retorna `201 Created` com `FlowResponse`.

3.  Endpoint `PUT /chatbots/flows/{id}` (atualização):
    *   Action recebe `UpdateFlowRequest`.
    *   Carrega itens atuais por `flowId`, calcula diffs (criar/atualizar/excluir itens e opções) e aplica.
    *   Valida integridade (Startup único, passos existentes, opções válidas).
    *   Usa `IUnitOfWork` e retorna `200 OK` com `FlowResponse` atualizado.

4.  Mapeamento e fábrica de itens:
    *   Crie uma classe utilitária `backend/src/Threeo.Chatbot.Application/Features/Flows/Services/FlowItemFactory.cs` para construir `FlowItem` concreto a partir do `type` + payload.
    *   Padronize a conversão de `messages`, `outputActions`, `failures`, `metadata`.

5.  Verifique as alterações:
    *   Leia os arquivos gerados para conferir namespace, atributos, rotas e retornos.

