import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  textContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    maxWidth: "85%",
  },
}));

export default function InformationField({ text, data }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={12} className={classes.textContainer}>
      <Typography variant="subtitle1">{text}</Typography>
      <Typography variant="subtitle1">{data}</Typography>
    </Grid>
  );
}
