import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: theme.palette.background.paper,
      opacity: 0.6,
    },
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    zIndex: 1,
  },
}));

const NotFoundIllustration = ({ className }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${className}`}>
      <img
        src="/images/404.svg"
        alt="Page not found illustration"
        className={classes.image}
      />
    </div>
  );
};

export default NotFoundIllustration;
