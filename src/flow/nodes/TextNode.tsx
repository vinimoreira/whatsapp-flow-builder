import React from "react";
import { Handle, Position } from "reactflow";
import { useFlowStore } from "../../store/useFlowStore";
import MessagesBlock, { type Message } from "../../components/MessagesBlock";

export default function TextNode({ id, data }: any) {
  const { updateNodeData } = useFlowStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState<string>(data?.Description || "Texto");
  const [messages, setMessages] = React.useState<Message[]>(Array.isArray(data?.Messages) ? data.Messages : []);

  React.useEffect(() => {
    setTitle(data?.Description || "Texto");
    setMessages(Array.isArray(data?.Messages) ? data.Messages : []);
  }, [data?.Description, data?.Messages]);

  const save = () => {
    // Also update the main 'title' for the node from the Description field
    updateNodeData(id, { Description: title, title: title, Messages: messages });
    setIsEditing(false);
  };
  const cancel = () => {
    setTitle(data?.Description || "Texto");
    setMessages(Array.isArray(data?.Messages) ? data.Messages : []);
    setIsEditing(false);
  };

  const onMessagesChange = (list: Message[]) => setMessages(list);

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
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, paddingBottom: 6, borderBottom: '1px solid #f3f4f6' }}>
          <span role="img" aria-label="text" style={{ fontSize: 14 }}>💬</span>
          {!isEditing ? (
            <strong style={{ fontSize: 13 }}>{data?.title || "Texto"}</strong>
          ) : (
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do Passo"
              style={{ flex: 1, fontSize: 13, border: "1px solid #d1d5db", borderRadius: 6, padding: "4px 6px" }}
            />
          )}
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} title="Editar" style={iconBtn}>✏️</button>
          )}
        </div>

        <MessagesBlock editing={isEditing} messages={messages} onChange={onMessagesChange} />

        {isEditing && (
          <div style={{ display: "flex", gap: 8, marginTop: 8, paddingTop: 8, borderTop: '1px solid #f3f4f6' }}>
            <button onClick={save} style={primaryBtn}>Salvar</button>
            <button onClick={cancel} style={ghostBtn}>Cancelar</button>
            {/* Add button is now inside MessagesBlock */}
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
