// src/flow/NodeTypes.tsx
import { Handle, Position } from "reactflow";

function Header({ icon, title, color, badge }: { icon: string; title: string; color: string; badge?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: color, color: "#fff", borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span style={{ fontSize: 13, fontWeight: 600 }}>{title}</span>
      {badge && (
        <span style={{ marginLeft: "auto", fontSize: 11, background: "rgba(255,255,255,0.2)", padding: "2px 6px", borderRadius: 6 }}>
          {badge}
        </span>
      )}
    </div>
  );
}

function Box({ children }: { children?: React.ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        background: "#fff",
        minWidth: 180,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </div>
  );
}

// ---------- Node Components ----------

export const StartNode = ({ data }: any) => (
  <div>
    <Box>
      <Header icon="▶" title={data?.title || "Start"} color="#10B981" />
    </Box>
    <Handle type="source" position={Position.Right} />
  </div>
);

export const MessageNode = ({ data }: any) => (
  <div>
    <Handle type="target" position={Position.Left} />
    <Box>
      <Header icon="💬" title={data?.title || "Message"} color="#3B82F6" />
    </Box>
    <Handle type="source" position={Position.Right} />
  </div>
);

export const QuestionNode = ({ data }: any) => (
  <div>
    <Handle type="target" position={Position.Left} />
    <Box>
      <Header icon="❓" title={data?.title || "Question"} color="#8B5CF6" />
    </Box>
    <Handle type="source" position={Position.Right} />
  </div>
);

export const ConditionNode = ({ data }: any) => (
  <div title={data?.expression ? `Expr: ${data.expression}` : undefined}>
    <Handle type="target" position={Position.Left} />
    <Box>
      <Header icon="⚖️" title={data?.title || "Condition"} color="#F59E0B" />
    </Box>
    <Handle type="source" position={Position.Right} id="true" style={{ top: "30%" }} />
    <Handle type="source" position={Position.Right} id="false" style={{ top: "70%" }} />
  </div>
);

export const DelayNode = ({ data }: any) => (
  <div>
    <Handle type="target" position={Position.Left} />
    <Box>
      <Header icon="⏱️" title={data?.title || "Delay"} color="#EC4899" badge={typeof data?.ms === "number" ? `${data.ms} ms` : undefined} />
    </Box>
    <Handle type="source" position={Position.Right} />
  </div>
);

export const ApiNode = ({ data }: any) => (
  <div>
    <Handle type="target" position={Position.Left} />
    <Box>
      <Header icon="🌐" title={data?.title || "API"} color="#10B981" badge={data?.method} />
    </Box>
    <Handle type="source" position={Position.Right} />
  </div>
);

export const EndNode = ({ data }: any) => (
  <div>
    <Handle type="target" position={Position.Left} />
    <Box>
      <Header icon="⏹️" title={data?.title || "End"} color="#6B7280" />
    </Box>
  </div>
);

// ---------- Export all nodeTypes ----------
export const nodeTypes = {
  start: StartNode,
  message: MessageNode,
  question: QuestionNode,
  condition: ConditionNode,
  delay: DelayNode,
  api: ApiNode,
  end: EndNode,
};
