import React from "react";
import FlowCanvasWrapper from "./flow/FlowCanvasWrapper";
import LeftPalette from "./flow/LeftPalette";
import RightInspector from "./flow/RightInspector";
import { useFlowStore } from "./store/useFlowStore";
import { toExecutionJson } from "./flow/exporters/toExecutionJson";

function App() {
  const { saveFlow, loadFlow, autoSave, setAutoSave, nodes, edges } = useFlowStore();
  const [exportOpen, setExportOpen] = React.useState(false);
  const [exportText, setExportText] = React.useState<string>("");

  const onExport = () => {
    try {
      const obj = toExecutionJson(nodes, edges);
      const txt = JSON.stringify(obj, null, 2);
      setExportText(txt);
      setExportOpen(true);
    } catch (e: any) {
      alert(e?.message || "Falha ao exportar");
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 8, borderBottom: "1px solid #eee" }}>
        <button onClick={() => { saveFlow(); alert("Fluxo salvo."); }} style={btnPrimary}>💾 Salvar</button>
        <button onClick={() => { const res = loadFlow(); alert(res.message); }} style={btnPrimary}>📂 Carregar</button>
        <button onClick={onExport} style={btnPrimary}>📤 Exportar JSON</button>
        <label style={{ marginLeft: 8, fontSize: 12, color: "#374151", display: "inline-flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={autoSave} onChange={(e) => setAutoSave(e.target.checked)} />
          Auto-save
        </label>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 260px", flex: 1 }}>
        <LeftPalette />
        <FlowCanvasWrapper />
        <RightInspector />
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
    </div>
  );
}

export default App;

const btnPrimary: React.CSSProperties = { border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 10px", background: "#EEF2FF", cursor: "pointer", fontSize: 13 };
const modalBackdrop: React.CSSProperties = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 };
const modalContent: React.CSSProperties = { background: "#fff", borderRadius: 8, padding: 12, width: 700, maxWidth: "90vw", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" };

function downloadJson(text: string) {
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "flow.json";
  a.click();
  URL.revokeObjectURL(url);
}
