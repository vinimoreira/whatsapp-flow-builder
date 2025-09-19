import React from "react";
import { Handle, Position } from "reactflow";
import { useFlowStore } from "../../store/useFlowStore";
import MessagesBlock, { type Message } from "../../components/MessagesBlock";

type Option = { id: string; label: string };

export default function OptionsNode({ id, data }: any) {
  const { updateNodeData } = useFlowStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState<string>(data?.title || "Opções");
  const [options, setOptions] = React.useState<Option[]>(Array.isArray(data?.options) ? data.options : []);
  const [messages, setMessages] = React.useState<Message[]>(Array.isArray(data?.Messages) ? data.Messages : []);

  React.useEffect(() => {
    setTitle(data?.title || "Opções");
    setOptions(Array.isArray(data?.options) ? data.options : []);
    setMessages(Array.isArray(data?.Messages) ? data.Messages : []);
  }, [data?.title, data?.options, data?.Messages]);

  const save = () => {
    updateNodeData(id, { title, options, Messages: messages });
    setIsEditing(false);
  };
  const cancel = () => {
    setTitle(data?.title || "Opções");
    setOptions(Array.isArray(data?.options) ? data.options : []);
    setMessages(Array.isArray(data?.Messages) ? data.Messages : []);
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
          minWidth: 240,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span role="img" aria-label="options" style={{ fontSize: 14 }}>🔘</span>
          {!isEditing ? (
            <strong style={{ fontSize: 13 }}>{data?.title || "Opções"}</strong>
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
        <div style={{ display: "grid", gap: 6 }}>
          {/* Messages section */}
          <MessagesBlock editing={isEditing} messages={messages} onChange={setMessages} />

          {(!options || options.length === 0) && !isEditing && (
            <div style={{ fontSize: 12, color: "#6b7280" }}>Sem opções definidas</div>
          )}
          {(!options || options.length === 0) && isEditing && (
            <button onClick={() => setOptions([{ id: `${Date.now()}`, label: "" }])} style={primaryBtn}>Adicionar opção</button>
          )}
          {options.map((opt: Option, idx: number) => (
            <div key={opt.id || idx} style={{ position: "relative", padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 8, background: "#f9fafb", display: "flex", alignItems: "center", gap: 8 }}>
              {!isEditing ? (
                <span style={{ fontSize: 12, color: "#111" }}>{opt.label}</span>
              ) : (
                <input
                  value={opt.label}
                  placeholder="Escreva a opção..."
                  onChange={(e) => {
                    const next = options.slice();
                    next[idx] = { ...opt, label: e.target.value };
                    setOptions(next);
                  }}
                  style={{ flex: 1, fontSize: 12, border: "1px solid #d1d5db", borderRadius: 6, padding: "4px 6px" }}
                />
              )}
              {isEditing ? (
                <>
                  <button onClick={() => { const next = options.filter((_, i) => i !== idx); setOptions(next); }} style={ghostBtn}>Remover</button>
                  <button disabled={idx === 0} onClick={() => { const next = options.slice(); [next[idx-1], next[idx]] = [next[idx], next[idx-1]]; setOptions(next); }} style={ghostBtn}>↑</button>
                  <button disabled={idx === options.length - 1} onClick={() => { const next = options.slice(); [next[idx+1], next[idx]] = [next[idx], next[idx+1]]; setOptions(next); }} style={ghostBtn}>↓</button>
                </>
              ) : null}
              <Handle type="source" position={Position.Right} id={opt.id} style={{ top: "50%" }} />
            </div>
          ))}
        </div>
        {isEditing && (
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button onClick={save} style={primaryBtn}>Salvar</button>
            <button onClick={cancel} style={ghostBtn}>Cancelar</button>
            <button onClick={() => setOptions([...(options || []), { id: `${Date.now()}`, label: "" }])} style={ghostBtn}>+ Opção</button>
          </div>
        )}
      </div>
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
