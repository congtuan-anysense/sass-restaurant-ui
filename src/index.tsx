import React from "react";
import ReactDOM from "react-dom";
import { Reset } from "reset";
import { Utility } from "utility";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <div className="bg-primary">
      <Reset />
      <Utility />
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
