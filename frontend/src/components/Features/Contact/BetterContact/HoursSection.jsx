import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    maxWidth: "85%",
  },
  closedText: {
    fontFamily: "Poppins",
    color: "red",
    fontWeight: "600",
  },
}));

export default function HoursSection() {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" style={{ paddingTop: 40 }}>
        Business Hours
      </Typography>
      <Grid
        container
        spacing={3}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} sm={12} className={classes.textContainer}>
          <Typography>Monday - Friday:</Typography>
          <Typography>8:00am - 5:00pm</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} sm={12} className={classes.textContainer}>
          <Typography>Saturday - Sunday</Typography>
          <Typography className={classes.closedText}>Closed</Typography>
        </Grid>
      </Grid>
    </>
  );
}
