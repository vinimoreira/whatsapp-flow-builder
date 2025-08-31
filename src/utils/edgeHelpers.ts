import type { Node } from "reactflow";

export function isFromQuestion(node?: Node | null) {
  return !!node && node.type === "question";
}

export function isFromCondition(node?: Node | null) {
  return !!node && node.type === "condition";
}

export function labelMatchesQuestionOptions(label: string, options: Array<{ id: string; label: string }>) {
  if (!label) return false;
  return options.some((o) => o.label === label);
}

export function labelIsBoolean(label: string) {
  return label === "true" || label === "false";
}

