import React from "react";
import { Handle, Position } from "reactflow";

type Option = { id: string; label: string };

export default function OptionsNode({ data }: any) {
  const options: Option[] = Array.isArray(data?.options) ? data.options : [];
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
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span role="img" aria-label="options" style={{ fontSize: 14 }}>🔘</span>
          <strong style={{ fontSize: 13 }}>{data?.title || "Opções"}</strong>
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          {options.length === 0 && (
            <div style={{ fontSize: 12, color: "#6b7280" }}>Sem opções definidas</div>
          )}
          {options.map((opt: Option, idx: number) => (
            <div key={opt.id || idx} style={{ position: "relative", padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 8, background: "#f9fafb" }}>
              <span style={{ fontSize: 12, color: "#111" }}>{opt.label}</span>
              <Handle type="source" position={Position.Right} id={opt.id} style={{ top: "50%" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

