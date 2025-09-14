import React from "react";
import { Handle, Position } from "reactflow";

export default function EndConversationNode({ data }: any) {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 10,
          minWidth: 200,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span role="img" aria-label="end" style={{ fontSize: 14 }}>🏁</span>
          <strong style={{ fontSize: 13 }}>{data?.title || "Encerrar Conversa"}</strong>
        </div>
      </div>
      {/* Sem saída: nó terminal */}
    </div>
  );
}

