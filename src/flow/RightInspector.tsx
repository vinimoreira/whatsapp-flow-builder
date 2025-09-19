import React from "react";
import { useFlowStore } from "../store/useFlowStore";

export default function RightInspector() {
  const { nodes, edges, selectedId, updateNodeData } = useFlowStore();

  const selectedNode = nodes.find((n) => n.id === selectedId);
  const selectedEdge = edges.find((e) => e.id === selectedId);

  return (
    <aside style={{ width: 320, borderLeft: "1px solid #eee", padding: 12, overflowY: "auto", background: "#fafafa" }}>
      <h4 style={{ marginTop: 0, marginBottom: 12, borderBottom: "1px solid #eee", paddingBottom: 8 }}>Inspector</h4>
      {!selectedNode && !selectedEdge && (
        <div style={{ color: "#6b7280", fontSize: 12 }}>Selecione um nó ou conexão.</div>
      )}
      {selectedEdge && <EdgeEditor edge={selectedEdge} />}
      {selectedNode && <NodeEditor node={selectedNode} onChange={updateNodeData} />}
    </aside>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
      <label style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{label}</label>
      {children}
    </div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ ...props.style, border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 8px", fontSize: 13 }} />;
}

// (TextArea removido)

function EdgeEditor({ edge }: { edge: any }) {
  return (
    <div>
      <Field label="ID da Conexão">
        <TextInput readOnly disabled value={edge.id} />
      </Field>
      <Field label="Origem">
        <TextInput readOnly disabled value={edge.source} />
      </Field>
      <Field label="Destino">
        <TextInput readOnly disabled value={edge.target} />
      </Field>
    </div>
  );
}

// (removido MessagesEditor não utilizado)

function NodeEditor({ node, onChange }: { node: any; onChange: (id: string, data: Record<string, any>) => void }) {
  const [local, setLocal] = React.useState<Record<string, any>>(node.data || {});

  React.useEffect(() => {
    setLocal(node.data || {});
  }, [node.id, node.data]);

  const setData = (newData: Record<string, any>) => {
    const next = { ...local, ...newData };
    setLocal(next);
    onChange(node.id, newData);
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ Description: e.target.value, title: e.target.value });
  }

  // (removido renderGenericEditor não utilizado)

  switch (node.type) {
    case 'text':
      return (
        <div>
          <Field label="ID do Passo">
            <TextInput readOnly disabled value={local.Id || node.id} />
          </Field>
          <Field label="Descrição (Título)">
            <TextInput value={local.Description || ""} onChange={handleDescriptionChange} />
          </Field>
          <div style={{fontSize: 12, color: '#374151', background: '#f3f4f6', padding: 10, borderRadius: 6, margin: '10px 0', border: '1px solid #e5e7eb'}}>
            Para editar as mensagens, dê um <strong>duplo clique</strong> no nó no canvas.
          </div>
          {Array.isArray(local.Failures) && <div style={{fontSize: 12, color: '#999', margin: '10px 0'}}>[Editor de Falhas (Failures) não implementado]</div>}
        </div>
      );
    case 'options':
    default:
      return (
        <div style={{ fontSize: 12, color: '#6b7280' }}>
          <p>Editor para o tipo de nó <strong>'{node.type}'</strong> não implementado.</p>
          <p>Dados do nó (somente leitura):</p>
          <pre style={{ background: '#eee', padding: 8, borderRadius: 4, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {JSON.stringify(node.data, null, 2)}
          </pre>
        </div>
      );
  }
}

// (estilos de botões não utilizados removidos)
