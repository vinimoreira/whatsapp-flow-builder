import { ReactFlowProvider } from "reactflow";
import FlowCanvas from "./FlowCanvas";

export default function FlowCanvasWrapper() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlowProvider>
        <FlowCanvas />
      </ReactFlowProvider>
    </div>
  );
}
