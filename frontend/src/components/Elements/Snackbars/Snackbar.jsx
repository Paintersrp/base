import React, { useState } from "react";
import { Snackbar, IconButton, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import { Slide, Fade } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: theme.palette.success.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
    "& .MuiSnackbarContent-root": {
      fontFamily: "Poppins",
      fontSize: "0.9rem",
      fontWeight: "700",
      backgroundColor: "inherit",
    },
  },
}));

const AdvancedSnackbar = ({
  message,
  type,
  open,
  onClose,
  duration = 5000,
  position = "bottom-right",
}) => {
  const classes = useStyles();

  const iconVariants = {
    success: <CheckCircleIcon className={classes.iconVariant} />,
    error: <ErrorIcon className={classes.iconVariant} />,
    info: <InfoIcon className={classes.iconVariant} />,
    warning: <WarningIcon className={classes.iconVariant} />,
  };

  let anchorOrigin;
  if (position === "top-center") {
    anchorOrigin = {
      vertical: "top",
      horizontal: "center",
    };
  } else if (position === "top-right") {
    anchorOrigin = {
      vertical: "top",
      horizontal: "right",
    };
  } else if (position === "top-left") {
    anchorOrigin = {
      vertical: "top",
      horizontal: "left",
    };
  } else if (position === "bottom-center") {
    anchorOrigin = {
      vertical: "bottom",
      horizontal: "center",
    };
  } else if (position === "bottom-right") {
    anchorOrigin = {
      vertical: "bottom",
      horizontal: "right",
    };
  } else if (position === "bottom-left") {
    anchorOrigin = {
      vertical: "bottom",
      horizontal: "left",
    };
  }

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={duration}
      TransitionComponent={Fade}
      anchorOrigin={anchorOrigin}
      className={`${classes.message} ${classes[type]}`}
      message={
        <span className={`${classes.message} ${classes[type]}`}>
          {iconVariants[type]}
          {message}
        </span>
      }
      action={
        <IconButton color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      }
    />
  );
};

export default AdvancedSnackbar;
