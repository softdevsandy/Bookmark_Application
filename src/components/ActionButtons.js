import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { UserContext } from "../contexts/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  button: {
    color: theme.palette.warning.main,
    margin: "0px 15px",
    fontSize: "16px",
    padding: "0px",
  },
}));
function ActionButtons() {
  const classes = useStyles();
  const { bookmarkHandler, categoryHandler } = useContext(UserContext);

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        startIcon={<AddCircleIcon />}
        onClick={bookmarkHandler}
      >
        Add Bookmark
      </Button>
      <Button
        className={classes.button}
        startIcon={<AddToPhotosIcon />}
        onClick={categoryHandler}
      >
        Add Category
      </Button>
    </div>
  );
}

export default ActionButtons;
