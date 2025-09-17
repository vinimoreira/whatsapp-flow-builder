# Proposta

# 📝 Proposta de Desenvolvimento: Construtor de Fluxo de Chatbot

> Visão Geral: Criar uma interface visual para a construção de fluxos de conversa do chatbot, permitindo a criação, visualização e edição de jornadas de interação de forma intuitiva.
> 

---

## 🎯 Objetivos Principais

- **✨ Facilidade de Uso:** Ferramenta de "arrastar e soltar" para que qualquer pessoa possa criar fluxos.
- **👓 Clareza Visual:** Uma visão clara e organizada de todo o fluxo de conversa.
- **✏️ Edição Rápida:** Edição e configuração simplificada de cada passo do fluxo.
- **🚀 Integração Total:** Exportação dos fluxos para a plataforma de chatbot existente.

---

## 📦 Entregáveis Principais

### 1. 🎨 Interface do Construtor de Fluxo (Estilo Typebot)

- **Canvas Centralizado:** Uma área de trabalho limpa e focada no fluxo.
- **Nós como Bolhas de Chat:** Nós que se assemelham a balões de conversa para uma experiência mais intuitiva.
- **Menu de Adição Contextual:** Um botão de "+" no fluxo para adicionar novos blocos de forma contextual.

### 2. 🛠️ Funcionalidades de Edição "In-place"

- **Edição no Local:** Clicar em um nó abrirá um painel de edição diretamente no canvas.
- **Conexões Inteligentes:** A capacidade de conectar os blocos para definir a lógica e a ordem da conversa.

### 3. 📤 Exportação e Gerenciamento do Fluxo

- **Barra de Ações Superior:** Uma barra no topo da tela para salvar, carregar e exportar o fluxo.
- **Função de Exportação:** Um botão para salvar o fluxo em um formato compatível com a plataforma.

### 4. 🧰 API/Backend – CRUD de Flow

- **Endpoints REST (escopo inicial):** `GET /chatbots/flows`, `GET /chatbots/flows/{id}`, `POST /chatbots/flows`, `PUT /chatbots/flows/{id}`, `DELETE /chatbots/flows/{id}` e `POST /chatbots/flows/{id}/publish` (opcional).
- **Salvar Estrutura do Canvas:** A interface visual envia o fluxo completo (flow + itens + opções) em JSON para criação/edição.
- **Persistência:** Mapeamento para as entidades existentes (Flow, FlowItem, FlowItemOption) e validação do item inicial (startup).
- **Validações:** Nome, versão, tipos suportados, integridade de passos/conexões, limites de mensagens e ações.
- **Autorização:** Proteção por política interna (mesma base do `ConversationController`).
- **Importação/Exportação:** Suporte a exportar/importar o mesmo JSON utilizado pelo canvas.

---

## 🧱 Tipos de Blocos de Fluxo

- ▶️ **Start (`start`)**
    
    > Ponto de entrada do fluxo. Deve existir exatamente um por fluxo.
    > 
- 💬 **Texto (`text`)**
    
    > Envia uma ou mais mensagens de texto para o usuário. Ideal para saudações e informações.
    > 
- 🔠 **Opções (`options`)**
    
    > Apresenta um menu de opções; cada opção leva a um caminho diferente no fluxo.
    > 
- ⚙️ **Processo em Segundo Plano (`backgroundProcess`)**
    
    > Executa uma ação no sistema sem interação do usuário (ex.: publicar/consumir eventos, processamento interno).
    > 
- ↪️ **Redirecionamento (`redirect`)**
    
    > Envia o usuário para outro fluxo de conversa (por flowId).
    > 
- 🎫 **Ticket de Suporte (`supportTicket`)**
    
    > Cria um ticket para atendimento humano quando necessário.
    > 
- 🏁 **Encerrar Conversa (`endConversation`)**
    
    > Termina a conversa de forma explícita (com mensagem/evento de encerramento).
    > 
- 🔗 **Proxy (`proxy`)**
    
    > Encaminha a requisição para um serviço externo (endpoint + método) e retorna a resposta ao fluxo.
    > 

---

## ⏱️ Estimativa de Esforço por Épico

- **Épico 1: Configuração do Ambiente e Tipos de Dados**
    
    > Estimativa: 4 horas
    > 
- **Épico 2: Interface Visual e Canvas (Estilo Typebot)**
    
    > Estimativa: 24 horas
    > 
- **Épico 3: Paleta de Nós e Nós Customizados (Estilo Bolha de Chat)**
    
    > Estimativa Total: 24 horas
    > 
    - Bloco de Texto (`Text`): 4h
    - Bloco de Opções (`Options`): 6h
    - Bloco de Processo em Segundo Plano (`BackgroundProcess`): 3h
    - Bloco de Redirecionamento (`Redirect`): 2h
    - Bloco de Ticket de Suporte (`SupportTicket`): 3h
    - Bloco de Encerrar Conversa (`EndConversation`): 2h
    - Bloco de Proxy (`Proxy`): 4h
- **Épico 4: Edição "In-place" de Propriedades**
    
    > Estimativa: 32 horas
    > 
- **Épico 5: Menu de Adição Contextual e Conexões**
    
    > Estimativa: 16 horas
    > 
- **Épico 6: Exportação do Fluxo**
    
    > Estimativa: 8 horas
    > 

- **Épico 7: CRUD de Flow (Backend + Salvamento do Canvas)**
    
    > Estimativa: 24 horas
    > 

**Novo Total Estimado:** 132 horas
