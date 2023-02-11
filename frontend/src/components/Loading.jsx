import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  makeStyles,
  Typography,
  Box,
  Backdrop,
  Fade,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.main
  },
  progress: {
    animation: "$loading-indicator 1s linear infinite"
  },
  "@keyframes loading-indicator": {
    "0%": {
      transform: "rotate(0deg)"
    },
    "100%": {
      transform: "rotate(360deg)"
    }
  },
  message: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main
  }
}));

const Loading = ({ message = "Loading...", color = "primary" }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Box className={classes.root}>
      <Backdrop className={classes.backdrop} open={loading}>
        <Fade in={loading}>
          <CircularProgress
            className={classes.progress}
            color={color}
            size={80}
          />
        </Fade>
        <Typography variant="h5" className={classes.message}>
          {message}
        </Typography>
      </Backdrop>
    </Box>
  );
};

export default Loading;
