import React from "react";

export type Message = { Order: number; Text: string; Type: string };

type Props = {
  editing: boolean;
  messages: Message[];
  onChange: (messages: Message[]) => void;
  emptyHint?: string;
};

export default function MessagesBlock({ editing, messages, onChange, emptyHint = "Sem mensagens definidas" }: Props) {
  const handleTextChange = (index: number, text: string) => {
    const next = messages.slice();
    next[index] = { ...next[index], Text: text };
    onChange(next);
  };

  const addMessage = () => {
    const newOrder = messages.length > 0 ? Math.max(...messages.map((m) => m.Order)) + 1 : 1;
    onChange([...(messages || []), { Order: newOrder, Text: "", Type: "text" }]);
  };

  const removeMessage = (index: number) => {
    onChange(messages.filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {(!messages || messages.length === 0) && !editing && (
        <div style={{ fontSize: 12, color: "#6b7280" }}>{emptyHint}</div>
      )}

      {!editing ? (
        (messages || []).map((msg, idx) => (
          <div key={msg.Order} style={{ fontSize: 12, color: "#374151", background: "#f9fafb", padding: "6px 8px", borderRadius: 6 }}>
            {msg.Text}
          </div>
        ))
      ) : (
        <>
          {(messages || []).map((msg, idx) => (
            <div key={msg.Order}>
              <textarea
                rows={2}
                value={msg.Text || ""}
                onChange={(e) => handleTextChange(idx, e.target.value)}
                placeholder="Escreva a mensagem..."
                style={{ width: "100%", boxSizing: "border-box", fontSize: 12, border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 8px" }}
              />
              <button onClick={() => removeMessage(idx)} style={ghostBtnSmall}>Remover</button>
            </div>
          ))}
          <div>
            <button onClick={addMessage} style={ghostBtn}>+ Mensagem</button>
          </div>
        </>
      )}
    </div>
  );
}

const ghostBtn: React.CSSProperties = {
  fontSize: 12,
  padding: "4px 8px",
  borderRadius: 6,
  border: "1px solid #e5e7eb",
  background: "#fff",
  color: "#111",
  cursor: "pointer",
};

const ghostBtnSmall: React.CSSProperties = {
  ...ghostBtn,
  fontSize: 11,
  padding: "2px 6px",
  marginTop: 4,
};

