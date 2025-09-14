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
} from "reactflow";
import "reactflow/dist/style.css";
import { useFlowStore } from "../store/useFlowStore";
import { nodeTypes } from "./NodeTypes";
import EdgeLabelInline from "./EdgeLabelInline";
import { isFromCondition, isFromQuestion, labelIsBoolean, labelMatchesQuestionOptions } from "../utils/edgeHelpers";

export default function FlowCanvas() {
  const { nodes, edges, setNodes, setEdges, setSelected, saveFlow, autoSave } = useFlowStore();

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

  return (
    <div style={{ width: "100%", height: "100%" }}>
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
