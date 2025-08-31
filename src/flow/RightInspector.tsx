import React from "react";
import { useFlowStore } from "../store/useFlowStore";
import { labelIsBoolean, labelMatchesQuestionOptions, isFromCondition, isFromQuestion } from "../utils/edgeHelpers";

export default function RightInspector() {
  const { edges, nodes, selectedEdgeId, updateEdgeLabel } = useFlowStore();
  const edge = edges.find((e) => e.id === selectedEdgeId);

  if (!edge) {
    return (
      <aside style={{ width: 260, borderLeft: "1px solid #eee", padding: 12 }}>
        <h4 style={{ marginBottom: 8 }}>Inspector</h4>
        <div style={{ color: "#6b7280", fontSize: 12 }}>Selecione uma aresta para editar o label.</div>
      </aside>
    );
  }

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
    <aside style={{ width: 260, borderLeft: "1px solid #eee", padding: 12 }}>
      <h4 style={{ marginBottom: 8 }}>Inspector</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 12, color: "#374151" }}>Label</label>
        <input
          value={labelText}
          onChange={(e) => {
            const v = e.target.value;
            if (v.trim().length === 0) return;
            updateEdgeLabel(edge.id, v);
          }}
          style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 8px", fontSize: 13 }}
        />
        {warnMsg && (
          <div style={{ fontSize: 12, color: "#92400E", background: "#FEF3C7", border: "1px solid #F59E0B", borderRadius: 6, padding: 8 }}>
            ⚠ {warnMsg}
          </div>
        )}
      </div>
    </aside>
  );
}

