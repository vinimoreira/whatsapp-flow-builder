import { ReactFlowProvider } from "reactflow";
import FlowCanvas from "./FlowCanvas";

export default function FlowCanvasWrapper() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlowProvider>
        <FlowCanvas />
      </ReactFlowProvider>
    </div>
  );
}