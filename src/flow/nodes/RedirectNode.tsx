import React from "react";
import { Handle, Position } from "reactflow";

export default function RedirectNode({ data }: any) {
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
        title={data?.flowId ? `Fluxo destino: ${data.flowId}` : undefined}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span role="img" aria-label="redirect" style={{ fontSize: 14 }}>➡️</span>
          <strong style={{ fontSize: 13 }}>{data?.title || "Redirecionar"}</strong>
        </div>
        {data?.flowId && (
          <div style={{ marginTop: 6, fontSize: 12, color: "#374151" }}>para: {String(data.flowId)}</div>
        )}
      </div>
      {/* Sem handle de saída: nó terminal que redireciona para outro fluxo */}
    </div>
  );
}

