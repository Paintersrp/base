import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function ErrorMessageSnackbar({ errors, onClose }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);

    if (onClose) {
      onClose();
    }
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <SnackbarContent
        className={classes.error}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <ErrorIcon className={classes.icon} />
            {errors.map((error, index) => (
              <React.Fragment key={index}>
                {error}
                <br />
              </React.Fragment>
            ))}
          </span>
        }
      />
    </Snackbar>
  );
}
