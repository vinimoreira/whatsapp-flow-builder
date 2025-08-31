import React from "react";
import { useFlowStore } from "../store/useFlowStore";

type Props = {
  id: string;
  text: string;
  warning?: boolean;
};

export default function EdgeLabelInline({ id, text, warning }: Props) {
  const { updateEdgeLabel } = useFlowStore();
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(text);
  const prev = React.useRef(text);

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

  return (
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
  );
}

