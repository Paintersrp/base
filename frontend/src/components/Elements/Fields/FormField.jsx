import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  field: {
    width: "100%",
    margin: theme.spacing(0, 0, 0, 0),
    "& .MuiOutlinedInput-root": {
      fontFamily: "Roboto",
      padding: 0,
      fontWeight: "400",
      width: "100%",
      letterSpacing: 0.25,

      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.light,
      },
    },
    "& .MuiFormLabel-root": {
      fontFamily: "Roboto",
      color: theme.palette.text.dark,
      fontWeight: "500",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
    "& .MuiFormHelperText-contained": {
      fontFamily: "Roboto",
      color: theme.palette.text.secondary,
      fontWeight: "500",
      marginBottom: theme.spacing(1),
    },
  },
  multiline: {
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
    "& .MuiOutlinedInput-inputMultiline": {
      color: theme.palette.text.dark,
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.text.dark,
      textAlign: "left",
    },
    "& .MuiOutlinedInput-root": {
      fontFamily: "Roboto",
      padding: 10,
      fontSize: "0.9rem",
      fontWeight: 50,
      width: "100%",
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiFormLabel-root": {
      fontFamily: "Roboto",
      color: "black",
      fontWeight: "500",
    },
    "& .MuiFormHelperText-contained": {
      fontFamily: "Roboto",
      color: theme.palette.text.secondary,
      fontWeight: "500",
      margin: theme.spacing(0, 0, 1, 0),
    },
    "& input": {
      color: "black",
    },
  },
  searchIcon: {
    color: theme.palette.grey[500],
    marginLeft: theme.spacing(0.5),
  },
  searchInput: {
    fontSize: "1rem",
  },
  helperText: {
    color: "red",
  },
}));

const FormField = ({
  id,
  label,
  value,
  onChange,
  multiline,
  error,
  helperText,
  select = false,
  SelectProps,
  children,
  required = null,
  type = null,
  style,
  minRows = 6,
  variant = "outlined",
}) => {
  const classes = useStyles();

  return (
    <TextField
      name={id}
      id={id}
      className={!multiline ? classes.field : classes.multiline}
      // classes={{ helperText: classes.helperText }}
      variant={variant}
      label={label}
      margin="dense"
      value={value}
      onChange={onChange}
      multiline={multiline}
      minRows={minRows}
      error={error}
      helperText={helperText}
      select={select}
      SelectProps={SelectProps}
      type={type}
      required={required}
      style={style}
      InputProps={{
        ...(label === "Search" && {
          classes: {
            input: classes.searchInput,
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className={classes.searchIcon} />
            </InputAdornment>
          ),
        }),
      }}
    >
      {children}
    </TextField>
  );
};

export default FormField;
