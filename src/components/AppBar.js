import React, { useContext } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import firebase from "firebase";
import { UserContext } from "../contexts/userContext";
import { Avatar, MenuItem, Menu } from "@material-ui/core";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import LeftDrawer from "./LeftDrawer";
import ThemeDialog from "./dialogs/ThemeDialog";
import ConfirmDelete from "./dialogs/ConfirmDelete";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "5px",
    width: "auto",
    "& .MuiDrawer-paper": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  sideButton: {
    marginRight: theme.spacing(1.7),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  toolbar: {
    paddingRight: "5px",
    [theme.breakpoints.up("sm")]: {
      paddingRight: "10px",
    },
  },

  title: {
    flexGrow: 1,
  },

  searchBox: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
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
    width: "245px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      width: "245px",
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
    marginLeft: 24,
    marginTop: 5,
    width: "245px",
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

  menu: {
    "& .MuiPopover-paper": {
      backgroundColor: theme.palette.primary.main,
    },
  },

  theme: {
    fontWeight: "bold",
    color: theme.palette.warning.main,
  },
  delete: {
    color: theme.palette.secondary.main,
    fontWeight: "bold",
  },
}));

function MainBar() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("Successfully signout");
        updateUser(null);
      })
      .catch(function () {
        console.log("Error signout");
      });
  };

  const [openDailog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };
  const handleListItemClick = (value) => {
    changeTheme(value);
  };

  const [openConfirm, setOpenconfirm] = React.useState(false);

  const handleConfirmOpen = () => {
    setOpenconfirm(true);
    setAnchorEl(null);
  };

  const handleConfirmClose = () => {
    setOpenconfirm(false);
  };

  const { user, updateUser, changeTheme, bookmarks } = useContext(UserContext);

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

  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            className={classes.sideButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            My Bookmark's
          </Typography>

          {/* Search box  */}
          <div className={classes.searchBox}>
            <div className={classes.search}>
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

          {/* 👤 Profile icon  */}
          {user && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt="Profile Picture" src={user.photoURL} />
              </IconButton>
              {open1 && (
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open1}
                  onClose={handleClose}
                  className={classes.menu}
                >
                  <MenuItem onClick={handleClickOpen} className={classes.theme}>
                    Change Theme
                  </MenuItem>
                  <MenuItem
                    onClick={signOut}
                    style={{ fontWeight: "bold", color: "white" }}
                  >
                    Sign Out
                  </MenuItem>
                  <MenuItem
                    onClick={handleConfirmOpen}
                    className={classes.delete}
                  >
                    Delete Account
                  </MenuItem>
                </Menu>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>
      <LeftDrawer open={openDrawer} toggleDrawer={toggleDrawer} />
      <ThemeDialog
        open={openDailog}
        onClose={handleClickClose}
        handleListItemClick={handleListItemClick}
      />
      <ConfirmDelete
        openConfirm={openConfirm}
        handleConfirmClose={handleConfirmClose}
      />
    </>
  );
}

export default MainBar;
