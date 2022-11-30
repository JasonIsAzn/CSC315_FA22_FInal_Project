import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextWrapper from "./frontend/context/ContextWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextWrapper>
);
