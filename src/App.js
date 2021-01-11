import React, { useContext } from "react";
import Signup from "./auth/Signup";
import Home from "./components/Home";
import { UserContext } from "./contexts/userContext";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

function App() {
  const { user, Theme } = useContext(UserContext);

  const theme = createMuiTheme({
    palette: {
      primary: {
        // Mainbar
        main: Theme.appColor,
      },
      warning: {
        main: Theme.cardColor,
      },
      grey: {
        // Link
        50: "#fafafa",
        // List BackGround
        600: "#575C5C",
      },
      background: {
        default: Theme.backGround,
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Home />
        {/* {user ? <Home /> : <Signup />} */}
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
