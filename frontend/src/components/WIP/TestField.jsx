import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
  },
  label: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  field: {
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      borderColor: theme.palette.text.primary,
    },
    "&:focus": {
      outline: "none",
      borderColor: theme.palette.primary.main,
    },
  },
  select: {
    paddingRight: theme.spacing(2),
    background: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
    "&::-ms-expand": {
      display: "none",
    },
    "& option": {
      backgroundColor: theme.palette.background.paper,
    },
  },
  outlinedField: {
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      borderColor: theme.palette.text.primary,
    },
    "&:focus-within": {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
      borderColor: theme.palette.primary.main,
    },
  },
  outlinedLabel: {
    position: "absolute",
    top: 0,
    left: theme.spacing(1),
    transform: "translate(0, -50%)",
    padding: `0 ${theme.spacing(0.5)}px`,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.grey[500],
    fontSize: "0.8rem",
    fontWeight: "bold",
    transition: theme.transitions.create(["top", "left", "transform"]),
  },
  outlinedLabelShrink: {
    top: -10,
    left: 4,
    transform: "none",
    fontSize: "0.8rem",
  },
}));

const TestField = ({
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
  select = false,
  SelectProps = {},
  children = null,
  variant = "standard",
}) => {
  const classes = useStyles();

  const isOutlined = variant === "outlined";
  const shrinkLabel = Boolean(value) || Boolean(SelectProps?.displayEmpty);

  return (
    <div className={classes.root}>
      {isOutlined ? (
        <label
          htmlFor={id}
          className={`${classes.outlinedLabel} ${
            shrinkLabel && classes.outlinedLabelShrink
          }`}
        >
          {label}
        </label>
      ) : (
        <label className={classes.label} htmlFor={id}>
          {label}
        </label>
      )}
      {select ? (
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          className={`${classes.field} ${isOutlined ? classes.outlined : ""}`}
          {...SelectProps}
        >
          {children}
        </select>
      ) : (
        <input
          className={`${classes.field} ${isOutlined ? classes.outlined : ""}`}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          type={type}
          required={required}
        />
      )}
    </div>
  );
};

export default TestField;
