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
  const { bookmarkHandler } = useContext(UserContext);
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <FormControl style={{ padding: "0" }}>
          <Avatar
            alt={data.title}
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
            defaultValue={data.title}
            style={{ margin: "7px 0" }}
            // size="small"
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
        <Button className={classes.color}>Ok</Button>
      </div>
    </>
  );
}

export default AddForm;
