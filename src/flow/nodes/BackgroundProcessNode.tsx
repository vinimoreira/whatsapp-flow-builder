import React from "react";
import { Handle, Position } from "reactflow";
import { useFlowStore } from "../../store/useFlowStore";
import type { Condition } from "../../types/conditions";
import { conditionsSummary } from "../../types/conditions";
import { ConditionBuilder } from "../edges/ConditionBuilder";

type NextFlowOption = {
  id: string; // local uid for UI list
  targetId: string | null;
  conditions: Condition[];
};

export default function BackgroundProcessNode({ id, data }: any) {
  const { updateNodeData, nodes, edges, setEdges } = useFlowStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [local, setLocal] = React.useState<Record<string, any>>({
    title: data?.title || "Processo",
    description: data?.description || "",
    subscriptionName: data?.subscriptionName || "",
    subscriptionTopicName: data?.subscriptionTopicName || "",
    topicName: data?.topicName || "",
    metadata: data?.metadata || {},
    requestContent: data?.requestContent || {},
    responseContent: data?.responseContent || {},
    startup: !!data?.startup,
  });
  const [nextFlow, setNextFlow] = React.useState<NextFlowOption[]>([]);
  const [editingCondIndex, setEditingCondIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    setLocal({
      title: data?.title || "Processo",
      description: data?.description || "",
      subscriptionName: data?.subscriptionName || "",
      subscriptionTopicName: data?.subscriptionTopicName || "",
      topicName: data?.topicName || "",
      metadata: data?.metadata || {},
      requestContent: data?.requestContent || {},
      responseContent: data?.responseContent || {},
      startup: !!data?.startup,
    });
    // Refresh NextFlow view from current outgoing edges
    const outgoing = edges.filter((e) => e.source === id);
    const mapped: NextFlowOption[] = outgoing.map((e) => ({
      id: e.id,
      targetId: e.target,
      conditions: Array.isArray((e as any).data?.conditions) ? (e as any).data.conditions : [],
    }));
    setNextFlow(mapped);
  }, [data, edges, id]);

  const setField = (k: string, v: any) => setLocal((s) => ({ ...s, [k]: v }));
  const save = () => {
    updateNodeData(id, local);
    // Sync NextFlow with edges: replace all outgoing edges by nextFlow items
    const freshEdges = edges.filter((e) => e.source !== id);
    const toAdd = nextFlow
      .filter((opt) => !!opt.targetId)
      .map((opt) => ({
        id: `${id}-${opt.targetId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        source: id,
        target: String(opt.targetId),
        type: "smoothstep",
        label: (conditionsSummary(opt.conditions) || "next"),
        data: { conditions: opt.conditions },
      } as any));
    setEdges([...freshEdges, ...toAdd]);
    setIsEditing(false);
  };
  const cancel = () => { setIsEditing(false); setLocal({
    title: data?.title || "Processo",
    description: data?.description || "",
    subscriptionName: data?.subscriptionName || "",
    subscriptionTopicName: data?.subscriptionTopicName || "",
    topicName: data?.topicName || "",
    metadata: data?.metadata || {},
    requestContent: data?.requestContent || {},
    responseContent: data?.responseContent || {},
    startup: !!data?.startup,
  });
  // Reset NextFlow from edges as well
  const outgoing = edges.filter((e) => e.source === id);
  const mapped: NextFlowOption[] = outgoing.map((e) => ({
    id: e.id,
    targetId: e.target,
    conditions: Array.isArray((e as any).data?.conditions) ? (e as any).data.conditions : [],
  }));
  setNextFlow(mapped);
 };

  const jsonStr = (v: any) => {
    try { return JSON.stringify(v ?? {}, null, 2); } catch { return "{}"; }
  };
  const parseJson = (t: string) => { try { return JSON.parse(t); } catch { return undefined; } };

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
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span role="img" aria-label="process" style={{ fontSize: 14 }}>⚙️</span>
          {!isEditing ? (
            <strong style={{ fontSize: 13 }}>{data?.title || "Processo"}</strong>
          ) : (
            <input value={local.title} onChange={(e) => setField("title", e.target.value)} style={input} />
          )}
          {!isEditing && <button onClick={() => setIsEditing(true)} style={iconBtn}>✏️</button>}
        </div>
        {!isEditing ? (
          data?.description && <div style={{ marginTop: 6, fontSize: 12, color: "#374151" }}>{String(data.description)}</div>
        ) : (
          <div style={{ display: "grid", gap: 6, marginTop: 8 }}>
            <textarea rows={2} value={local.description} onChange={(e) => setField("description", e.target.value)} placeholder="Descrição" style={textarea} />
            <input value={local.subscriptionName} onChange={(e) => setField("subscriptionName", e.target.value)} placeholder="subscriptionName" style={input} />
            <input value={local.subscriptionTopicName} onChange={(e) => setField("subscriptionTopicName", e.target.value)} placeholder="subscriptionTopicName" style={input} />
            <input value={local.topicName} onChange={(e) => setField("topicName", e.target.value)} placeholder="topicName" style={input} />
            <label style={label}><input type="checkbox" checked={!!local.startup} onChange={(e) => setField("startup", e.target.checked)} /> startup</label>
            <div style={{ fontSize: 12, color: "#374151" }}>metadata</div>
            <textarea rows={3} defaultValue={jsonStr(local.metadata)} onBlur={(e) => { const val = parseJson(e.target.value); if (val) setField("metadata", val); }} style={textarea} />
            <div style={{ fontSize: 12, color: "#374151" }}>requestContent</div>
            <textarea rows={3} defaultValue={jsonStr(local.requestContent)} onBlur={(e) => { const val = parseJson(e.target.value); if (val) setField("requestContent", val); }} style={textarea} />
            <div style={{ fontSize: 12, color: "#374151" }}>responseContent</div>
            <textarea rows={3} defaultValue={jsonStr(local.responseContent)} onBlur={(e) => { const val = parseJson(e.target.value); if (val) setField("responseContent", val); }} style={textarea} />
            <div style={{ fontSize: 12, color: "#111", marginTop: 4, borderTop: '1px solid #eee', paddingTop: 8 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Transições (NextFlow)</div>
              {nextFlow.length === 0 && (
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>Sem transições. Adicione ao menos uma opção.</div>
              )}
              <div style={{ display: 'grid', gap: 8 }}>
                {nextFlow.map((opt, idx) => (
                  <div key={opt.id || idx} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 8, background: '#f9fafb' }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: '#374151', minWidth: 70 }}>Destino:</span>
                      <select
                        value={opt.targetId ?? ''}
                        onChange={(e) => {
                          const v = e.target.value || null;
                          setNextFlow((prev) => prev.map((o, i) => i === idx ? { ...o, targetId: v } : o));
                        }}
                        style={{ flex: 1, fontSize: 12, border: '1px solid #d1d5db', borderRadius: 6, padding: '4px 6px' }}
                      >
                        <option value="">— selecione —</option>
                        {nodes
                          .filter((n) => n.id !== id)
                          .map((n) => (
                            <option key={n.id} value={n.id}>
                              {n.id} — {String((n.data as any)?.title || n.type)}
                            </option>
                          ))}
                      </select>
                      <button
                        onClick={() => setEditingCondIndex(idx)}
                        title="Editar condições"
                        style={{ fontSize: 12, padding: '4px 6px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer' }}
                      >
                        Condições…
                      </button>
                      <button
                        onClick={() => setNextFlow((prev) => prev.filter((_, i) => i !== idx))}
                        title="Remover"
                        style={{ fontSize: 12, padding: '4px 6px', borderRadius: 6, border: '1px solid #ef4444', color: '#ef4444', background: '#fff', cursor: 'pointer' }}
                      >
                        Remover
                      </button>
                    </div>
                    <div style={{ marginTop: 6, fontSize: 11, color: '#6b7280' }}>
                      {conditionsSummary(opt.conditions) || 'Sempre'}
                    </div>
                    {editingCondIndex === idx && (
                      <ConditionBuilder
                        initialConditions={opt.conditions}
                        onChange={(newConds) => {
                          setNextFlow((prev) => prev.map((o, i) => (i === idx ? { ...o, conditions: newConds } : o)));
                        }}
                        onClose={() => setEditingCondIndex(null)}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8 }}>
                <button
                  onClick={() => setNextFlow((prev) => ([...prev, { id: `${Date.now()}-${Math.random().toString(36).slice(2,6)}`, targetId: null, conditions: [] }]))}
                  style={{ fontSize: 12, padding: '6px 8px', borderRadius: 6, border: '1px solid #3b82f6', background: '#eff6ff', color: '#2563eb', cursor: 'pointer' }}
                >
                  + Adicionar opção
                </button>
              </div>
            </div>
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
const textarea: React.CSSProperties = { ...input, minHeight: 60 } as React.CSSProperties;
const label: React.CSSProperties = { fontSize: 12, color: "#374151", display: "inline-flex", alignItems: "center", gap: 6 };
const iconBtn: React.CSSProperties = { marginLeft: "auto", fontSize: 12, padding: "2px 6px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#f9fafb", cursor: "pointer" };
const primaryBtn: React.CSSProperties = { fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #2563EB", background: "#3B82F6", color: "#fff", cursor: "pointer" };
const ghostBtn: React.CSSProperties = { fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", color: "#111", cursor: "pointer" };
