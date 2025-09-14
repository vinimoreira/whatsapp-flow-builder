# 📝 Proposta de Desenvolvimento: Construtor de Fluxo de Chatbot

> **Visão Geral:** Criar uma interface visual para a construção de fluxos de conversa do chatbot, permitindo a criação, visualização e edição de jornadas de interação de forma intuitiva.

---

## 🎯 Objetivos Principais

*   **✨ Facilidade de Uso:** Ferramenta de "arrastar e soltar" para que qualquer pessoa possa criar fluxos.
*   **👓 Clareza Visual:** Uma visão clara e organizada de todo o fluxo de conversa.
*   **✏️ Edição Rápida:** Edição e configuração simplificada de cada passo do fluxo.
*   **🚀 Integração Total:** Exportação dos fluxos para a plataforma de chatbot existente.

---

## deliverables Entregáveis Principais

### 1. 🎨 Interface do Construtor de Fluxo (Estilo Typebot)

*   **Canvas Centralizado:** Uma área de trabalho limpa e focada no fluxo.
*   **Nós como Bolhas de Chat:** Nós que se assemelham a balões de conversa para uma experiência mais intuitiva.
*   **Menu de Adição Contextual:** Um botão de "+" no fluxo para adicionar novos blocos de forma contextual.

### 2. 🛠️ Funcionalidades de Edição "In-place"

*   **Edição no Local:** Clicar em um nó abrirá um painel de edição diretamente no canvas.
*   **Conexões Inteligentes:** A capacidade de conectar os blocos para definir a lógica e a ordem da conversa.

### 3. 📤 Exportação e Gerenciamento do Fluxo

*   **Barra de Ações Superior:** Uma barra no topo da tela para salvar, carregar e exportar o fluxo.
*   **Função de Exportação:** Um botão para salvar o fluxo em um formato compatível com a plataforma.

---

## 🧱 Tipos de Blocos de Fluxo

Aqui estão os tipos de blocos que poderão ser usados para construir os fluxos de conversa, baseados nas funcionalidades do sistema existente:

*   💬 **Texto (`Text`)**
    > Envia uma ou mais mensagens de texto para o usuário. Ideal para saudações, informações e perguntas simples.

*   ⚙️ **Processo em Segundo Plano (`BackgroundProcess`)**
    > Executa uma ação no sistema sem que o usuário perceba, como salvar uma informação ou consultar um dado.

*   🔠 **Opções (`Options`)**
    > Apresenta ao usuário um menu de opções para ele escolher. Cada opção pode levar a um caminho diferente no fluxo.

*   ↪️ **Redirecionamento (`Redirect`)**
    > Envia o usuário para um outro fluxo de conversa já existente.

*   🎫 **Ticket de Suporte (`SupportTicket`)**
    > Cria um ticket de suporte para atendimento humano, caso o chatbot não consiga resolver a questão.

*   🏁 **Encerrar Conversa (`EndConversation`)**
    > Finaliza a conversa com o usuário.

*   🔗 **Proxy**
    > Conecta com um serviço externo para buscar ou enviar informações.

---

## ⏱️ Estimativa de Esforço por Épico (Revisada)

A seguir, uma estimativa de alto nível do esforço de desenvolvimento para cada um dos principais épicos do projeto, revisada para refletir a nova interface estilo Typebot. A estimativa é apresentada em horas e serve como uma referência inicial.

*   **Épico 1: Configuração do Ambiente e Tipos de Dados** (Sem alteração)
    > **Estimativa:** 4-8 horas

*   **Épico 2: Interface Visual e Canvas (Estilo Typebot)**
    > **Descrição:** Redesenhar a interface para um canvas centralizado, com uma barra de ações superior.
    > **Estimativa:** 24-32 horas

*   **Épico 3: Paleta de Nós e Nós Customizados (Estilo Bolha de Chat)**
    > **Descrição:** Criar a paleta de nós com todos os tipos de blocos de fluxo e desenvolver a aparência customizada para cada um deles.
    > **Estimativa Total:** 24-40 horas
    > *   **Sub-tarefa: Bloco de Texto (`Text`)**: 4-6 horas
    > *   **Sub-tarefa: Bloco de Opções (`Options`)**: 6-8 horas
    > *   **Sub-tarefa: Bloco de Processo em Segundo Plano (`BackgroundProcess`)**: 3-5 horas
    > *   **Sub-tarefa: Bloco de Redirecionamento (`Redirect`)**: 2-4 horas
    > *   **Sub-tarefa: Bloco de Ticket de Suporte (`SupportTicket`)**: 3-5 horas
    > *   **Sub-tarefa: Bloco de Encerrar Conversa (`EndConversation`)**: 2-4 horas
    > *   **Sub-tarefa: Bloco de Proxy (`Proxy`)**: 4-8 horas

*   **Épico 4: Edição "In-place" de Propriedades**
    > **Descrição:** Implementar a edição de propriedades diretamente no canvas, em vez de um painel lateral.
    > **Estimativa:** 32-40 horas

*   **Épico 5: Menu de Adição Contextual e Conexões**
    > **Descrição:** Desenvolver um menu contextual para adicionar novos nós e a funcionalidade de conexão entre eles.
    > **Estimativa:** 16-24 horas

*   **Épico 6: Exportação do Fluxo** (Sem alteração na lógica)
    > **Descrição:** Criar a funcionalidade para exportar o fluxo criado.
    > **Estimativa:** 8-12 horas

**Novo Total Estimado:** 108-156 horas

---
**Nota:** Esta é uma estimativa preliminar. O tempo real de desenvolvimento pode variar dependendo da complexidade dos requisitos e de eventuais desafios técnicos.

---

## 🗓️ Próximos Passos

> Com a aprovação desta proposta, nossa equipe iniciará o desenvolvimento da interface. Manteremos você atualizado com demonstrações e feedbacks ao longo de todo o processo.
