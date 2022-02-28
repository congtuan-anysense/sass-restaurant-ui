import React from "react";
import ReactDOM from "react-dom";
import { Reset } from "app/reset";
import { Utility } from "app/utility";
import App from "app/App";

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
