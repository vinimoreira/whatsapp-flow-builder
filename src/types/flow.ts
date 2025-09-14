// src/types/flow.ts

export enum FlowType {
  Text = 'Text',
  BackgroundProcess = 'BackgroundProcess',
  Options = 'Options',
  Redirect = 'Redirect',
  SupportTicket = 'SupportTicket',
  EndConversation = 'EndConversation',
  Proxy = 'Proxy',
}

export enum MessageTypes {
  Text = 'Text',
  Template = 'Template',
}

export interface Message {
  order: number;
  text: string;
  type: MessageTypes;
}

export interface Action {
  key: string;
  conditions: string[];
  parameter: string | null;
  // A interface Failure precisa ser definida se for usada
  // failure: Failure;
}

export interface FlowItemData {
  title?: string;
  description?: string;
  // Outras propriedades específicas de cada tipo de nó
  [key: string]: any;
}

// Esta é a estrutura de um nó do ReactFlow
export interface FlowNode {
  id: string;
  type: FlowType;
  position: { x: number; y: number };
  data: FlowItemData;
}
