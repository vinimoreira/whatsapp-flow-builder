import FlowCanvasWrapper from "./flow/FlowCanvasWrapper";
import TopBar from "./components/TopBar";
import LeftPalette from "./flow/LeftPalette";
import RightInspector from "./flow/RightInspector";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar />
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        <LeftPalette />
        <div style={{ flex: 1, minWidth: 0 }}>
          <FlowCanvasWrapper />
        </div>
        <RightInspector />
      </div>
    </div>
  );
}

export default App;
