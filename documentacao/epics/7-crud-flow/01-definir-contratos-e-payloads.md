# Estória: Definir Contratos e Payloads do CRUD de Flow

**Épico:** 7 - CRUD de Flow (Backend + Salvamento do Canvas)

**Como** um desenvolvedor,
**Eu quero** contratos JSON claros para criar, atualizar e ler flows,
**Para que** o frontend consiga salvar/carregar o fluxo desenhado no canvas com segurança.

---

### Tarefas para o Agente de Código

1.  Crie os DTOs de request/response no backend:
    - Use o `write_file` para criar:
      - `backend/src/Threeo.Chatbot.Application/Features/Flows/Contracts/CreateFlowRequest.cs`
      - `backend/src/Threeo.Chatbot.Application/Features/Flows/Contracts/UpdateFlowRequest.cs`
      - `backend/src/Threeo.Chatbot.Application/Features/Flows/Contracts/FlowResponse.cs`
      - `backend/src/Threeo.Chatbot.Application/Features/Flows/Contracts/FlowItemDto.cs`
      - `backend/src/Threeo.Chatbot.Application/Features/Flows/Contracts/NextFlowDto.cs`
      - `backend/src/Threeo.Chatbot.Application/Features/Flows/Contracts/NextFlowOptionDto.cs`
      - `backend/src/Threeo.Chatbot.Application/Features/Flows/Contracts/NextFlowConditionDto.cs`
      - `backend/src/Threeo.Chatbot.Application/Features/Flows/Contracts/OutputActionDto.cs`
      - `backend/src/Threeo.Chatbot.Application/Features/Flows/Contracts/FailureDto.cs`
      - `backend/src/Threeo.Chatbot.Application/Features/Flows/Contracts/MessageDto.cs`

2.  Alinhe os DTOs ao modelo existente:
    - Baseie-se nas entidades já existentes (`Flow`, `FlowItem` e tipos, `FlowItemOption`) e nos DTOs usados no console (`backend/src/Threeo.Chatbot.Console/Program.cs`).
    - Campos mínimos do `Flow` para criação: `name`, `version`, `items` (lista de `FlowItemDto`).
    - Campos do `FlowItemDto` (espelhe os usados no console):
      - `step`, `type`, `description`, `metadata`, `startup`
      - `requestContent`, `responseContent`, `topicName`, `subscriptionName`, `subscriptionTopicName`
      - `outputActions`, `failures`, `messages`, `nextFlow` (para opções)

3.  Adicione exemplos de payload no XML doc dos DTOs:
    - Inclua exemplo de `CreateFlowRequest` e `FlowResponse` para facilitar o consumo do frontend.

4.  Verifique os nomes e enums:
    - Use o enum `FlowType` do backend (int) para `type` no `FlowItemDto`.
    - Mantenha `MessageTypes` conforme backend.

