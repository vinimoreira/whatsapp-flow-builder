import React from "react";
import { Handle, Position } from "reactflow";

export default function SupportTicketNode({ data }: any) {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 10,
          minWidth: 240,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span role="img" aria-label="ticket" style={{ fontSize: 14 }}>🎫</span>
          <strong style={{ fontSize: 13 }}>{data?.title || "Ticket de Suporte"}</strong>
        </div>
        {(data?.department || data?.priority) && (
          <div style={{ marginTop: 6, fontSize: 12, color: "#374151", display: "grid", gap: 4 }}>
            {data?.department && <div>Depto: {String(data.department)}</div>}
            {data?.priority && <div>Prioridade: {String(data.priority)}</div>}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

