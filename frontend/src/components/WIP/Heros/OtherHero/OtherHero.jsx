import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    position: "relative",
    zIndex: 1,
  },
  heroTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
    color: "white",
    textShadow: "1px 1px 2px black",
    fontSize: "3rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "2rem",
    },
  },
  heroSubtitle: {
    marginBottom: theme.spacing(4),
    color: "white",
    textShadow: "1px 1px 2px black",
    fontSize: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
  heroTagline: {
    marginBottom: theme.spacing(4),
    color: "white",
    textShadow: "1px 1px 2px black",
    fontSize: "1.2rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  heroButton: {
    marginTop: theme.spacing(2),
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3))",
    zIndex: -1,
  },
}));

export default function OtherHero({
  title,
  subtitle,
  tagline,
  buttonText,
  buttonLink,
  backgroundImage,
}) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.heroOverlay} />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              className={classes.heroTitle}
            >
              {title}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              className={classes.heroSubtitle}
            >
              {subtitle}
            </Typography>
            <Typography
              variant="h6"
              align="center"
              className={classes.heroTagline}
            >
              {tagline}
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" href={buttonLink}>
                    {buttonText}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
