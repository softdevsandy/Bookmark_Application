import React, { useContext } from "react";
import "./App.css";
import Signup from "./auth/Signup";
import Home from "./components/Home";
import { UserContext } from "./contexts/userContext";

function App() {
  const { user } = useContext(UserContext);
  return <div className="App">{user ? <Home /> : <Signup />}</div>;
}

export default App;
