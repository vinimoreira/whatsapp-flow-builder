# Estória: Endpoints de Listar, Obter, Excluir e Publicar Flow

**Épico:** 7 - CRUD de Flow (Backend + Salvamento do Canvas)

**Como** um usuário interno,
**Eu quero** listar, carregar por id, excluir e publicar um flow,
**Para que** eu consiga gerenciar o ciclo de vida dos fluxos.

---

### Tarefas para o Agente de Código

1.  Endpoint `GET /chatbots/flows` (listar):
    *   Suporta `skip` e `take` (paginações simples) e filtro opcional por `name`.
    *   Retorna lista resumida (id, name, version, isPublished, createdAt, updatedAt?).

2.  Endpoint `GET /chatbots/flows/{id}` (detalhe):
    *   Compoe `FlowResponse` com itens e opções: use `IFlowItemRepository.GetByFlowIdAsync` e `IFlowItemOptionRepository.GetByFlowItemId`.
    *   Ordena itens por `step`.

3.  Endpoint `DELETE /chatbots/flows/{id}` (excluir):
    *   Remove flow e seus itens/opções em transação (`IUnitOfWork`).
    *   Retorna `204 No Content`.

4.  Endpoint `POST /chatbots/flows/{id}/publish` (opcional):
    *   Usa método `Publish()` do agregado `Flow` (ver `Domain/Flows/Base/Entities/Flow.cs`).
    *   Salva e retorna `200 OK` com status atualizado.

5.  Autorizações e validações:
    *   Aplique `[Authorize(Policy = PolicyConstant.InternalUsers)]` no controller.
    *   Trate não encontrados e retornos de erro padronizados.

6.  Verifique as alterações:
    *   Leia o `FlowController.cs` e confirme rotas e contratos de retorno.

