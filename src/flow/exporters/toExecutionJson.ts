import type { Edge, Node } from "reactflow";
import { findStartNode, getOutgoingEdges, mapTransitions } from "../../utils/graphHelpers";

type ExecStep = Record<string, any> & { id: string; type: string };

export function toExecutionJson(nodes: Node[], edges: Edge[]) {
  const start = findStartNode(nodes);
  if (!start) throw new Error("Fluxo inválido: nenhum nó Start encontrado.");
  if (nodes.filter((n) => n.type === "start").length !== 1) throw new Error("Fluxo inválido: deve haver exatamente 1 nó Start.");

  // Deterministic: sort nodes by topological-ish order anchored by start id ordering
  // Simpler approach: BFS from start, then append remaining nodes by id
  const order: Node[] = [];
  const visited = new Set<string>();
  const idToNode = new Map(nodes.map((n) => [n.id, n] as const));
  const queue: string[] = [start.id];
  while (queue.length) {
    const id = queue.shift()!;
    if (visited.has(id)) continue;
    const node = idToNode.get(id);
    if (!node) continue;
    visited.add(id);
    order.push(node);
    const outs = getOutgoingEdges(edges, id).map((e) => e.target).sort();
    queue.push(...outs);
  }
  const rest = nodes.filter((n) => !visited.has(n.id)).sort((a, b) => a.id.localeCompare(b.id));
  order.push(...rest);

  const steps: ExecStep[] = order.map((n) => buildStep(n, edges));
  return { version: 1, entry: start.id, steps };
}

function buildStep(node: Node, edges: Edge[]): ExecStep {
  const t = node.type as string;
  const data: any = node.data || {};
  const outgoing = getOutgoingEdges(edges, node.id);

  if (t === "start") {
    const next = outgoing[0]?.target || undefined;
    const step: ExecStep = { id: node.id, type: t };
    if (next) step.next = next;
    return step;
  }

  if (t === "end") {
    return { id: node.id, type: t };
  }

  if (t === "message") {
    const next = outgoing[0]?.target || undefined;
    const step: ExecStep = {
      id: node.id,
      type: t,
      text: data.text ?? "",
      mediaUrl: data.mediaUrl ?? null,
    };
    if (next) step.next = next;
    return step;
  }

  if (t === "question") {
    const transitions = mapTransitions(node.id, edges);
    const options: string[] = Array.isArray(data.options) ? data.options.map((o: any) => o.label) : [];
    return {
      id: node.id,
      type: t,
      prompt: data.prompt ?? "",
      options,
      transitions,
    };
  }

  if (t === "condition") {
    const transitions = mapTransitions(node.id, edges);
    return {
      id: node.id,
      type: t,
      expression: data.expression ?? "",
      transitions,
    };
  }

  if (t === "delay") {
    const next = outgoing[0]?.target || undefined;
    const step: ExecStep = {
      id: node.id,
      type: t,
      ms: Number.isFinite(Number(data.ms)) ? Number(data.ms) : 0,
    };
    if (next) step.next = next;
    return step;
  }

  if (t === "api") {
    const next = outgoing[0]?.target || undefined;
    const headersObj: Record<string, string> = {};
    if (Array.isArray(data.headers)) {
      for (const kv of data.headers) {
        if (kv && typeof kv.key === "string" && kv.key.trim().length > 0) {
          headersObj[kv.key] = String(kv.value ?? "");
        }
      }
    }
    const req = {
      method: data.method || "GET",
      url: data.url || "",
      headers: headersObj,
      body: safeJsonParse(data.bodyTemplate),
    };
    const step: ExecStep = {
      id: node.id,
      type: t,
      request: req,
      saveAs: "ctx.last_api",
    };
    if (next) step.next = next;
    return step;
  }

  // default passthrough
  return { id: node.id, type: t } as ExecStep;
}

function safeJsonParse(v: any): any {
  if (typeof v !== "string" || v.trim() === "") return undefined;
  try {
    return JSON.parse(v);
  } catch {
    return undefined;
  }
}

