import React from "react";
import Box from "./Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3px 9px",
  },
}));

function Cards() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box />
    </div>
  );
}

export default Cards;
