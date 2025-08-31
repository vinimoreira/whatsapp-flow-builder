import { create } from "zustand";
import type { Node, Edge } from "reactflow";

type FlowState = {
  nodes: Node[];
  edges: Edge[];
  setNodes: (updater: Node[] | ((prev: Node[]) => Node[])) => void;
  setEdges: (updater: Edge[] | ((prev: Edge[]) => Edge[])) => void;
  selectedEdgeId: string | null;
  setSelectedEdgeId: (id: string | null) => void;
  updateEdgeLabel: (edgeId: string, newLabel: string) => void;
};

export const useFlowStore = create<FlowState>((set) => ({
  nodes: [],
  edges: [],
  selectedEdgeId: null,
  setSelectedEdgeId: (id) => set(() => ({ selectedEdgeId: id })),
  setNodes: (updater) =>
    set((s) => ({ nodes: typeof updater === "function" ? (updater as any)(s.nodes) : updater })),
  setEdges: (updater) =>
    set((s) => ({ edges: typeof updater === "function" ? (updater as any)(s.edges) : updater })),
  updateEdgeLabel: (edgeId, newLabel) =>
    set((s) => ({
      edges: s.edges.map((e) => (e.id === edgeId ? { ...e, label: newLabel } : e)),
    })),
}));
