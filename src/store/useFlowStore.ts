import { create } from "zustand";
import type { Node, Edge } from "reactflow";

type FlowState = {
  nodes: Node[];
  edges: Edge[];
  setNodes: (updater: Node[] | ((prev: Node[]) => Node[])) => void;
  setEdges: (updater: Edge[] | ((prev: Edge[]) => Edge[])) => void;
};

export const useFlowStore = create<FlowState>((set) => ({
  nodes: [],
  edges: [],
  setNodes: (updater) =>
    set((s) => ({ nodes: typeof updater === "function" ? (updater as any)(s.nodes) : updater })),
  setEdges: (updater) =>
    set((s) => ({ edges: typeof updater === "function" ? (updater as any)(s.edges) : updater })),
}));
