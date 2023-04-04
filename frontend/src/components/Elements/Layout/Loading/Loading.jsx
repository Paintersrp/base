import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  makeStyles,
  Typography,
  Box,
  Backdrop,
  Fade,
  Grid,
  Button,
} from "@material-ui/core";
import LoadingIndicator from "./LoadingIndicator";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  backdrop: {
    zIndex: 9999,
    color: "#222",
  },
  progress: {
    color: theme.palette.primary.dark,
    animation: "$loading-indicator 1.25s linear infinite",
  },
  "@keyframes loading-indicator": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  message: {
    marginTop: theme.spacing(5),
    color: theme.palette.primary.dark,
  },
}));

const Loading = ({ message, loading }) => {
  const classes = useStyles();
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => {
        setShowLoading(true);
      }, 1000);
    } else {
      timer = setTimeout(() => {
        setShowLoading(false);
      }, 1000);
      clearTimeout(timer);
    }
  }, [loading]);

  return (
    <Box className={classes.root}>
      <Backdrop className={classes.backdrop} open={loading}>
        <Grid container>
          <Fade in={loading}>
            <Grid container flex justifyContent="center">
              <Grid container flex justifyContent="center">
                <LoadingIndicator size="large" color="primary" />
              </Grid>
              <Grid container flex justifyContent="center">
                {message ? (
                  <Typography variant="h4" className={classes.message}>
                    {message}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
          </Fade>
        </Grid>
      </Backdrop>
    </Box>
  );
};

export default Loading;
