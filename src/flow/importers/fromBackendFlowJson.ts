import type { Edge, Node } from 'reactflow';
import type { Condition } from '../../types/conditions';

// Based on documentacao/flow.example.jsonc
type BackendStep = {
  Id: number;
  Type: number;
  Startup?: boolean;
  Description: string;
  Messages?: { Order: number; Text: string; Type: string }[];
  Failures?: any[];
  NextFlow?: {
    Options: {
      Conditions: Condition[];
      FlowItemId: number;
    }[];
  };
  Metadata?: any;
  OutputActions?: any;
  RequestContent?: any;
  ResponseContent?: any;
  TopicName?: string;
  SubscriptionName?: string;
  SubscriptionTopicName?: string;
};

const typeMap: { [key: number]: string } = {
  1: 'text',
  2: 'backgroundProcess',
  3: 'options',
  5: 'supportTicket',
  6: 'endConversation',
  7: 'proxy',
};

function getPosition(index: number) {
  const nodesPerRow = 4;
  const row = Math.floor(index / nodesPerRow);
  const col = index % nodesPerRow;
  return {
    x: col * 300 + 100,
    y: row * 220 + 100,
  };
}

export function fromBackendFlowJson(jsoncText: string): { nodes: Node[]; edges: Edge[]; meta: { warnings: string[] } } {
  const warnings: string[] = [];

  // Remove comments and parse
  const jsonText = jsoncText.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  let backendFlow: BackendStep[];
  try {
    backendFlow = JSON.parse(jsonText);
  } catch (e) {
    throw new Error("JSON inválido: " + (e as Error).message);
  }

  if (!Array.isArray(backendFlow)) {
    throw new Error("Formato inválido: O JSON deve ser um array de passos.");
  }

  // Map steps to nodes
  const nodes: Node[] = backendFlow.map((step, index) => {
    const nodeType = typeMap[step.Type];
    if (!nodeType) {
      warnings.push(`Passo ${step.Id} tem um tipo desconhecido (${step.Type}) e será ignorado.`);
      return null;
    }

    const nodeData: Record<string, any> = {
      ...step,
      title: step.Description,
    };

    if (nodeType === 'options' && Array.isArray(step.Messages)) {
      const optionsText = step.Messages.find(m => m.Text.includes('\n'))?.Text;
      if (optionsText) {
        const options = optionsText.split('\n').map(line => {
          const match = line.match(/^(\d+)\s*-\s*(.*)$/);
          if (match) {
            return { id: match[1].trim(), label: match[2].trim() };
          }
          return null;
        }).filter((opt): opt is { id: string; label: string } => opt !== null);
        nodeData.options = options;
      }
    }

    return {
      id: String(step.Id),
      type: nodeType,
      position: getPosition(index),
      data: nodeData,
    };
  }).filter((n): n is Node => n !== null);

  // Map NextFlow to edges
  const edges: Edge[] = [];
  for (const step of backendFlow) {
    if (!step.NextFlow || !step.NextFlow.Options) continue;

    for (const option of step.NextFlow.Options) {
      const sourceId = String(step.Id);
      const targetId = String(option.FlowItemId);

      if (!nodes.some(n => n.id === sourceId) || !nodes.some(n => n.id === targetId)) {
        warnings.push(`Aresta de ${sourceId} para ${targetId} ignorada porque um dos nós não foi criado.`);
        continue;
      }

      edges.push({
        id: `e-${sourceId}-${targetId}-${JSON.stringify(option.Conditions)}`,
        source: sourceId,
        target: targetId,
        type: 'smoothstep',
        data: {
          conditions: option.Conditions,
        },
      });
    }
  }

  // Check for startup nodes
  const startupNodes = nodes.filter(n => n.data.Startup);
  if (startupNodes.length === 0) {
    warnings.push("Nenhum passo inicial (Startup: true) foi encontrado no fluxo.");
  } else if (startupNodes.length > 1) {
    warnings.push(`Múltiplos passos iniciais encontrados: ${startupNodes.map(n => n.id).join(', ')}.`);
  }

  return { nodes, edges, meta: { warnings } };
}
