import FlowCanvasWrapper from "./flow/FlowCanvasWrapper";
import LeftPalette from "./flow/LeftPalette";
import RightInspector from "./flow/RightInspector";
import { useFlowStore } from "./store/useFlowStore";

function App() {
  const { saveFlow, loadFlow, autoSave, setAutoSave } = useFlowStore();
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 8, borderBottom: "1px solid #eee" }}>
        <button onClick={() => { saveFlow(); alert("Fluxo salvo."); }} style={btnPrimary}>💾 Salvar</button>
        <button onClick={() => { const res = loadFlow(); alert(res.message); }} style={btnPrimary}>📂 Carregar</button>
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
    </div>
  );
}

export default App;

const btnPrimary: React.CSSProperties = { border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 10px", background: "#EEF2FF", cursor: "pointer", fontSize: 13 };
