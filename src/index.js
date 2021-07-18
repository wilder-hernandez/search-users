import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./container";
import { StoreProvider } from "./context";

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
