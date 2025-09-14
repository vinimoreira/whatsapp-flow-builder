import React from "react";
import { useFlowStore } from "../store/useFlowStore";
import { toExecutionJson } from "../flow/exporters/toExecutionJson";
import { validateFlow } from "../flow/validators/validateFlow";
import { flowSchema } from "../utils/schemas";

export default function TopBar() {
  const { saveFlow, loadFlow, autoSave, setAutoSave, nodes, edges, setNodes, setEdges } = useFlowStore();
  const [exportOpen, setExportOpen] = React.useState(false);
  const [exportText, setExportText] = React.useState<string>("");
  const [validationOpen, setValidationOpen] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState<string[]>([]);
  const [validationWarnings, setValidationWarnings] = React.useState<string[]>([]);
  const [testOpen, setTestOpen] = React.useState(false);
  const [testText, setTestText] = React.useState<string>("");
  const [testError, setTestError] = React.useState<string | null>(null);

  const onExport = () => {
    const res = validateFlow(nodes, edges);
    setValidationErrors(res.errors);
    setValidationWarnings(res.warnings);
    if (!res.valid) {
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

  const getDefaultInitialJson = () => {
    const payload = {
      version: 1,
      nodes: [
        { id: "start-1", type: "start", position: { x: 80, y: 160 }, data: { title: "Start" } },
        { id: "text-1", type: "text", position: { x: 260, y: 160 }, data: { title: "Texto", description: "Olá! Eu sou seu assistente 🤖. Como posso ajudar?" } },
        { id: "options-1", type: "options", position: { x: 480, y: 160 }, data: { title: "Opções", options: [ { id: "opt1", label: "Informações" }, { id: "opt2", label: "Falar com suporte" } ] } },
        { id: "bg-1", type: "backgroundProcess", position: { x: 720, y: 80 }, data: { title: "Processo", description: "Executa em segundo plano", subscriptionName: "", subscriptionTopicName: "", topicName: "", metadata: {}, requestContent: {}, responseContent: {}, startup: false } },
        { id: "redirect-1", type: "redirect", position: { x: 940, y: 80 }, data: { title: "Redirecionar", flowId: "outro-fluxo" } },
        { id: "proxy-1", type: "proxy", position: { x: 1160, y: 80 }, data: { title: "Proxy", endpoint: "https://proxy.seuservico.com/rota", method: "POST" } },
        { id: "support-1", type: "supportTicket", position: { x: 720, y: 240 }, data: { title: "Ticket de Suporte", department: "Atendimento", priority: "Alta" } },
        { id: "message-1", type: "message", position: { x: 1380, y: 80 }, data: { title: "Message", text: "Aqui estão mais detalhes…" } },
        { id: "question-1", type: "question", position: { x: 1600, y: 80 }, data: { title: "Question", prompt: "Está tudo certo?", options: [ { id: "yes", label: "Sim" }, { id: "no", label: "Não" } ] } },
        { id: "condition-1", type: "condition", position: { x: 1820, y: 80 }, data: { title: "Condition", expression: "ctx.ok === true" } },
        { id: "delay-1", type: "delay", position: { x: 2040, y: 30 }, data: { title: "Delay", ms: 1000 } },
        { id: "api-1", type: "api", position: { x: 2260, y: 30 }, data: { title: "API", url: "https://api.example.com", method: "GET" } },
        { id: "endconv-1", type: "endConversation", position: { x: 2480, y: 30 }, data: { title: "Encerrar Conversa", description: "", subscriptionName: "", subscriptionTopicName: "", topicName: "", metadata: {}, requestContent: {}, responseContent: {}, startup: false } },
        { id: "end-1", type: "end", position: { x: 2040, y: 140 }, data: { title: "End" } },
      ],
      edges: [
        { id: "e-start-text", source: "start-1", target: "text-1", label: "next", type: "smoothstep" },
        { id: "e-text-options", source: "text-1", target: "options-1", label: "next", type: "smoothstep" },
        // Opções: cada aresta deve usar o id da opção
        { id: "e-options-bg", source: "options-1", target: "bg-1", label: "opt1", type: "smoothstep" },
        { id: "e-options-support", source: "options-1", target: "support-1", label: "opt2", type: "smoothstep" },
        // Caminho principal via bg -> redirect -> proxy -> message -> question -> condition
        { id: "e-bg-redirect", source: "bg-1", target: "redirect-1", label: "next", type: "smoothstep" },
        { id: "e-redirect-proxy", source: "redirect-1", target: "proxy-1", label: "next", type: "smoothstep" },
        { id: "e-proxy-message", source: "proxy-1", target: "message-1", label: "next", type: "smoothstep" },
        { id: "e-message-question", source: "message-1", target: "question-1", label: "next", type: "smoothstep" },
        { id: "e-support-message", source: "support-1", target: "message-1", label: "next", type: "smoothstep" },
        // Da pergunta para condição: cada aresta usa ids yes/no
        { id: "e-question-condition-yes", source: "question-1", target: "condition-1", label: "yes", type: "smoothstep" },
        { id: "e-question-condition-no", source: "question-1", target: "condition-1", label: "no", type: "smoothstep" },
        // Condition com dois ramos: true -> delay -> api -> endConversation ; false -> end
        { id: "e-cond-delay", source: "condition-1", sourceHandle: "true", target: "delay-1", label: "true", type: "smoothstep" },
        { id: "e-delay-api", source: "delay-1", target: "api-1", label: "next", type: "smoothstep" },
        { id: "e-api-endconv", source: "api-1", target: "endconv-1", label: "next", type: "smoothstep" },
        { id: "e-cond-end", source: "condition-1", sourceHandle: "false", target: "end-1", label: "false", type: "smoothstep" },
      ],
    };
    return JSON.stringify(payload, null, 2);
  };

  const onOpenTestModal = () => {
    setTestError(null);
    setTestText(getDefaultInitialJson());
    setTestOpen(true);
  };

  const onLoadFromJson = () => {
    setTestError(null);
    let obj: any;
    try {
      obj = JSON.parse(testText);
    } catch (e: any) {
      setTestError("JSON inválido: " + (e?.message || "Erro ao fazer parse"));
      return;
    }
    const parsed = flowSchema.safeParse(obj);
    if (!parsed.success) {
      setTestError("Formato inválido. Esperado: { version?, nodes: [], edges: [] }.");
      return;
    }
    setNodes(parsed.data.nodes as any);
    setEdges(parsed.data.edges as any);
    setTestOpen(false);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 8, borderBottom: "1px solid #eee" }}>
        <button onClick={() => { saveFlow(); alert("Fluxo salvo."); }} style={btnPrimary}>💾 Salvar</button>
        <button onClick={() => { const res = loadFlow(); alert(res.message); }} style={btnPrimary}>📂 Carregar</button>
        <button onClick={onExport} style={btnPrimary}>📤 Exportar JSON</button>
        <button onClick={onOpenTestModal} style={btnPrimary}>🧪 Teste</button>
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
            {validationErrors.length === 0 && (
              <div style={{ color: "#065F46" }}>Sem erros. Você pode exportar agora.</div>
            )}
          </div>
        </div>
      )}

      {testOpen && (
        <div style={modalBackdrop} onClick={() => setTestOpen(false)}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <strong>Colar JSON do Fluxo</strong>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setTestOpen(false)} style={btnPrimary}>Cancelar</button>
                <button onClick={onLoadFromJson} style={btnPrimary}>Carregar</button>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#374151", marginBottom: 6 }}>Cole o JSON no formato salvo/exportado. Um exemplo completo já está preenchido.</div>
            <textarea
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              style={{ width: "100%", height: 300, fontFamily: "monospace", fontSize: 12 }}
            />
            {testError && (
              <div style={{ color: "#991B1B", marginTop: 8 }}>{testError}</div>
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
