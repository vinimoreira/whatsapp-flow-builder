import React from "react";
import { Handle, Position } from "reactflow";
import { useFlowStore } from "../../store/useFlowStore";

export default function SupportTicketNode({ id, data }: any) {
  const { updateNodeData } = useFlowStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState<string>(data?.title || "Ticket de Suporte");
  const [department, setDepartment] = React.useState<string>(data?.department || "");
  const [priority, setPriority] = React.useState<string>(data?.priority || "");

  React.useEffect(() => {
    setTitle(data?.title || "Ticket de Suporte");
    setDepartment(data?.department || "");
    setPriority(data?.priority || "");
  }, [data?.title, data?.department, data?.priority]);

  const save = () => { updateNodeData(id, { title, department, priority }); setIsEditing(false); };
  const cancel = () => { setTitle(data?.title || "Ticket de Suporte"); setDepartment(data?.department || ""); setPriority(data?.priority || ""); setIsEditing(false); };

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
          minWidth: 260,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span role="img" aria-label="ticket" style={{ fontSize: 14 }}>🎫</span>
          {!isEditing ? (
            <strong style={{ fontSize: 13 }}>{data?.title || "Ticket de Suporte"}</strong>
          ) : (
            <input value={title} onChange={(e) => setTitle(e.target.value)} style={input} />
          )}
          {!isEditing && <button onClick={() => setIsEditing(true)} style={iconBtn}>✏️</button>}
        </div>
        {!isEditing ? (
          (data?.department || data?.priority) && (
            <div style={{ marginTop: 6, fontSize: 12, color: "#374151", display: "grid", gap: 4 }}>
              {data?.department && <div>Depto: {String(data.department)}</div>}
              {data?.priority && <div>Prioridade: {String(data.priority)}</div>}
            </div>
          )
        ) : (
          <div style={{ display: "grid", gap: 6, marginTop: 8 }}>
            <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" style={input} />
            <input value={priority} onChange={(e) => setPriority(e.target.value)} placeholder="Priority" style={input} />
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
