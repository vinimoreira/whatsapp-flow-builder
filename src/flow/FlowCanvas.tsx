// src/flow/FlowCanvas.tsx
import React from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type NodeChange,
  type EdgeChange,
  type Connection,
  MarkerType,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { useFlowStore } from "../store/useFlowStore";
import { nodeTypes } from "./NodeTypes";
import EdgeLabelInline from "./EdgeLabelInline";
import { isFromCondition, isFromQuestion, labelIsBoolean, labelMatchesQuestionOptions } from "../utils/edgeHelpers";

export default function FlowCanvas() {
  const { nodes, edges, setNodes, setEdges, setSelected, saveFlow, autoSave, selectedId } = useFlowStore();
  const rf = useReactFlow();
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  // Optional auto-save with debounce (~1s)
  React.useEffect(() => {
    if (!autoSave) return;
    const t = setTimeout(() => {
      saveFlow();
    }, 1000);
    return () => clearTimeout(t);
  }, [nodes, edges, autoSave, saveFlow]);

  // Removido suporte a drag-and-drop; adição será por menu contextual

  const onNodesChange = React.useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const onEdgesChange = React.useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onConnect = React.useCallback(
    (connection: Connection) => {
      const condLabel = connection.sourceHandle === "true" || connection.sourceHandle === "false"
        ? (connection.sourceHandle as string)
        : "next";
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: "smoothstep",
            label: condLabel,
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onSelectionChange = React.useCallback((params: { nodes: any[]; edges: any[] }) => {
    const firstNode = params.nodes?.[0];
    const firstEdge = params.edges?.[0];
    const id = firstNode?.id ?? firstEdge?.id ?? null;
    setSelected(id ?? null);
  }, [setSelected]);

  // Delete selected edge with Delete/Backspace (with confirmation)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Delete" && e.key !== "Backspace") return;
      const edge = edges.find((ed) => ed.id === selectedId);
      const node = nodes.find((nd) => nd.id === selectedId);
      if (!edge && !node) return;
      e.preventDefault();
      if (edge) {
        const ok = confirm("Remover esta conexão? Esta ação não pode ser desfeita.");
        if (!ok) return;
        setEdges((prev: any) => prev.filter((ed: any) => ed.id !== edge.id));
        return;
      }
      if (node) {
        const connected = edges.filter((ed) => ed.source === node.id || ed.target === node.id).length;
        const ok = confirm(
          connected > 0
            ? `Remover o nó "${node.data?.title || node.type}" e ${connected} conexão(ões) ligada(s) a ele?`
            : `Remover o nó "${node.data?.title || node.type}"?`
        );
        if (!ok) return;
        setNodes((prev: any[]) => prev.filter((n) => n.id !== node.id));
        setEdges((prev: any[]) => prev.filter((ed) => ed.source !== node.id && ed.target !== node.id));
        setSelected(null);
        return;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [edges, nodes, selectedId, setEdges, setNodes, setSelected]);

  const onDragOver = React.useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = React.useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;
    const bounds = wrapperRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const position = rf.project({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
    const id = `${type}-${Date.now()}`;
    const defaults: Record<string, any> = {
      start: { title: "Start" },
      end: { title: "End" },
      message: { title: "Message", text: "" },
      question: { title: "Question", prompt: "Pergunta?", options: [{ id: "yes", label: "Sim" }, { id: "no", label: "Não" }] },
      condition: { title: "Condition", expression: "ctx.ok === true" },
      delay: { title: "Delay", ms: 1000 },
      api: { title: "API", url: "https://api.example.com", method: "GET" },
      text: { title: "Texto", description: "" },
      options: { title: "Opções", options: [{ id: "opt1", label: "Opção 1" }] },
      backgroundProcess: { title: "Processo", description: "" },
      proxy: { title: "Proxy", endpoint: "", method: "GET" },
      supportTicket: { title: "Ticket de Suporte", department: "", priority: "" },
      redirect: { title: "Redirecionar", flowId: "" },
      endConversation: { title: "Encerrar Conversa" },
    };
    const data = (defaults as any)[type] || { title: type };
    setNodes((prev: any[]) => [...prev, { id, type, position, data }]);
  }, [rf, setNodes]);

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }} onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges.map((e) => {
          const sourceNode = nodes.find((n) => n.id === e.source);
          const fromQuestion = isFromQuestion(sourceNode);
          const fromCondition = isFromCondition(sourceNode);
          const labelText = typeof e.label === "string" ? e.label : (e.label as any) ?? "next";
          let warn = false;
          if (fromQuestion) {
            const options = (sourceNode?.data?.options ?? []) as Array<{ id: string; label: string }>;
            warn = !labelMatchesQuestionOptions(labelText, options);
          } else if (fromCondition) {
            warn = !labelIsBoolean(labelText);
          }
          return {
            ...e,
            label: (
              <EdgeLabelInline id={e.id} text={labelText} warning={warn} />
            ),
          };
        })}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onSelectionChange={onSelectionChange}
        defaultEdgeOptions={{ type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed } }}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
