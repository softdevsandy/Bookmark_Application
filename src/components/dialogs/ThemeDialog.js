import React, { useContext } from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import { UserContext } from "../../contexts/userContext";

export default function ThemeDialog(props) {
  const { colors } = useContext(UserContext);
  const { onClose, handleListItemClick, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Change Theme</DialogTitle>
      <List>
        {colors.map((color) => (
          <ListItem
            button
            onClick={() => handleListItemClick(color)}
            key={color.themeName}
          >
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: `${color.appColor}` }}>
                <IndeterminateCheckBoxIcon
                  style={{ color: `${color.cardColor}` }}
                />
              </Avatar>
            </ListItemAvatar>
            <span
              style={{
                color: `${color.cardColor}`,
                fontWeight: "bold",
                fontSize: "17px",
              }}
            >
              {color.themeName}
            </span>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
