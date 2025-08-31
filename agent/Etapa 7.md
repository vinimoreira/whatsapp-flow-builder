# ETAPA 7 — Persistência (Salvar & Carregar)

## 🎯 Objetivo
Implementar a capacidade de **salvar** e **carregar** o fluxo (nós + arestas) no `localStorage`.  
Opcionalmente, ativar **auto-save** para que o fluxo seja persistido automaticamente a cada mudança.

---

## 1) Requisitos funcionais

### 1.1 Salvar fluxo
- Criar botão **“Salvar”** no layout principal.
- Ao clicar:
  - Serializar `nodes` e `edges` em JSON.
  - Salvar no `localStorage` em uma chave fixa, ex.: `flow-builder-state`.

### 1.2 Carregar fluxo
- Criar botão **“Carregar”** no layout principal.
- Ao clicar:
  - Ler o valor de `localStorage`.
  - Validar o JSON usando `zod`.
  - Se válido, substituir o estado atual (`setNodes`, `setEdges`).
  - Se inválido/corrompido, mostrar mensagem de erro amigável.

### 1.3 Auto-save (opcional)
- Observar mudanças em `nodes` e `edges`.
- Salvar no `localStorage` de forma automática (usar debounce de ~1s).
- Permitir desativar auto-save (opcional).

---

## 2) Requisitos não funcionais
- **Validação:** usar `zod` para checar estrutura `{ nodes: Node[], edges: Edge[] }`.
- **Confiabilidade:** nunca sobrescrever estado válido com um JSON inválido.
- **Feedback:** exibir toast/alert simples após salvar/carregar.
- **Extensibilidade:** permitir no futuro salvar em backend em vez de `localStorage`.

---

## 3) Alterações esperadas por arquivo

### `src/store/useFlowStore.ts`
- Adicionar duas actions:
  - `saveFlow(): void`
  - `loadFlow(): void`
- Essas funções fazem interface com `localStorage`.

### `src/utils/storage.ts` (novo)
- Helpers para salvar/carregar no `localStorage`.
- Funções sugeridas:
  - `saveToLocalStorage(key: string, value: object): void`
  - `loadFromLocalStorage<T>(key: string): T | null`

### `src/utils/schemas.ts`
- Criar `flowSchema = z.object({ nodes: z.array(nodeSchema), edges: z.array(edgeSchema) })`.

### `src/app/Layout.tsx` (ou componente principal)
- Adicionar dois botões:
  - “💾 Salvar”
  - “📂 Carregar”
- Ligar cada botão às funções do store.

---

## 4) Regras de negócio detalhadas
1. **Salvar** deve substituir sempre a chave `flow-builder-state`.
2. **Carregar** deve limpar estado atual antes de restaurar.
3. **Fluxo vazio**:
   - Se não houver nada salvo, “Carregar” deve exibir aviso (“Nenhum fluxo encontrado”).
4. **Dados inválidos**:
   - Se `localStorage` contiver JSON inválido, limpar chave e mostrar erro.
5. **Compatibilidade futura**:
   - Estrutura salva deve permitir evoluções (ex.: incluir `version: 1` no JSON).

---

## 5) Aceitação (testes manuais)
- Criar um fluxo simples (Start → Message → End).
- Clicar **Salvar** → deve guardar no `localStorage`.
- Deletar manualmente todos os nós no canvas.
- Clicar **Carregar** → fluxo anterior deve reaparecer.
- Alterar JSON manualmente no `localStorage` para inválido → Carregar deve exibir erro e não quebrar a aplicação.
- Habilitar auto-save:
  - Mover um nó → recarregar página → posição atual deve ser restaurada.

---

## 6) Critérios de Done (DoD)
- Botões “Salvar” e “Carregar” funcionam.
- Estado salvo no `localStorage` com chave `flow-builder-state`.
- JSON validado antes de carregar.
- Fluxos restaurados com sucesso após recarregar.
- (Opcional) Auto-save funcionando de forma transparente.

---
