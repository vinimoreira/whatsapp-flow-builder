import React from "react";
import { useFlowStore } from "../store/useFlowStore";
import { toExecutionJson } from "../flow/exporters/toExecutionJson";
import { validateFlow } from "../flow/validators/validateFlow";
import { flowSchema } from "../utils/schemas";
import { fromBackendFlowJson } from "../flow/importers/fromBackendFlowJson";

export default function TopBar() {
  const { saveFlow, loadFlow, autoSave, setAutoSave, nodes, edges, setNodes, setEdges } = useFlowStore();
  const [exportOpen, setExportOpen] = React.useState(false);
  const [exportText, setExportText] = React.useState<string>("");
  const [validationOpen, setValidationOpen] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState<string[]>([]);
  const [validationWarnings, setValidationWarnings] = React.useState<string[]>([]);
  const [importOpen, setImportOpen] = React.useState(false);
  const [importText, setImportText] = React.useState<string>("");
  const [importError, setImportError] = React.useState<string | null>(null);

  const onExport = () => {
    const res = validateFlow(nodes, edges);
    setValidationErrors(res.errors);
    setValidationWarnings(res.warnings);
    if (res.errors.length > 0) {
      setValidationOpen(true);
      return;
    }
    try {
      const obj = toExecutionJson(nodes, edges);
      const txt = JSON.stringify(obj, null, 2);
      setExportText(txt);
      setExportOpen(true);
    } catch (e: any) {
      alert(e?.message || "Falha ao exportar");
    }
  };

  const getDefaultImportJson = () => {
    const flowObject = [
      {
        "Id": 1,
        "Type": 3,
        "Startup": true,
        "Description": "Menu inicial",
        "Messages": [
          { "Order": 1, "Text": "Olá! Sou sua assistente virtual.", "Type": "text" },
          { "Order": 2, "Text": "Como posso ajudar hoje?", "Type": "text" },
          { "Order": 3, "Text": "1 - Consultar cadastro\n2 - Simular crédito\n9 - Falar com atendente", "Type": "text" }
        ],
        "Failures": [
          {
            "ErrorCode": "option.not.found",
            "ErrorMessage": ["Opção inválida. Digite 1, 2 ou 9."],
            "MaxRetries": 3,
            "ReturnToPreviousState": false,
            "IgnoreErrorMessage": false,
            "FlowItemWhenMaxRetriesExceeded": 99
          }
        ],
        "NextFlow": {
          "Options": [
            { "Conditions": [ { "Source": "input", "Comparison": 2, "Values": ["1"] } ], "FlowItemId": 2 },
            { "Conditions": [ { "Source": "input", "Comparison": 2, "Values": ["2"] } ], "FlowItemId": 10 },
            { "Conditions": [ { "Source": "input", "Comparison": 2, "Values": ["9"] } ], "FlowItemId": 90 }
          ]
        },
        "Metadata": null,
        "OutputActions": null,
        "RequestContent": null,
        "ResponseContent": null,
        "TopicName": null,
        "SubscriptionName": null,
        "SubscriptionTopicName": null
      },
      {
        "Id": 2,
        "Type": 1,
        "Startup": false,
        "Description": "Perguntar CPF",
        "Messages": [
          { "Order": 1, "Text": "Informe seu CPF (apenas números):", "Type": "text" }
        ],
        "Failures": [
          {
            "ErrorCode": "cpf.invalid",
            "ErrorMessage": ["CPF inválido. Tente novamente."],
            "MaxRetries": 3,
            "ReturnToPreviousState": false,
            "IgnoreErrorMessage": false,
            "FlowItemWhenMaxRetriesExceeded": 1
          }
        ],
        "NextFlow": {
          "Options": [
            { "Conditions": [{ "Source": "input", "Comparison": 1 }], "FlowItemId": 3 }
          ]
        },
        "Metadata": null,
        "OutputActions": null,
        "RequestContent": null,
        "ResponseContent": null,
        "TopicName": null,
        "SubscriptionName": null,
        "SubscriptionTopicName": null
      },
      {
        "Id": 3,
        "Type": 2,
        "Startup": false,
        "Description": "Consultar cooperado por CPF (assíncrono)",
        "Messages": null,
        "Failures": [
          {
            "ErrorCode": "record.not.found",
            "ErrorMessage": [],
            "MaxRetries": 0,
            "ReturnToPreviousState": false,
            "IgnoreErrorMessage": true,
            "FlowItemWhenMaxRetriesExceeded": 5
          }
        ],
        "NextFlow": {
          "Options": [
            { "Conditions": [{ "Source": "context.question.3.id", "Comparison": 1 }], "FlowItemId": 4 },
            { "Conditions": [{ "Source": "context.question.3.id", "Comparison": 4 }], "FlowItemId": 5 }
          ]
        },
        "RequestContent": {
          "CPF": "context.question.2",
          "UsuarioId": "conversation.userId"
        },
        "ResponseContent": {},
        "TopicName": "chatbot_consultar_cooperado",
        "SubscriptionName": "chatbot",
        "SubscriptionTopicName": "chatbot_consultar_cooperado_result",
        "Metadata": null,
        "OutputActions": null
      },
      {
        "Id": 4,
        "Type": 1,
        "Startup": false,
        "Description": "Cadastro encontrado",
        "Messages": [
          { "Order": 1, "Text": "Cadastro localizado! Nome: {{question.3.nome}}", "Type": "template" }
        ],
        "NextFlow": {
          "Options": [ { "Conditions": [ { "Source": "input", "Comparison": 3 } ], "FlowItemId": 10 } ]
        },
        "Metadata": null,
        "RequestContent": null,
        "ResponseContent": null,
        "OutputActions": null,
        "TopicName": null,
        "SubscriptionName": null,
        "SubscriptionTopicName": null
      },
      {
        "Id": 5,
        "Type": 1,
        "Startup": false,
        "Description": "Cadastro não encontrado",
        "Messages": [
          { "Order": 1, "Text": "Não encontrei seu cadastro. Deseja tentar novamente mais tarde.", "Type": "text" }
        ],
        "NextFlow": {
          "Options": [ { "Conditions": [ { "Source": "input", "Comparison": 3 } ], "FlowItemId": 99 } ]
        },
        "Metadata": null,
        "RequestContent": null,
        "ResponseContent": null,
        "OutputActions": null,
        "TopicName": null,
        "SubscriptionName": null,
        "SubscriptionTopicName": null
      },
      {
        "Id": 10,
        "Type": 3,
        "Startup": false,
        "Description": "Menu de produtos",
        "Messages": [
          { "Order": 1, "Text": "1 - Simular crédito pessoal\n2 - Limite de crédito\n9 - Voltar ao atendente", "Type": "text" }
        ],
        "Failures": [
          {
            "ErrorCode": "option.not.found",
            "ErrorMessage": ["Opção inválida. Digite 1, 2 ou 9."],
            "MaxRetries": 3,
            "ReturnToPreviousState": false,
            "IgnoreErrorMessage": false,
            "FlowItemWhenMaxRetriesExceeded": 99
          }
        ],
        "NextFlow": {
          "Options": [
            { "Conditions": [ { "Source": "input", "Comparison": 2, "Values": ["1"] } ], "FlowItemId": 11 },
            { "Conditions": [ { "Source": "input", "Comparison": 2, "Values": ["2"] } ], "FlowItemId": 20 },
            { "Conditions": [ { "Source": "input", "Comparison": 2, "Values": ["9"] } ], "FlowItemId": 90 }
          ]
        },
        "Metadata": null,
        "RequestContent": null,
        "ResponseContent": null,
        "OutputActions": null,
        "TopicName": null,
        "SubscriptionName": null,
        "SubscriptionTopicName": null
      },
      {
        "Id": 11,
        "Type": 1,
        "Startup": false,
        "Description": "Perguntar valor da simulação",
        "Messages": [
          { "Order": 1, "Text": "Informe o valor desejado (mínimo R$ 100):", "Type": "text" }
        ],
        "NextFlow": {
          "Options": [
            { "Conditions": [ { "Source": "input", "Comparison": 11, "Values": ["99"] } ], "FlowItemId": 11 },
            { "Conditions": [ { "Source": "input", "Comparison": 10, "Values": ["100"] } ], "FlowItemId": 12 }
          ]
        },
        "Metadata": null,
        "RequestContent": null,
        "ResponseContent": null,
        "OutputActions": null,
        "TopicName": null,
        "SubscriptionName": null,
        "SubscriptionTopicName": null
      },
      {
        "Id": 12,
        "Type": 2,
        "Startup": false,
        "Description": "Simular proposta (assíncrono)",
        "Messages": null,
        "NextFlow": {
          "Options": [ { "Conditions": [ { "Source": "input", "Comparison": 3 } ], "FlowItemId": 13 } ]
        },
        "RequestContent": {
          "CPF": "context.question.2",
          "ValorSolicitado": "context.question.11",
          "UsuarioId": "conversation.userId"
        },
        "ResponseContent": {},
        "TopicName": "chatbot_simular_proposta",
        "SubscriptionName": "chatbot",
        "SubscriptionTopicName": "chatbot_simular_proposta_result",
        "Metadata": null,
        "OutputActions": null
      },
      {
        "Id": 13,
        "Type": 1,
        "Startup": false,
        "Description": "Apresentar proposta e perguntar próximo passo",
        "Messages": [
          { "Order": 1, "Text": "Resultado da simulação: valor {{question.12.valorAprovado}}, parcelas {{question.12.qtdParcelas}}.", "Type": "template" },
          { "Order": 2, "Text": "1 - Confirmar e abrir ticket\n2 - Refazer a simulação", "Type": "text" }
        ],
        "Failures": [
          {
            "ErrorCode": "option.not.found",
            "ErrorMessage": [ "Opção inválida. Digite 1 ou 2." ],
            "MaxRetries": 3,
            "ReturnToPreviousState": false,
            "IgnoreErrorMessage": false,
            "FlowItemWhenMaxRetriesExceeded": 99
          }
        ],
        "NextFlow": {
          "Options": [
            { "Conditions": [ { "Source": "input", "Comparison": 2, "Values": ["1"] } ], "FlowItemId": 14 },
            { "Conditions": [ { "Source": "input", "Comparison": 2, "Values": ["2"] } ], "FlowItemId": 10 }
          ]
        },
        "Metadata": null,
        "RequestContent": null,
        "ResponseContent": null,
        "OutputActions": null,
        "TopicName": null,
        "SubscriptionName": null,
        "SubscriptionTopicName": null
      },
      {
        "Id": 14,
        "Type": 5,
        "Startup": false,
        "Description": "Abrir ticket de suporte",
        "Messages": null,
        "NextFlow": {
          "Options": [ { "Conditions": [ { "Source": "input", "Comparison": 3 } ], "FlowItemId": 15 } ]
        },
        "RequestContent": {
          "CPF": "context.question.2",
          "ValorAprovado": "context.question.12.valorAprovado",
          "UsuarioId": "conversation.userId"
        },
        "ResponseContent": {},
        "TopicName": "chatbot_criar_ticket",
        "SubscriptionName": "chatbot",
        "SubscriptionTopicName": "chatbot_criar_ticket_result",
        "Metadata": null,
        "OutputActions": null
      },
      {
        "Id": 15,
        "Type": 1,
        "Startup": false,
        "Description": "Confirmação de ticket e encerramento",
        "Messages": [
          { "Order": 1, "Text": "Ticket criado com sucesso! Número {{question.14.ticketId}}.", "Type": "template" },
          { "Order": 2, "Text": "Encerrando atendimento. Obrigado!", "Type": "text" }
        ],
        "NextFlow": {
          "Options": [ { "Conditions": [ { "Source": "input", "Comparison": 3 } ], "FlowItemId": 99 } ]
        },
        "Metadata": null,
        "RequestContent": null,
        "ResponseContent": null,
        "OutputActions": null,
        "TopicName": null,
        "SubscriptionName": null,
        "SubscriptionTopicName": null
      },
      {
        "Id": 20,
        "Type": 1,
        "Startup": false,
        "Description": "Limite de crédito indisponível",
        "Messages": [
          { "Order": 1, "Text": "Consulta de limite de crédito indisponível no momento.", "Type": "text" }
        ],
        "NextFlow": { "Options": [ { "Conditions": [ { "Source": "input", "Comparison": 3 } ], "FlowItemId": 99 } ] },
        "Metadata": null,
        "RequestContent": null,
        "ResponseContent": null,
        "OutputActions": null,
        "TopicName": null,
        "SubscriptionName": null,
        "SubscriptionTopicName": null
      },
      {
        "Id": 90,
        "Type": 7,
        "Startup": false,
        "Description": "Encaminhar para atendente (proxy)",
        "Messages": [
          { "Order": 1, "Text": "Transferindo para um atendente humano. Aguarde um instante…", "Type": "text" }
        ],
        "NextFlow": {
          "Options": [ { "Conditions": [ { "Source": "input", "Comparison": 3 } ], "FlowItemId": 99 } ]
        },
        "Metadata": null,
        "RequestContent": null,
        "ResponseContent": null,
        "OutputActions": null,
        "TopicName": null,
        "SubscriptionName": null,
        "SubscriptionTopicName": null
      },
      {
        "Id": 99,
        "Type": 6,
        "Startup": false,
        "Description": "Encerrar conversa",
        "Messages": [
          { "Order": 1, "Text": "Atendimento encerrado. Até logo!", "Type": "text" }
        ],
        "NextFlow": null,
        "Metadata": null,
        "OutputActions": null,
        "RequestContent": null,
        "ResponseContent": null,
        "TopicName": null,
        "SubscriptionName": null,
        "SubscriptionTopicName": null
      }
    ];
    return JSON.stringify(flowObject, null, 2);
  };

  const onOpenImportModal = () => {
    setImportError(null);
    setImportText(getDefaultImportJson());
    setImportOpen(true);
  };

  const onLoadFromJson = () => {
    setImportError(null);
    let parsedObject: any;

    try {
      // The importer function handles JSONC parsing internally
      const { nodes, edges, meta } = fromBackendFlowJson(importText);
      setNodes(nodes);
      setEdges(edges);
      if (meta.warnings && meta.warnings.length > 0) {
        alert("Avisos durante a importação:\n- " + meta.warnings.join("\n- "));
      }
      setImportOpen(false);
    } catch (e: any) {
      // Fallback for old format
      try {
        parsedObject = JSON.parse(importText);
        const parsed = flowSchema.safeParse(parsedObject);
        if (parsed.success) {
          setNodes(parsed.data.nodes as any);
          setEdges(parsed.data.edges as any);
          setImportOpen(false);
        } else {
          setImportError("Formato de JSON inválido. O importador aceita o formato de fluxo do backend ou o formato de UI {nodes, edges}.");
        }
      } catch (e2: any) {
        setImportError("JSON inválido: " + (e2?.message || "Erro ao fazer parse"));
      }
    }
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 8, borderBottom: "1px solid #eee" }}>
        <button onClick={() => { if (confirm("Iniciar um novo fluxo? Isso limpará nós e conexões.")) { setNodes([] as any); setEdges([] as any); } }} style={btnPrimary}>🆕 Novo</button>
        <button onClick={() => { saveFlow(); alert("Fluxo salvo."); }} style={btnPrimary}>💾 Salvar</button>
        <button onClick={() => { const res = loadFlow(); alert(res.message); }} style={btnPrimary}>📂 Carregar</button>
        <button onClick={onOpenImportModal} style={btnPrimary}>📥 Importar JSON</button>
        <button onClick={onExport} style={btnPrimary}>📤 Exportar JSON</button>
        <label style={{ marginLeft: 8, fontSize: 12, color: "#374151", display: "inline-flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={autoSave} onChange={(e) => setAutoSave(e.target.checked)} />
          Auto-save
        </label>
      </div>

      {exportOpen && (
        <div style={modalBackdrop} onClick={() => setExportOpen(false)}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <strong>JSON de Execução</strong>
              <button onClick={() => setExportOpen(false)} style={btnPrimary}>Fechar</button>
            </div>
            <textarea readOnly value={exportText} style={{ width: "100%", height: 300, fontFamily: "monospace", fontSize: 12 }} />
            <div style={{ marginTop: 8 }}>
              <button onClick={() => { navigator.clipboard?.writeText(exportText); }} style={btnPrimary}>Copiar</button>
              <button onClick={() => downloadJson(exportText)} style={{ ...btnPrimary, marginLeft: 8 }}>Baixar .json</button>
            </div>
          </div>
        </div>
      )}

      {validationOpen && (
        <div style={modalBackdrop} onClick={() => setValidationOpen(false)}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <strong>Problemas de Validação</strong>
              <button onClick={() => setValidationOpen(false)} style={btnPrimary}>Fechar</button>
            </div>
            {validationErrors.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Erros</div>
                <ul>
                  {validationErrors.map((e, i) => (
                    <li key={i} style={{ color: "#991B1B" }}>• {e}</li>
                  ))}
                </ul>
              </div>
            )}
            {validationWarnings.length > 0 && (
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Avisos</div>
                <ul>
                  {validationWarnings.map((w, i) => (
                    <li key={i} style={{ color: "#92400E" }}>• {w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {importOpen && (
        <div style={modalBackdrop} onClick={() => setImportOpen(false)}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <strong>Importar Fluxo (JSON)</strong>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setImportOpen(false)} style={btnPrimary}>Cancelar</button>
                <button onClick={onLoadFromJson} style={btnPrimary}>Carregar</button>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#374151", marginBottom: 6 }}>Cole o JSON do fluxo de execução do backend.</div>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              style={{ width: "100%", height: 400, fontFamily: "monospace", fontSize: 12 }}
            />
            {importError && (
              <div style={{ color: "#991B1B", marginTop: 8 }}>{importError}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const btnPrimary: React.CSSProperties = { border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 10px", background: "#EEF2FF", cursor: "pointer", fontSize: 13 };
const modalBackdrop: React.CSSProperties = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 9999 };
const modalContent: React.CSSProperties = { background: "#fff", borderRadius: 8, padding: 12, width: 700, maxWidth: "90vw", boxShadow: "0 10px 30px rgba(0,0,0,0.2)", zIndex: 10000 };

function downloadJson(text: string) {
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "flow.json";
  a.click();
  URL.revokeObjectURL(url);
}