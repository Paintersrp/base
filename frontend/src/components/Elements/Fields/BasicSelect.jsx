import React from "react";
import { MenuItem, Select, makeStyles, Fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "100%",
    maxHeight: "50px",
    background: "#F5F5F5",
    color: theme.palette.text.dark,
    "& .MuiSelect-icon": {
      color: theme.palette.text.dark,
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.text.dark,

      padding: "10.5px 16px 10.5px",
    },
    "& .MuiSelect-select": {},
    "& .MuiSelect-select:focus": {},
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "& .MuiFormLabel-root": {
      color: "red",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
    "& .MuiMenu-paper": {
      maxHeight: 64,
      overflowY: "auto",
    },
  },
}));

function BasicSelect({
  placeholder = null,
  variant = "outlined",
  onChange,
  name,
  value,
  children,
  onFocus,
  onBlur,
  inputRef,
  style,
}) {
  const classes = useStyles();

  return (
    <Select
      placeholder={placeholder}
      id={name}
      className={classes.select}
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        getContentAnchorEl: null,
        classes: {
          paper: classes.menuPaper,
        },
        PaperProps: {
          style: {
            maxHeight: 300,
          },
        },
        TransitionComponent: Fade,
      }}
      variant={variant}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      inputRef={inputRef}
      style={style}
    >
      {children}
    </Select>
  );
}

export default BasicSelect;
