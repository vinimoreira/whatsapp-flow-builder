import React from "react";
import FlowCanvasWrapper from "./flow/FlowCanvasWrapper";
import TopBar from "./components/TopBar";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar />
      <div style={{ flex: 1 }}>
        <FlowCanvasWrapper />
      </div>
    </div>
  );
}

export default App;
