import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

function Cards() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>xs=12</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Cards;
