// LeftPalette.tsx — apenas tipos suportados pelo backend/exemplo inicial
const PALETTE = [
  { type: "start", label: "Start" },
  { type: "text", label: "Texto" },
  { type: "options", label: "Opções" },
  { type: "backgroundProcess", label: "Processo" },
  { type: "redirect", label: "Redirecionar" },
  { type: "supportTicket", label: "Ticket" },
  { type: "endConversation", label: "Encerrar Conversa" },
  { type: "proxy", label: "Proxy" },
  { type: "end", label: "End" },
];

export default function LeftPalette() {
  const onDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside style={{ width: 220, borderRight: "1px solid #eee", padding: 12 }}>
      <h4 style={{ marginBottom: 8 }}>Componentes</h4>
      {PALETTE.map((item) => (
        <div
          key={item.type}
          draggable
          onDragStart={(e) => onDragStart(e, item.type)}
          style={{ padding: 8, marginBottom: 8, border: "1px dashed #aaa", borderRadius: 8, cursor: "grab", background: "#fff" }}
        >
          {item.label}
        </div>
      ))}
    </aside>
  );
}
