import React from "react";
import { Handle, Position } from "reactflow";

export default function TextNode({ data }: any) {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div
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
          <strong style={{ fontSize: 13 }}>{data?.title || "Texto"}</strong>
        </div>
        {data?.description && (
          <div style={{ fontSize: 12, color: "#374151" }}>{String(data.description)}</div>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

