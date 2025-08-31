import { create } from "zustand";
import type { Node, Edge } from "reactflow";
import { saveToLocalStorage, loadFromLocalStorage, clearLocalStorageKey } from "../utils/storage";
import { flowSchema } from "../utils/schemas";

type FlowState = {
  nodes: Node[];
  edges: Edge[];
  setNodes: (updater: Node[] | ((prev: Node[]) => Node[])) => void;
  setEdges: (updater: Edge[] | ((prev: Edge[]) => Edge[])) => void;
  selectedId: string | null;
  setSelected: (id: string | null) => void;
  updateEdgeLabel: (edgeId: string, newLabel: string) => void;
  updateNodeData: (nodeId: string, data: Record<string, any>) => void;
  saveFlow: () => void;
  loadFlow: () => { ok: boolean; message: string };
  autoSave: boolean;
  setAutoSave: (v: boolean) => void;
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
  saveFlow: () =>
    set((s) => {
      const payload = { version: 1, nodes: s.nodes, edges: s.edges };
      saveToLocalStorage("flow-builder-state", payload);
      return {} as any;
    }),
  loadFlow: () => {
    const data = loadFromLocalStorage<any>("flow-builder-state");
    if (!data) return { ok: false, message: "Nenhum fluxo encontrado." };
    const parsed = flowSchema.safeParse(data);
    if (!parsed.success) {
      clearLocalStorageKey("flow-builder-state");
      return { ok: false, message: "Dados inválidos no armazenamento. Chave limpa." };
    }
    set(() => ({ nodes: parsed.data.nodes as Node[], edges: parsed.data.edges as Edge[] }));
    return { ok: true, message: "Fluxo carregado." };
  },
  autoSave: true,
  setAutoSave: (v) => set(() => ({ autoSave: v })),
}));
