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
}));

export default function ContactSection() {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" style={{ paddingBottom: 20 }}>
        Contact Information
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
          <Typography>Email:</Typography>
          <Typography>email@example.com</Typography>
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
          <Typography>Phone:</Typography>
          <Typography>+1 (555) 555-5555</Typography>
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
          <Typography>Address:</Typography>
          <Typography>1234 Main St, City, State 12345</Typography>
        </Grid>
      </Grid>
    </>
  );
}
