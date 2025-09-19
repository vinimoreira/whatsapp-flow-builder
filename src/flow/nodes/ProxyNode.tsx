import React from "react";
import { Handle, Position } from "reactflow";
import { useFlowStore } from "../../store/useFlowStore";
import NextFlowEditor, { type NextFlowItem } from "../../components/NextFlowEditor";
import { conditionsSummary } from "../../types/conditions";

export default function ProxyNode({ id, data }: any) {
  const { updateNodeData, edges, setEdges, nodes } = useFlowStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState<string>(data?.title || "Proxy");
  const [endpoint, setEndpoint] = React.useState<string>(String(data?.endpoint || ""));
  const [method, setMethod] = React.useState<string>(String(data?.method || "GET"));
  const [nextFlow, setNextFlow] = React.useState<NextFlowItem[]>([]);

  React.useEffect(() => {
    setTitle(data?.title || "Proxy");
    setEndpoint(String(data?.endpoint || ""));
    setMethod(String(data?.method || "GET"));
    // Refresh NextFlow view from current outgoing edges
    const outgoing = edges.filter((e) => e.source === id);
    const mapped: NextFlowItem[] = outgoing.map((e) => ({
      id: e.id,
      targetId: e.target,
      conditions: Array.isArray((e as any).data?.conditions) ? (e as any).data.conditions : [],
    }));
    setNextFlow(mapped);
  }, [data?.title, data?.endpoint, data?.method, edges, id]);

  const save = () => {
    updateNodeData(id, { title, endpoint, method });
    // Sync NextFlow edges
    const freshEdges = edges.filter((e) => e.source !== id);
    const toAdd = nextFlow
      .filter((opt) => !!opt.targetId)
      .map((opt) => ({
        id: opt.id || `${id}-${opt.targetId}`,
        source: id,
        target: String(opt.targetId),
        type: "smoothstep",
        label: conditionsSummary(opt.conditions) || "next",
        data: { conditions: opt.conditions },
      } as any));
    setEdges([...freshEdges, ...toAdd]);
    setIsEditing(false);
  };
  const cancel = () => {
    setTitle(data?.title || "Proxy");
    setEndpoint(String(data?.endpoint || ""));
    setMethod(String(data?.method || "GET"));
    // Reset NextFlow from edges as well
    const outgoing = edges.filter((e) => e.source === id);
    const mapped: NextFlowItem[] = outgoing.map((e) => ({
      id: e.id,
      targetId: e.target,
      conditions: Array.isArray((e as any).data?.conditions) ? (e as any).data.conditions : [],
    }));
    setNextFlow(mapped);
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
          minWidth: 280,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span role="img" aria-label="proxy" style={{ fontSize: 14 }}>☁️</span>
          {!isEditing ? (
            <strong style={{ fontSize: 13 }}>{data?.title || "Proxy"}</strong>
          ) : (
            <input value={title} onChange={(e) => setTitle(e.target.value)} style={input} />
          )}
          {!isEditing && method && (
            <span style={{ marginLeft: "auto", fontSize: 11, border: "1px solid #e5e7eb", borderRadius: 6, padding: "1px 6px", background: "#f9fafb", color: "#374151" }}>{method}</span>
          )}
          {!isEditing && <button onClick={() => setIsEditing(true)} style={iconBtn}>✏️</button>}
        </div>
        {!isEditing ? (
          <div style={{ display: 'grid', gap: 8 }}>
            {endpoint && <div style={{ fontSize: 12, color: "#374151" }}>{endpoint}</div>}
            {/* View list of current nextFlow options */}
            <div>
              {nextFlow.length === 0 ? (
                <div style={{ fontSize: 12, color: "#6b7280" }}>Sem transições definidas</div>
              ) : (
                <div style={{ display: "grid", gap: 6 }}>
                  {nextFlow.map((opt) => {
                    const tgt = nodes.find((n: any) => n.id === opt.targetId);
                    const title = tgt ? `${tgt.id} — ${String((tgt.data as any)?.title || tgt.type)}` : (opt.targetId || '—');
                    return (
                      <div key={opt.id} style={{ position: "relative", padding: "6px 8px", border: "1px solid #e5e7eb", borderRadius: 8, background: "#f9fafb", display: "flex", flexDirection: 'column', gap: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 12, color: '#374151' }}>Destino:</span>
                          <span style={{ fontSize: 12, color: '#111' }}>{title}</span>
                        </div>
                        <div style={{ fontSize: 11, color: '#6b7280' }}>{conditionsSummary(opt.conditions) || 'Sempre'}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 6 }}>
            <input value={endpoint} onChange={(e) => setEndpoint(e.target.value)} placeholder="Endpoint" style={input} />
            <select value={method} onChange={(e) => setMethod(e.target.value)} style={input as any}>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
            {/* NextFlow editor */}
            <NextFlowEditor items={nextFlow} onItemsChange={setNextFlow} nodes={nodes as any} currentId={id} />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={save} style={primaryBtn}>Salvar</button>
              <button onClick={cancel} style={ghostBtn}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const input: React.CSSProperties = { fontSize: 12, border: "1px solid #d1d5db", borderRadius: 6, padding: "4px 6px", width: "100%" };
const iconBtn: React.CSSProperties = { marginLeft: "auto", fontSize: 12, padding: "2px 6px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#f9fafb", cursor: "pointer" };
const primaryBtn: React.CSSProperties = { fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #2563EB", background: "#3B82F6", color: "#fff", cursor: "pointer" };
const ghostBtn: React.CSSProperties = { fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", color: "#111", cursor: "pointer" };
