import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserContext from "./contexts/userContext";

ReactDOM.render(
  <UserContext>
    <App />
  </UserContext>,
  document.getElementById("root")
);
