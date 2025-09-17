import React from "react";
import type { Condition } from "../../types/conditions";
import { Comparison } from "../../types/conditions";

const comparisonNeedsValues = (c: Comparison) =>
  ![Comparison.Always, Comparison.HasValue, Comparison.Empty].includes(c);

type Props = {
  initialConditions: Condition[];
  onChange: (conditions: Condition[]) => void;
  onClose: () => void;
};

export function ConditionBuilder({ initialConditions, onChange, onClose }: Props) {
  const [conditions, setConditions] = React.useState<Condition[]>(() =>
    JSON.parse(JSON.stringify(initialConditions)) // deep copy
  );

  const updateCondition = <K extends keyof Condition>(
    index: number,
    field: K,
    value: Condition[K]
  ) => {
    setConditions((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  };

  const addCondition = () => {
    setConditions((prev) => [
      ...prev,
      { Source: "", Comparison: Comparison.Equals, Values: [""] },
    ]);
  };

  const removeCondition = (index: number) => {
    setConditions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    for (const c of conditions) {
      if (!c.Source.trim()) {
        alert("O campo 'Fonte' da condição não pode estar vazio.");
        return;
      }
      if (comparisonNeedsValues(c.Comparison) && (!c.Values || c.Values.length === 0 || !c.Values[0])) {
        alert(`A comparação '${Comparison[c.Comparison]}' requer ao menos um valor.`);
        return;
      }
    }
    onChange(conditions);
    onClose();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        top: "120%",
        left: 0,
        zIndex: 100,
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
        padding: 12,
        width: 480,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Editor de Condições</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 300, overflowY: "auto", paddingRight: 6 }}>
        {conditions.map((cond, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", gap: 6, border: '1px solid #ddd', borderRadius: 6, padding: 8 }}>
            <input
              type="text"
              placeholder="context.variavel"
              value={cond.Source}
              onChange={(e) => updateCondition(index, "Source", e.target.value)}
              style={{ flex: 1, fontSize: 12, padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' }}
            />
            <select
              value={cond.Comparison}
              onChange={(e) => updateCondition(index, "Comparison", Number(e.target.value))}
              style={{ flex: 1, fontSize: 12, padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' }}
            >
              {Object.entries(Comparison)
                .filter(([key]) => isNaN(Number(key)))
                .map(([key, value]) => (
                  <option key={value} value={value}>
                    {key}
                  </option>
                ))}
            </select>
            <input
              type="text"
              placeholder="Valores (separados por vírgula)"
              disabled={!comparisonNeedsValues(cond.Comparison)}
              value={cond.Values?.join(",") || ""}
              onChange={(e) => updateCondition(index, "Values", e.target.value.split(",").map(s => s.trim()))}
              style={{ flex: 1, fontSize: 12, padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc' }}
            />
            <button onClick={() => removeCondition(index)} style={{ border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontSize: 16, padding: 4 }}>
              &times;
            </button>
          </div>
        ))}
        {conditions.length === 0 && <span style={{fontSize: 12, color: '#666'}}>Sem condições. A transição sempre ocorrerá.</span>}
      </div>
      <button onClick={addCondition} style={{ fontSize: 12, padding: '6px 8px', borderRadius: 6, border: '1px solid #3b82f6', background: '#eff6ff', color: '#2563eb', cursor: 'pointer' }}>
        + Adicionar Condição
      </button>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, borderTop: '1px solid #eee', paddingTop: 12 }}>
        <button onClick={onClose} style={{ fontSize: 12, padding: '6px 12px', borderRadius: 6, border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>Cancelar</button>
        <button onClick={handleSave} style={{ fontSize: 12, padding: '6px 12px', borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>Salvar</button>
      </div>
    </div>
  );
}
