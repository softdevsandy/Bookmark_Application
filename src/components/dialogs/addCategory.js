import React, { useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AddIcon from "@material-ui/icons/Add";
import { UserContext } from "../../contexts/userContext";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      backgroundColor: "#2d3436",
      width: "310px",
    },
    "& .MuiDialog-paperScrollPaper": {
      paddingBottom: "0",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },

    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& .MuiIconButton-root, .MuiDialogTitle-root": {
      color: theme.palette.warning.main,
    },
    "& .MuiButton-root": {
      marginRight: "15px",
    },
  },

  button: {
    display: "flex",
    justifyContent: "flex-end",
  },
  color: {
    color: theme.palette.warning.main,
  },
}));

export default function AddCategoryDialog() {
  const classes = useStyles();

  const {
    Copen,
    categoryHandler,
    categoryList,
    updateCategories,
    handlerOpen,
  } = useContext(UserContext);
  const [state, setstate] = React.useState("");
  const [error, setError] = React.useState("");

  const submitHabdler = (e) => {
    e.preventDefault();

    if (state) {
      if (categoryList.includes(state)) {
        setError("Category already exist !");
      } else {
        handlerOpen("New category added!");
        updateCategories(state);
        categoryHandler();
        setstate("");
        setError("");
      }
    } else {
      setError("Are you kidding me, Input is blank!!!");
    }
  };

  // console.log(categoryList);

  return (
    <div>
      <Dialog
        open={Copen}
        keepMounted
        onClose={categoryHandler}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className={classes.root}
      >
        <DialogTitle id="alert-dialog-slide-title">Add Category</DialogTitle>
        <DialogContent>
          <FormControl>
            <Input
              id="category-field"
              type="text"
              placeholder="Enter the Category Name"
              value={state.charAt(0).toUpperCase() + state.slice(1)}
              onChange={(e) => setstate(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={submitHabdler}
                    aria-label="category"
                    edge="end"
                  >
                    <AddIcon className="actionIcon" />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {error && <span style={{ color: "red" }}>{error}</span>}
        </DialogContent>{" "}
        <div className={classes.button}>
          <Button className={classes.color} onClick={categoryHandler}>
            Close
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
