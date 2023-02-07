import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    textAlign: "center",
    marginTop: 20,
  },
  icon: {
    fontSize: "2rem",
    color: "gold",
  },
  heading: {
    fontFamily: "Poppins",
    textAlign: "center",
    fontWeight: 700,
    fontSize: "1.5rem",
    border: 0,
  },
  description: {
    fontSize: "0.95rem",
    fontWeight: 400,
    fontFamily: "Roboto",
    textAlign: "center",
    marginBottom: theme.spacing(1),
    color: "white",
  },
  stepContainer: {
    display: "flex",
    justifyContent: "center",
    maxWidth: 550,
  },
}));

export default function FloatingFeature({ step }) {
  const classes = useStyles();

  return (
    <Grid container spacing={1} className={classes.stepContainer}>
      <Grid className={classes.iconContainer} item xs={12}>
        <step.icon className={classes.icon} />
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.heading}>{step.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" className={classes.description}>
          {step.description}
        </Typography>
      </Grid>
    </Grid>
  );
}
