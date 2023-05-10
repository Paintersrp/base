import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  defaultButton: {
    margin: theme.spacing(1),
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
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
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .MuiButton-startIcon": {
      margin: "0px !important",
    },
  },
  startIcon: {
    paddingRight: 4,
  },
  endIcon: {
    marginLeft: 4,
  },
  errorButton: {
    background: theme.palette.error.light,
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
  endIcon = null,
  minWidth = 140,
  disabled = false,
  borderRadius = 48,
  margin = 8,
  minHeight = null,
  maxHeight = null,
  variant = "contained",
  special = null,
  // style,
}) {
  const classes = useStyles();

  return (
    <Button
      variant={variant}
      // color={color}
      size={size}
      className={!noHover ? classes.defaultButton : classes.noHoverButton}
      classes={{ startIcon: classes.startIcon, endIcon: classes.endIcon }}
      onClick={onClick}
      type={type}
      startIcon={startIcon}
      endIcon={endIcon}
      style={{
        minWidth: minWidth,
        backgroundColor: color,
        borderRadius: borderRadius,
        minHeight: minHeight,
        maxHeight: maxHeight,
        margin: margin,
      }}
      disabled={disabled}
    >
      {buttonText}
    </Button>
  );
}
