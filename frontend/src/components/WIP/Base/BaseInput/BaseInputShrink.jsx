import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fieldWrapper: {
    position: "relative",
    // marginTop: theme.spacing(1),
  },
  field: {
    width: "100%",
    fontFamily: "Roboto",
    padding: theme.spacing(2, 2, 2, 2),
    margin: theme.spacing(1),
    fontWeight: "400",
    fontSize: "1rem",
    letterSpacing: 0.25,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 4,
    resize: "none",
    "&:hover": {
      borderColor: "black",
    },
    "&:focus": {
      borderWidth: 2,
      outline: "none",
    },
    "&:focus ~ $label": {
      top: 0,
      transform: "translate(0, -50%)",
      fontSize: "0.75rem",
      color: "black",
      fontWeight: "500",
    },
    "&$shrink ~ $label": {
      top: 0,
      transform: "translate(0, -50%)",
      fontSize: "0.75rem",
      color: "black",
      fontWeight: "500",
      left: 10,
    },
    "&:focus ~ $labelTextArea": {
      top: 0,
      transform: "translate(0, -50%)",
      fontSize: "0.75rem",
      color: "black",
      fontWeight: "500",
    },
    "&$shrink ~ $labelTextArea": {
      top: 0,
      transform: "translate(0, -50%)",
      fontSize: "0.75rem",
      color: "black",
      fontWeight: "500",
      left: 10,
    },
  },
  label: {
    position: "absolute",
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "1rem",
    fontWeight: "400",
    pointerEvents: "none",
    transition: "all 0.2s",
    color: theme.palette.grey[500],
  },
  labelTextArea: {
    position: "absolute",
    left: "20px",
    top: "20%",
    transform: "translateY(-50%)",
    fontSize: "1rem",
    fontWeight: "400",
    pointerEvents: "none",
    transition: "all 0.2s",
    color: theme.palette.grey[500],
  },
  shrink: {
    padding: "18.5px 14px 16px",
  },
}));

const TestFieldShrink = ({
  id,
  label,
  value,
  onChange,
  multiline = false,
  rows = 1,
  type = "text",
  required = false,
  error = false,
  helperText = "",
  placeholder,
}) => {
  const classes = useStyles();
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const InputComponent = multiline ? "textarea" : "input";

  return (
    <div className={classes.fieldWrapper}>
      <InputComponent
        className={`${classes.field} ${
          focused || value || type === "number" ? classes.shrink : ""
        } `}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        type={type}
        error={error}
        helperText={helperText}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ minHeight: multiline ? 169.5 : null }}
      />
      <label
        className={multiline ? classes.labelTextArea : classes.label}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default TestFieldShrink;
