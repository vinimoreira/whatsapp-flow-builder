# Estória: Repositórios de Escrita e Consultas para Flow

**Épico:** 7 - CRUD de Flow (Backend + Salvamento do Canvas)

**Como** um desenvolvedor,
**Eu quero** métodos de repositório para criar, atualizar, deletar e consultar flows/itens,
**Para que** os endpoints possam persistir e ler os dados do fluxo com eficiência.

---

### Tarefas para o Agente de Código

1.  Estenda `IFlowRepository` com operações de escrita e listagem:
    *   Leia `backend/src/Threeo.Chatbot.Application/Domain/Flows/Base/Repositories/IFlowRepository.cs`.
    *   Adicione métodos: `AddAsync(Flow flow)`, `Update(Flow flow)`, `Delete(Flow flow)`, `ExistsByNameVersionAsync(string name, int version)`, `ListAsync(int skip, int take)`.

2.  Implemente em `FlowRepository`:
    *   Leia `backend/src/Threeo.Chatbot.Application/Infrastructure/Persistence/Databases/Repositories/Flows/Base/FlowRepository.cs`.
    *   Implemente os novos métodos usando `ChatbotDbContext`.

3.  Adapte `IFlowItemRepository` para suportar leitura completa de um fluxo:
    *   Leia `backend/src/Threeo.Chatbot.Application/Domain/Flows/Items/Repositories/IFlowItemRepository.cs`.
    *   Adicione `ValueTask<IEnumerable<FlowItem>> GetByFlowIdAsync(int flowId, CancellationToken ct)`.
    *   Implemente em `backend/src/Threeo.Chatbot.Application/Infrastructure/Persistence/Databases/Repositories/Flows/Items/FlowItemRepository.cs` com filtro por `FlowId` e ordenação por `Step`.

4.  Adapte `IFlowItemOptionRepository` para consulta por `FlowItemId` (já existe):
    *   Garanta que o método de listagem por `FlowItemId` seja usado para compor o retorno do fluxo completo.

5.  Commit transacional:
    *   Use `IUnitOfWork` para consolidar `Create/Update/Delete` (veja `backend/src/Threeo.Chatbot.Application/Infrastructure/Persistence/Databases/Contexts/IUnitOfWork.cs`).

6.  Verifique as alterações:
    *   Leia os arquivos alterados para confirmar que as assinaturas e implementações estão consistentes.

