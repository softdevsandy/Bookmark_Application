import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTypography-h6": {
      fontWeight: "bold",
      color: "red",
    },
  },
  agree: {
    fontWeight: "bold",
    color: "red",
  },
}));

function ConfirmDelete({ openConfirm, handleConfirmClose }) {
  const classes = useStyles();
  return (
    <Dialog
      open={openConfirm}
      onClose={handleConfirmClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
    >
      <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
      <DialogContent>
        <Typography id="alert-dialog-description">
          Are you suru? This action may be permanently delete your account and
          All Bookmarks !
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmClose} color="primary">
          Disagree
        </Button>
        <Button color="primary" autoFocus className={classes.agree}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDelete;
