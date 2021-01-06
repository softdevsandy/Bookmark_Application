import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CategoryIcon from "@material-ui/icons/Category";
import AddBookmarkDialog from "./dialogs/addBookmark";
import AddCategoryDialog from "./dialogs/addCategory";
import { UserContext } from "../contexts/userContext";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#436BD9",
    margin: "5px",
    flexGrow: 1,
  },
}));
function ActionButtons() {
  const classes = useStyles();
  const { Bopen, Copen, bookmarkHandler, categoryHandler } = useContext(
    UserContext
  );

  return (
    <div>
      <Button
        className={classes.button}
        startIcon={<BookmarkBorderIcon className="actionIcon" />}
        onClick={bookmarkHandler}
      >
        Add Bookmark
      </Button>
      <Button
        className={classes.button}
        startIcon={<CategoryIcon className="actionIcon" />}
        onClick={categoryHandler}
      >
        Add Category
      </Button>
      {Bopen && <AddBookmarkDialog />}
      {Copen && <AddCategoryDialog />}
    </div>
  );
}

export default ActionButtons;
