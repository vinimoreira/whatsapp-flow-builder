import { create } from "zustand";
import type { Node, Edge } from "reactflow";

type FlowState = {
  nodes: Node[];
  edges: Edge[];
  setNodes: (updater: Node[] | ((prev: Node[]) => Node[])) => void;
  setEdges: (updater: Edge[] | ((prev: Edge[]) => Edge[])) => void;
  selectedId: string | null;
  setSelected: (id: string | null) => void;
  updateEdgeLabel: (edgeId: string, newLabel: string) => void;
  updateNodeData: (nodeId: string, data: Record<string, any>) => void;
};

export const useFlowStore = create<FlowState>((set) => ({
  nodes: [],
  edges: [],
  selectedId: null,
  setSelected: (id) => set(() => ({ selectedId: id })),
  setNodes: (updater) =>
    set((s) => ({ nodes: typeof updater === "function" ? (updater as any)(s.nodes) : updater })),
  setEdges: (updater) =>
    set((s) => ({ edges: typeof updater === "function" ? (updater as any)(s.edges) : updater })),
  updateEdgeLabel: (edgeId, newLabel) =>
    set((s) => ({
      edges: s.edges.map((e) => (e.id === edgeId ? { ...e, label: newLabel } : e)),
    })),
  updateNodeData: (nodeId, data) =>
    set((s) => ({
      nodes: s.nodes.map((n) => (n.id === nodeId ? { ...n, data: { ...(n.data || {}), ...data } } : n)),
    })),
}));
