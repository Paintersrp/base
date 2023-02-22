import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  defaultButton: {
    margin: theme.spacing(1),
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: 48,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[3],
      backgroundColor: theme.palette.primary.light,
    },
    "& .MuiButton-startIcon": {
      margin: "0px !important",
    },
  },
  noHoverButton: {
    padding: 6.5,
    marginRight: theme.spacing(0),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: 0,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  startIcon: {
    margin: 0,
  },
}));

export default function StyledButton({
  buttonText,
  onClick,
  color = "primary",
  size = "small",
  type,
  noHover = false,
  startIcon = null,
  minWidth = 140,
}) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color={color}
      size={size}
      className={!noHover ? classes.defaultButton : classes.noHoverButton}
      classes={{ startIcon: classes.startIcon }}
      onClick={onClick}
      type={type}
      startIcon={startIcon}
      style={{ minWidth: minWidth, backgroundColor: color }}
    >
      {buttonText}
    </Button>
  );
}
