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
        minWidth: 220,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </div>
  );
}

function Body({ children }: { children?: React.ReactNode }) {
  return <div style={{ padding: "8px 10px", fontSize: 12, color: "#111", display: "grid", gap: 6 }}>{children}</div>;
}

const chipStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 6px",
  borderRadius: 6,
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  fontSize: 11,
  color: "#374151",
};

function truncate(text: string, len = 80) {
  if (!text) return "";
  return text.length > len ? text.slice(0, len - 1) + "…" : text;
}

function prettyMs(ms?: number) {
  if (!ms && ms !== 0) return "";
  if (ms < 1000) return `${ms} ms`;
  const s = Math.round(ms / 1000);
  return `${s}s`;
}

function shortUrl(url?: string) {
  if (!url) return "";
  try {
    const u = new URL(url);
    return u.host + u.pathname;
  } catch {
    return url.length > 40 ? url.slice(0, 39) + "…" : url;
  }
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
      {(data?.text || data?.mediaUrl) && (
        <Body>
          {data?.text && <div>{truncate(data.text, 120)}</div>}
          {data?.mediaUrl && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={chipStyle}>media</span>
              <span style={{ color: "#6b7280" }}>{truncate(String(data.mediaUrl), 60)}</span>
            </div>
          )}
        </Body>
      )}
    </Box>
    <Handle type="source" position={Position.Right} />
  </div>
);

export const QuestionNode = ({ data }: any) => (
  <div>
    <Handle type="target" position={Position.Left} />
    <Box>
      <Header icon="❓" title={data?.title || "Question"} color="#8B5CF6" />
      {(data?.prompt || (data?.options && data.options.length)) && (
        <Body>
          {data?.prompt && <div>{truncate(data.prompt, 100)}</div>}
          {Array.isArray(data?.options) && data.options.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {data.options.slice(0, 3).map((o: any) => (
                <span key={o.id} style={chipStyle}>{o.label}</span>
              ))}
              {data.options.length > 3 && (
                <span style={chipStyle}>+{data.options.length - 3}</span>
              )}
            </div>
          )}
        </Body>
      )}
    </Box>
    <Handle type="source" position={Position.Right} />
  </div>
);

export const ConditionNode = ({ data }: any) => (
  <div title={data?.expression ? `Expr: ${data.expression}` : undefined}>
    <Handle type="target" position={Position.Left} />
    <Box>
      <Header icon="⚖️" title={data?.title || "Condition"} color="#F59E0B" />
      {data?.expression && (
        <Body>
          <code style={{ background: "#F3F4F6", padding: "2px 6px", borderRadius: 6, fontSize: 11 }}>{truncate(String(data.expression), 100)}</code>
        </Body>
      )}
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
      {typeof data?.ms === "number" && (
        <Body>
          <div style={{ color: "#6b7280" }}>aprox. {prettyMs(Number(data.ms))}</div>
        </Body>
      )}
    </Box>
    <Handle type="source" position={Position.Right} />
  </div>
);

export const ApiNode = ({ data }: any) => (
  <div>
    <Handle type="target" position={Position.Left} />
    <Box>
      <Header icon="🌐" title={data?.title || "API"} color="#10B981" badge={data?.method} />
      {(data?.url || (data?.headers && data.headers.length)) && (
        <Body>
          {data?.url && <div style={{ color: "#111" }}>{shortUrl(String(data.url))}</div>}
          {Array.isArray(data?.headers) && data.headers.length > 0 && (
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={chipStyle}>{data.headers.length} headers</span>
            </div>
          )}
        </Body>
      )}
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
