import React from "react";
import ReactDOM from "react-dom/client";
import App from "@views/App";
import { BrowserRouter as Router } from "react-router-dom";
import ContextProvider from "@providers/ContextProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Router>
  </React.StrictMode>
);
