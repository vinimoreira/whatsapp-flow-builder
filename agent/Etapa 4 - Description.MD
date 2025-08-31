Objetivo: definir os tipos de nós (com entradas/saídas — handles), os dados mínimos de cada um e como eles serão registrados no React Flow. Mantemos tudo simples para a POC, já preparando o terreno para o Inspector (etapa 6).

1) Tipos de nós e seus dados mínimos
Tipo	Finalidade	Campos mínimos (data)
Start	Ponto inicial do fluxo	title
Message	Enviar texto/mídia	title, text, mediaUrl?
Question	Capturar escolha por botões (quick replies)	title, prompt, options: Array<{id: string; label: string}>
Condition	Desviar fluxo por regra	title, expression (string a ser avaliada no back)
Delay	Espera entre passos	title, ms (milissegundos)
API	Chamada HTTP para buscar dados	title, url, method, headers?, bodyTemplate?
End	Encerrar fluxo	title

Regras úteis:
• Question: as opções serão “ligadas” às arestas via label da aresta (ex.: “Sim”, “Não”).
• Condition: assuma binário no MVP — true / false (mapeados por rótulo de aresta).

2) Handles (entradas/saídas) por tipo
Tipo	Handles de entrada	Handles de saída	Observações
Start	0	1 (Right)	Apenas um Start permitido no fluxo
Message	1 (Left)	1 (Right)	Fluxo linear
Question	1 (Left)	1 (Right)	Terá várias arestas de saída, diferenciadas pelo label
Condition	1 (Left)	2 (Right)	Use rótulos de aresta “true” e “false”
Delay	1 (Left)	1 (Right)	—
API	1 (Left)	1 (Right)	(opcional no futuro: saída “erro”)
End	1 (Left)	0	—

Mesmo a Question tendo várias saídas lógicas, mantenha um único handle de saída e diferencie as transições pelo label das arestas (mais simples na POC e suficiente).

3) Estratégia de implementação (passos)

Criar componentes de nó (um por tipo) com visual simples (título e ícone/texto breve) e seus handles.

Não coloque inputs de formulário dentro do nó (edição acontecerá no Inspector).

Use borda, cor e ícone diferentes por tipo (ajuda a leitura do cliente).

Registro no React Flow:

Criar um objeto nodeTypes com { start: StartNode, message: MessageNode, ... }.

Passar nodeTypes={nodeTypes} no <ReactFlow ...> (no FlowCanvas).

Defaults de dados:

Centralizar defaults em um único lugar (ex.: utils/defaults.ts) para reuso no onDrop e para “Gerar Exemplo”.

Governança básica (desde já):

Start único: impedir drop de novo Start caso já exista.

End alcançável: não precisa validar agora, mas mantenha em mente para a etapa 9 (validação).

Edge labels coerentes:

Question: labels devem bater com opções (ex.: “Sim”, “Não”).

Condition: use exatamente “true” e “false” no MVP (ou traduções consistentes).

4) UX mínima dentro do nó (sem formulário)

Header com ícone + data.title (ex.: “Question”, “API”).

Badges úteis (ex.: API mostra GET/POST; Delay mostra ms).

Tooltip simples: Condition pode mostrar expression como dica.

Isso dá um “ar” profissional sem criar complexidade agora.

5) Integração com a paleta (etapa 3)

Ao soltar um item da paleta no canvas: criar o node com:

id (UUID),

type (ex.: "question"),

position (usando reactFlow.project),

data com defaults do tipo.

O ReactFlow renderiza usando seu nodeTypes.

6) Critérios de aceitação (testes manuais)

 Consigo arrastar qualquer tipo da paleta e ver um nó com visual adequado.

 Handles de entrada/saída corretos por tipo.

 Start não permite duplicação (ou aparece um aviso/ignora).

 Consigo conectar nós; as arestas aparecem com seta e label: "next" por padrão.

 Visual dos nós é consistente (títulos, bordas, pequenas diferenças por tipo).

7) Pitfalls comuns (e como evitar)

Esquecer nodeTypes no ReactFlow: os nós aparecem no visual padrão (ok, mas menos claro).

Múltiplos Starts: bloqueie cedo (o cliente percebe).

Question sem rótulos: sempre edite o label das arestas para refletir a opção.

Condition sem 2 saídas: lembre de conectar true e false (validaremos na etapa 9).

Estilo confuso: um header simples com cor/badge já melhora muito.