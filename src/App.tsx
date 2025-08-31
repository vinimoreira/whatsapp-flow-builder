import FlowCanvasWrapper from "./flow/FlowCanvasWrapper";
import LeftPalette from "./flow/LeftPalette";

function App() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", height: "100vh" }}>
      <LeftPalette />
      <FlowCanvasWrapper  />
    </div>
  );
}

export default App;
