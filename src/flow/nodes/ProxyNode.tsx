import React from "react";
import { Handle, Position } from "reactflow";
import { useFlowStore } from "../../store/useFlowStore";

export default function ProxyNode({ id, data }: any) {
  const { updateNodeData } = useFlowStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState<string>(data?.title || "Proxy");
  const [endpoint, setEndpoint] = React.useState<string>(String(data?.endpoint || ""));
  const [method, setMethod] = React.useState<string>(String(data?.method || "GET"));

  React.useEffect(() => {
    setTitle(data?.title || "Proxy");
    setEndpoint(String(data?.endpoint || ""));
    setMethod(String(data?.method || "GET"));
  }, [data?.title, data?.endpoint, data?.method]);

  const save = () => { updateNodeData(id, { title, endpoint, method }); setIsEditing(false); };
  const cancel = () => { setTitle(data?.title || "Proxy"); setEndpoint(String(data?.endpoint || "")); setMethod(String(data?.method || "GET")); setIsEditing(false); };

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
          minWidth: 280,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span role="img" aria-label="proxy" style={{ fontSize: 14 }}>☁️</span>
          {!isEditing ? (
            <strong style={{ fontSize: 13 }}>{data?.title || "Proxy"}</strong>
          ) : (
            <input value={title} onChange={(e) => setTitle(e.target.value)} style={input} />
          )}
          {!isEditing && method && (
            <span style={{ marginLeft: "auto", fontSize: 11, border: "1px solid #e5e7eb", borderRadius: 6, padding: "1px 6px", background: "#f9fafb", color: "#374151" }}>{method}</span>
          )}
          {!isEditing && <button onClick={() => setIsEditing(true)} style={iconBtn}>✏️</button>}
        </div>
        {!isEditing ? (
          endpoint && <div style={{ fontSize: 12, color: "#374151" }}>{endpoint}</div>
        ) : (
          <div style={{ display: "grid", gap: 6 }}>
            <input value={endpoint} onChange={(e) => setEndpoint(e.target.value)} placeholder="Endpoint" style={input} />
            <select value={method} onChange={(e) => setMethod(e.target.value)} style={input as any}>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={save} style={primaryBtn}>Salvar</button>
              <button onClick={cancel} style={ghostBtn}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const input: React.CSSProperties = { fontSize: 12, border: "1px solid #d1d5db", borderRadius: 6, padding: "4px 6px", width: "100%" };
const iconBtn: React.CSSProperties = { marginLeft: "auto", fontSize: 12, padding: "2px 6px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#f9fafb", cursor: "pointer" };
const primaryBtn: React.CSSProperties = { fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #2563EB", background: "#3B82F6", color: "#fff", cursor: "pointer" };
const ghostBtn: React.CSSProperties = { fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", color: "#111", cursor: "pointer" };
