import React from "react";
import FlowCanvasWrapper from "./flow/FlowCanvasWrapper";
import TopBar from "./components/TopBar";
import LeftPalette from "./flow/LeftPalette";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar />
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        <LeftPalette />
        <div style={{ flex: 1, minWidth: 0 }}>
          <FlowCanvasWrapper />
        </div>
      </div>
    </div>
  );
}

export default App;
