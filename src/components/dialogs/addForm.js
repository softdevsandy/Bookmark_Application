import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import ConfirmationDialog from "./selectCategorys";
import { UserContext } from "../../contexts/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: "15px",
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
}));

function AddForm() {
  const { bookmarkHandler } = useContext(UserContext);
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <FormControl style={{ padding: "0" }}>
          <Avatar
            alt="Cindy Baker"
            src="https://material-ui.com/static/images/avatar/3.jpg"
            className={classes.fabButton}
          />
          <TextField
            label="URL"
            defaultValue="softdevsandy.me"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            style={{ margin: "7px 0" }}
            size="small"
          />
          <TextField
            label="Edit Title"
            variant="outlined"
            defaultValue="developer"
            style={{ margin: "7px 0" }}
            size="small"
          />

          {/* select category  */}
          <ConfirmationDialog />
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
        <Button style={{ color: "#436BD9" }}>Ok</Button>
      </div>
    </>
  );
}

export default AddForm;
