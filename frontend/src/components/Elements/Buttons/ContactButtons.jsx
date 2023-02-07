import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Button } from "@material-ui/core";
import { FaPhone, FaVoicemail } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 140,
    margin: theme.spacing(1),
    boxShadow: theme.shadows[3],
    backgroundColor: "#1C1C1C",
    color: theme.palette.primary.contrastText,
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.action.hover,
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },
}));

function ContactButtons() {
  const classes = useStyles();

  return (
    <div className={classes.buttonContainer}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<FaPhone />}
        href="tel:555-555-5555"
        className={classes.button}
        style={{ marginRight: 5 }}
      >
        Call Us
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<FaVoicemail />}
        href="mailto:hello@example.com"
        className={classes.button}
      >
        Email Us
      </Button>
    </div>
  );
}

export default ContactButtons;
