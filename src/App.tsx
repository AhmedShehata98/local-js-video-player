import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Router/Routes";

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
