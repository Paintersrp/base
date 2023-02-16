import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 140,
    margin: theme.spacing(1),
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: 50,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export default function StyledButton({
  buttonText,
  onClick,
  color = "primary",
  size = "small",
  type,
  startIcon = null,
}) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color={color}
      size={size}
      className={classes.button}
      onClick={onClick}
      type={type}
      startIcon={startIcon}
    >
      {buttonText}
    </Button>
  );
}
