import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import React, { useContext } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { UserContext } from "../contexts/userContext";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiDrawer-paper": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(2.7, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawerHeaderUser: {
    flexGrow: 1,
    fontWeight: "bold",
    fontSize: "18px",
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "90%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  listbox: {
    display: "block",
    padding: 5,
    borderRadius: "5px",
    listStyleType: "none",
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    backgroundColor: theme.palette.grey[600],
    overflow: "auto",
    maxHeight: 250,
    marginLeft: 10,
    marginTop: -5,
    width: 230,
  },
  list: {
    cursor: "pointer",
    padding: 0,
    margin: 5,
  },
  link: {
    fontSize: "15px",
    textDecoration: "none",
    height: "100%",
    width: "100%",
    color: theme.palette.grey[50],
  },

  nav: {
    color: theme.palette.warning.main,
    height: "60px",
    "& .MuiSvgIcon-root": {
      color: theme.palette.warning.main,
    },
    "& .MuiTypography-root": {
      fontSize: "18px",
    },
    "& .MuiListItemText-root": {
      marginTop: 0,
    },
  },
}));

export default function LeftDrawer({ open, toggleDrawer }) {
  const classes = useStyles();

  const { user, bookmarkHandler, categoryHandler, bookmarks } = useContext(
    UserContext
  );

  const {
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: bookmarks,
    getOptionLabel: (option) => option.title,
  });

  const bHandler = () => {
    toggleDrawer();
    bookmarkHandler();
  };
  const cHandler = () => {
    toggleDrawer();
    categoryHandler();
  };

  return (
    <div>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
        className={classes.root}
      >
        <div className={classes.toolbar}>
          <div className={classes.drawerHeaderUser}>
            Hi, {user ? user.displayName : "User"}
          </div>
        </div>
        <Divider />

        <div className="">
          <div className={classes.search} style={{ margin: "10px" }}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Bookmarks"
              type="search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              {...getInputProps()}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          {groupedOptions.length > 0 ? (
            <List {...getListboxProps()} className={classes.listbox}>
              {groupedOptions.map((option, index) => (
                <ListItem
                  {...getOptionProps({ option, index })}
                  className={classes.list}
                >
                  <a
                    className={classes.link}
                    href={option.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={option.img}
                      alt=""
                      width="18px"
                      height="20px"
                      style={{ paddingTop: "5px", marginRight: "5px" }}
                    />

                    {option.title}
                  </a>
                </ListItem>
              ))}
            </List>
          ) : null}
        </div>

        <Divider />
        <List>
          <ListItem button className={classes.nav} onClick={bHandler}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Add Bookmark" style={{ height: "22px" }} />
          </ListItem>
          <ListItem button className={classes.nav} onClick={cHandler}>
            <ListItemIcon>
              <AddToPhotosIcon />
            </ListItemIcon>

            <ListItemText primary="Add Category" style={{ height: "22px" }} />
          </ListItem>
        </List>
      </SwipeableDrawer>
    </div>
  );
}
