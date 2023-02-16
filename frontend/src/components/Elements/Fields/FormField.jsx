import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  field: {
    margin: 2,
    width: "100%",
    "& .MuiOutlinedInput-root": {
      fontFamily: "Roboto",
      padding: 0,
      margin: 5,
      fontSize: "0.9rem",
      fontWeight: "400",
      width: "100%",
      letterSpacing: 0.25,

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
      margin: 4,
      color: "black",
      fontWeight: "450",
      fontSize: "1rem",
      letterSpacing: 0.5,
    },
    "& input": {
      color: "black",
    },
  },
  multiline: {
    marginLeft: 2,
    marginTop: 5,
    marginBottom: 5,
    width: "100%",
    "& .MuiOutlinedInput-inputMultiline": {
      color: "black",
    },
    "& .MuiOutlinedInput-input": {
      color: "black",
      textAlign: "left",
    },
    "& .MuiOutlinedInput-root": {
      fontFamily: "Roboto",
      padding: 10,
      marginLeft: 5,
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
      marginLeft: 3,
      fontWeight: "450",
      fontSize: "1rem",
    },
    "& input": {
      color: "black",
    },
  },
});

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
}) => {
  const classes = useStyles();

  return (
    <TextField
      name={id}
      id={id}
      className={!multiline ? classes.field : classes.multiline}
      variant="outlined"
      label={label}
      margin="dense"
      value={value}
      onChange={onChange}
      multiline={multiline}
      minRows={6}
      error={error}
      helperText={helperText}
      select={select}
      SelectProps={SelectProps}
    >
      {children}
    </TextField>
  );
};

export default FormField;
