import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserContext from "./contexts/userContext";

ReactDOM.render(
  <React.StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </React.StrictMode>,
  document.getElementById("root")
);
