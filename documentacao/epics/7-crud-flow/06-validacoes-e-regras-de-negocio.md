# Estória: Validações e Regras de Negócio do Flow

**Épico:** 7 - CRUD de Flow (Backend + Salvamento do Canvas)

**Como** um mantenedor do sistema,
**Eu quero** validar os fluxos no backend,
**Para que** a estrutura salva seja consistente e executável.

---

### Tarefas para o Agente de Código

1.  Regras obrigatórias na criação/atualização:
    *   Nome não vazio e <= 250 caracteres.
    *   `version` > 0.
    *   Exatamente 1 item com `startup = true`.
    *   `step` único por flow e começando em 1 (ou consistente com o conjunto enviado).
    *   Tipos de item válidos (mapeáveis para as classes concretas do domínio).

2.  Regras de integridade de conexões/opções:
    *   Para `Options`, cada `next_step` deve existir dentre os itens do payload.
    *   Detectar referências circulares óbvias (self-loop no mesmo `step`).

3.  Falhas e ações:
    *   Validar `failures` e `outputActions` conforme o domínio (campos obrigatórios e limites sensatos).

4.  Publicação:
    *   Ao publicar, respeitar `Flow.Publish()` para impedir dupla publicação.

5.  Centralizar validação:
    *   Crie `backend/src/Threeo.Chatbot.Application/Features/Flows/Services/FlowValidator.cs` para validar `CreateFlowRequest`/`UpdateFlowRequest` antes de persistir.

6.  Verifique as alterações:
    *   Leia os arquivos do serviço de validação e garanta cobertura das regras acima.

