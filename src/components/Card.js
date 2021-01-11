import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Avatar, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "5px",
    backgroundColor: "transparent",
    border: "1px solid gray",
    color: "whitesmoke",
    "& .MuiCardHeader-root": {
      padding: 0,
      backgroundColor: theme.palette.warning.main,
      color: "#fff",
    },
    "& .MuiTypography-h5": {
      fontSize: "1.2rem",
      paddingLeft: "10px",
      padding: "3px",
    },
    // "& .MuiIconButton-root": {
    //   color: "#fff",
    //   padding: "5px",
    // },
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
    "& .MuiList-padding": {
      padding: "0px",
    },
    "& .MuiListItemIcon-root": {
      minWidth: "25px",
    },
    "& .MuiListItem-root": {
      padding: "2px 0px",
    },
    "& .MuiMenuItem-root": {
      minHeight: "0px",
    },
    "& .MuiAvatar-root": {
      height: "20px",
      width: "20px",
    },
    "& .MuiTypography-colorPrimary": {
      color: "#dfe6e9",
      width: "100%",
    },
    "& .MuiLink-underlineHover:hover": {
      textDecoration: "none",
    },
  },
}));

function Box({ category }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        // action={
        //   <IconButton aria-label="settings">
        //     <ExpandMoreIcon />
        //   </IconButton>
        // }
        title={category.category}
      />
      <CardContent>
        <MenuList>
          {category.bookmarks.map((bookmark) => (
            <MenuItem key={bookmark.id}>
              {" "}
              <ListItemIcon>
                <Avatar fontSize="small" src={bookmark.img} />
              </ListItemIcon>
              <Link href={bookmark.url} target="_blank">
                <Typography variant="inherit" noWrap>
                  {bookmark.title}
                </Typography>
              </Link>
            </MenuItem>
          ))}
        </MenuList>
      </CardContent>
    </Card>
  );
}

export default Box;
