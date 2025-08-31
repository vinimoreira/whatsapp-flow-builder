// LeftPalette.tsx
const PALETTE = [
  { type: "start", label: "Start" },
  { type: "message", label: "Message" },
  { type: "question", label: "Question" },
  { type: "condition", label: "Condition" },
  { type: "delay", label: "Delay" },
  { type: "api", label: "API" },
  { type: "end", label: "End" },
];

export default function LeftPalette() {
  const onDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside style={{ width: 220, borderRight: "1px solid #eee", padding: 12 }}>
      <h4 style={{ marginBottom: 8 }}>Blocks</h4>
      {PALETTE.map((item) => (
        <div
          key={item.type}
          draggable
          onDragStart={(e) => onDragStart(e, item.type)}
          style={{ padding: 8, marginBottom: 8, border: "1px dashed #aaa", borderRadius: 8, cursor: "grab" }}
        >
          {item.label}
        </div>
      ))}
    </aside>
  );
}
