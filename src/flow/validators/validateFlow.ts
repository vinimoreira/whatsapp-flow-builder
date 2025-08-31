import type { Edge, Node } from "reactflow";
import { findStartNode, getOutgoingEdges, labelOfEdge, findReachableNodes } from "../../utils/graphHelpers";

type Result = { valid: boolean; errors: string[]; warnings: string[] };

const HTTP_METHODS = new Set(["GET", "POST", "PUT", "DELETE"]);

export function validateFlow(nodes: Node[], edges: Edge[]): Result {
  const errors: string[] = [];
  const warnings: string[] = [];

  const starts = nodes.filter((n) => n.type === "start");
  if (starts.length !== 1) {
    errors.push("Fluxo precisa de exatamente 1 Start.");
  }

  const start = findStartNode(nodes);
  if (start) {
    const reachable = findReachableNodes(start.id, edges);
    const endReachable = nodes.some((n) => n.type === "end" && reachable.has(n.id));
    if (!endReachable) {
      errors.push("Pelo menos um End deve ser alcançável a partir do Start.");
    }
  }

  // Map for quick lookup
  const idToNode = new Map(nodes.map((n) => [n.id, n] as const));

  // Edges checks
  for (const e of edges) {
    const lbl = labelOfEdge(e) ?? (typeof e.label === "string" ? e.label : "");
    if (!lbl || lbl.trim().length === 0) {
      errors.push(`Aresta ${e.id} sem label.`);
    }
  }

  // Node specific
  for (const n of nodes) {
    const t = n.type as string;
    const data: any = n.data || {};
    const out = getOutgoingEdges(edges, n.id);

    if (t === "question") {
      const opts: Array<{ id: string; label: string }> = Array.isArray(data.options) ? data.options : [];
      if (opts.length < 1) errors.push(`Question ${n.id} não possui opções.`);
      const outLabels = new Set(out.map((e) => (labelOfEdge(e) ?? "")).filter((x) => x));
      for (const o of opts) {
        if (!outLabels.has(o.label)) {
          errors.push(`Question ${n.id} possui opção '${o.label}' sem aresta de saída correspondente.`);
        }
      }
    }

    if (t === "condition") {
      const labels = out.map((e) => labelOfEdge(e) ?? "");
      const hasTrue = labels.includes("true");
      const hasFalse = labels.includes("false");
      if (!(hasTrue && hasFalse) || out.length !== 2) {
        errors.push(`Condition ${n.id} precisa de exatamente duas transições: 'true' e 'false'.`);
      }
    }

    if (t === "delay") {
      const ms = Number(data.ms);
      if (!Number.isFinite(ms) || ms <= 0) errors.push(`Delay ${n.id} possui 'ms' inválido (deve ser > 0).`);
    }

    if (t === "api") {
      const method = data.method;
      const url = String(data.url || "");
      if (!url || !isValidUrl(url)) errors.push(`API ${n.id} sem URL válida.`);
      if (!HTTP_METHODS.has(method)) errors.push(`API ${n.id} método inválido (use GET/POST/PUT/DELETE).`);
      if (method === "POST" || method === "PUT") {
        if (typeof data.bodyTemplate === "string" && data.bodyTemplate.trim().length > 0) {
          try {
            JSON.parse(data.bodyTemplate);
          } catch {
            errors.push(`API ${n.id} possui bodyTemplate inválido (JSON).`);
          }
        }
      }
    }
  }

  // Condition edge label rules and Question label rules
  for (const e of edges) {
    const src = idToNode.get(e.source);
    if (!src) continue;
    const lbl = (labelOfEdge(e) ?? "").trim();
    if (src.type === "question") {
      const opts: Array<{ label: string }> = Array.isArray(src.data?.options) ? src.data.options : [];
      if (!opts.some((o) => o.label === lbl)) {
        errors.push(`Aresta ${e.id} saindo de Question ${src.id} possui label '${lbl}' que não corresponde a nenhuma opção.`);
      }
    }
    if (src.type === "condition") {
      if (!(lbl === "true" || lbl === "false")) {
        errors.push(`Aresta ${e.id} de Condition ${src.id} deve ter label 'true' ou 'false'.`);
      }
    }
  }

  // Cycle detection warning: if any cycle without a Delay node
  const cycles = findCycles(nodes, edges);
  if (cycles.length) {
    for (const cyc of cycles) {
      const hasDelay = cyc.some((id) => idToNode.get(id)?.type === "delay");
      if (!hasDelay) warnings.push("Ciclo detectado sem Delay — considere adicionar um Delay para evitar loops rápidos.");
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function findCycles(nodes: Node[], edges: Edge[]): string[][] {
  const adj = new Map<string, string[]>();
  for (const n of nodes) adj.set(n.id, []);
  for (const e of edges) adj.get(e.source)?.push(e.target);

  const cycles: string[][] = [];
  const visited = new Set<string>();
  const stack = new Set<string>();
  const path: string[] = [];

  const dfs = (u: string) => {
    visited.add(u);
    stack.add(u);
    path.push(u);
    for (const v of adj.get(u) || []) {
      if (!visited.has(v)) {
        dfs(v);
      } else if (stack.has(v)) {
        // cycle found; extract from v to end
        const idx = path.indexOf(v);
        if (idx >= 0) cycles.push(path.slice(idx));
      }
    }
    stack.delete(u);
    path.pop();
  };

  for (const n of nodes) {
    if (!visited.has(n.id)) dfs(n.id);
  }
  return cycles;
}

