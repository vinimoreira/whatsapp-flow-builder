import React from "react";
import { useFlowStore } from "../store/useFlowStore";

type Props = {
  id: string;
  text: string;
  warning?: boolean;
};

export default function EdgeLabelInline({ id, text, warning }: Props) {
  const { nodes, edges, setNodes, setEdges, updateEdgeLabel } = useFlowStore();
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(text);
  const prev = React.useRef(text);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setValue(text);
    prev.current = text;
  }, [text]);

  const startEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditing(true);
  };

  const commit = () => {
    const v = value.trim();
    if (v.length === 0) {
      setValue(prev.current);
    } else if (v !== prev.current) {
      updateEdgeLabel(id, v);
      prev.current = v;
    }
    setEditing(false);
  };

  const cancel = () => {
    setValue(prev.current);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") cancel();
        }}
        style={{
          fontSize: 12,
          padding: "1px 4px",
          border: "1px solid #999",
          borderRadius: 4,
          background: "#fff",
          color: "#111",
        }}
      />
    );
  }

  const insertNodeOnEdge = (edgeId: string, type: string) => {
    const edge = edges.find((e) => e.id === edgeId);
    if (!edge) return;
    const source = nodes.find((n) => n.id === edge.source);
    const target = nodes.find((n) => n.id === edge.target);
    if (!source || !target) return;

    const midX = (source.position.x + target.position.x) / 2;
    const midY = (source.position.y + target.position.y) / 2;
    const idNew = `${type}-${Date.now()}`;

    const defaults: Record<string, any> = {
      text: { title: "Texto", description: "" },
      options: { title: "Opções", options: [{ id: "opt1", label: "Opção 1" }] },
      backgroundProcess: { title: "Processo", description: "" },
      supportTicket: { title: "Ticket", department: "", priority: "" },
      proxy: { title: "Proxy", endpoint: "", method: "GET" },
      message: { title: "Message", text: "" },
      question: { title: "Question", prompt: "Pergunta?", options: [{ id: "yes", label: "Sim" }, { id: "no", label: "Não" }] },
      condition: { title: "Condition", expression: "ctx.ok === true" },
      delay: { title: "Delay", ms: 1000 },
      api: { title: "API", url: "https://api.example.com", method: "GET" },
    };

    const newNode = {
      id: idNew,
      type,
      position: { x: midX, y: midY },
      data: (defaults as any)[type] || { title: type },
    } as any;

    const preservedLabel = (typeof edge.label === "string" ? edge.label : (edge as any).labelText) || "next";
    const newEdges = [
      {
        id: `${edge.source}-${idNew}-${Date.now()}`,
        source: edge.source,
        target: idNew,
        sourceHandle: edge.sourceHandle,
        label: preservedLabel,
        type: "smoothstep",
      },
      {
        id: `${idNew}-${edge.target}-${Date.now()}`,
        source: idNew,
        target: edge.target,
        label: "next",
        type: "smoothstep",
      },
    ];

    setNodes((prev: any) => [...prev, newNode]);
    setEdges((prev: any) => [...prev.filter((e: any) => e.id !== edgeId), ...newEdges]);
    setMenuOpen(false);
  };

  const allowedTypes = [
    { key: "text", label: "Texto" },
    { key: "options", label: "Opções" },
    { key: "message", label: "Message" },
    { key: "question", label: "Question" },
    { key: "condition", label: "Condition" },
    { key: "delay", label: "Delay" },
    { key: "api", label: "API" },
    { key: "backgroundProcess", label: "Processo" },
    { key: "supportTicket", label: "Suporte" },
    { key: "proxy", label: "Proxy" },
  ];

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, position: "relative" }}>
      <span
        onDoubleClick={startEdit}
        title={warning ? "Label inconsistente" : undefined}
        style={{
          cursor: "text",
          fontSize: 12,
          padding: "2px 6px",
          borderRadius: 6,
          background: warning ? "#FEF3C7" : "#EEF2FF",
          color: warning ? "#92400E" : "#3730A3",
          border: warning ? "1px solid #F59E0B" : "1px solid #CBD5E1",
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {warning && <span>⚠</span>}
        {text}
      </span>
      <button
        onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
        title="Inserir nó"
        style={{ fontSize: 12, padding: "2px 6px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" }}
      >
        +
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          const ok = confirm("Remover esta conexão? Esta ação não pode ser desfeita.");
          if (!ok) return;
          setEdges((prev: any) => prev.filter((ed: any) => ed.id !== id));
        }}
        title="Remover conexão"
        style={{ fontSize: 12, padding: "2px 6px", borderRadius: 6, border: "1px solid #ef4444", background: "#fff", color: "#ef4444", cursor: "pointer" }}
      >
        🗑
      </button>
      {menuOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ position: "absolute", top: "120%", left: 0, zIndex: 50, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, boxShadow: "0 6px 16px rgba(0,0,0,0.12)", padding: 6 }}
        >
          {allowedTypes.map((t) => (
            <button
              key={t.key}
              onClick={() => insertNodeOnEdge(id, t.key)}
              style={{ display: "block", width: "100%", textAlign: "left", fontSize: 12, padding: "6px 8px", borderRadius: 6, border: "none", background: "#fff", cursor: "pointer" }}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
    </span>
  );
}

