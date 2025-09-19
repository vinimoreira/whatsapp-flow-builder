import React from "react";
import type { Condition } from "../types/conditions";
import { conditionsSummary } from "../types/conditions";
import { ConditionBuilder } from "../flow/edges/ConditionBuilder";

export type NextFlowItem = {
  id: string;
  targetId: string | null;
  conditions: Condition[];
};

type Props = {
  items: NextFlowItem[];
  onItemsChange: (items: NextFlowItem[]) => void;
  nodes: Array<{ id: string; type?: string; data?: any }>;
  currentId: string;
};

export default function NextFlowEditor({ items, onItemsChange, nodes, currentId }: Props) {
  const [editingCondIndex, setEditingCondIndex] = React.useState<number | null>(null);

  const setItem = (index: number, patch: Partial<NextFlowItem>) => {
    onItemsChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  };

  const removeItem = (index: number) => {
    onItemsChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    onItemsChange([
      ...(items || []),
      { id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, targetId: null, conditions: [] },
    ]);
  };

  return (
    <div style={{ fontSize: 12, color: "#111", marginTop: 4, borderTop: '1px solid #eee', paddingTop: 8 }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>Transições (NextFlow)</div>
      {(!items || items.length === 0) && (
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>Sem transições. Adicione ao menos uma opção.</div>
      )}
      <div style={{ display: 'grid', gap: 8 }}>
        {items.map((opt, idx) => (
          <div key={opt.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 8, background: '#f9fafb' }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#374151', minWidth: 70 }}>Destino:</span>
              <select
                value={opt.targetId ?? ''}
                onChange={(e) => setItem(idx, { targetId: e.target.value || null })}
                style={{ flex: 1, fontSize: 12, border: '1px solid #d1d5db', borderRadius: 6, padding: '4px 6px' }}
              >
                <option value="">— selecione —</option>
                {nodes
                  .filter((n) => n.id !== currentId)
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
                onClick={() => removeItem(idx)}
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
                onChange={(newConds) => setItem(idx, { conditions: newConds })}
                onClose={() => setEditingCondIndex(null)}
              />
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8 }}>
        <button
          onClick={addItem}
          style={{ fontSize: 12, padding: '6px 8px', borderRadius: 6, border: '1px solid #3b82f6', background: '#eff6ff', color: '#2563eb', cursor: 'pointer' }}
        >
          + Adicionar opção
        </button>
      </div>
    </div>
  );
}

