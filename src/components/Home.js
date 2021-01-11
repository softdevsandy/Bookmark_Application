import React, { useContext } from "react";
import MainBar from "./AppBar";
import ActionButtons from "./ActionButtons";
import Cards from "./Cards";
import AddBookmarkDialog from "./dialogs/addBookmark";
import AddCategoryDialog from "./dialogs/addCategory";
import Snackbar from "@material-ui/core/Snackbar";
import { UserContext } from "../contexts/userContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  snack: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: "#55efc4",
      width: "auto",
      [theme.breakpoints.up("sm")]: {
        minWidth: "auto",
      },
    },
    "& .MuiSnackbarContent-message": {
      padding: "1px 0",
    },
  },
}));

export default function Home() {
  const classes = useStyles();

  const { Bopen, Copen, stateSnack, handleClose } = useContext(UserContext);

  const { vertical, horizontal, open, msg } = stateSnack;

  return (
    <>
      <MainBar />
      <ActionButtons />
      <Cards />

      {Bopen && <AddBookmarkDialog />}
      {Copen && <AddCategoryDialog />}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={msg}
        key={vertical + horizontal}
        className={classes.snack}
        autoHideDuration={2000}
      />
    </>
  );
}
