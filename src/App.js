import React, { useContext } from "react";
import Signup from "./auth/Signup";
import Home from "./components/Home";
import { UserContext } from "./contexts/userContext";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

function App() {
  const { user } = useContext(UserContext);

  const theme = createMuiTheme({
    palette: {
      primary: {
        // Mainbar
        main: "#2d3436",
      },
      warning: {
        main: "#436BD9",
      },
      grey: {
        // Link
        50: "#fafafa",
        // List BackGround
        600: "#575C5C",
      },
      background: {
        default: "#2C3232",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* <Home /> */}
        {user ? <Home /> : <Signup />}
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
