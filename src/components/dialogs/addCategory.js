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

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      backgroundColor: "#2d3436",
      width: "310px",
    },
    "& .MuiDialog-paperScrollPaper": {
      paddingBottom: "15px",
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
  },
}));

export default function AddCategoryDialog() {
  const classes = useStyles();

  const { Copen, categoryHandler, categoryList, updateCategories } = useContext(
    UserContext
  );
  const [state, setstate] = React.useState("");
  const [ok, setOk] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [blank, setBlank] = React.useState(false);

  const submitHabdler = (e) => {
    e.preventDefault();
    if (state) {
      if (categoryList.includes(state)) {
        setBlank(false);
        setOk(false);
        setError(true);
      } else {
        updateCategories(state);
        setstate("");
        setBlank(false);
        setError(false);
        setOk(true);
      }
    } else {
      setBlank(true);
      setError(false);
      setOk(false);
    }
  };

  console.log(categoryList);

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
              value={state}
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
          {ok && <span style={{ color: "green" }}>Successsfully added !</span>}{" "}
          {error && (
            <span style={{ color: "red" }}>Category already exist !</span>
          )}
          {blank && (
            <span style={{ color: "red" }}>
              Are you kidding me, Input is blank !
            </span>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
