import React from "react";
import { Handle, Position } from "reactflow";
import { useFlowStore } from "../../store/useFlowStore";

export default function TextNode({ id, data }: any) {
  const { updateNodeData } = useFlowStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState<string>(data?.title || "Texto");
  const [description, setDescription] = React.useState<string>(data?.description || "");

  React.useEffect(() => {
    setTitle(data?.title || "Texto");
    setDescription(data?.description || "");
  }, [data?.title, data?.description]);

  const save = () => {
    updateNodeData(id, { title, description });
    setIsEditing(false);
  };
  const cancel = () => {
    setTitle(data?.title || "Texto");
    setDescription(data?.description || "");
    setIsEditing(false);
  };

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
          minWidth: 220,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span role="img" aria-label="text" style={{ fontSize: 14 }}>💬</span>
          {!isEditing ? (
            <strong style={{ fontSize: 13 }}>{data?.title || "Texto"}</strong>
          ) : (
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título"
              style={{ flex: 1, fontSize: 13, border: "1px solid #d1d5db", borderRadius: 6, padding: "4px 6px" }}
            />
          )}
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} title="Editar" style={iconBtn}>✏️</button>
          )}
        </div>
        {!isEditing ? (
          data?.description ? (
            <div style={{ fontSize: 12, color: "#374151" }}>{String(data.description)}</div>
          ) : null
        ) : (
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição / Mensagem"
            style={{ width: "100%", fontSize: 12, border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 8px" }}
          />
        )}
        {isEditing && (
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button onClick={save} style={primaryBtn}>Salvar</button>
            <button onClick={cancel} style={ghostBtn}>Cancelar</button>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const iconBtn: React.CSSProperties = {
  marginLeft: "auto",
  fontSize: 12,
  lineHeight: 1,
  padding: "2px 6px",
  borderRadius: 6,
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  cursor: "pointer",
};

const primaryBtn: React.CSSProperties = {
  fontSize: 12,
  padding: "4px 8px",
  borderRadius: 6,
  border: "1px solid #2563EB",
  background: "#3B82F6",
  color: "#fff",
  cursor: "pointer",
};

const ghostBtn: React.CSSProperties = {
  fontSize: 12,
  padding: "4px 8px",
  borderRadius: 6,
  border: "1px solid #e5e7eb",
  background: "#fff",
  color: "#111",
  cursor: "pointer",
};
