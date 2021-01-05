import React, { useContext } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CategoryIcon from "@material-ui/icons/Category";
import firebase from "firebase";
import { UserContext } from "../contexts/userContext";
import { Avatar, MenuItem, Menu } from "@material-ui/core";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import AddBookmarkDialog from "./dialogs/addBookmark";
import AddCategoryDialog from "./dialogs/addCategory";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    padding: "5px",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 0, 0, 1.5),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawerHeaderUser: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  delete: {
    color: "#d63031",
    fontWeight: "bold",
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
    marginLeft: 24,
    marginTop: 5,
    width: 240,
    borderRadius: "5px",
    listStyleType: "none",
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    backgroundColor: "#4C585C",
    overflow: "auto",
    maxHeight: 250,
  },
  listbox1: {
    display: "block",
    padding: 5,
    marginLeft: 5,
    marginTop: 0,
    width: 240,
    borderRadius: "5px",
    listStyleType: "none",
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    backgroundColor: "#4C585C",
    overflow: "auto",
    maxHeight: 250,
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
    color: "white",
  },
}));

export default function Main() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user, updateUser, pc } = useContext(UserContext);
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

  const {
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: top100Films,
    getOptionLabel: (option) => option.title,
  });

  const [openB, setOpenB] = React.useState(false);
  const [openC, setOpenC] = React.useState(false);

  const BhandleOpen = () => {
    setOpenB(true);
  };
  const BhandleClose = () => {
    setOpenB(false);
  };
  const ChandleOpen = () => {
    setOpenC(true);
  };
  const ChandleClose = () => {
    setOpenC(false);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* 💨 Menu Button  */}
          {!pc && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" className={classes.title}>
            My Bookmark's
          </Typography>

          {pc && (
            <div>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search Bookmarks"
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
          )}

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
              >
                <MenuItem onClick={signOut} style={{ fontWeight: "bold" }}>
                  Sign Out
                </MenuItem>
                <MenuItem onClick={handleClose} className={classes.delete}>
                  Delete Account
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {!pc && (
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <div
              className={classes.drawerHeaderUser}
              style={{ fontWeight: "bold" }}
            >
              Hi, {user.displayName}
            </div>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon style={{ color: "white" }} />
            </IconButton>
          </div>
          <Divider />
          <div className="">
            <div className={classes.search} style={{ margin: "10px" }}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Bookmarks"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                {...getInputProps()}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            {groupedOptions.length > 0 ? (
              <List {...getListboxProps()} className={classes.listbox1}>
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
            <ListItem button style={{ color: "#436BD9" }} onClick={BhandleOpen}>
              <ListItemIcon>
                <BookmarkBorderIcon className="actionIcon" />
              </ListItemIcon>
              <ListItemText primary="Add Bookmark" />
            </ListItem>
            <ListItem button style={{ color: "#436BD9" }} onClick={ChandleOpen}>
              <ListItemIcon>
                <CategoryIcon className="actionIcon" />
              </ListItemIcon>
              <ListItemText primary="Add Category" />
            </ListItem>
          </List>
          <Divider />
        </Drawer>
      )}

      <AddBookmarkDialog open={openB} handleClose={BhandleClose} />
      <AddCategoryDialog open={openC} handleClose={ChandleClose} />
    </div>
  );
}
// <List>
//   {["All mail", "Trash", "Spam"].map((text, index) => (
//     <ListItem button key={text}>
//       <ListItemIcon>
//         {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//       </ListItemIcon>
//       <ListItemText primary={text} />
//     </ListItem>
//   ))}
// </List>

const top100Films = [
  {
    title: "Google ",
    url: "https://google.com",
    img: "https://www.google.com/favicon.ico",
  },
  {
    title: "Material-ui",
    url: "https://material-ui.com",
    img: "https://material-ui.com/static/icons/180x180.png",
  },
  {
    title: "SoftDevSandy",
    url: "https://softdevsandy.me",
    img: "https://softdevsandy.me/favicon.ico",
  },
];
