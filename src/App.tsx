import FlowCanvasWrapper from "./flow/FlowCanvasWrapper";
import LeftPalette from "./flow/LeftPalette";
import RightInspector from "./flow/RightInspector";

function App() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 260px", height: "100vh" }}>
      <LeftPalette />
      <FlowCanvasWrapper  />
      <RightInspector />
    </div>
  );
}

export default App;
