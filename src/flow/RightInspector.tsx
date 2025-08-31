import React from "react";
import { useFlowStore } from "../store/useFlowStore";
import { labelIsBoolean, labelMatchesQuestionOptions, isFromCondition, isFromQuestion } from "../utils/edgeHelpers";
import { schemas } from "../utils/schemas";

type KV = { key: string; value: string };

export default function RightInspector() {
  const { nodes, edges, selectedId, updateEdgeLabel, updateNodeData } = useFlowStore();

  const selectedNode = nodes.find((n) => n.id === selectedId);
  const selectedEdge = edges.find((e) => e.id === selectedId);

  return (
    <aside style={{ width: 260, borderLeft: "1px solid #eee", padding: 12, overflow: "auto" }}>
      <h4 style={{ marginBottom: 8 }}>Inspector</h4>
      {!selectedNode && !selectedEdge && (
        <div style={{ color: "#6b7280", fontSize: 12 }}>Selecione um nó ou conexão.</div>
      )}
      {selectedEdge && <EdgeEditor nodes={nodes} edge={selectedEdge} onChange={updateEdgeLabel} />}
      {selectedNode && <NodeEditor node={selectedNode} onChange={updateNodeData} />}
    </aside>
  );
}

function Field({ label, error, children }: { label: string; error?: string | null; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
      <label style={{ fontSize: 12, color: "#374151" }}>{label}</label>
      {children}
      {error && (
        <div style={{ fontSize: 12, color: "#991B1B", background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: 6, padding: 6 }}>
          {error}
        </div>
      )}
    </div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ ...props.style, border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 8px", fontSize: 13 }} />;
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} style={{ ...props.style, border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 8px", fontSize: 13 }} />;
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} style={{ ...props.style, border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 8px", fontSize: 13 }} />
  );
}

function EdgeEditor({ nodes, edge, onChange }: { nodes: any[]; edge: any; onChange: (id: string, label: string) => void }) {
  const labelText = typeof edge.label === "string" ? edge.label : "";
  const sourceNode = nodes.find((n) => n.id === edge.source);
  const fromQuestion = isFromQuestion(sourceNode);
  const fromCondition = isFromCondition(sourceNode);
  let warnMsg: string | null = null;
  if (fromQuestion) {
    const options = (sourceNode?.data?.options ?? []) as Array<{ id: string; label: string }>;
    if (!labelMatchesQuestionOptions(labelText, options)) warnMsg = "Label não corresponde às opções da Question.";
  } else if (fromCondition) {
    if (!labelIsBoolean(labelText)) warnMsg = "Condition aceita apenas 'true' ou 'false'.";
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Field label="Label" error={null}>
        <TextInput
          value={labelText}
          onChange={(e) => {
            const v = e.target.value;
            if (v.trim().length === 0) return;
            onChange(edge.id, v);
          }}
        />
      </Field>
      {warnMsg && (
        <div style={{ fontSize: 12, color: "#92400E", background: "#FEF3C7", border: "1px solid #F59E0B", borderRadius: 6, padding: 8 }}>
          ⚠ {warnMsg}
        </div>
      )}
    </div>
  );
}

function NodeEditor({ node, onChange }: { node: any; onChange: (id: string, data: Record<string, any>) => void }) {
  const [local, setLocal] = React.useState<Record<string, any>>(node.data || {});
  const [errors, setErrors] = React.useState<Record<string, string | null>>({});

  React.useEffect(() => {
    setLocal(node.data || {});
    setErrors({});
  }, [node.id]);

  const setField = (key: string, value: any) => {
    const next = { ...local, [key]: value };
    setLocal(next);
    const parse = validate(node.type as string, next);
    if (parse.ok) {
      setErrors({});
      onChange(node.id, { [key]: value });
    } else {
      setErrors(parse.errors);
    }
  };

  // Helpers for complex fields
  const setOptions = (opts: Array<{ id: string; label: string }>) => setField("options", opts);
  const setHeaders = (headers: KV[]) => setField("headers", headers);

  switch (node.type) {
    case "start":
      return (
        <div>
          <Field label="Title" error={errors.title}>
            <TextInput value={local.title || ""} onChange={(e) => setField("title", e.target.value)} />
          </Field>
        </div>
      );
    case "end":
      return (
        <div>
          <Field label="Title" error={errors.title}>
            <TextInput value={local.title || ""} onChange={(e) => setField("title", e.target.value)} />
          </Field>
        </div>
      );
    case "message":
      return (
        <div>
          <Field label="Title" error={errors.title}>
            <TextInput value={local.title || ""} onChange={(e) => setField("title", e.target.value)} />
          </Field>
          <Field label="Text" error={errors.text}>
            <TextArea rows={3} value={local.text || ""} onChange={(e) => setField("text", e.target.value)} />
          </Field>
          <Field label="Media URL" error={errors.mediaUrl}>
            <TextInput value={local.mediaUrl || ""} onChange={(e) => setField("mediaUrl", e.target.value)} />
          </Field>
        </div>
      );
    case "question": {
      const options: Array<{ id: string; label: string }> = local.options || [];
      return (
        <div>
          <Field label="Title" error={errors.title}>
            <TextInput value={local.title || ""} onChange={(e) => setField("title", e.target.value)} />
          </Field>
          <Field label="Prompt" error={errors.prompt}>
            <TextInput value={local.prompt || ""} onChange={(e) => setField("prompt", e.target.value)} />
          </Field>
          <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12 }}>Options</div>
          {options.map((opt, idx) => (
            <div key={opt.id} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
              <TextInput
                value={opt.label}
                onChange={(e) => {
                  const next = options.slice();
                  next[idx] = { ...opt, label: e.target.value };
                  setOptions(next);
                }}
                style={{ flex: 1 }}
              />
              <button onClick={() => { const next = options.filter((_, i) => i !== idx); setOptions(next); }} style={btnStyle}>Remover</button>
              <button disabled={idx === 0} onClick={() => { const next = options.slice(); [next[idx-1], next[idx]] = [next[idx], next[idx-1]]; setOptions(next); }} style={btnStyle}>↑</button>
              <button disabled={idx === options.length - 1} onClick={() => { const next = options.slice(); [next[idx+1], next[idx]] = [next[idx], next[idx+1]]; setOptions(next); }} style={btnStyle}>↓</button>
            </div>
          ))}
          <button onClick={() => setOptions([...(options || []), { id: `${Date.now()}`, label: "Opção" }])} style={btnPrimary}>Adicionar opção</button>
          {errors.options && (
            <div style={{ fontSize: 12, color: "#991B1B", background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: 6, padding: 6, marginTop: 6 }}>
              {errors.options}
            </div>
          )}
        </div>
      );
    }
    case "condition":
      return (
        <div>
          <Field label="Title" error={errors.title}>
            <TextInput value={local.title || ""} onChange={(e) => setField("title", e.target.value)} />
          </Field>
          <Field label="Expression" error={errors.expression}>
            <TextInput value={local.expression || ""} onChange={(e) => setField("expression", e.target.value)} />
          </Field>
        </div>
      );
    case "delay":
      return (
        <div>
          <Field label="Title" error={errors.title}>
            <TextInput value={local.title || ""} onChange={(e) => setField("title", e.target.value)} />
          </Field>
          <Field label="Milliseconds" error={errors.ms}>
            <TextInput type="number" value={local.ms ?? 0} onChange={(e) => setField("ms", Number(e.target.value))} />
          </Field>
        </div>
      );
    case "api": {
      const headers: KV[] = (local.headers as KV[]) || [];
      return (
        <div>
          <Field label="Title" error={errors.title}>
            <TextInput value={local.title || ""} onChange={(e) => setField("title", e.target.value)} />
          </Field>
          <Field label="URL" error={errors.url}>
            <TextInput value={local.url || ""} onChange={(e) => setField("url", e.target.value)} />
          </Field>
          <Field label="Method" error={null}>
            <Select value={local.method || "GET"} onChange={(e) => setField("method", e.target.value)}>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </Select>
          </Field>
          <div style={{ marginBottom: 8, fontWeight: 600, fontSize: 12 }}>Headers</div>
          {headers.map((kv, idx) => (
            <div key={idx} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
              <TextInput placeholder="Key" value={kv.key} onChange={(e) => { const next = headers.slice(); next[idx] = { ...kv, key: e.target.value }; setHeaders(next); }} style={{ flex: 1 }} />
              <TextInput placeholder="Value" value={kv.value} onChange={(e) => { const next = headers.slice(); next[idx] = { ...kv, value: e.target.value }; setHeaders(next); }} style={{ flex: 1 }} />
              <button onClick={() => { const next = headers.filter((_, i) => i !== idx); setHeaders(next); }} style={btnStyle}>Remover</button>
            </div>
          ))}
          <button onClick={() => setHeaders([...(headers || []), { key: "", value: "" }])} style={btnPrimary}>Adicionar header</button>
          <Field label="Body Template" error={null}>
            <TextArea rows={4} value={local.bodyTemplate || ""} onChange={(e) => setField("bodyTemplate", e.target.value)} />
          </Field>
        </div>
      );
    }
    default:
      return null;
  }
}

function validate(type: string, data: Record<string, any>): { ok: boolean; errors: Record<string, string | null> } {
  const schema = schemas[type as keyof typeof schemas];
  if (!schema) return { ok: true, errors: {} };
  const res = schema.safeParse(data);
  if (res.success) return { ok: true, errors: {} };
  const errs: Record<string, string | null> = {};
  for (const issue of res.error.issues) {
    const key = (issue.path?.[0] as string) || "_";
    errs[key] = issue.message;
  }
  return { ok: false, errors: errs };
}

const btnStyle: React.CSSProperties = { border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 8px", fontSize: 12, background: "#fff", cursor: "pointer" };
const btnPrimary: React.CSSProperties = { ...btnStyle, background: "#EEF2FF", borderColor: "#CBD5E1" };


