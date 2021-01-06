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
import AddCategoryDialog from "./addCategory";
import { UserContext } from "../../contexts/userContext";

const options = [
  "Personal",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
];

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  const { categoryHandler, Copen } = useContext(UserContext);

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

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle
        id="confirmation-dialog-title"
        style={{ color: "#436BD9", paddingBottom: "0px" }}
      >
        Bookmark Categories
      </DialogTitle>
      <div style={{ padding: "5px 10px 5px 20px" }}>
        <Button
          onClick={() => {
            categoryHandler();
          }}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          style={{ color: "#436BD9" }}
        >
          Add New Category
        </Button>
        {Copen && <AddCategoryDialog />}
      </div>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
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
        <Button onClick={handleOk} style={{ color: "#436BD9" }}>
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "80%",
    maxHeight: 400,
  },
}));

export default function ConfirmationDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Personal");

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
            style={{ color: "#436BD9", margin: "0px" }}
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
