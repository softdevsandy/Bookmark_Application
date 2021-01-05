import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CategoryIcon from "@material-ui/icons/Category";
import AddBookmarkDialog from "./dialogs/addBookmark";
import AddCategoryDialog from "./dialogs/addCategory";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#6a89cc",
    margin: "5px",
  },
}));
function ActionButtons() {
  const classes = useStyles();

  const [openB, setOpenB] = React.useState(false);
  const [openC, setOpenC] = React.useState(false);

  const BhandleOpen = () => {
    setOpenB(true);
  };
  const BhandleClose = () => {
    setOpenB(false);
  };
  const ChandleOpen = () => {
    setOpenC(true);
  };
  const ChandleClose = () => {
    setOpenC(false);
  };

  return (
    <div className="actinButton">
      <Button
        className={classes.button}
        startIcon={<BookmarkBorderIcon className="actionIcon" />}
        onClick={BhandleOpen}
      >
        Add Bookmark
      </Button>
      <Button
        className={classes.button}
        startIcon={<CategoryIcon className="actionIcon" />}
        onClick={ChandleOpen}
      >
        Add Category
      </Button>
      <AddBookmarkDialog open={openB} handleClose={BhandleClose} />
      <AddCategoryDialog open={openC} handleClose={ChandleClose} />
    </div>
  );
}

export default ActionButtons;
