import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddIcon from "@material-ui/icons/Add";
import { UserContext } from "../../contexts/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiPaper-root": {
      backgroundColor: theme.palette.primary.main,
      width: "310px",
    },
    "& .MuiDialog-paperScrollPaper": {
      paddingBottom: "15px",
    },
    "& .MuiIconButton-root, .MuiDialogTitle-root": {
      color: theme.palette.warning.main,
    },
    "& .MuiFormControlLabel-root": {
      color: "white",
    },
  },
  paper: {
    width: "80%",
    maxHeight: 400,
  },
  color: {
    color: theme.palette.warning.main,
  },
}));

function ConfirmationDialogRaw(props) {
  const classes = useStyles();
  const { categoryList } = useContext(UserContext);
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  const { categoryHandler } = useContext(UserContext);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const openNewCategory = () => {
    onClose();
    categoryHandler();
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
      className={classes.root}
    >
      <DialogTitle
        id="confirmation-dialog-title"
        style={{ paddingBottom: "0px" }}
        className={classes.color}
      >
        Bookmark Categories
      </DialogTitle>
      <div style={{ padding: "5px 10px 5px 20px" }}>
        <Button
          onClick={openNewCategory}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          className={classes.color}
        >
          Add New Category
        </Button>
      </div>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {categoryList.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio color="primary" />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions style={{ padding: "16px 8px 0px 8px" }}>
        <Button autoFocus onClick={handleCancel} style={{ color: "#7A848A" }}>
          Cancel
        </Button>
        <Button onClick={handleOk} className={classes.color}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function ConfirmationDialog({ changeCategory }) {
  const classes = useStyles();
  const { categoryList } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(categoryList[0]);

  React.useEffect(() => {
    changeCategory(value);
  }, [value, changeCategory]);

  React.useEffect(() => {
    setValue(categoryList[0]);
  }, [categoryList]);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <div className={classes.root}>
      <List component="div" role="list" style={{ padding: "0px" }}>
        <ListItem
          button
          onClick={handleClickListItem}
          role="listitem"
          style={{ padding: "0 0 0 5px" }}
        >
          <ListItemText
            primary="Select Category"
            secondary={value}
            className={classes.color}
            style={{ margin: "0px" }}
          />
        </ListItem>
        <ConfirmationDialogRaw
          classes={{
            paper: classes.paper,
          }}
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </List>
    </div>
  );
}
