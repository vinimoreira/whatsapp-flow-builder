import React from "react";
import { Handle, Position } from "reactflow";
import { useFlowStore } from "../../store/useFlowStore";

export default function RedirectNode({ id, data }: any) {
  const { updateNodeData } = useFlowStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState<string>(data?.title || "Redirecionar");
  const [flowId, setFlowId] = React.useState<string>(data?.flowId || "");

  React.useEffect(() => {
    setTitle(data?.title || "Redirecionar");
    setFlowId(data?.flowId || "");
  }, [data?.title, data?.flowId]);

  const save = () => { updateNodeData(id, { title, flowId }); setIsEditing(false); };
  const cancel = () => { setTitle(data?.title || "Redirecionar"); setFlowId(data?.flowId || ""); setIsEditing(false); };

  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div
        onDoubleClick={() => setIsEditing(true)}
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 10,
          minWidth: 240,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
        title={flowId ? `Fluxo destino: ${flowId}` : undefined}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span role="img" aria-label="redirect" style={{ fontSize: 14 }}>➡️</span>
          {!isEditing ? (
            <strong style={{ fontSize: 13 }}>{data?.title || "Redirecionar"}</strong>
          ) : (
            <input value={title} onChange={(e) => setTitle(e.target.value)} style={input} />
          )}
          {!isEditing && <button onClick={() => setIsEditing(true)} style={iconBtn}>✏️</button>}
        </div>
        {!isEditing ? (
          flowId && <div style={{ marginTop: 6, fontSize: 12, color: "#374151" }}>para: {String(flowId)}</div>
        ) : (
          <div style={{ display: "grid", gap: 6, marginTop: 8 }}>
            <input value={flowId} onChange={(e) => setFlowId(e.target.value)} placeholder="flowId" style={input} />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={save} style={primaryBtn}>Salvar</button>
              <button onClick={cancel} style={ghostBtn}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
      {/* Sem handle de saída: nó terminal que redireciona para outro fluxo */}
    </div>
  );
}

const input: React.CSSProperties = { fontSize: 12, border: "1px solid #d1d5db", borderRadius: 6, padding: "4px 6px", width: "100%" };
const iconBtn: React.CSSProperties = { marginLeft: "auto", fontSize: 12, padding: "2px 6px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#f9fafb", cursor: "pointer" };
const primaryBtn: React.CSSProperties = { fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #2563EB", background: "#3B82F6", color: "#fff", cursor: "pointer" };
const ghostBtn: React.CSSProperties = { fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", color: "#111", cursor: "pointer" };
