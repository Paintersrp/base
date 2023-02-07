import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url("/images/masonry/img1.jpeg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    paddingBottom: "56.25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    padding: theme.spacing(2),
    zIndex: 5,
    position: "relative",
  },
  button: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: theme.spacing(2),
    width: "25%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

export default function BgImgHero() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer}>
        <Button color="primary" variant="contained" className={classes.button}>
          Buy Tickets
        </Button>
        <Button color="primary" variant="contained" className={classes.button}>
          Learn More
        </Button>
      </div>
    </div>
  );
}
