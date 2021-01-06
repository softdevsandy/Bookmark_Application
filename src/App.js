import React, { useContext } from "react";
import "./App.css";
import Signup from "./auth/Signup";
import Home from "./components/Home";
import { UserContext } from "./contexts/userContext";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2d3436",
    },
  },
});

function App() {
  const { user } = useContext(UserContext);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <Home /> */}
        {user ? <Home /> : <Signup />}
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
