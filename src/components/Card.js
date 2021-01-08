import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Avatar, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "5px",
    backgroundColor: "transparent",
    border: "1px solid gray",
    color: "whitesmoke",
    width: "auto",
    [theme.breakpoints.up("sm")]: {
      minHeight: "0px",
      width: "310px",
    },
    "& .MuiCardHeader-root": {
      padding: 0,
      backgroundColor: theme.palette.warning.main,
      color: "#fff",
    },
    "& .MuiTypography-h5": {
      fontSize: "1.2rem",
      paddingLeft: "10px",
    },
    "& .MuiIconButton-root": {
      color: "#fff",
      padding: "5px",
    },
    "& .MuiCardHeader-action": {
      padding: "0px",
      margin: "0px",
    },
    "& .MuiCardContent-root": {
      padding: "5px",
    },
    "& .MuiCardContent-root:last-child": {
      paddingBottom: "5px",
    },
    "& .MuiListItemIcon-root": {
      minWidth: "25px",
    },
    "& .MuiList-padding": {
      padding: "0px",
    },
    "& .MuiMenuItem-root": {
      minHeight: "0px",
    },
    "& .MuiListItem-root": {
      padding: "2px 0px",
    },
    "& .MuiAvatar-root": {
      height: "20px",
      width: "20px",
    },
  },
}));

function Box() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <ExpandMoreIcon />
          </IconButton>
        }
        title="Paella"
      />
      <CardContent>
        <MenuList>
          <MenuItem>
            <Typography style={{ flexGrow: 1 }}>
              {" "}
              <Link href="https://material-ui.com" style={{ width: "100%" }}>
                <ListItemIcon>
                  <Avatar
                    alt="Profile Picture"
                    src="https://material-ui.com/static/favicon.ico"
                  />
                  <span variant="inherit" style={{ color: "white" }}>
                    Material Ui
                  </span>
                </ListItemIcon>
              </Link>
            </Typography>

            <ListItemIcon>
              <DeleteOutlineIcon />
            </ListItemIcon>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <PriorityHighIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">
              A very long text that overflows
            </Typography>
          </MenuItem>
          <span style={{ display: "flex" }}>
            {" "}
            <MenuItem style={{ flexGrow: 1 }}>
              <ListItemIcon>
                <DraftsIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                A very long text that overflows
              </Typography>
            </MenuItem>{" "}
            <ListItemIcon>
              <DeleteOutlineIcon />
            </ListItemIcon>
          </span>
        </MenuList>
      </CardContent>
    </Card>
  );
}

export default Box;
