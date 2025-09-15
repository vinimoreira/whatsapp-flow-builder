import React from "react";
import { Handle, Position } from "reactflow";
import { useFlowStore } from "../../store/useFlowStore";

export default function BackgroundProcessNode({ id, data }: any) {
  const { updateNodeData } = useFlowStore();
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
  }, [data]);

  const setField = (k: string, v: any) => setLocal((s) => ({ ...s, [k]: v }));
  const save = () => { updateNodeData(id, local); setIsEditing(false); };
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
  }); };

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
