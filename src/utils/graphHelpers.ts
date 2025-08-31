import type { Edge, Node } from "reactflow";

export function findStartNode(nodes: Node[]): Node | undefined {
  return nodes.find((n) => n.type === "start");
}

export function getOutgoingEdges(edges: Edge[], nodeId: string): Edge[] {
  return edges.filter((e) => e.source === nodeId);
}

export function labelOfEdge(e: Edge): string | null {
  const raw = (e.label as any);
  if (typeof raw === "string") return raw;
  if (e.sourceHandle && (e.sourceHandle === "true" || e.sourceHandle === "false")) return e.sourceHandle;
  return null;
}

export function mapTransitions(nodeId: string, edges: Edge[]): Record<string, string> {
  const out = getOutgoingEdges(edges, nodeId);
  const entries = out
    .map((e) => {
      const key = labelOfEdge(e) ?? "next";
      return [key, e.target] as const;
    });
  // Deterministic order by key then target
  entries.sort((a, b) => (a[0] === b[0] ? a[1].localeCompare(b[1]) : a[0].localeCompare(b[0])));
  const obj: Record<string, string> = {};
  for (const [k, v] of entries) obj[k] = v;
  return obj;
}

export function sortTopologically(nodes: Node[], edges: Edge[]): Node[] {
  // Simple Kahn-like using ids; fallback to id sort to ensure determinism
  const inDeg = new Map<string, number>();
  const adj = new Map<string, string[]>();
  for (const n of nodes) {
    inDeg.set(n.id, 0);
    adj.set(n.id, []);
  }
  for (const e of edges) {
    if (inDeg.has(e.target)) inDeg.set(e.target, (inDeg.get(e.target) || 0) + 1);
    if (adj.has(e.source)) adj.get(e.source)!.push(e.target);
  }
  const q = nodes.filter((n) => (inDeg.get(n.id) || 0) === 0).sort((a, b) => a.id.localeCompare(b.id));
  const result: Node[] = [];
  const seen = new Set<string>();
  while (q.length) {
    const n = q.shift()!;
    if (seen.has(n.id)) continue;
    seen.add(n.id);
    result.push(n);
    for (const v of adj.get(n.id) || []) {
      inDeg.set(v, (inDeg.get(v) || 0) - 1);
      if ((inDeg.get(v) || 0) === 0) {
        const target = nodes.find((x) => x.id === v);
        if (target) q.push(target);
        q.sort((a, b) => a.id.localeCompare(b.id));
      }
    }
  }
  if (result.length !== nodes.length) {
    // cycle present; append remaining nodes in id order deterministically
    const remaining = nodes.filter((n) => !seen.has(n.id)).sort((a, b) => a.id.localeCompare(b.id));
    result.push(...remaining);
  }
  return result;
}

export function findReachableNodes(startId: string, edges: Edge[]): Set<string> {
  const adj = new Map<string, string[]>();
  for (const e of edges) {
    if (!adj.has(e.source)) adj.set(e.source, []);
    adj.get(e.source)!.push(e.target);
  }
  const visited = new Set<string>();
  const stack: string[] = [startId];
  while (stack.length) {
    const id = stack.pop()!;
    if (visited.has(id)) continue;
    visited.add(id);
    const outs = adj.get(id) || [];
    for (const v of outs) if (!visited.has(v)) stack.push(v);
  }
  return visited;
}
