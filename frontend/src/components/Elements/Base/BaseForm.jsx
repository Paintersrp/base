import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import StyledButton from "../../Elements/Buttons/StyledButton";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(3),
    borderRadius: 10,
    boxShadow: theme.shadows[1],
    margin: "0 auto",
    color: theme.palette.text.dark,
  },
  formLimitPadding: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(3),
    borderRadius: 10,
    boxShadow: theme.shadows[1],
    margin: "0 auto",
    color: theme.palette.text.dark,
  },
  formExtraPadding: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(6),
    borderRadius: 10,
    boxShadow: theme.shadows[1],
    margin: "0 auto",
    color: theme.palette.text.dark,
  },
  formTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    color: theme.palette.text.dark,
  },
  formSubtitle: {
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    fontSize: "0.85rem",
    color: theme.palette.text.dark,
  },
  formField: {
    "& .MuiOutlinedInput-root": {
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
      color: "black",
      fontWeight: "500",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "black",
    },
  },
  formButton: {
    marginTop: theme.spacing(1),
    fontWeight: "bold",
    borderRadius: 50,
  },
}));

function BaseForm({
  title,
  body,
  handleSubmit,
  children,
  maxWidth = 360,
  limitPadding = false,
  extraPadding,
}) {
  const classes = useStyles();

  return (
    <Grid item xs={12} style={{ padding: 0, margin: 0 }}>
      <div
        className={
          limitPadding
            ? classes.formLimitPadding
            : extraPadding
            ? classes.formExtraPadding
            : classes.form
        }
        style={{ maxWidth: maxWidth }}
      >
        {title ? (
          <Typography variant="h4" className={classes.formTitle}>
            {title}
          </Typography>
        ) : null}
        {body ? (
          <Typography variant="body2" className={classes.formSubtitle}>
            {body}
          </Typography>
        ) : null}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={0}>
            {children}
          </Grid>
        </form>
      </div>
    </Grid>
  );
}

export default BaseForm;
