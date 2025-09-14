import React from "react";
import { Handle, Position } from "reactflow";

export default function ProxyNode({ data }: any) {
  const endpoint = String(data?.endpoint || "");
  const method = String(data?.method || "");
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 10,
          minWidth: 260,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span role="img" aria-label="proxy" style={{ fontSize: 14 }}>☁️</span>
          <strong style={{ fontSize: 13 }}>{data?.title || "Proxy"}</strong>
          {method && (
            <span style={{ marginLeft: "auto", fontSize: 11, border: "1px solid #e5e7eb", borderRadius: 6, padding: "1px 6px", background: "#f9fafb", color: "#374151" }}>{method}</span>
          )}
        </div>
        {endpoint && (
          <div style={{ fontSize: 12, color: "#374151" }}>{endpoint}</div>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

