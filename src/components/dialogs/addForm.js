import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import ConfirmationDialog from "./selectCategorys";
import { UserContext } from "../../contexts/userContext";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: "15px",
    "& .MuiFormLabel-root": {
      color: "white",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "white",
    },
    "& .MuiTypography-colorTextSecondary": {
      color: "white",
      marginLeft: "5px",
    },
  },
  fabButton: {
    zIndex: 1,
    left: 0,
    right: 0,
    margin: "0 auto",
    marginBottom: "5px",
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
  },
  color: {
    color: theme.palette.warning.main,
  },
}));

function AddForm({ data }) {
  const { bookmarkHandler, updateBookmarks, handlerOpen } = useContext(
    UserContext
  );
  const classes = useStyles();

  const [editTitle, setEditTitle] = React.useState(data.title);
  const [category, setCategory] = React.useState("");

  const handlerSubmit = () => {
    var newBookmark = {
      id: uuidv4(),
      title: editTitle,
      url: data.input,
      category,
      img: data.imgUrl,
    };

    // console.log(newBookmark);
    updateBookmarks(newBookmark);
    handlerOpen("Bookmark successfully added!");
    bookmarkHandler();
  };

  const changeCategory = (value) => {
    setCategory(value);
  };

  return (
    <>
      <div className={classes.root}>
        <FormControl style={{ padding: "0" }}>
          <Avatar
            alt={editTitle}
            src={data.imgUrl}
            className={classes.fabButton}
          />
          <TextField
            label="URL"
            defaultValue={data.input}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            style={{ margin: "7px 0" }}
            // size="small"
          />
          <TextField
            label="Edit Title"
            variant="outlined"
            defaultValue={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{ margin: "7px 0" }}
            // size="small"
          />

          {/* select category  */}
          <ConfirmationDialog changeCategory={changeCategory} />
          {/* ....  */}
        </FormControl>
      </div>
      <div className={classes.button}>
        <Button
          autoFocus
          style={{ color: "#7A848A" }}
          onClick={bookmarkHandler}
        >
          Cancel
        </Button>
        <Button className={classes.color} onClick={handlerSubmit}>
          Ok
        </Button>
      </div>
    </>
  );
}

export default AddForm;
